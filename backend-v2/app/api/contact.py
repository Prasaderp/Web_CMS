from fastapi import APIRouter, Request, Depends

from app.middleware.rate_limit import limiter
from app.schemas.responses import SuccessResponse
from app.schemas.contact import ContactSubmissionCreate
from app.services.contact_service import ContactService
from app.dependencies.contact import get_contact_service

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("", response_model=SuccessResponse)
@limiter.limit("5/minute")
async def submit_contact(
    request: Request,
    form_data: ContactSubmissionCreate,
    contact_service: ContactService = Depends(get_contact_service),
):
    contact_service.submit_contact_form(form_data)
    return SuccessResponse(message="Contact form submitted successfully")
