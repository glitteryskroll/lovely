from configurations import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from datetime import timedelta, datetime
from passlib.context import CryptContext
import base64
import jwt
from jwt.exceptions import DecodeError as JWTError

from db import User, engine, db_name, get_db as get_database
from pydantic import BaseModel

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
class UserData(BaseModel):
    username: str

class Token(BaseModel):
    access_token: str
    token_type: str

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_user(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_200_OK,
        detail="Could not 123123validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = UserData(username=username)
    except JWTError:
        raise credentials_exception
    return token_data



def get_current_active_user(current_user: UserData = Depends(get_current_user)):
    user = get_user(db_name, current_user.email)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


class UserCreate(BaseModel):
    email: str
    password: str
    name: str
    family: str

class UserAuth(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class utils():
    def save_video(self, file):
        if file.filename:
            # Определите путь для сохранения файла
            file_path = f"uploads/{file.filename}"

            # Откройте файл для записи в бинарном режиме
            with open(file_path, "wb") as f:
                # Запишите содержимое файла
                f.write(file.file.read())

            return {"filename": file.filename, 'file_path': file_path}