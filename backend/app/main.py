from contextlib import asynccontextmanager
from fastapi import FastAPI

from app.db.init import init_db
from app.routers import diary


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(lifespan=lifespan)

app.include_router(diary.router, prefix="/api")
