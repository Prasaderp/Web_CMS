import os
import cloudinary
import cloudinary.uploader
from fastapi import UploadFile, HTTPException, status

from app.core.config import settings
from app.core.logging import get_logger

logger = get_logger(__name__)

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True
)

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"}

MAGIC_BYTES = {
    b"\xff\xd8\xff": "jpeg",
    b"\x89\x50\x4e\x47\x0d\x0a\x1a\x0a": "png",
    b"\x47\x49\x46\x38": "gif",
    b"\x52\x49\x46\x46": "webp",
    b"<svg": "svg",
}


class UploadService:
    
    @staticmethod
    def _validate_magic_bytes(file_content: bytes) -> bool:
        for magic, file_type in MAGIC_BYTES.items():
            if file_content.startswith(magic):
                return True
        return False
    
    @staticmethod
    def _sanitize_filename(filename: str) -> str:
        filename = os.path.basename(filename)
        filename = filename.replace("..", "").replace("/", "").replace("\\", "")
        return filename
    
    @staticmethod
    async def upload_image(file: UploadFile) -> str:
        if not file.content_type or not file.content_type.startswith("image/"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File must be an image"
            )
        
        file_content = await file.read()
        
        if len(file_content) > 10 * 1024 * 1024:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File size must be less than 10MB"
            )
        
        if not UploadService._validate_magic_bytes(file_content):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid image file format"
            )
        
        filename = UploadService._sanitize_filename(file.filename or "upload")
        ext = os.path.splitext(filename)[1].lower()
        
        if ext not in ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File extension must be one of: {', '.join(ALLOWED_EXTENSIONS)}"
            )
        
        try:
            await file.seek(0)
            
            result = cloudinary.uploader.upload(
                file.file,
                folder="aigenthix/blogs",
                resource_type="auto"
            )
            
            logger.info(f"Image uploaded: {result.get('public_id')}")
            
            return result["secure_url"]
        except Exception as e:
            logger.error(f"Image upload failed: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to upload image"
            ) from e


upload_service = UploadService()
