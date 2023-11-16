
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi import Depends, Request
from middlewares import token_middleware, token_and_body_middleware

from api.crud.user_repository import create_user, get_user_by_email, get_db, get_user_by_id
from fastapi import APIRouter

templates = Jinja2Templates(directory="templates")

router =  APIRouter()

@router.get("/adminpanel", response_class=HTMLResponse)
async def read_root(request: Request, token: dict = Depends(token_middleware)):
    user = get_user_by_email(token)
    if user['level'] == 1: #Для админов
        return templates.TemplateResponse("moderation.html", {"request": request, 'user': user})
    else:
        return templates.TemplateResponse("auth.html", {"request": request, 'user': user})



