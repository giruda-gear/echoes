from fastapi import Depends

from app.services.user_service import UserService, get_user_service
from app.core.security import create_access_token, create_refresh_token, verify_password


class AuthService:
    def __init__(self, user_service: UserService):
        self.user_service = user_service

    async def login(self, email: str, password: str) -> str | None:
        user = await self.user_service.find_one_by_email(email)
        if not user:
            return None

        if not verify_password(password, user.password):
            return None

        access_token = create_access_token(
            data={"sub": str(user.id)},
        )
        refresh_token = create_refresh_token(
            data={"sub": str(user.id)},
        )

        return {"access_token": access_token, "refresh_token": refresh_token}


def get_auth_service(user_service: UserService = Depends(get_user_service)):
    return AuthService(user_service)
