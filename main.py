
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

from configurations import CLIENT_HOST
from api.routers.auth import router as auth_router
# from api.routers.publications import router as pb_router
# from api.routers.moderation import router as mod_router

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException, status, Cookie, Request
from pydantic import BaseModel

# uvicorn main:app --reload
# db_password -- 9BaeF5gu

app = FastAPI()

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[CLIENT_HOST],  # Разрешить все источники, можно указать конкретные
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить все методы (GET, POST, etc.)
    allow_headers=["*"],  # Разрешить все заголовки
)

templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(auth_router, prefix="/user")
# app.include_router(pb_router, prefix="/post")
# app.include_router(mod_router, prefix="/moderation")
