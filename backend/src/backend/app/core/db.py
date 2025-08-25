from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from backend.app.models.diary import Diary
from backend.app.models.user import User
from backend.app.core.config import DB_NAME, MONGO_URL


async def init_db():
    client = AsyncIOMotorClient(MONGO_URL)
    await init_beanie(database=client[DB_NAME], document_models=[Diary, User])
