from fastapi import APIRouter, Depends


from backend.app.services.user_service import UserService, get_user_service
from backend.app.schemas.auth import AuthSignUp


router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/signup")
async def signup(
    user: AuthSignUp, user_service: UserService = Depends(get_user_service)
):
    print(user)
    return await user_service.create(user.username, user.email, user.password)
