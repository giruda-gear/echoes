from enum import unique
from typing import Annotated
from beanie import Document, Indexed
from pydantic import EmailStr, Field
from datetime import datetime, timezone

from backend.app.core.security import hash_password


class User(Document):
    email: Annotated[EmailStr, Indexed(unique=True)]
    username: str
    password: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Settings:
        name = "users"

    @classmethod
    def create(cls, username: str, email: str, raw_password: str):
        hashed_password = hash_password(raw_password)
        return cls(username=username, email=email, password=hashed_password)
