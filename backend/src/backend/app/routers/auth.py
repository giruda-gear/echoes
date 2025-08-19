from fastapi import APIRouter, Depends


from backend.app.services.user_service import UserService, get_user_service
from backend.app.schemas.auth import LoginRequest, SignUpRequest


router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login")
async def login(
    data: LoginRequest, user_service: UserService = Depends(get_user_service)
):
    print(data)
    return await user_service.find_one_by_email(data.email)


@router.post("/signup")
async def signup(
    user: SignUpRequest, user_service: UserService = Depends(get_user_service)
):
    return await user_service.create(user.username, user.email, user.password)
