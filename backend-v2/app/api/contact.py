"""
Contact API routes (public, rate limited).
"""
from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel, EmailStr, Field
from typing import Optional

from app.core.database import get_db
from app.core.logging import get_logger
from app.middleware.rate_limit import limiter
from app.schemas.responses import SuccessResponse

logger = get_logger(__name__)

router = APIRouter(prefix="/api/contact", tags=["contact"])


class ContactFormRequest(BaseModel):
    firstName: str = Field(..., min_length=1, max_length=100)
    lastName: str = Field(..., min_length=1, max_length=100)
    companyEmail: EmailStr
    companyName: str = Field(..., min_length=1, max_length=200)
    jobTitle: str = Field(..., min_length=1, max_length=200)
    phoneNumber: Optional[str] = Field(None, max_length=20)
    country: str = Field(..., min_length=1, max_length=100)
    comments: str = Field(..., min_length=1, max_length=500)


@router.post("", response_model=SuccessResponse)
@limiter.limit("5/minute")
def submit_contact(
    request: Request,
    form_data: ContactFormRequest,
    cursor=Depends(get_db),
):
    cursor.execute(
        """
        INSERT INTO contact_submissions
            (first_name, last_name, email, company_name, job_title,
             phone_number, country, comments)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (
            form_data.firstName,
            form_data.lastName,
            form_data.companyEmail,
            form_data.companyName,
            form_data.jobTitle,
            form_data.phoneNumber,
            form_data.country,
            form_data.comments,
        ),
    )
    logger.info(f"Contact form submitted: {form_data.companyEmail}")
    return SuccessResponse(message="Contact form submitted successfully")
