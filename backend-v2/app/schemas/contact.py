from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, field_validator


class ContactSubmissionBase(BaseModel):
    firstName: str = Field(..., min_length=1, max_length=100)
    lastName: str = Field(..., min_length=1, max_length=100)
    companyEmail: EmailStr = Field(...)
    companyName: str = Field(..., min_length=1, max_length=200)
    jobTitle: str = Field(..., min_length=1, max_length=200)
    country: str = Field(..., min_length=1, max_length=100)
    comments: str = Field(..., min_length=1, max_length=500)
    phoneNumber: Optional[str] = Field(None, max_length=20)

    @field_validator("firstName", "lastName", "companyName", "jobTitle", "country", "comments", mode="before")
    @classmethod
    def strip_and_validate(cls, v: str) -> str:
        if not isinstance(v, str):
            raise ValueError("Must be a string")
        stripped = v.strip()
        if not stripped:
            raise ValueError("Field cannot be empty")
        return stripped

    @field_validator("phoneNumber", mode="before")
    @classmethod
    def normalize_phone(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return None
        stripped = v.strip()
        return stripped or None


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
