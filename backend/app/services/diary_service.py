from datetime import datetime, timezone
from beanie import PydanticObjectId
from fastapi import HTTPException
from app.models.diary import Diary


class DiaryService:
    async def find_one(self, diary_id: str) -> Diary:
        diary = await Diary.get(PydanticObjectId(diary_id))
        if diary is None:
            raise HTTPException(status_code=404, detail="Diary not found")
        return diary

    async def create(self, user_id: str, content: str) -> Diary:
        diary = Diary(user_id=user_id, content=content)
        await diary.insert()
        return diary

    async def update_content(self, diary_id: str, content: str) -> Diary:
        diary = await self.get_by_id(diary_id)
        diary.content = content
        diary.updated_at = datetime.now(timezone.utc)
        await diary.save()
        return diary


def get_diary_service():
    return DiaryService()
