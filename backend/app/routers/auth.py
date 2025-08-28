from fastapi import APIRouter, Depends, HTTPException

from app.services.auth_service import AuthService, get_auth_service
from app.services.user_service import UserService, get_user_service
from app.schemas.auth import LoginRequest, SignUpRequest


router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login")
async def login(
    data: LoginRequest, auth_service: AuthService = Depends(get_auth_service)
):
    token = await auth_service.login(data.email, data.password)
    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"access_token": token}


@router.post("/signup")
async def signup(
    user: SignUpRequest, user_service: UserService = Depends(get_user_service)
):
    return await user_service.create(user.username, user.email, user.password)
