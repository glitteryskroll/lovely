from fastapi.responses import HTMLResponse, RedirectResponse, JSONResponse, FileResponse, Response
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from configurations import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from fastapi import Depends, HTTPException, status, Request, File, UploadFile
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from datetime import timedelta, datetime
from middlewares import token_middleware, token_and_body_middleware
from ..errors.errors import errors
from ..utils.utils import pwd_context, UserCreate, UserAuth, create_access_token, verify_password, utils
from ..validators.validators import Validators
from api.crud.user_repository import UsersCrud
validators = Validators()
errors = errors()
UsersCrud = UsersCrud()
import base64
import json
from fastapi import APIRouter


router = APIRouter()

templates = Jinja2Templates(directory="templates")
router.mount("/static", StaticFiles(directory="static"), name="static")


@router.post("/registration")
async def user_registration(formData: validators.Register):
    try:
        print(formData)
        UsersCrud.create_user(formData.name, formData.date, formData.gender, formData.avatar, formData.city, formData.interests, formData.type)
        return errors.success_response('Success')
    except Exception as ex:
        print(ex)
        return errors.internal_error()


@router.post("/login")
async def login_for_access_token(form_data: UserAuth):
    user = UsersCrud.get_user_by_email(form_data.email).as_dict()
    print(user)
    if user['ban'] == 1 or not user or not verify_password(form_data.password, user['password_hash']):
        return errors.protected_resource()
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user['email']}, expires_delta=access_token_expires
    )
    response = JSONResponse(content={"access_token": access_token, "token_type": "bearer"})
    response.set_cookie(key="access_token", value=access_token)

    return response

@router.post("/profile")
async def user_info(token_data: dict = Depends(token_middleware)):
    try:
        user = UsersCrud.get_user_by_token(token_data)
        print('user',user)
        if not user:
            raise errors.not_found()
        print(user)
        user_data = UsersCrud.get_user_by_id(user.id)
        print(user_data)
        for column in user_data:
            if column == 'age':
                current_date = datetime.now()
                difference_in_years = current_date.year - user_data[column].year
                if (current_date.month, current_date.day) < (user_data[column].month, user_data[column].day):
                    difference_in_years -= 1
            if column == 'photos':
                continue
            user_data[column] = str(user_data[column])
        user_data['age_int'] = str(difference_in_years)

        response = errors.success_response({"user": user_data})
        return response
    except Exception as ex:
        print(ex)
        return errors.not_found()


@router.post("/delete_user", response_class=HTMLResponse)
async def delete_user(token_data: dict = Depends(token_middleware)):
    try:
        user_data = UsersCrud.delete_user(token_data)
        response = JSONResponse(content={"deletedUser": user_data})
        return response
    except:
        return errors.not_found()

@router.get("/photo/{id}")
async def get_image_file(id: str):
    try:
        base64_data = UsersCrud.get_photo(id).photo.split(",")[1]
        if len(base64_data) > 5:
            binary_data = base64.b64decode(base64_data)
            return Response(content=binary_data, media_type="image/png")
    except Exception as ex:
        print(ex)
        return errors.not_found()


# @router.get("/profile", response_class=HTMLResponse)
# async def read_root(request: Request, data: dict = Depends(token_and_body_middleware)):
#     try:
#         userA = UsersCrud.get_user_by_token(data['token_data'])
#         if not userA:
#             raise errors.not_found()
#
#         users = UsersCrud.get_user_chats(userA)
#
#         user_data = UsersCrud.get_user_by_email(token_data)
#         # user_posts = db.query(Post).filter(Post.user_id == user_data['user_id']).all()
#         user_posts = []
#         for post in user_posts:
#             post_id = post.post_id
#             # comments = db.query(Comment).filter(Comment.post_id == post_id).all()
#             comments = []
#             for comment in comments:
#                 user = UsersCrud.get_user_by_id(comment.user_id)
#                 comment.avatar = user['avatar']
#                 comment.first_name = user['first_name']
#                 comment.last_name = user['last_name']
#             post.comments = comments
#
#         return templates.TemplateResponse("profile.html",{"request": request, "user_data": user_data, "posts": user_posts})
#     except:
#         return errors.not_found()



# @router.get("/profile/{username}", response_class=HTMLResponse)
# async def profile(username: int, data: dict = Depends(token_and_body_middleware)):
#     try:
#         user = UsersCrud.get_user_by_token(username)
#         if not user:
#             raise errors.not_found()
#
#         user_photos = UsersCrud.get_user_photos(user)
#         user_videos = UsersCrud.get_user_videos(user)
#
#         response = JSONResponse(content={"user": user, "photos": user_photos, "videos": user_videos})
#         return response
#     except:
#         return errors.not_found()


@router.post("/add_profile_photo")
async def add_profile_photo(data: dict = Depends(token_and_body_middleware)):
    try:
        user = UsersCrud.get_user_by_token(data['token_data'])
        if not user:
            raise errors.not_found()
        print(user)
        photos = UsersCrud.get_user_photos(user)
        if len(photos) > 4:
            return errors.max_photos()
        photo = data['body']['photo']
        type = data['body']['type']
        if type != 'main':
            type = 'profile'
        new_photo = UsersCrud.add_user_photo(user, photo, type)
        return errors.success_response('Success')
    except:
        return errors.internal_error()

@router.post("/delete_profile_photo")
async def delete_profile_photo(data: dict = Depends(token_and_body_middleware)):
    try:
        print('start')
        user = UsersCrud.get_user_by_token(data['token_data'])
        id = data['body']['photo_id']
        print(id)
        if not user:
            raise errors.not_found()

        photo = UsersCrud.get_user_photo(user, id)
        if not photo:
            return errors.not_found()

        UsersCrud.delete_user_photo(user, photo)
        return errors.success_response('Success')
    except Exception as ex:
        print(ex)
        return errors.internal_error()


@router.post("/edit_profile_photo")
async def edit_profile_photo(data: dict = Depends(token_and_body_middleware)):
    try:
        user = UsersCrud.get_user_by_token(data['token_data'])
        photo_id = data['body']['photo_id']

        if not user:
            raise errors.not_found()
        print('photo', photo_id)
        photo = UsersCrud.get_user_photo(user, photo_id)
        if not photo:
            return errors.not_found()

        type = data['body']['type']
        if type != 'main':
            type = 'profile'
        print(data['body'])
        print(photo.id, type)
        new_photo = UsersCrud.edit_user_photo(user, photo, type)
        return errors.success_response('Success')
    except Exception as ex:
        print(ex)
        return errors.internal_error()

@router.post("/add_video")
async def add_profile_video(file: UploadFile, data: dict = Depends(token_and_body_middleware)):
    try:
        user = UsersCrud.get_user_by_token(data['token_data'])
        if not user:
            raise errors.not_found()

        user_videos = UsersCrud.get_user_videos(user)
        if user_videos:
            return errors.max_videos()

        video_url = utils.save_video(file)
        video = UsersCrud.add_user_video(user, video_url)

        return errors.success_response('Success')
    except:
        return errors.internal_error()

@router.post("/delete_profile_video")
async def delete_profile_photo(data: dict = Depends(token_and_body_middleware), db: Session = Depends(UsersCrud.get_db)):
    try:
        user = UsersCrud.get_user_by_token(data['token_data'])
        id = data['body']['photo_id']
        if not user:
            raise errors.not_found()

        video = UsersCrud.get_user_video(user, id)
        if not video:
            return errors.not_found()

        UsersCrud.delete_user_video(video)
        return errors.success_response('Success')
    except:
        return errors.internal_error()

@router.post("/edit_profile_desc")
async def edit_profile_desc(data: dict = Depends(token_and_body_middleware)):
    try:
        user = UsersCrud.get_user_by_token(data['token_data'])
        if not user:
            raise errors.not_found()

        desc = data['body']['desc']
        user = UsersCrud.edit_user_desc(user, desc)
        return errors.success_response("Edited")
    except:
        return errors.internal_error()

@router.post("/edit_profile_status")
async def edit_profile_desc(data: dict = Depends(token_and_body_middleware)):
    try:
        user = UsersCrud.get_user_by_token(data['token_data'])
        if not user:
            raise errors.not_found()

        status = data['body']['status']
        user = UsersCrud.edit_user_status(user, status)
        return errors.success_response('Success')
    except:
        return errors.internal_error()

@router.post("/get_interests")
async def get_interests(data:dict):
    try:
        print(data)
        type = data['interests_type']
        interests = UsersCrud.get_interests(type)
        print(interests)
        for i, value in enumerate(interests):
            interests[i] = value.as_dict()
        print(interests)
        response = JSONResponse(content={"interests": interests})
        return response
    except:
        return errors.internal_error()

@router.post("/get_user_interests")
async def get_interests(data: dict = Depends(token_and_body_middleware)):
    try:
        user = UsersCrud.get_user_by_token(data['token_data'])
        if not user:
            raise errors.not_found()
        type = data['body']['interests_type']
        interests = UsersCrud.get_user_interests(user, type)
        print(interests)
        for i, value in enumerate(interests):
            interests[i] = value.as_dict()
        response = JSONResponse(content={"interests": interests})
        return response
    except:
        return errors.internal_error()

@router.post("/video/{id}")
async def get_video(id: str, data: dict = Depends(token_and_body_middleware)):
    try:
        user = UsersCrud.get_user_by_token(data['token_data'])
        if not user:
            raise errors.not_found()

        video_id = id
        video = UsersCrud.get_user_video(user, video_id)
        response = JSONResponse(content={"video": video})
        return response
    except:
        return errors.internal_error()

@router.post("/edit_user_interests")
async def edit_user_interests(data: dict = Depends(token_and_body_middleware)):
    try:
        user = UsersCrud.get_user_by_token(data['token_data'])
        if not user:
            raise errors.not_found()

        desc = data['body']['desc']
        interests_id = data['body']['interests_id']
        type = data['body']['interests_type']
        user = UsersCrud.edit_user_interests(user, interests_id, type)
        return errors.success_response('Success')
    except:
        return errors.internal_error()

@router.post("/edit_user_profile")
async def edit_user_profile(data: dict = Depends(token_and_body_middleware)):
    try:
        print(data)
        user = UsersCrud.get_user_by_token(data['token_data'])
        if not user:
            raise errors.not_found()

        user = UsersCrud.edit_user_profile(user.tg_id, data['body'])
        return errors.success_response('Success')

    except Exception as ex:
        print(ex)
        return errors.internal_error()

@router.post("/edit_user_coordinates")
async def edit_user_coordinates(data: dict = Depends(token_and_body_middleware)):
    try:
        user = UsersCrud.get_user_by_token(data['token_data'])
        if not user:
            raise errors.not_found()

        latitude = data['body']['latitude']
        longitude = data['body']['longitude']
        user = UsersCrud.edit_user_coordinates(user, latitude, longitude)
        return errors.success_response('Success')
    except:
        return errors.internal_error()



@router.post("/set_like")
async def set_like(data: dict = Depends(token_and_body_middleware)):
    try:
        userA = UsersCrud.get_user_by_token(data['token_data'])
        if not userA:
            raise errors.not_found()

        userB = data['body']['userB']
        if not userB:
            raise errors.not_found()

        like_flag = data['body']['like_flag']
        likes = UsersCrud.set_like(userA, userB, like_flag)
        return errors.success_response('Success')
    except:
        return errors.internal_error()


@router.post("/set_blacklist")
async def set_blacklist(data: dict = Depends(token_and_body_middleware)):
    try:
        userA = UsersCrud.get_user_by_token(data['token_data'])
        if not userA:
            raise errors.not_found()

        userB = data['body']['userB']
        if not userB:
            raise errors.not_found()

        blacklist_flag = data['body']['blacklist_flag']
        blacklist = UsersCrud.set_blacklist(userA, userB, blacklist_flag)
        return errors.success_response('Success')
    except:
        return errors.internal_error()


@router.post("/set_chat")
async def set_chat(data: dict = Depends(token_and_body_middleware)):
    try:
        userA = UsersCrud.get_user_by_token(data['token_data'])
        if not userA:
            raise errors.not_found()

        userB = data['body']['userB']
        if not userB:
            raise errors.not_found()

        chat_flag = data['body']['chat_flag']
        chat = UsersCrud.set_chat(userA, userB, chat_flag)
        return errors.success_response('Success')
    except:
        return errors.internal_error()


@router.post("/get_chat")
async def get_chat(data: dict = Depends(token_and_body_middleware)):
    try:
        userA = UsersCrud.get_user_by_token(data['token_data'])
        if not userA:
            raise errors.not_found()

        chat_id = data['body']['chat_id']
        chat = UsersCrud.get_chat(chat_id)
        if not chat:
            raise errors.not_found()

        response = JSONResponse(content={"chat": chat})
        return response
    except:
        return errors.internal_error()

@router.post("/send_message")
async def send_message(data: dict = Depends(token_and_body_middleware)):
    try:
        user = UsersCrud.get_user_by_token(data['token_data'])
        if not user:
            raise errors.not_found()

        chat_id = data['body']['chat_id']
        photos_id = []
        photos = data['body']['photos'] if data['body']['photos'] else None
        for photo in photos:
            photo = UsersCrud.add_user_photo(user, photo, type="message")
            photos_id.append(photo.id)

        chat = UsersCrud.get_chat(chat_id)
        if not chat:
            raise errors.not_found()

        message_text = data['body']['message_text']
        message = UsersCrud.send_message(chat, user, message_text, photos)
        return errors.success_response('Success')
    except:
        return errors.internal_error()

@router.post("/get_user_sympathies")
async def get_user_sympathies(data: dict = Depends(token_and_body_middleware)):
    try:
        userA = UsersCrud.get_user_by_token(data['token_data'])
        if not userA:
            raise errors.not_found()

        users = UsersCrud.get_user_sympathies(userA)
        response = JSONResponse(content={"users": users})
        return response
    except:
        return errors.internal_error()

@router.post("/get_user_chats")
async def get_user_chats(data: dict = Depends(token_and_body_middleware)):
    try:
        userA = UsersCrud.get_user_by_token(data['token_data'])
        if not userA:
            raise errors.not_found()

        users = UsersCrud.get_user_chats(userA)
        response = JSONResponse(content={"users": users})
        return response
    except:
        return errors.internal_error()

@router.post("/search_users")
async def search_users(data: dict = Depends(token_and_body_middleware)):
    try:
        userA = UsersCrud.get_user_by_token(data['token_data'])
        if not userA:
            raise errors.not_found()
        profile_data = {'gender': '',
                        'age': '',
                        'interests': '',
                        'radius': '',
                        }
        response = JSONResponse(content={"users": users})
        return response
    except:
        return errors.internal_error()


