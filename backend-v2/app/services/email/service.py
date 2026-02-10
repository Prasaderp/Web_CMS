"""
Production-grade async SMTP email service with retries and comprehensive logging.
"""
from __future__ import annotations

import logging
from datetime import datetime, timezone
from email.message import EmailMessage
from typing import Optional
import aiosmtplib
from tenacity import (
    retry,
    stop_after_attempt,
    wait_exponential,
    retry_if_exception_type,
    before_sleep_log,
    after_log,
)

from app.core.config import settings
from app.core.logging import get_logger
from app.services.email.models import ContactEmailPayload
from app.services.email.exceptions import ContactEmailDeliveryError
from app.services.email.templates import render_contact_notification

logger = get_logger(__name__)


class EmailService:
    """Production-grade async SMTP email service with retry logic."""

    @property
    def _from_address(self) -> str | None:
        """Get the sender email address from configuration."""
        configured = settings.CONTACT_NOTIFICATION_FROM
        if configured:
            return str(configured)

        username = settings.SMTP_USERNAME or ""
        if "@" in username:
            return username
        return None

    @property
    def is_configured(self) -> bool:
        """Check if SMTP is properly configured."""
        return bool(
            settings.SMTP_HOST
            and settings.SMTP_USERNAME
            and settings.SMTP_PASSWORD
            and self._from_address
            and settings.CONTACT_NOTIFICATION_TO
        )

    def _build_message(
        self, payload: ContactEmailPayload, timestamp: datetime
    ) -> EmailMessage:
        """Build email message with text and HTML content."""
        full_name = f"{payload.first_name} {payload.last_name}".strip()
        subject = (
            f"{settings.CONTACT_NOTIFICATION_SUBJECT_PREFIX} "
            f"New enquiry from {full_name}"
        ).replace("\r", " ").replace("\n", " ").strip()

        text_body, html_body = render_contact_notification(payload, timestamp)

        message = EmailMessage()
        message["Subject"] = subject
        message["From"] = self._from_address
        message["To"] = str(settings.CONTACT_NOTIFICATION_TO)
        message["Reply-To"] = payload.company_email
        message.set_content(text_body)
        message.add_alternative(html_body, subtype="html")
        
        return message

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        retry=retry_if_exception_type((
            aiosmtplib.SMTPConnectTimeoutError,
            aiosmtplib.SMTPConnectError,
            aiosmtplib.SMTPServerDisconnected,
            ConnectionError,
            TimeoutError,
            OSError,
        )),
        before_sleep=before_sleep_log(logger, logging.WARNING),
        after=after_log(logger, logging.INFO),
        reraise=True,
    )
    async def _send_with_retry(self, message: EmailMessage) -> None:
        """Send email with automatic retry on connection failures."""
        host = settings.SMTP_HOST
        port = settings.SMTP_PORT
        username = settings.SMTP_USERNAME
        password = settings.SMTP_PASSWORD
        timeout = settings.SMTP_TIMEOUT_SECONDS
        use_ssl = settings.SMTP_USE_SSL
        use_tls = settings.SMTP_USE_TLS

        smtp_kwargs = {
            "hostname": host,
            "port": port,
            "timeout": timeout,
            "use_tls": use_ssl,
        }

        try:
            async with aiosmtplib.SMTP(**smtp_kwargs) as smtp:
                if use_tls and not use_ssl:
                    await smtp.starttls()
                await smtp.login(username, password)
                await smtp.send_message(message)
        except (
            aiosmtplib.SMTPConnectTimeoutError,
            aiosmtplib.SMTPConnectError,
            aiosmtplib.SMTPServerDisconnected,
            ConnectionError,
            TimeoutError,
            OSError,
        ) as exc:
            logger.warning(
                f"SMTP connection error (will retry): {type(exc).__name__}: {exc}"
            )
            raise
        except aiosmtplib.SMTPAuthenticationError as exc:
            logger.error(
                f"SMTP authentication failed: {exc}",
                exc_info=True,
            )
            raise ContactEmailDeliveryError(
                "Failed to authenticate with SMTP server"
            ) from exc
        except Exception as exc:
            logger.error(
                f"SMTP unexpected error: {type(exc).__name__}: {exc}",
                exc_info=True,
            )
            raise ContactEmailDeliveryError(
                f"Failed to deliver email: {exc}"
            ) from exc

    async def send_contact_notification(self, payload: ContactEmailPayload) -> None:
        """
        Send contact notification email asynchronously with retries.
        
        Args:
            payload: ContactEmailPayload instance
            
        Raises:
            ContactEmailDeliveryError: If email cannot be delivered after retries
        """
        if not self.is_configured:
            logger.error(
                "Contact email delivery attempted but SMTP is not configured",
                extra={
                    "has_host": bool(settings.SMTP_HOST),
                    "has_username": bool(settings.SMTP_USERNAME),
                    "has_password": bool(settings.SMTP_PASSWORD),
                    "has_from": bool(self._from_address),
                    "has_to": bool(settings.CONTACT_NOTIFICATION_TO),
                },
            )
            raise ContactEmailDeliveryError(
                "Contact email notifications are not configured"
            )

        timestamp = datetime.now(timezone.utc)
        message = self._build_message(payload, timestamp)

        logger.info(
            f"Attempting to send contact notification email",
            extra={
                "to": str(settings.CONTACT_NOTIFICATION_TO),
                "from": self._from_address,
                "reply_to": payload.company_email,
                "subject": message["Subject"],
            },
        )

        try:
            await self._send_with_retry(message)
            logger.info(
                f"Contact notification email sent successfully",
                extra={
                    "to": str(settings.CONTACT_NOTIFICATION_TO),
                    "reply_to": payload.company_email,
                },
            )
        except (
            aiosmtplib.SMTPConnectTimeoutError,
            aiosmtplib.SMTPConnectError,
            aiosmtplib.SMTPServerDisconnected,
            ConnectionError,
            TimeoutError,
            OSError,
        ) as exc:
            logger.error(
                f"Contact email delivery failed after retries: {exc}",
                extra={
                    "to": str(settings.CONTACT_NOTIFICATION_TO),
                    "error_type": type(exc).__name__,
                },
                exc_info=True,
            )
            raise ContactEmailDeliveryError(
                "Failed to deliver contact notification after retries"
            ) from exc
        except ContactEmailDeliveryError:
            raise
        except Exception as exc:
            logger.error(
                f"Unexpected error during email delivery: {exc}",
                extra={
                    "to": str(settings.CONTACT_NOTIFICATION_TO),
                    "error_type": type(exc).__name__,
                },
                exc_info=True,
            )
            raise ContactEmailDeliveryError(
                "Failed to deliver contact notification"
            ) from exc


email_service = EmailService()
