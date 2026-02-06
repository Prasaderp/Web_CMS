"""
Authentication service - handles authentication business logic.
Orchestrates between repositories and security utilities.
"""
from typing import Optional
from fastapi import HTTPException, status

from app.core.security import security_service
from app.core.logging import get_logger
from app.repositories.user_repository import UserRepository
from app.schemas.auth import LoginRequest, LoginResponse, UserPublic

logger = get_logger(__name__)


class AuthService:
    """Service for authentication operations."""
    
    def __init__(self, user_repo: UserRepository):
        """
        Initialize auth service.
        
        Args:
            user_repo: User repository instance
        """
        self.user_repo = user_repo
    
    def authenticate_user(self, login_data: LoginRequest) -> LoginResponse:
        """
        Authenticate user and generate token.
        
        Args:
            login_data: Login credentials
            
        Returns:
            LoginResponse with token and user info
            
        Raises:
            HTTPException: If credentials are invalid
        """
        # Find user by email
        user = self.user_repo.get_by_email(login_data.email)
        
        if not user:
            logger.warning(f"Login attempt for non-existent email: {login_data.email}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        # Verify password
        password_hash = user.get("password_hash") or user.get("password", "")
        
        if not security_service.verify_password(login_data.password, password_hash):
            logger.warning(f"Failed login attempt for user: {login_data.email}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        # Generate JWT token
        token = security_service.create_access_token({
            "sub": str(user["id"]),
            "email": user["email"]
        })
        
        logger.info(f"Successful login for user: {login_data.email}")
        
        return LoginResponse(
            success=True,
            token=token,
            user=UserPublic(
                id=user["id"],
                email=user["email"],
                name=user["name"]
            )
        )
    
    def verify_token(self, token: str) -> dict:
        """
        Verify JWT token and return payload.
        
        Args:
            token: JWT token string
            
        Returns:
            Token payload with user info
        """
        return security_service.decode_access_token(token)
