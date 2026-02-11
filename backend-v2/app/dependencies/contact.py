from fastapi import Depends

from app.core.database import get_db
from app.repositories.contact_repository import ContactRepository
from app.services.contact_service import ContactService


def get_contact_service(cursor=Depends(get_db)) -> ContactService:
    return ContactService(ContactRepository(cursor))
