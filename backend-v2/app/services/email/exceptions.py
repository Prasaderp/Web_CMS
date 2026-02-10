"""
Custom exceptions for email service.
"""


class ContactEmailDeliveryError(Exception):
    """Raised when contact notification email cannot be delivered."""
    pass
