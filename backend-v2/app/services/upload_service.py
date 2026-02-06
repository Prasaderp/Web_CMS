"""
Upload service - handles file uploads to Cloudinary.
"""
import cloudinary
import cloudinary.uploader
from fastapi import UploadFile, HTTPException, status

from app.core.config import settings
from app.core.logging import get_logger

logger = get_logger(__name__)

# Configure Cloudinary
cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True
)


class UploadService:
    """Service for file uploads."""
    
    @staticmethod
    async def upload_image(file: UploadFile) -> str:
        """
        Upload image to Cloudinary.
        
        Args:
            file: Image file to upload
            
        Returns:
            Cloudinary secure URL
            
        Raises:
            HTTPException: If upload fails
        """
        # Validate file type
        if not file.content_type or not file.content_type.startswith("image/"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File must be an image"
            )
        
        # Validate file size (max 10MB)
        file_content = await file.read()
        if len(file_content) > 10 * 1024 * 1024:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File size must be less than 10MB"
            )
        
        try:
            # Reset file position
            await file.seek(0)
            
            # Upload to Cloudinary
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


# Singleton instance
upload_service = UploadService()
