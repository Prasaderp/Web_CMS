"""
Core configuration module using Pydantic Settings for type-safe environment variables.
All required configuration is validated at startup - fail fast on misconfiguration.
"""
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import EmailStr, field_validator, model_validator


class Settings(BaseSettings):
    """Application settings with validation."""
    
    # API Settings
    APP_NAME: str = "AiGENThix CMS API"
    APP_VERSION: str = "2.0.0"
    DEBUG: bool = False
    
    # Security - REQUIRED
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # CORS - stored as string, parsed to list via property
    # pydantic-settings v2.x requires JSON for List types, so we use string
    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:5173"
    
    # Database - REQUIRED
    DATABASE_URL: str
    
    # Redis Cache
    REDIS_URL: str | None = None
    CACHE_TTL: int = 300  # 5 minutes default
    
    # Cloudinary
    CLOUDINARY_CLOUD_NAME: str
    CLOUDINARY_API_KEY: str
    CLOUDINARY_API_SECRET: str
    
    # Rate Limiting
    RATE_LIMIT_ENABLED: bool = True
    RATE_LIMIT_PER_MINUTE: int = 60
    AUTH_RATE_LIMIT_PER_MINUTE: int = 5
    
    # Default Admin (optional - for first-time setup)
    ADMIN_EMAIL: str | None = None
    ADMIN_PASSWORD: str | None = None

    # SMTP Contact Notifications
    SMTP_HOST: str | None = None
    SMTP_PORT: int = 587
    SMTP_USERNAME: str | None = None
    SMTP_PASSWORD: str | None = None
    SMTP_USE_TLS: bool = True
    SMTP_USE_SSL: bool = False
    SMTP_TIMEOUT_SECONDS: int = 10
    CONTACT_NOTIFICATION_TO: EmailStr = "akankshasomvanshi@gmail.com"
    CONTACT_NOTIFICATION_FROM: EmailStr | None = None
    CONTACT_NOTIFICATION_SUBJECT_PREFIX: str = "[AiGENThix Contact]"
    
    # Internal: parsed CORS origins list
    _cors_origins_list: List[str] = []
    
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore"
    )
    
    @field_validator("SECRET_KEY")
    @classmethod
    def validate_secret_key(cls, v: str) -> str:
        """Ensure SECRET_KEY is strong."""
        if len(v) < 32:
            raise ValueError("SECRET_KEY must be at least 32 characters")
        return v

    @field_validator("SMTP_PORT")
    @classmethod
    def validate_smtp_port(cls, v: int) -> int:
        """Ensure SMTP port is valid."""
        if v < 1 or v > 65535:
            raise ValueError("SMTP_PORT must be between 1 and 65535")
        return v

    @field_validator("SMTP_TIMEOUT_SECONDS")
    @classmethod
    def validate_smtp_timeout(cls, v: int) -> int:
        """Ensure SMTP timeout is reasonable."""
        if v < 1 or v > 60:
            raise ValueError("SMTP_TIMEOUT_SECONDS must be between 1 and 60")
        return v
    
    @model_validator(mode="after")
    def parse_cors_origins(self) -> "Settings":
        """Parse CORS origins from comma-separated string to list."""
        if self.CORS_ORIGINS:
            self._cors_origins_list = [
                origin.strip() 
                for origin in self.CORS_ORIGINS.split(",") 
                if origin.strip()
            ]
        return self

    @model_validator(mode="after")
    def validate_smtp_security_mode(self) -> "Settings":
        """Prevent conflicting SMTP security modes."""
        if self.SMTP_USE_SSL and self.SMTP_USE_TLS:
            raise ValueError("SMTP_USE_SSL and SMTP_USE_TLS cannot both be true")
        return self
    
    @property
    def cors_origins(self) -> List[str]:
        """Get CORS origins as a list."""
        return self._cors_origins_list


# Singleton settings instance
settings = Settings()
