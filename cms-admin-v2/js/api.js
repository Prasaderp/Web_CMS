/**
 * API Client Module
 * Handles all HTTP requests to the backend with centralized error handling.
 * Depends on: config.js
 */

/**
 * Custom error class for API failures.
 */
class ApiError extends Error {
    constructor(message, status, endpoint) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.endpoint = endpoint;
    }
}

const Api = {
    /**
     * Makes an authenticated API request.
     * @param {string} endpoint - API endpoint (e.g., '/api/admin/blogs').
     * @param {Object} options - Fetch options.
     * @returns {Promise<any>} - Response data.
     */
    async request(endpoint, options = {}) {
        const { requiresAuth = false, body, method = 'GET', ...restOptions } = options;

        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        // Add auth token if required
        if (requiresAuth) {
            const token = Auth.getToken();
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
        }

        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(
            () => controller.abort(),
            CMS_CONFIG.API_TIMEOUT_MS
        );

        try {
            const response = await fetch(`${CMS_CONFIG.API_URL}${endpoint}`, {
                method,
                headers,
                body: body ? JSON.stringify(body) : undefined,
                signal: controller.signal,
                ...restOptions
            });

            const text = await response.text();
            let data = null;

            if (text) {
                try {
                    data = JSON.parse(text);
                } catch {
                    throw new ApiError('Invalid server response', response.status, endpoint);
                }
            }

            if (!response.ok) {
                const message = data?.error || data?.detail || `Request failed (${response.status})`;
                throw new ApiError(message, response.status, endpoint);
            }

            // Handle both envelope format {success, data} and direct data
            if (data && typeof data === 'object' && 'success' in data) {
                if (data.success === false) {
                    throw new ApiError(data.error || 'API error', response.status, endpoint);
                }
                return data.data;
            }

            return data;
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new ApiError('Request timed out. Please try again.', null, endpoint);
            }
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError('Network error. Please check your connection.', null, endpoint);
        } finally {
            clearTimeout(timeoutId);
        }
    },

    /**
     * GET request.
     */
    get(endpoint, requiresAuth = false) {
        return this.request(endpoint, { method: 'GET', requiresAuth });
    },

    /**
     * POST request.
     */
    post(endpoint, body, requiresAuth = false) {
        return this.request(endpoint, { method: 'POST', body, requiresAuth });
    },

    /**
     * PUT request.
     */
    put(endpoint, body, requiresAuth = false) {
        return this.request(endpoint, { method: 'PUT', body, requiresAuth });
    },

    /**
     * PATCH request.
     */
    patch(endpoint, body, requiresAuth = false) {
        return this.request(endpoint, { method: 'PATCH', body, requiresAuth });
    },

    /**
     * DELETE request.
     */
    delete(endpoint, requiresAuth = false) {
        return this.request(endpoint, { method: 'DELETE', requiresAuth });
    },

    /**
     * Upload file (multipart/form-data).
     */
    async upload(endpoint, file, requiresAuth = true) {
        const formData = new FormData();
        formData.append('file', file);

        const headers = new Headers();
        if (requiresAuth) {
            const token = Auth.getToken();
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CMS_CONFIG.API_TIMEOUT_MS);

        try {
            const response = await fetch(`${CMS_CONFIG.API_URL}${endpoint}`, {
                method: 'POST',
                headers,
                body: formData,
                signal: controller.signal
            });

            const text = await response.text();
            let data = null;

            if (text) {
                try {
                    data = JSON.parse(text);
                } catch {
                    throw new ApiError('Invalid server response', response.status, endpoint);
                }
            }

            if (!response.ok) {
                const message = data?.error || 'Upload failed';
                throw new ApiError(message, response.status, endpoint);
            }

            if (data && 'data' in data) {
                return data.data;
            }
            return data;
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new ApiError('Upload timed out. Please try again.', null, endpoint);
            }
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError('Network error during upload.', null, endpoint);
        } finally {
            clearTimeout(timeoutId);
        }
    }
};

/**
 * Blogs API namespace.
 */
const BlogsApi = {
    getAll: () => Api.get('/api/admin/blogs', true),
    getById: (id) => Api.get(`/api/admin/blogs/${id}`, true),
    create: (data) => Api.post('/api/admin/blogs', data, true),
    update: (id, data) => Api.put(`/api/admin/blogs/${id}`, data, true),
    delete: (id) => Api.delete(`/api/admin/blogs/${id}`, true),
    togglePublish: (id) => Api.patch(`/api/admin/blogs/${id}/publish`, undefined, true),
    toggleFeatured: (id) => Api.patch(`/api/admin/blogs/${id}/featured`, undefined, true),
    bulkPublish: (ids) => Api.post('/api/admin/blogs/bulk/publish', { ids }, true),
    bulkUnpublish: (ids) => Api.post('/api/admin/blogs/bulk/unpublish', { ids }, true),
    bulkDelete: (ids) => Api.post('/api/admin/blogs/bulk/delete', { ids }, true),
    uploadImage: (file) => Api.upload('/api/admin/upload/image', file, true)
};

// Freeze to prevent mutation
Object.freeze(Api);
Object.freeze(BlogsApi);
