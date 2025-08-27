from typing import Optional
from beanie import PydanticObjectId
from fastapi import HTTPException, status
from pymongo.errors import DuplicateKeyError

from backend.app.models.user import User


class UserService:
    async def create(self, username: str, email: str, password: str) -> User:
        user = User.create(username=username, email=email, raw_password=password)
        try:
            await user.insert()
        except DuplicateKeyError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exists"
            )
        return user

    async def find_one(self, user_id: str) -> Optional[User]:
        user = await User.get(PydanticObjectId(user_id))
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return user

    async def find_one_by_email(self, email: str) -> Optional[User]:
        user = await User.find_one(User.email == email)
        if user is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return user


def get_user_service():
    return UserService()
