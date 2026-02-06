/**
 * Blog API service.
 * Centralized API calls for blog data.
 */
import { config } from '../lib/config';

const DEFAULT_TIMEOUT_MS = 10000;

/**
 * Perform a JSON fetch with timeout and normalized error handling.
 *
 * @param {string} url
 * @param {RequestInit} [options]
 * @param {number} [timeoutMs]
 * @returns {Promise<unknown>}
 */
async function fetchJson(url, options = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        ...(options.headers || {}),
      },
    });

    const json = await response.json().catch(() => null);

    if (!response.ok) {
      const message = (json && json.error) || response.statusText || 'Request failed';
      throw new Error(message);
    }

    return json;
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

class BlogService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  /**
   * Get all blog page data (featured, latest, popular, categories).
   * Single optimized API call.
   */
  async getPageData() {
    try {
      const data = await fetchJson(`${this.baseURL}/api/blogs/page-data`);

      if (!data?.success) {
        throw new Error(data?.error || 'Failed to fetch page data');
      }

      return data.data;
    } catch (error) {
      console.error('BlogService.getPageData error:', error);
      throw error;
    }
  }

  /**
   * Get single blog by slug.
   *
   * @param {string} slug
   */
  async getBlogBySlug(slug) {
    try {
      const data = await fetchJson(`${this.baseURL}/api/blogs/${slug}`);

      if (!data?.success) {
        throw new Error(data?.error || 'Blog not found');
      }

      return data.data;
    } catch (error) {
      console.error(`BlogService.getBlogBySlug("${slug}") error:`, error);
      throw error;
    }
  }
}

// Singleton instance
export const blogService = new BlogService(config.API_URL);
