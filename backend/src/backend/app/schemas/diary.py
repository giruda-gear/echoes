from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class DiaryCreate(BaseModel):
    user_id: str
    content: str


class DiaryUpdate(BaseModel):
    content: str


class DiaryResponse(BaseModel):
    id: str
    content: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
