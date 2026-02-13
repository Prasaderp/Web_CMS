"""
Pydantic schemas for authentication requests and responses.
"""
from pydantic import BaseModel, EmailStr, Field


class LoginRequest(BaseModel):
    """Login request schema."""
    email: EmailStr
    password: str = Field(..., min_length=6)


class TokenResponse(BaseModel):
    """JWT token response."""
    access_token: str
    token_type: str = "bearer"


class UserPublic(BaseModel):
    """Public user information."""
    id: int
    email: str
    name: str


class LoginResponse(BaseModel):
    """Complete login response."""
    success: bool
    token: str
    user: UserPublic
