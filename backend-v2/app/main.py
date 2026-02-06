"""
FastAPI application entry point.
Clean, minimal main file - all logic is in modules.
"""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi.errors import RateLimitExceeded

from app.core.config import settings
from app.core.logging import setup_logging, get_logger
from app.core.database import database
from app.core.cache import cache_service
from app.middleware.rate_limit import limiter
from app.schemas.responses import HealthCheckResponse, ErrorResponse

# API route imports
from app.api import auth, blogs, admin

# Setup logging
setup_logging()
logger = get_logger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None
)

# Add rate limiting
app.state.limiter = limiter


# CORS Middleware (strict - no wildcards)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["*"],
)


# Include routers
app.include_router(auth.router)
app.include_router(blogs.router)
app.include_router(admin.router)


# Health check endpoint
@app.get("/health", response_model=HealthCheckResponse)
async def health_check():
    """
    Health check endpoint for monitoring.
    Checks database and cache connectivity.
    """
    db_healthy = database.health_check()
    cache_healthy = cache_service._available
    
    return HealthCheckResponse(
        status="healthy" if db_healthy else "unhealthy",
        version=settings.APP_VERSION,
        database=db_healthy,
        cache=cache_healthy
    )


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Handle uncaught exceptions."""
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    
    return JSONResponse(
        status_code=500,
        content=ErrorResponse(
            error="Internal server error",
            detail=str(exc) if settings.DEBUG else "An unexpected error occurred"
        ).model_dump()
    )


# Rate limit exception handler
@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    """Handle rate limit exceeded."""
    return JSONResponse(
        status_code=429,
        content=ErrorResponse(
            error="Rate limit exceeded",
            detail="Too many requests. Please try again later."
        ).model_dump()
    )


# Startup event
@app.on_event("startup")
async def startup():
    """Initialize services on startup."""
    logger.info(f"Starting {settings.APP_NAME} v{settings.APP_VERSION}")
    logger.info(f"Environment: {'Development' if settings.DEBUG else 'Production'}")
    logger.info(f"CORS origins: {settings.cors_origins}")
    
    # Run database migrations
    from app.core.migrations import run_migrations, create_default_admin
    if not run_migrations():
        logger.warning("Database migrations failed - some features may not work")
    
    # Create default admin if configured and no users exist
    if settings.ADMIN_EMAIL and settings.ADMIN_PASSWORD:
        create_default_admin(settings.ADMIN_EMAIL, settings.ADMIN_PASSWORD)


# Shutdown event
@app.on_event("shutdown")
async def shutdown():
    """Cleanup on shutdown."""
    logger.info("Shutting down application")


# Root endpoint
@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG
    )
