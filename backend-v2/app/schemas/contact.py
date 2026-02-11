from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, field_validator


class ContactSubmissionBase(BaseModel):
    firstName: str = Field(..., min_length=1, max_length=100)
    lastName: str = Field(..., min_length=1, max_length=100)
    companyEmail: EmailStr
    companyName: str = Field(..., min_length=1, max_length=200)
    jobTitle: str = Field(..., min_length=1, max_length=200)
    country: str = Field(..., min_length=1, max_length=100)
    comments: str = Field(..., min_length=1, max_length=500)
    phoneNumber: Optional[str] = Field(None, max_length=20)

    @field_validator("firstName", "lastName", "companyName", "jobTitle", "country", "comments", mode="before")
    @classmethod
    def validate_required_text(cls, value: str) -> str:
        if not isinstance(value, str):
            raise ValueError("Must be a string")
        normalized = value.strip()
        if not normalized:
            raise ValueError("Field cannot be empty")
        return normalized

    @field_validator("phoneNumber", mode="before")
    @classmethod
    def normalize_phone_number(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return None
        normalized = value.strip()
        return normalized or None


class ContactSubmissionCreate(ContactSubmissionBase):
    pass


class ContactSubmissionResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    company_name: str
    job_title: str
    phone_number: Optional[str]
    country: str
    comments: str
    created_at: datetime

    class Config:
        from_attributes = True
