import secrets
import hmac
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from fastapi import HTTPException

from app.core.config import settings


class CSRFMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        csrf_token = secrets.token_urlsafe(32)
        
        if request.method in ["POST", "PUT", "DELETE", "PATCH"]:
            if request.url.path.startswith("/api/admin"):
                token_from_header = request.headers.get("X-CSRF-Token")
                token_from_cookie = request.cookies.get("csrf_token")
                
                if not token_from_header or not token_from_cookie:
                    raise HTTPException(status_code=403, detail="CSRF token missing")
                
                if not hmac.compare_digest(token_from_header, token_from_cookie):
                    raise HTTPException(status_code=403, detail="CSRF token invalid")
        
        response = await call_next(request)
        
        response.set_cookie(
            key="csrf_token",
            value=csrf_token,
            httponly=False,
            secure=not settings.DEBUG,
            samesite="strict"
        )
        
        return response
