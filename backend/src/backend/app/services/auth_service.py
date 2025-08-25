from datetime import timedelta
from backend.app.services.user_service import UserService, get_user_service
from backend.app.core.security import create_access_token, verify_password
from fastapi import Depends


class AuthService:
    def __init__(self, user_service: UserService):
        self.user_service = user_service

    async def login(self, email: str, password: str) -> str | None:
        user = await self.user_service.find_one_by_email(email)
        if not user:
            return None

        if not verify_password(password, user.password):
            return None

        token = create_access_token(
            data={"sub": str(user.id)},
            expires_delta=timedelta(minutes=30),  # 필요시 config에서 불러오기
        )
        return token


def get_auth_service(user_service: UserService = Depends(get_user_service)):
    return AuthService(user_service)
