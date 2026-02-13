"""
CSRF protection middleware.

For stateless JWT-based APIs consumed by SPAs on a different origin,
the JWT Bearer token already provides CSRF protection because:
  - It is sent via the Authorization header, NOT cookies.
  - Browsers do NOT automatically attach Authorization headers to
    cross-origin requests the way they attach cookies.

This middleware validates the Origin/Referer header on mutating requests
to ensure they originate from allowed origins. This is the recommended
CSRF defence for cross-origin APIs that do not use session cookies.

Reference: OWASP CSRF Prevention Cheat Sheet — Verifying Origin With
Standard Headers.
"""
from urllib.parse import urlparse

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse

from app.core.config import settings
from app.core.logging import get_logger

logger = get_logger(__name__)

# HTTP methods that mutate state
_UNSAFE_METHODS = frozenset({"POST", "PUT", "DELETE", "PATCH"})


class CSRFMiddleware(BaseHTTPMiddleware):
    """Validate Origin / Referer on state-changing requests."""

    async def dispatch(self, request: Request, call_next):
        if request.method in _UNSAFE_METHODS:
            origin = request.headers.get("origin")
            referer = request.headers.get("referer")

            # Extract the origin from Referer if Origin is not present
            request_origin = origin
            if not request_origin and referer:
                parsed = urlparse(referer)
                request_origin = f"{parsed.scheme}://{parsed.netloc}"

            # Allow requests with no origin info (server-to-server, curl, etc.)
            # Browsers always send Origin on cross-origin POST, so missing
            # origin means this is NOT a browser-initiated cross-site attack.
            if request_origin:
                allowed_origins = settings.cors_origins
                if request_origin not in allowed_origins:
                    logger.warning(
                        f"CSRF origin rejected | origin={request_origin} | "
                        f"path={request.url.path} | allowed={allowed_origins}"
                    )
                    return JSONResponse(
                        status_code=403,
                        content={"detail": "Cross-origin request not allowed"},
                    )

        return await call_next(request)
