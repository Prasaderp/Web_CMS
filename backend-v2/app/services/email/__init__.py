"""
Email service package for SMTP contact notifications.
"""
from app.services.email.service import email_service
from app.services.email.models import ContactEmailPayload
from app.services.email.exceptions import ContactEmailDeliveryError

__all__ = [
    "email_service",
    "ContactEmailPayload",
    "ContactEmailDeliveryError",
]
