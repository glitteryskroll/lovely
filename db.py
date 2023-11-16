from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Text, DateTime, Float, ARRAY, BOOLEAN
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.orm import declarative_base
from sqlalchemy.types import Numeric
from datetime import datetime
from configurations import db_host, db_name, db_user, db_password
from sqlalchemy.orm import Session

DATABASE_URL = f"postgresql://{db_user}:{db_password}@{db_host}/{db_name}"
engine = create_engine(DATABASE_URL, pool_size=100000000)

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    bio = Column(String, default='', nullable=True)
    city = Column(String, nullable=True)
    online = Column(DateTime, default=datetime.utcnow)
    balance = Column(Integer, default=0)
    level = Column(Integer, default=0)
    age = Column(DateTime, default=None)
    gender = Column(String, default=None)
    ban = Column(DateTime, default=None)
    status = Column(Integer, default=1)
    type_rel = Column(Integer, default=None)
    latitude = Column(Float, default=None)
    longitude = Column(Float, default=None)
    tg_id = Column(Integer, default=None)

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}


class Likes(Base):
    __tablename__ = 'likes'

    id = Column(Integer, primary_key=True)
    userA_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    userB_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    like = Column(BOOLEAN, default=False)

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}


class BlackLists(Base):
    __tablename__ = 'blacklists'

    id = Column(Integer, primary_key=True)
    userA_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    userB_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}


class UsersInterests(Base):
    __tablename__ = 'users_interests'

    id = Column(Integer, primary_key=True)
    interest_id = Column(Integer, ForeignKey('interests.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}


class Interests(Base):
    __tablename__ = 'interests'

    id = Column(Integer, primary_key=True)
    type = Column(Text)
    name = Column(Text)

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}


class Queues(Base):
    __tablename__ = 'queues'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    queue_users = Column(ARRAY(Integer)) # Последние пять анкет
    date = Column(DateTime, nullable=False, default=datetime.utcnow)

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}


class Photos(Base):
    __tablename__ = 'photos'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    photo = Column(Text)
    type = Column(Text)

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}


class MessagesPhotos(Base):
    __tablename__ = 'messages_photos'

    id = Column(Integer, primary_key=True)
    message_id = Column(Integer, ForeignKey('messages.id'), nullable=False)
    photo_id = Column(Integer, ForeignKey('photos.id'), nullable=False)

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}


class UsersVideos(Base):
    __tablename__ = 'users_videos'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    video_id = Column(Integer, ForeignKey('videos.id'), nullable=False)

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}


class MessagesVideos(Base):
    __tablename__ = 'messages_videos'

    id = Column(Integer, primary_key=True)
    message_id = Column(Integer, ForeignKey('messages.id'), nullable=False)
    video_id = Column(Integer, ForeignKey('videos.id'), nullable=False)

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}


class Videos(Base):
    __tablename__ = 'videos'

    id = Column(Integer, primary_key=True)
    video_url = Column(Text)


class Chats(Base):
    __tablename__ = 'chats'

    id = Column(Integer, primary_key=True)
    userA_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    userB_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}


class Messages(Base):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True)
    chat_id = Column(Integer, ForeignKey('chats.id'), nullable=False)
    sender_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    message_text = Column(Text, nullable=False)
    sent_at = Column(DateTime, nullable=False, default=datetime.utcnow)

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}


class Transactions(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    transaction_type = Column(String(20), nullable=False)  # "deposit", "withdraw", "subscription"
    transaction_date = Column(DateTime, default=datetime.utcnow, nullable=False)

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}


class Complaints(Base):
    __tablename__ = 'complaints'

    id = Column(Integer, primary_key=True, autoincrement=True)
    complainant_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    target_user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    reason = Column(Text, nullable=False)
    status = Column(String, default="wait for check")  # Можно добавить более сложный статус, если требуется
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}


Base.metadata.create_all(engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_base_interests():
    db =next(get_db())
    type = 'relationships'
    types = [
        {'id': 1, 'name': 'Друзья'},
        {'id': 2, 'name': 'Долгосрочные'},
        {'id': 3, 'name': 'Полигамные долгосрочные отношения'},
        {'id': 4, 'name': 'Дружба с привилегиями'},
        {'id': 5, 'name': 'Секс на одну ночь'},
    ]
    for el in types:
        interest = Interests(name=el['name'], type=type)
        db.add(interest)
        db.commit()

    type = 'interests'
    interests = [
            {'id': 1, 'name': 'Хоббихорсинг'},
            {'id': 2, 'name': 'Игры'},
            {'id': 3, 'name': 'Программирование'},
            ]
    for el in interests:
        interest = Interests(name=el['name'], type=type)
        db.add(interest)
        db.commit()

if __name__ == '__main__':
    create_base_interests()

def create_user(db: Session, username: str, email: str, password_hash: str):
    new_user = User(username=username, email=email, password_hash=password_hash)
    print(new_user)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
