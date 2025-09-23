from datetime import datetime, timezone
from app.core.vector import (
    delete_diary_vector,
    diary_collection,
    save_diary_vector,
    search_similar_diaries,
)
from beanie import PydanticObjectId
from fastapi import HTTPException, status

from app.models.diary import Diary


class DiaryService:
    async def create(self, user_id: str, content: str) -> Diary:
        try:
            diary = Diary(user_id=user_id, content=content)
            await diary.insert()
            save_diary_vector(user_id=user_id, diary_id=str(diary.id), text=content)
        except Exception as e:
            if diary:
                await diary.delete()
            raise e
        return diary

    async def find_one(self, diary_id: str) -> Diary:
        diary = await Diary.get(PydanticObjectId(diary_id))
        if diary is None:
            raise HTTPException(status_code=404, detail="Diary not found")
        return diary

    async def find_by_user(self, user_id: str) -> list[Diary]:
        diaries = await Diary.find(Diary.user_id == user_id).to_list()
        return diaries

    async def search_similar(self, user_id: str, query: str, limit: int):
        return search_similar_diaries(user_id=user_id, query=query, top_k=limit)

    async def update(self, diary_id: str, user_id: str, content: str) -> Diary:
        diary = await self.find_one(diary_id)

        if diary.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to modify this diary",
            )

        diary.content = content
        diary.updated_at = datetime.now(timezone.utc)
        await diary.save()

        delete_diary_vector(diary_id=diary_id)
        save_diary_vector(user_id=user_id, diary_id=diary_id, text=content)

        return diary


def get_diary_service():
    return DiaryService()
