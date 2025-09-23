from typing import Annotated
from beanie import Document, Indexed
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime, timezone

from app.core.security import hash_password


class RefreshToken(BaseModel):
    token: str
    expires_at: datetime
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class User(Document):
    email: Annotated[EmailStr, Indexed(unique=True)]
    username: str
    password: str
    refresh_tokens: list[RefreshToken] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Settings:
        name = "users"

    @classmethod
    def create(cls, username: str, email: str, raw_password: str):
        hashed_password = hash_password(raw_password)
        return cls(username=username, email=email, password=hashed_password)
