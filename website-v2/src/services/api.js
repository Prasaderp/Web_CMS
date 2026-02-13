/**
 * Core API Client.
 * Centralizes duplicate fetch logic, error handling, and configuration.
 * Adheres to DRY and defensive programming principles.
 */
import { config } from '../lib/config';

// Default timeout for all API requests
const DEFAULT_TIMEOUT_MS = 15000;

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL || config.API_URL;
  }

  /**
   * Generic fetch wrapper with timeout, error handling, and type safety.
   * 
   * @param {string} endpoint - API endpoint (e.g., '/api/blogs')
   * @param {RequestInit} [options] - Fetch options
   * @param {number} [timeoutMs] - Custom timeout in milliseconds
   * @returns {Promise<any>} - JSON response
   * @throws {Error} - Structured error message
   */
  async request(endpoint, options = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
    const url = `${this.baseURL}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const config = {
      ...options,
      signal: controller.signal,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      // Parse JSON safely
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        // Extract meaningful error message
        const errorMessage = data?.error || data?.detail || response.statusText || 'Unknown API Error';
        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error(`Request timed out after ${timeoutMs}ms`);
      }
      // Re-throw with clear context, avoid swallowing errors
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * GET request wrapper
   */
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  /**
   * POST request wrapper
   */
  async post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  /**
   * PUT request wrapper
   */
  async put(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  /**
   * DELETE request wrapper
   */
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

// Singleton instance for global use
export const apiClient = new ApiClient(config.API_URL);
