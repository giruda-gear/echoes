from fastapi import APIRouter, Depends

from app.core.security import get_current_user_id
from app.core.vector import search_similar_diaries
from app.schemas.diary import DiaryCreate, DiaryUpdate
from app.services.diary_service import DiaryService, get_diary_service

router = APIRouter(prefix="/diaries", tags=["Diaries"])


@router.get("")
async def get_my_diaries(
    user_id: str = Depends(get_current_user_id),
    diary_service: DiaryService = Depends(get_diary_service),
):
    return await diary_service.find_by_user(user_id=user_id)


@router.get("/search")
async def search_diary(
    q: str,
    limit: int = 5,
    user_id: str = Depends(get_current_user_id),
    diary_service: DiaryService = Depends(get_diary_service),
):
    return await diary_service.search_similar(user_id, q, limit)


@router.get("/{diary_id}")
async def get_diary(
    diary_id: str, diary_service: DiaryService = Depends(get_diary_service)
):
    return await diary_service.find_one(diary_id)


@router.post("")
async def create_diary(
    diary: DiaryCreate,
    user_id: str = Depends(get_current_user_id),
    diary_service: DiaryService = Depends(get_diary_service),
):
    return await diary_service.create(user_id, diary.content)


@router.patch("/{diary_id}")
async def update_diary(
    diary_id: str,
    diary: DiaryUpdate,
    user_id: str = Depends(get_current_user_id),
    diary_service: DiaryService = Depends(get_diary_service),
):
    return await diary_service.update(
        diary_id=diary_id, user_id=user_id, content=diary.content
    )
