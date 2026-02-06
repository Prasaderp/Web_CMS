"""
Blog repository - handles all database operations for blogs.
Implements the Repository pattern to separate data access from business logic.
PostgreSQL compatible.
"""
from typing import List, Optional
import json
from datetime import datetime

from app.core.logging import get_logger
from app.schemas.blog import BlogCreate, BlogUpdate

logger = get_logger(__name__)


class BlogRepository:
    """Repository for blog CRUD operations."""
    
    def __init__(self, cursor):
        """
        Initialize repository with database cursor.
        
        Args:
            cursor: PostgreSQL cursor from dependency injection
        """
        self.cursor = cursor
    
    def _parse_json_fields(self, blog: dict) -> dict:
        """Parse JSON fields from database - PostgreSQL returns dicts for JSONB."""
        if not blog:
            return blog
        
        # Convert RealDictRow to regular dict if needed
        blog = dict(blog)
        
        # PostgreSQL JSONB returns as list/dict directly, no need to parse
        if blog.get("tags") is None:
            blog["tags"] = []
        elif isinstance(blog["tags"], str):
            try:
                blog["tags"] = json.loads(blog["tags"])
            except json.JSONDecodeError:
                blog["tags"] = []
        
        return blog
    
    def get_by_id(self, blog_id: int) -> Optional[dict]:
        """
        Retrieve blog by ID.
        
        Args:
            blog_id: Blog ID
            
        Returns:
            Blog dict or None if not found
        """
        self.cursor.execute(
            "SELECT * FROM blogs WHERE id = %s",
            (blog_id,)
        )
        blog = self.cursor.fetchone()
        return self._parse_json_fields(blog) if blog else None
    
    def get_by_slug(self, slug: str) -> Optional[dict]:
        """
        Retrieve published blog by slug.
        
        Args:
            slug: URL slug
            
        Returns:
            Blog dict or None if not found
        """
        self.cursor.execute(
            "SELECT * FROM blogs WHERE slug = %s AND published = TRUE",
            (slug,)
        )
        blog = self.cursor.fetchone()
        return self._parse_json_fields(blog) if blog else None
    
    def get_all(
        self,
        published_only: bool = False,
        limit: Optional[int] = None
    ) -> List[dict]:
        """
        Retrieve all blogs with optional filtering.
        
        Args:
            published_only: If True, only return published blogs
            limit: Maximum number of blogs to return
            
        Returns:
            List of blog dicts
        """
        query = "SELECT * FROM blogs"
        params = []
        
        if published_only:
            query += " WHERE published = TRUE"
        
        query += " ORDER BY created_at DESC"
        
        if limit:
            query += " LIMIT %s"
            params.append(limit)
        
        self.cursor.execute(query, tuple(params) if params else None)
        blogs = self.cursor.fetchall()
        
        return [self._parse_json_fields(blog) for blog in blogs]
    
    def get_featured(self) -> Optional[dict]:
        """
        Get the most recent featured blog.
        
        Returns:
            Featured blog dict or None
        """
        self.cursor.execute(
            """
            SELECT id, title, slug, excerpt, featured_image_url,
                   author_name, created_at, tags, category, read_time
            FROM blogs
            WHERE published = TRUE AND is_featured = TRUE
            ORDER BY created_at DESC
            LIMIT 1
            """
        )
        blog = self.cursor.fetchone()
        return self._parse_json_fields(blog) if blog else None
    
    def create(self, blog_data: BlogCreate) -> int:
        """
        Create a new blog.
        
        Args:
            blog_data: Blog creation data
            
        Returns:
            ID of created blog
        """
        # Calculate read time (avg 200 words per minute)
        word_count = len(blog_data.content.split())
        read_time = max(1, round(word_count / 200))
        
        # Prepare data - PostgreSQL JSONB accepts Python lists directly
        tags_json = json.dumps(blog_data.tags)
        
        # Use RETURNING to get the new ID (PostgreSQL way)
        query = """
            INSERT INTO blogs (
                title, content, excerpt, slug, category, tags,
                featured_image_url, author_name, author_bio, author_avatar_url,
                author_twitter, author_linkedin, author_facebook,
                author_instagram, author_github, author_website,
                cta_text, cta_url, cta_style, cta_position,
                published, is_featured, read_time
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
                %s, %s, %s
            )
            RETURNING id
        """
        
        params = (
            blog_data.title, blog_data.content, blog_data.excerpt,
            blog_data.slug, blog_data.category, tags_json,
            blog_data.featured_image_url, blog_data.author_name,
            blog_data.author_bio, blog_data.author_avatar_url,
            blog_data.author_twitter, blog_data.author_linkedin,
            blog_data.author_facebook, blog_data.author_instagram,
            blog_data.author_github, blog_data.author_website,
            blog_data.cta_text, blog_data.cta_url,
            blog_data.cta_style, blog_data.cta_position,
            blog_data.published, blog_data.is_featured, read_time
        )
        
        self.cursor.execute(query, params)
        result = self.cursor.fetchone()
        return result["id"] if result else 0
    
    def update(self, blog_id: int, blog_data: BlogUpdate) -> bool:
        """
        Update an existing blog.
        
        Args:
            blog_id: Blog ID to update
            blog_data: Updated blog data
            
        Returns:
            True if updated successfully
        """
        # Calculate read time
        word_count = len(blog_data.content.split())
        read_time = max(1, round(word_count / 200))
        
        tags_json = json.dumps(blog_data.tags)
        
        # PostgreSQL uses CURRENT_TIMESTAMP (trigger handles updated_at)
        query = """
            UPDATE blogs SET
                title = %s, content = %s, excerpt = %s, slug = %s,
                category = %s, tags = %s, featured_image_url = %s,
                author_name = %s, author_bio = %s, author_avatar_url = %s,
                author_twitter = %s, author_linkedin = %s,
                author_facebook = %s, author_instagram = %s,
                author_github = %s, author_website = %s,
                cta_text = %s, cta_url = %s, cta_style = %s,
                cta_position = %s, published = %s, is_featured = %s,
                read_time = %s
            WHERE id = %s
        """
        
        params = (
            blog_data.title, blog_data.content, blog_data.excerpt,
            blog_data.slug, blog_data.category, tags_json,
            blog_data.featured_image_url, blog_data.author_name,
            blog_data.author_bio, blog_data.author_avatar_url,
            blog_data.author_twitter, blog_data.author_linkedin,
            blog_data.author_facebook, blog_data.author_instagram,
            blog_data.author_github, blog_data.author_website,
            blog_data.cta_text, blog_data.cta_url,
            blog_data.cta_style, blog_data.cta_position,
            blog_data.published, blog_data.is_featured, read_time, blog_id
        )
        
        self.cursor.execute(query, params)
        return self.cursor.rowcount > 0
    
    def delete(self, blog_id: int) -> bool:
        """
        Delete a blog.
        
        Args:
            blog_id: Blog ID to delete
            
        Returns:
            True if deleted successfully
        """
        self.cursor.execute("DELETE FROM blogs WHERE id = %s", (blog_id,))
        return self.cursor.rowcount > 0
    
    def toggle_published(self, blog_id: int) -> Optional[bool]:
        """
        Toggle blog published status.
        
        Args:
            blog_id: Blog ID
            
        Returns:
            New published status, or None if blog not found
        """
        self.cursor.execute(
            "SELECT published FROM blogs WHERE id = %s",
            (blog_id,)
        )
        result = self.cursor.fetchone()
        if not result:
            return None
        
        new_status = not result["published"]
        self.cursor.execute(
            "UPDATE blogs SET published = %s WHERE id = %s",
            (new_status, blog_id)
        )
        return new_status
    
    def toggle_featured(self, blog_id: int) -> Optional[bool]:
        """
        Toggle blog featured status.
        
        Args:
            blog_id: Blog ID
            
        Returns:
            New featured status, or None if blog not found
        """
        self.cursor.execute(
            "SELECT is_featured FROM blogs WHERE id = %s",
            (blog_id,)
        )
        result = self.cursor.fetchone()
        if not result:
            return None
        
        new_status = not result["is_featured"]
        self.cursor.execute(
            "UPDATE blogs SET is_featured = %s WHERE id = %s",
            (new_status, blog_id)
        )
        return new_status
    
    def bulk_update_published(self, blog_ids: List[int], published: bool) -> int:
        """
        Bulk update published status.
        
        Args:
            blog_ids: List of blog IDs
            published: New published status
            
        Returns:
            Number of blogs updated
        """
        if not blog_ids:
            return 0
        
        placeholders = ','.join(['%s'] * len(blog_ids))
        query = f"UPDATE blogs SET published = %s WHERE id IN ({placeholders})"
        params = (published, *blog_ids)
        
        self.cursor.execute(query, params)
        return self.cursor.rowcount
    
    def bulk_delete(self, blog_ids: List[int]) -> int:
        """
        Bulk delete blogs.
        
        Args:
            blog_ids: List of blog IDs
            
        Returns:
            Number of blogs deleted
        """
        if not blog_ids:
            return 0
        
        placeholders = ','.join(['%s'] * len(blog_ids))
        query = f"DELETE FROM blogs WHERE id IN ({placeholders})"
        
        self.cursor.execute(query, tuple(blog_ids))
        return self.cursor.rowcount
