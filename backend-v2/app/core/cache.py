"""
Redis cache service with graceful fallback when Redis is unavailable.
"""
import json
from typing import Any, Optional
import redis
from app.core.config import settings
from app.core.logging import get_logger

logger = get_logger(__name__)


class CacheService:
    """Redis cache with fallback to no-op when unavailable."""
    
    def __init__(self):
        """Initialize Redis connection."""
        self._client: Optional[redis.Redis] = None
        self._available = False
        self._init_redis()
    
    def _init_redis(self) -> None:
        """Initialize Redis client."""
        if not settings.REDIS_URL:
            logger.warning("REDIS_URL not configured - caching disabled")
            return
        
        try:
            self._client = redis.from_url(
                settings.REDIS_URL,
                decode_responses=True,
                socket_connect_timeout=2
            )
            # Test connection
            self._client.ping()
            self._available = True
            logger.info("Redis cache initialized")
        except Exception as e:
            logger.warning(f"Redis unavailable: {e} - running without cache")
            self._client = None
            self._available = False
    
    def get(self, key: str) -> Optional[Any]:
        """
        Get value from cache.
        
        Args:
            key: Cache key
            
        Returns:
            Cached value or None if not found/unavailable
        """
        if not self._available or not self._client:
            return None
        
        try:
            data = self._client.get(key)
            if data:
                return json.loads(data)
            return None
        except Exception as e:
            logger.error(f"Cache get error for key {key}: {e}")
            return None
    
    def set(
        self,
        key: str,
        value: Any,
        ttl: int = settings.CACHE_TTL
    ) -> bool:
        """
        Set value in cache with TTL.
        
        Args:
            key: Cache key
            value: Value to cache (must be JSON serializable)
            ttl: Time to live in seconds
            
        Returns:
            True if successful, False otherwise
        """
        if not self._available or not self._client:
            return False
        
        try:
            self._client.setex(
                key,
                ttl,
                json.dumps(value)
            )
            return True
        except Exception as e:
            logger.error(f"Cache set error for key {key}: {e}")
            return False
    
    def delete(self, pattern: str) -> bool:
        """
        Delete keys matching pattern.
        
        Args:
            pattern: Key pattern (supports wildcards)
            
        Returns:
            True if successful, False otherwise
        """
        if not self._available or not self._client:
            return False
        
        try:
            keys = self._client.keys(pattern)
            if keys:
                self._client.delete(*keys)
            return True
        except Exception as e:
            logger.error(f"Cache delete error for pattern {pattern}: {e}")
            return False
    
    def invalidate_blog_cache(self) -> None:
        """Invalidate all blog-related cache keys."""
        self.delete("blog:*")
        logger.info("Blog cache invalidated")


# Singleton cache instance
cache_service = CacheService()
