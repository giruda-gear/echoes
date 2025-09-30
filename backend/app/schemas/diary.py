from datetime import datetime
from pydantic import BaseModel


class DiaryUpdate(BaseModel):
    content: str


class DiaryResponse(BaseModel):
    id: str
    title: str
    content: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
