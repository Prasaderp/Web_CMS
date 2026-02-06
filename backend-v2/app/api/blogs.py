"""
Public blog API routes (no authentication required).
"""
from fastapi import APIRouter, Depends

from app.core.database import get_db
from app.repositories.blog_repository import BlogRepository
from app.services.blog_service import BlogService
from app.schemas.blog import BlogPublic, BlogPageData
from app.schemas.responses import SuccessResponse

router = APIRouter(prefix="/api/blogs", tags=["blogs"])


@router.get("/page-data", response_model=SuccessResponse[BlogPageData])
async def get_blog_page_data(cursor = Depends(get_db)):
    """
    Get all blog page data in a single optimized request.
    Includes: featured blog, latest blogs, popular blogs, categories.
    Cached for 5 minutes.
    """
    blog_repo = BlogRepository(cursor)
    blog_service = BlogService(blog_repo)
    
    data = blog_service.get_page_data()
    return SuccessResponse(data=data)


@router.get("/{slug}", response_model=SuccessResponse[BlogPublic])
async def get_blog_by_slug(slug: str, cursor = Depends(get_db)):
    """
    Get a single published blog by slug.
    Cached for 10 minutes.
    """
    blog_repo = BlogRepository(cursor)
    blog_service = BlogService(blog_repo)
    
    blog = blog_service.get_blog_by_slug(slug)
    return SuccessResponse(data=blog)
