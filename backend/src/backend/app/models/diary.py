from beanie import Document
from datetime import datetime, timezone
from pydantic import Field


class Diary(Document):
    user_id: str
    content: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Settings:
        name = "diaries"
