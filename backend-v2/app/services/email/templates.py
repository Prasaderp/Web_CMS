"""
Jinja2 template rendering for email content.
"""
from pathlib import Path
from jinja2 import Environment, FileSystemLoader, select_autoescape
from datetime import datetime, timezone

from app.core.logging import get_logger

logger = get_logger(__name__)


def _get_template_dir() -> Path:
    """Get the templates directory path."""
    base_dir = Path(__file__).parent.parent.parent.parent
    template_dir = base_dir / "templates" / "email"
    template_dir.mkdir(parents=True, exist_ok=True)
    return template_dir


def _create_jinja_env() -> Environment:
    """Create and configure Jinja2 environment."""
    template_dir = _get_template_dir()
    env = Environment(
        loader=FileSystemLoader(str(template_dir)),
        autoescape=select_autoescape(["html", "xml"]),
        trim_blocks=True,
        lstrip_blocks=True,
    )
    return env


_jinja_env = _create_jinja_env()


def render_contact_notification(payload, timestamp: datetime) -> tuple[str, str]:
    """
    Render contact notification email content.
    
    Args:
        payload: ContactEmailPayload instance
        timestamp: UTC datetime for submission time
        
    Returns:
        Tuple of (text_body, html_body)
    """
    try:
        template = _jinja_env.get_template("contact_notification.html")
        full_name = f"{payload.first_name} {payload.last_name}".strip()
        timestamp_str = timestamp.strftime("%Y-%m-%d %H:%M:%S UTC")
        
        context = {
            "full_name": full_name,
            "email": payload.company_email,
            "company": payload.company_name,
            "job_title": payload.job_title,
            "phone": payload.phone_number or "Not provided",
            "country": payload.country,
            "timestamp": timestamp_str,
            "comments": payload.comments,
        }
        
        html_body = template.render(**context)
        
        text_body = (
            "New contact form submission\n\n"
            f"Name: {full_name}\n"
            f"Email: {payload.company_email}\n"
            f"Company: {payload.company_name}\n"
            f"Job title: {payload.job_title}\n"
            f"Phone number: {payload.phone_number or 'Not provided'}\n"
            f"Country: {payload.country}\n"
            f"Submitted at: {timestamp_str}\n\n"
            "Comments:\n"
            f"{payload.comments}\n"
        )
        
        return text_body, html_body
    except Exception as exc:
        logger.error(f"Failed to render email template: {exc}")
        raise
