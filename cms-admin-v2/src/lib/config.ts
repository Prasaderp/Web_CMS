/**
 * Global frontend configuration.
 *
 * Centralises environment-derived values so we have a single source of truth
 * and can add validation/logging in one place if needed.
 */
const FALLBACK_API_URL = 'http://localhost:8000';

/**
 * Base API URL for all CMS admin requests.
 *
 * - In production, this should be provided via `NEXT_PUBLIC_API_URL`
 * - In local development, we fall back to the FastAPI default port
 */
export const API_URL: string =
  process.env.NEXT_PUBLIC_API_URL?.trim() || FALLBACK_API_URL;

/**
 * Default network timeout for API requests (in milliseconds).
 *
 * This is intentionally conservative to avoid hanging UIs while still
 * accommodating slightly slow responses in lower environments.
 */
export const DEFAULT_API_TIMEOUT_MS = 15000;

