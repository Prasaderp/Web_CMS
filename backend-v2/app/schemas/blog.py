"""
Pydantic schemas for blog-related requests and responses.
All API boundaries use these schemas for validation.
"""
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, Field, field_validator
from slugify import slugify


class BlogBase(BaseModel):
    """Base blog fields shared across schemas."""
    title: str = Field(..., min_length=1, max_length=500)
    content: str = Field(..., min_length=1)
    excerpt: Optional[str] = Field(None, max_length=1000)
    slug: Optional[str] = Field(None, max_length=200)
    category: Optional[str] = Field(None, max_length=100)
    tags: List[str] = Field(default_factory=list)
    featured_image_url: Optional[str] = Field(None, max_length=500)
    
    # Author fields
    author_name: Optional[str] = Field(None, max_length=200)
    author_bio: Optional[str] = Field(None, max_length=1000)
    author_avatar_url: Optional[str] = Field(None, max_length=500)
    author_twitter: Optional[str] = Field(None, max_length=200)
    author_linkedin: Optional[str] = Field(None, max_length=200)
    author_facebook: Optional[str] = Field(None, max_length=200)
    author_instagram: Optional[str] = Field(None, max_length=200)
    author_github: Optional[str] = Field(None, max_length=200)
    author_website: Optional[str] = Field(None, max_length=200)
    
    # CTA fields
    cta_text: Optional[str] = Field(None, max_length=100)
    cta_url: Optional[str] = Field(None, max_length=500)
    cta_style: Optional[str] = Field("primary", max_length=50)
    cta_position: Optional[str] = Field("bottom", max_length=50)
    
    # Metadata
    published: bool = False
    is_featured: bool = False


class BlogCreate(BlogBase):
    """Schema for creating a new blog."""
    
    @field_validator("slug", mode="before")
    @classmethod
    def generate_slug(cls, v, info):
        """Auto-generate slug from title if not provided."""
        if v:
            return slugify(v)
        if "title" in info.data:
            return slugify(info.data["title"])
        return None


class BlogUpdate(BlogBase):
    """Schema for updating an existing blog."""
    title: Optional[str] = Field(None, min_length=1, max_length=500)
    content: Optional[str] = Field(None, min_length=1)


class BlogInDB(BlogBase):
    """Blog as stored in database."""
    id: int
    read_time: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class BlogPublic(BaseModel):
    """Public blog response (no sensitive fields)."""
    id: int
    title: str
    slug: str
    excerpt: Optional[str]
    content: str
    category: Optional[str]
    tags: List[str]
    featured_image_url: Optional[str]
    author_name: Optional[str]
    author_bio: Optional[str]
    author_avatar_url: Optional[str]
    author_twitter: Optional[str]
    author_linkedin: Optional[str]
    author_facebook: Optional[str]
    author_instagram: Optional[str]
    author_github: Optional[str]
    author_website: Optional[str]
    cta_text: Optional[str]
    cta_url: Optional[str]
    cta_style: Optional[str]
    cta_position: Optional[str]
    read_time: int
    published: bool
    is_featured: bool
    created_at: datetime
    updated_at: datetime


class BlogListItem(BaseModel):
    """Minimal blog info for list views."""
    id: int
    title: str
    slug: str
    excerpt: Optional[str]
    category: Optional[str]
    tags: List[str]
    featured_image_url: Optional[str]
    author_name: Optional[str]
    read_time: int
    published: bool
    is_featured: bool
    created_at: datetime


class BlogPageData(BaseModel):
    """Aggregated data for blog page (single API call)."""
    featured: Optional[BlogListItem]
    latest: List[BlogListItem]
    popular: List[BlogListItem]
    categories: List[dict]
