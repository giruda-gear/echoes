from contextlib import asynccontextmanager
from fastapi import FastAPI
from backend.app.core.db import init_db
from backend.app.routers import diary
from backend.app.routers import auth


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(lifespan=lifespan)

app.include_router(diary.router, prefix="/api")
app.include_router(auth.router, prefix="/api")
