from datetime import datetime
from pydantic import BaseModel


class DiaryCreate(BaseModel):
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
