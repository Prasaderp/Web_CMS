"""
Blog service - handles blog business logic.
Orchestrates between repositories and cache layer.
"""
from typing import List, Optional
from fastapi import HTTPException, status
from datetime import datetime

from app.core.cache import cache_service
from app.core.logging import get_logger
from app.repositories.blog_repository import BlogRepository
from app.schemas.blog import (
    BlogCreate, BlogUpdate, BlogPublic, BlogListItem, BlogPageData
)

logger = get_logger(__name__)


class BlogService:
    """Service for blog operations."""
    
    def __init__(self, blog_repo: BlogRepository):
        """
        Initialize blog service.
        
        Args:
            blog_repo: Blog repository instance
        """
        self.blog_repo = blog_repo
    
    def _blog_to_public(self, blog: dict) -> BlogPublic:
        """Convert database blog dict to public schema."""
        return BlogPublic(
            id=blog["id"],
            title=blog["title"],
            slug=blog["slug"],
            excerpt=blog.get("excerpt"),
            content=blog["content"],
            category=blog.get("category"),
            tags=blog.get("tags", []),
            featured_image_url=blog.get("featured_image_url"),
            author_name=blog.get("author_name"),
            author_bio=blog.get("author_bio"),
            author_avatar_url=blog.get("author_avatar_url"),
            author_twitter=blog.get("author_twitter"),
            author_linkedin=blog.get("author_linkedin"),
            author_facebook=blog.get("author_facebook"),
            author_instagram=blog.get("author_instagram"),
            author_github=blog.get("author_github"),
            author_website=blog.get("author_website"),
            cta_text=blog.get("cta_text"),
            cta_url=blog.get("cta_url"),
            cta_style=blog.get("cta_style"),
            cta_position=blog.get("cta_position"),
            read_time=blog.get("read_time", 0),
            published=blog.get("published", False),
            is_featured=blog.get("is_featured", False),
            created_at=blog["created_at"],
            updated_at=blog["updated_at"]
        )
    
    def _blog_to_list_item(self, blog: dict) -> BlogListItem:
        """Convert database blog dict to list item schema."""
        return BlogListItem(
            id=blog["id"],
            title=blog["title"],
            slug=blog["slug"],
            excerpt=blog.get("excerpt"),
            category=blog.get("category"),
            tags=blog.get("tags", []),
            featured_image_url=blog.get("featured_image_url"),
            author_name=blog.get("author_name"),
            read_time=blog.get("read_time", 0),
            published=blog.get("published", False),
            is_featured=blog.get("is_featured", False),
            created_at=blog["created_at"]
        )
    
    def get_blog_by_slug(self, slug: str) -> BlogPublic:
        """
        Get published blog by slug with caching.
        
        Args:
            slug: Blog URL slug
            
        Returns:
            BlogPublic schema
            
        Raises:
            HTTPException: If blog not found
        """
        # Try cache first
        cache_key = f"blog:slug:{slug}"
        cached = cache_service.get(cache_key)
        if cached:
            logger.debug(f"Cache hit for blog slug: {slug}")
            return BlogPublic(**cached)
        
        # Fetch from database
        blog = self.blog_repo.get_by_slug(slug)
        if not blog:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Blog not found"
            )
        
        blog_public = self._blog_to_public(blog)
        
        # Cache for 10 minutes
        cache_service.set(cache_key, blog_public.model_dump(), ttl=600)
        
        return blog_public
    
    def get_blog_by_id(self, blog_id: int) -> BlogPublic:
        """
        Get blog by ID (admin access).
        
        Args:
            blog_id: Blog ID
            
        Returns:
            BlogPublic schema
            
        Raises:
            HTTPException: If blog not found
        """
        blog = self.blog_repo.get_by_id(blog_id)
        if not blog:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Blog not found"
            )
        
        return self._blog_to_public(blog)
    
    def get_all_blogs(self, published_only: bool = False) -> List[BlogListItem]:
        """
        Get all blogs with optional filtering.
        
        Args:
            published_only: If True, only return published blogs
            
        Returns:
            List of BlogListItem
        """
        blogs = self.blog_repo.get_all(published_only=published_only)
        return [self._blog_to_list_item(blog) for blog in blogs]
    
    def get_page_data(self) -> BlogPageData:
        """
        Get aggregated blog page data (optimized single endpoint).
        Cached for 5 minutes.
        
        Returns:
            BlogPageData with featured, latest, popular, categories
        """
        # Try cache first
        cache_key = "blog:page_data"
        cached = cache_service.get(cache_key)
        if cached:
            logger.debug("Cache hit for blog page data")
            return BlogPageData(**cached)
        
        # Get featured blog
        featured_dict = self.blog_repo.get_featured()
        featured = self._blog_to_list_item(featured_dict) if featured_dict else None
        
        # Get latest blogs
        latest_blogs = self.blog_repo.get_all(published_only=True, limit=6)
        latest = [self._blog_to_list_item(blog) for blog in latest_blogs]
        
        # For now, popular = latest (can add view count later)
        popular = latest
        
        # Categories (empty for now - can add categories table)
        categories = []
        
        page_data = BlogPageData(
            featured=featured,
            latest=latest,
            popular=popular,
            categories=categories
        )
        
        # Cache for 5 minutes
        cache_service.set(cache_key, page_data.model_dump(), ttl=300)
        
        return page_data
    
    def create_blog(self, blog_data: BlogCreate) -> dict:
        """
        Create a new blog.
        
        Args:
            blog_data: Blog creation data
            
        Returns:
            Dict with blog_id and slug
        """
        # Check for slug uniqueness
        existing = self.blog_repo.get_by_slug(blog_data.slug)
        if existing:
            # Append timestamp to make unique
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            blog_data.slug = f"{blog_data.slug}-{timestamp}"
        
        blog_id = self.blog_repo.create(blog_data)
        
        # Invalidate cache
        cache_service.invalidate_blog_cache()
        
        logger.info(f"Created blog: {blog_id} - {blog_data.title}")
        
        return {"id": blog_id, "slug": blog_data.slug}
    
    def update_blog(self, blog_id: int, blog_data: BlogUpdate) -> dict:
        """
        Update an existing blog.
        
        Args:
            blog_id: Blog ID to update
            blog_data: Updated blog data
            
        Returns:
            Dict with slug
            
        Raises:
            HTTPException: If blog not found
        """
        # Verify blog exists
        existing = self.blog_repo.get_by_id(blog_id)
        if not existing:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Blog not found"
            )
        
        # Update
        success = self.blog_repo.update(blog_id, blog_data)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to update blog"
            )
        
        # Invalidate cache
        cache_service.invalidate_blog_cache()
        
        logger.info(f"Updated blog: {blog_id}")
        
        return {"slug": blog_data.slug}
    
    def delete_blog(self, blog_id: int) -> None:
        """
        Delete a blog.
        
        Args:
            blog_id: Blog ID to delete
            
        Raises:
            HTTPException: If blog not found
        """
        success = self.blog_repo.delete(blog_id)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Blog not found"
            )
        
        # Invalidate cache
        cache_service.invalidate_blog_cache()
        
        logger.info(f"Deleted blog: {blog_id}")
    
    def toggle_published(self, blog_id: int) -> bool:
        """
        Toggle blog published status.
        
        Args:
            blog_id: Blog ID
            
        Returns:
            New published status
            
        Raises:
            HTTPException: If blog not found
        """
        new_status = self.blog_repo.toggle_published(blog_id)
        if new_status is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Blog not found"
            )
        cache_service.invalidate_blog_cache()
        logger.info(f"Toggled published for blog {blog_id}: {new_status}")
        return new_status
    
    def toggle_featured(self, blog_id: int) -> bool:
        """
        Toggle blog featured status.
        
        Args:
            blog_id: Blog ID
            
        Returns:
            New featured status
            
        Raises:
            HTTPException: If blog not found
        """
        new_status = self.blog_repo.toggle_featured(blog_id)
        if new_status is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Blog not found"
            )
        cache_service.invalidate_blog_cache()
        logger.info(f"Toggled featured for blog {blog_id}: {new_status}")
        return new_status
    
    def bulk_publish(self, blog_ids: List[int]) -> int:
        """Bulk publish blogs."""
        count = self.blog_repo.bulk_update_published(blog_ids, True)
        cache_service.invalidate_blog_cache()
        logger.info(f"Bulk published {count} blogs")
        return count
    
    def bulk_unpublish(self, blog_ids: List[int]) -> int:
        """Bulk unpublish blogs."""
        count = self.blog_repo.bulk_update_published(blog_ids, False)
        cache_service.invalidate_blog_cache()
        logger.info(f"Bulk unpublished {count} blogs")
        return count
    
    def bulk_delete(self, blog_ids: List[int]) -> int:
        """Bulk delete blogs."""
        count = self.blog_repo.bulk_delete(blog_ids)
        cache_service.invalidate_blog_cache()
        logger.info(f"Bulk deleted {count} blogs")
        return count
