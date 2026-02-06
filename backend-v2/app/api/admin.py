"""
Admin blog API routes (authentication required).
"""
from typing import List
from fastapi import APIRouter, Depends, UploadFile, File

from app.core.database import get_db
from app.middleware.auth import get_current_user
from app.repositories.blog_repository import BlogRepository
from app.services.blog_service import BlogService
from app.services.upload_service import upload_service
from app.schemas.blog import BlogCreate, BlogUpdate, BlogPublic, BlogListItem
from app.schemas.responses import SuccessResponse
from pydantic import BaseModel

router = APIRouter(prefix="/api/admin", tags=["admin"])


class BulkActionRequest(BaseModel):
    """Request schema for bulk actions."""
    ids: List[int]


@router.get("/blogs", response_model=SuccessResponse[List[BlogListItem]])
async def get_all_blogs(
    cursor = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Get all blogs for admin dashboard (including unpublished)."""
    blog_repo = BlogRepository(cursor)
    blog_service = BlogService(blog_repo)
    
    blogs = blog_service.get_all_blogs(published_only=False)
    return SuccessResponse(data=blogs)


@router.get("/blogs/{blog_id}", response_model=SuccessResponse[BlogPublic])
async def get_blog(
    blog_id: int,
    cursor = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Get a single blog by ID (admin access)."""
    blog_repo = BlogRepository(cursor)
    blog_service = BlogService(blog_repo)
    
    blog = blog_service.get_blog_by_id(blog_id)
    return SuccessResponse(data=blog)


@router.post("/blogs", response_model=SuccessResponse[dict])
async def create_blog(
    blog_data: BlogCreate,
    cursor = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Create a new blog."""
    blog_repo = BlogRepository(cursor)
    blog_service = BlogService(blog_repo)
    
    result = blog_service.create_blog(blog_data)
    return SuccessResponse(data=result, message="Blog created successfully")


@router.put("/blogs/{blog_id}", response_model=SuccessResponse[dict])
async def update_blog(
    blog_id: int,
    blog_data: BlogUpdate,
    cursor = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Update an existing blog."""
    blog_repo = BlogRepository(cursor)
    blog_service = BlogService(blog_repo)
    
    result = blog_service.update_blog(blog_id, blog_data)
    return SuccessResponse(data=result, message="Blog updated successfully")


@router.delete("/blogs/{blog_id}", response_model=SuccessResponse)
async def delete_blog(
    blog_id: int,
    cursor = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Delete a blog."""
    blog_repo = BlogRepository(cursor)
    blog_service = BlogService(blog_repo)
    
    blog_service.delete_blog(blog_id)
    return SuccessResponse(message="Blog deleted successfully")


@router.patch("/blogs/{blog_id}/publish", response_model=SuccessResponse[dict])
async def toggle_publish(
    blog_id: int,
    cursor = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Toggle blog published status."""
    blog_repo = BlogRepository(cursor)
    blog_service = BlogService(blog_repo)
    
    new_status = blog_service.toggle_published(blog_id)
    return SuccessResponse(
        data={"published": new_status},
        message=f"Blog {'published' if new_status else 'unpublished'}"
    )


@router.patch("/blogs/{blog_id}/featured", response_model=SuccessResponse[dict])
async def toggle_featured(
    blog_id: int,
    cursor = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Toggle blog featured status."""
    blog_repo = BlogRepository(cursor)
    blog_service = BlogService(blog_repo)
    
    new_status = blog_service.toggle_featured(blog_id)
    return SuccessResponse(
        data={"is_featured": new_status},
        message=f"Blog {'featured' if new_status else 'unfeatured'}"
    )


@router.post("/blogs/bulk/publish", response_model=SuccessResponse[dict])
async def bulk_publish(
    request: BulkActionRequest,
    cursor = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Bulk publish blogs."""
    blog_repo = BlogRepository(cursor)
    blog_service = BlogService(blog_repo)
    
    count = blog_service.bulk_publish(request.ids)
    return SuccessResponse(
        data={"affected": count},
        message=f"Published {count} blogs"
    )


@router.post("/blogs/bulk/unpublish", response_model=SuccessResponse[dict])
async def bulk_unpublish(
    request: BulkActionRequest,
    cursor = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Bulk unpublish blogs."""
    blog_repo = BlogRepository(cursor)
    blog_service = BlogService(blog_repo)
    
    count = blog_service.bulk_unpublish(request.ids)
    return SuccessResponse(
        data={"affected": count},
        message=f"Unpublished {count} blogs"
    )


@router.post("/blogs/bulk/delete", response_model=SuccessResponse[dict])
async def bulk_delete(
    request: BulkActionRequest,
    cursor = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Bulk delete blogs."""
    blog_repo = BlogRepository(cursor)
    blog_service = BlogService(blog_repo)
    
    count = blog_service.bulk_delete(request.ids)
    return SuccessResponse(
        data={"affected": count},
        message=f"Deleted {count} blogs"
    )


@router.post("/upload/image", response_model=SuccessResponse[dict])
async def upload_image(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    """Upload an image to Cloudinary."""
    url = await upload_service.upload_image(file)
    return SuccessResponse(
        data={"url": url},
        message="Image uploaded successfully"
    )
