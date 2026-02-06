/**
 * API client with typed methods and centralized error handling.
 * All network requests for the CMS admin go through this module.
 */
import type { ApiResponse } from '@/types/api';
import { API_URL, DEFAULT_API_TIMEOUT_MS } from '@/lib/config';

/**
 * Get auth token from localStorage.
 */
function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

/**
 * HTTP client configuration.
 */
interface RequestConfig extends RequestInit {
  requiresAuth?: boolean;
}

/**
 * Error type used for all API failures so callers can choose whether to
 * surface `message` directly or map to a generic user-facing error.
 */
export class ApiError extends Error {
  public readonly status?: number;
  public readonly endpoint: string;

  constructor(message: string, options: { status?: number; endpoint: string }) {
    super(message);
    this.name = 'ApiError';
    this.status = options.status;
    this.endpoint = options.endpoint;
  }
}

/**
 * Make an authenticated API request.
 */
async function request<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> {
  const { requiresAuth = false, headers = {}, signal, ...restConfig } = config;

  // Normalize to a concrete Headers instance so we can safely mutate.
  const requestHeaders = new Headers(headers as HeadersInit);
  requestHeaders.set('Content-Type', 'application/json');

  // Add auth token if required
  if (requiresAuth) {
    const token = getToken();
    if (token) {
      requestHeaders.set('Authorization', `Bearer ${token}`);
    }
  }

  // Enforce a hard timeout so the UI never waits indefinitely.
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    DEFAULT_API_TIMEOUT_MS
  );

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...restConfig,
      headers: requestHeaders,
      signal: signal ?? controller.signal,
    });

    // Attempt to parse JSON, but handle empty bodies (204) gracefully.
    let data: ApiResponse<T> | null = null;
    const text = await response.text();
    if (text) {
      try {
        data = JSON.parse(text) as ApiResponse<T>;
      } catch {
        // Non‑JSON response from a JSON endpoint is treated as a server error.
        throw new ApiError('Invalid server response', {
          status: response.status,
          endpoint,
        });
      }
    }

    if (!response.ok) {
      const message =
        (data && 'error' in data && data.error) ||
        `Request failed with status ${response.status}`;
      throw new ApiError(message, { status: response.status, endpoint });
    }

    if (!data) {
      // Successful status with no body; this is unexpected for our JSON APIs.
      throw new ApiError('Empty response from server', {
        status: response.status,
        endpoint,
      });
    }

    if (data.success === false) {
      throw new ApiError(data.error || 'API error', {
        status: response.status,
        endpoint,
      });
    }

    return data.data;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error(`API Timeout [${endpoint}]`);
      throw new ApiError('Request timed out. Please try again.', {
        endpoint,
      });
    }

    if (error instanceof ApiError) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }

    console.error(`Network Error [${endpoint}]:`, error);
    throw new ApiError('Network error. Please check your connection.', {
      endpoint,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * API client with typed methods.
 */
export const apiClient = {
  /**
   * GET request.
   */
  get: <T>(endpoint: string, requiresAuth = false) =>
    request<T>(endpoint, { method: 'GET', requiresAuth }),

  /**
   * POST request.
   */
  post: <T>(endpoint: string, data: any, requiresAuth = false) =>
    request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      requiresAuth,
    }),

  /**
   * PUT request.
   */
  put: <T>(endpoint: string, data: any, requiresAuth = false) =>
    request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      requiresAuth,
    }),

  /**
   * PATCH request.
   */
  patch: <T>(endpoint: string, data?: any, requiresAuth = false) =>
    request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      requiresAuth,
    }),

  /**
   * DELETE request.
   */
  delete: <T>(endpoint: string, requiresAuth = false) =>
    request<T>(endpoint, { method: 'DELETE', requiresAuth }),

  /**
   * Upload file (multipart/form-data).
   */
  upload: async <T>(endpoint: string, file: File, requiresAuth = true): Promise<T> => {
    const token = getToken();
    const formData = new FormData();
    formData.append('file', file);

    const headers = new Headers();
    if (requiresAuth && token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      DEFAULT_API_TIMEOUT_MS
    );

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData,
        signal: controller.signal,
      });

      const text = await response.text();
      let data: ApiResponse<T> | null = null;

      if (text) {
        try {
          data = JSON.parse(text) as ApiResponse<T>;
        } catch {
          throw new ApiError('Invalid server response', {
            status: response.status,
            endpoint,
          });
        }
      }

      if (!response.ok || !data) {
        const message =
          (data && 'error' in data && data.error) || 'Upload failed';
        throw new ApiError(message, { status: response.status, endpoint });
      }

      if (data.success === false) {
        throw new ApiError(data.error || 'Upload failed', {
          status: response.status,
          endpoint,
        });
      }

      return data.data;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.error(`API Timeout [${endpoint}]`);
        throw new ApiError('Upload timed out. Please try again.', {
          endpoint,
        });
      }

      if (error instanceof ApiError) {
        console.error(`API Error [${endpoint}]:`, error);
        throw error;
      }

      console.error(`Network Error [${endpoint}]:`, error);
      throw new ApiError('Network error during upload.', { endpoint });
    } finally {
      clearTimeout(timeoutId);
    }
  },
};
