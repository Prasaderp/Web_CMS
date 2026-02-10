"""
Data models for email service.
"""
from dataclasses import dataclass
from typing import Optional


@dataclass(frozen=True)
class ContactEmailPayload:
    """Immutable payload for contact form email notifications."""
    first_name: str
    last_name: str
    company_email: str
    company_name: str
    job_title: str
    phone_number: Optional[str]
    country: str
    comments: str
