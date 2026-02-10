"""
Contact API routes (public, rate limited).
"""
from typing import Optional
from fastapi import APIRouter, Request, Depends, HTTPException, status, BackgroundTasks
from pydantic import BaseModel, EmailStr, Field, field_validator

from app.core.database import get_db
from app.core.logging import get_logger
from app.middleware.rate_limit import limiter
from app.schemas.responses import SuccessResponse
from app.services.email import (
    ContactEmailDeliveryError,
    ContactEmailPayload,
    email_service,
)

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

    @field_validator(
        "firstName",
        "lastName",
        "companyName",
        "jobTitle",
        "country",
        "comments",
        mode="before",
    )
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


async def _send_email_background(payload: ContactEmailPayload) -> None:
    """
    Background task to send contact notification email.
    Errors are logged but do not affect the API response.
    """
    try:
        await email_service.send_contact_notification(payload)
        logger.info(
            f"Contact notification email sent successfully in background",
            extra={"email": payload.company_email},
        )
    except ContactEmailDeliveryError as exc:
        logger.error(
            f"Contact notification email delivery failed in background: {exc}",
            extra={"email": payload.company_email},
            exc_info=True,
        )
    except Exception as exc:
        logger.error(
            f"Unexpected error sending contact notification email in background: {exc}",
            extra={"email": payload.company_email},
            exc_info=True,
        )


@router.post("", response_model=SuccessResponse)
@limiter.limit("5/minute")
async def submit_contact(
    request: Request,
    form_data: ContactFormRequest,
    background_tasks: BackgroundTasks,
    cursor=Depends(get_db),
):
    """
    Submit contact form. Email is sent asynchronously in background.
    Returns immediately after saving to database.
    """
    if not email_service.is_configured:
        logger.error("Contact submission rejected: SMTP configuration missing")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Contact service is temporarily unavailable. Please try again later.",
        )

    try:
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

        payload = ContactEmailPayload(
            first_name=form_data.firstName,
            last_name=form_data.lastName,
            company_email=str(form_data.companyEmail),
            company_name=form_data.companyName,
            job_title=form_data.jobTitle,
            phone_number=form_data.phoneNumber,
            country=form_data.country,
            comments=form_data.comments,
        )

        background_tasks.add_task(_send_email_background, payload)

        logger.info(
            f"Contact form submitted successfully",
            extra={"email": form_data.companyEmail},
        )
        return SuccessResponse(message="Contact form submitted successfully")
    except Exception as exc:
        logger.error(
            f"Failed to process contact form submission: {exc}",
            extra={"email": form_data.companyEmail},
            exc_info=True,
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to process your request. Please try again later.",
        ) from exc
