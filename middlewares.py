import datetime

from configurations import SECRET_KEY, ALGORITHM
from fastapi import Depends, HTTPException, Cookie, Body
from sqlalchemy.orm import sessionmaker
import jwt
from jwt.exceptions import DecodeError as JWTError
from datetime import datetime
from db import User, engine, get_db
from api.errors.errors import errors

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
errors = errors()
def token_middleware(access_token: str = Cookie(None)):
    print('--token_middleware')
    return 5
    if access_token:
        try:
            print('tut')
            payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
            email: str = payload.get("sub")

            if email is None:
                raise errors.protected_resource()

            db = next(get_db())
            user = db.query(User).filter(User.email == email).first()
            user.online = datetime.utcnow()
            print('email')
            db.commit()
            db.refresh(user)
            return email
        except JWTError:
            print(JWTError)
            raise errors.protected_resource()
    else:
        raise errors.protected_resource()

def token_and_body_middleware(body: dict, token_data: dict = Depends(token_middleware)):
    print('--body_middleware')
    return {"token_data": token_data, "body": body}