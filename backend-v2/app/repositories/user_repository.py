"""
User repository - handles all database operations for users.
PostgreSQL compatible.
"""
from typing import Optional

from app.core.logging import get_logger

logger = get_logger(__name__)


class UserRepository:
    """Repository for user CRUD operations."""
    
    def __init__(self, cursor):
        """
        Initialize repository with database cursor.
        
        Args:
            cursor: PostgreSQL cursor from dependency injection
        """
        self.cursor = cursor
    
    def get_by_email(self, email: str) -> Optional[dict]:
        """
        Retrieve user by email.
        
        Args:
            email: User email address
            
        Returns:
            User dict or None if not found
        """
        self.cursor.execute(
            "SELECT * FROM users WHERE email = %s",
            (email,)
        )
        result = self.cursor.fetchone()
        return dict(result) if result else None
    
    def get_by_id(self, user_id: int) -> Optional[dict]:
        """
        Retrieve user by ID.
        
        Args:
            user_id: User ID
            
        Returns:
            User dict or None if not found
        """
        self.cursor.execute(
            "SELECT * FROM users WHERE id = %s",
            (user_id,)
        )
        result = self.cursor.fetchone()
        return dict(result) if result else None
    
    def create(self, email: str, name: str, password_hash: str) -> int:
        """
        Create a new user.
        
        Args:
            email: User email
            name: User name
            password_hash: Hashed password
            
        Returns:
            ID of created user
        """
        # Use RETURNING for PostgreSQL
        query = """
            INSERT INTO users (email, name, password_hash)
            VALUES (%s, %s, %s)
            RETURNING id
        """
        
        self.cursor.execute(query, (email, name, password_hash))
        result = self.cursor.fetchone()
        return result["id"] if result else 0
    
    def update_last_login(self, user_id: int) -> bool:
        """
        Update user's last login timestamp.
        
        Args:
            user_id: User ID
            
        Returns:
            True if updated
        """
        self.cursor.execute(
            "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = %s",
            (user_id,)
        )
        return self.cursor.rowcount > 0
