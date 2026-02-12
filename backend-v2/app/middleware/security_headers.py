"""
Security headers middleware.

Adds standard browser security headers to every response.
These headers are tuned for a **JSON API** — not for an HTML-serving app.
"""
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """Attach hardened security headers to every HTTP response."""

    async def dispatch(self, request: Request, call_next):
        response: Response = await call_next(request)

        # Force HTTPS for 2 years + preload
        response.headers["Strict-Transport-Security"] = (
            "max-age=63072000; includeSubDomains; preload"
        )
        # Prevent MIME-type sniffing
        response.headers["X-Content-Type-Options"] = "nosniff"
        # Prevent clickjacking
        response.headers["X-Frame-Options"] = "DENY"
        # Disable legacy XSS filter (causes more harm than good)
        response.headers["X-XSS-Protection"] = "0"
        # Referrer policy
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        # Feature policy
        response.headers["Permissions-Policy"] = (
            "camera=(), microphone=(), geolocation=()"
        )

        # NOTE: Content-Security-Policy is omitted intentionally.
        # This is a JSON API that does not serve HTML pages.
        # CSP only applies to documents rendered by the browser; setting
        # `default-src 'self'` on JSON responses is a no-op at best and
        # can cause confusing issues at worst.

        return response
