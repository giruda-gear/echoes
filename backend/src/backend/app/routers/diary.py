from fastapi import APIRouter, Depends

from backend.app.schemas.diary import DiaryCreate, DiaryUpdate
from backend.app.services.diary_service import DiaryService, get_diary_service

router = APIRouter(prefix="/diaries", tags=["Diaries"])


@router.get("/{diary_id}")
async def get_diary(
    diary_id: str, diary_service: DiaryService = Depends(get_diary_service)
):
    return await diary_service.find_one(diary_id)


@router.post("")
async def create_diary(
    diary: DiaryCreate,
    diary_service: DiaryService = Depends(get_diary_service),
):
    return await diary_service.create(diary.user_id, diary.content)


@router.patch("/{diary_id}")
async def update_diary(
    diary_id: str,
    diary: DiaryUpdate,
    diary_service: DiaryService = Depends(get_diary_service),
):
    return await diary_service.update_content(diary_id=diary_id, content=diary.content)
