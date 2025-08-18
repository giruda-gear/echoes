from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

from backend.app.models.diary import Diary
from backend.app.models.user import User

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("MONGO_DB_NAME")


async def init_db():
    client = AsyncIOMotorClient(MONGO_URL)
    await init_beanie(database=client[DB_NAME], document_models=[Diary, User])
