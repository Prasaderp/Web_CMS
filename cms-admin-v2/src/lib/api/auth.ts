/**
 * Authentication API methods.
 *
 * NOTE:
 * The auth login endpoint returns a flat `LoginResponse` from the backend,
 * not the generic `{ success, data }` envelope that `apiClient` expects.
 * To avoid brittle shape assumptions and runtime `undefined.token` errors,
 * we call the auth endpoint with a small dedicated fetch wrapper here.
 */
import type { LoginRequest, LoginResponse } from '@/types/auth';
import { API_URL } from '@/lib/config';

/**
 * Helper to set a cookie.
 */
function setCookie(name: string, value: string, days: number = 7): void {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

/**
 * Helper to delete a cookie.
 */
function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export const authApi = {
  /**
   * Login user and get JWT token.
   * Calls the backend `/api/auth/login` endpoint directly and returns the
   * typed `LoginResponse` object expected by the rest of the app.
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const text = await response.text();
    let json: unknown = null;

    if (text) {
      try {
        json = JSON.parse(text);
      } catch {
        throw new Error('Invalid login response from server');
      }
    }

    if (!response.ok) {
      // FastAPI error responses usually contain `detail`
      const maybeError = json as { detail?: string; error?: string } | null;
      const message =
        maybeError?.detail || maybeError?.error || 'Login failed';
      throw new Error(message);
    }

    const result = json as LoginResponse;

    // Defensive checks in case backend shape drifts.
    if (!result || typeof result.token !== 'string' || !result.user) {
      throw new Error('Unexpected login response from server');
    }

    return result;
  },

  /**
   * Save auth data to localStorage and cookie (for middleware).
   */
  saveAuth: (token: string, user: LoginResponse['user']) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    // Set cookie for middleware auth check
    setCookie('auth_token', token, 7);
  },

  /**
   * Clear auth data from localStorage and cookie.
   */
  clearAuth: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    deleteCookie('auth_token');
  },

  /**
   * Get stored user data.
   */
  getStoredUser: () => {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },
};

