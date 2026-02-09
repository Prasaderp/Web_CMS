"""
Public blog API routes (no authentication required).
"""
from fastapi import APIRouter, Depends

from app.dependencies import get_blog_service
from app.schemas.blog import BlogPublic, BlogPageData
from app.schemas.responses import SuccessResponse
from app.services.blog_service import BlogService

router = APIRouter(prefix="/api/blogs", tags=["blogs"])


@router.get("/page-data", response_model=SuccessResponse[BlogPageData])
def get_blog_page_data(blog_service: BlogService = Depends(get_blog_service)):
    """
    Get all blog page data in a single optimized request.
    Includes: featured blog, latest blogs, popular blogs, categories.
    Cached for 5 minutes.
    """
    data = blog_service.get_page_data()
    return SuccessResponse(data=data)


@router.get("/{slug}", response_model=SuccessResponse[BlogPublic])
def get_blog_by_slug(slug: str, blog_service: BlogService = Depends(get_blog_service)):
    """
    Get a single published blog by slug.
    Cached for 10 minutes.
    """
    blog = blog_service.get_blog_by_slug(slug)
    return SuccessResponse(data=blog)
