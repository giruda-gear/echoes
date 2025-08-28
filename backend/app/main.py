from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.core.db import init_db
from app.core.vector import init_vector_store
from app.routers import diary
from app.routers import auth


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    init_vector_store()
    yield


app = FastAPI(lifespan=lifespan)

app.include_router(diary.router, prefix="/api")
app.include_router(auth.router, prefix="/api")
