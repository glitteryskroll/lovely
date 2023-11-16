import psycopg2
from configurations import db_user, db_name, db_host, db_password
from sqlalchemy.orm import sessionmaker
from db import User, Likes, BlackLists, MessagesPhotos, Chats, Messages, Videos, Interests, UsersInterests, UsersVideos, Photos, engine, db_name, Session

from fastapi import FastAPI, Depends, HTTPException, status, Cookie

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class UsersCrud:
    def get_db(self):
        db = SessionLocal()
        try:
            yield db
        finally:
            db.close()

    def create_user(self, name, date, gender, avatar, city, interests, type):
        db = next(self.get_db())
        print(date)
        new_user = User(
            name=name,
            age=date,
            gender=gender,
            bio='',
            city=city,
            type_rel=type
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        for interest in interests:
            new_interest = UsersInterests(user_id=new_user.id, interest_id=interest['id'])
            db.add(new_interest)
            db.commit()

        self.add_user_photo(user=new_user, photo=avatar, type="main")
        return 0

    def get_user_by_id(self, user_id):
        db = next(self.get_db())
        user = db.query(User).filter(User.id == user_id).first()
        photos = self.get_user_photos(user)
        user = user.as_dict()
        photos_array = []

        for photo in range(0, len(photos)):
            if photos[photo].type == 'main':
                photos_array.insert(0, photos[photo].id)
            else:
                photos_array.append(photos[photo].id)
        user['relationships'] = db.query(Interests).filter(Interests.id == user['type_rel']).first().as_dict()['name']
        user['photos'] = photos_array
        return user



    def get_user_by_email(self, email):
        db = next(self.get_db())
        user = db.query(User).filter(User.email == email).first()
        return user

    def delete_user(self, userA):
        db = next(self.get_db())
        user = db.query(User).filter(User.id == userA.id).first()
        db.delete(user)
        db.commit()
        return True

    def get_user_by_token(self, token_data):
        db = next(self.get_db())
        return db.query(User).filter(User.tg_id == token_data).first()

    def get_user_photo(self, user, photo_id):
        db = next(self.get_db())
        photo = db.query(Photos).filter((Photos.user_id == user.id) & (Photos.id == photo_id)).first()
        print(photo.id)
        print(photo.type)
        return photo

    def get_user_photos(self, user):
        db = next(self.get_db())
        photos = db.query(Photos).filter((Photos.user_id == user.id) & ((Photos.type == "profile") | (Photos.type == "main"))).all()
        return photos

    def get_user_videos(self, user):
        db = next(self.get_db())
        videos = db.query(UsersVideos).filter(UsersVideos.user_id == user.id)
        return videos

    def get_user_video(self, user, id):
        db = next(self.get_db())
        user_video = db.query(UsersVideos).filter((UsersVideos.user_id == user.id) & (UsersVideos.id == id)).first()
        video = db.query(Videos).filter(Videos.id == user_video.id).first()
        return video

    def add_user_photo(self, user, photo, type='profile'):
        db = next(self.get_db())
        photo_new = Photos(
            photo=photo,
            type=type,
            user_id=user.id
        )
        db.add(photo_new)
        db.commit()
        db.refresh(photo_new)
        return photo_new

    def edit_user_photo(self, user, photo, type='profile'):
        db = next(self.get_db())
        photo_mains = db.query(Photos).filter((Photos.type == 'main') & (Photos.user_id == user.id)).all()
        for photo_main in photo_mains:
            photo_main.type = 'profile'
            db.commit()
        photo_delete = db.query(Photos).filter((Photos.id == photo.id) & (Photos.user_id == user.id)).first()
        photo_delete.type = type
        db.commit()
        db.refresh(photo_delete)

    def add_user_video(self, user, video):
        db = next(self.get_db())
        video = Videos(
            video_url=video
        )
        relations = UsersVideos(
            user_id=user.id,
            video_id=video.id
        )

        db.add(video)
        db.add(relations)
        db.commit()
        return video

    def delete_user_photo(self, user, photo):
        db = next(self.get_db())
        photo_delete = db.query(Photos).filter((Photos.id == photo.id) & (Photos.user_id == user.id)).first()
        db.delete(photo_delete)
        db.commit()

        return True

    def delete_user_video(self, user, video):
        db = next(self.get_db())
        video_delete = db.query(Videos).filter(Videos.id == video.id)
        relations = db.query(UsersVideos).filter(UsersVideos.id == video.id)

        db.delete(relations)
        db.delete(video_delete)
        db.commit()

        return True

    def get_interests(self, type):
        db = next(self.get_db())
        interests = db.query(Interests).filter(Interests.type == type).all()
        return interests

    def get_user_interests(self, user, type):
        db = next(self.get_db())
        users_interests = db.query(UsersInterests).filter(UsersInterests.user_id == user.id).all()
        print(users_interests)
        interests = []
        for i in users_interests:
            print(i)
            interest = db.query(Interests).filter((Interests.type == type) & (Interests.id == i.interest_id)).first()
            print(interest)
            if interest:
                interests.append(interest)
        return interests

    def add_user_interests(self, user, interests, type):
        db = next(self.get_db())
        all_interests = db.query(Interests).filter(Interests.type == type).all()
        for interest in all_interests:
            user_interest = db.query(UsersInterests).filter((UsersInterests.user_id == user.id) & (UsersInterests.interest_id == interest))
            db.delete(user_interest)

        for interest_id in interests:
            interest = UsersInterests(user_id=user.id, interest_id=interest_id)
            db.add(interest)
        db.commit()
        return True

    def edit_user_desc(self, user, desc):
        db = next(self.get_db())
        user.bio = desc
        db.commit()
        db.refresh(user)
        return user

    def edit_user_status(self, user, status):
        db = next(self.get_db())
        user.bio = status
        db.commit()
        db.refresh(user)
        return user

    def edit_user_profile(self, user_tg_id, columns):
        db = next(self.get_db())
        user = db.query(User).filter(User.tg_id == user_tg_id).first()
        for column in columns:
            if column == 'interests':
                users_interests = db.query(UsersInterests).filter(UsersInterests.user_id == user.id).all()
                for i in users_interests:
                    db.delete(i)
                    db.commit()
                for j in columns[column]:
                    new_interest = UsersInterests(user_id=user.id, interest_id=int(j['id']))
                    db.add(new_interest)
                    db.commit()
            elif getattr(user, column):
                print(column)
                setattr(user, column, columns[column])
            elif column:
                try:
                    setattr(user, column, columns[column])
                except Exception as ex:
                    print(ex)

        db.commit()
        db.refresh(user)
        return user

    def edit_user_coordinates(self, user, latitude, longitude):
        db = next(self.get_db())
        user.latitude = latitude
        user.latitude = longitude
        db.commit()
        db.refresh(user)
        return user

    def get_photo(self, id):
        db = next(self.get_db())
        photo = db.query(Photos).filter(Photos.id == id).first()
        return photo

    def set_like(self, userA, userB, like_flag: bool):
        db = next(self.get_db())
        likesA = db.query(Likes).filter((Likes.userA_id == userA.id) & (Likes.userB_id == userB.id)).first()
        if likesA:
            likesA.like = like_flag
        else:
            new_likes = Likes(userA_id = userA.id, userB_id = userB.id, like=like_flag)
            db.add(new_likes)
            db.commit()
        likesB = db.query(Likes).filter((Likes.userA_id == userB.id) & (Likes.userB_id == userA.id)).first()
        if likesB and likesB.like == likesA.like:
            print('match')
            self.send_notification(userA, userB)
        return likesA

    def get_user_sympathies(self, userA):
        db = next(self.get_db())
        likesA = db.query(Likes).filter(Likes.userA_id == userA.id).all()
        likesB = db.query(Likes).filter(Likes.userB_id == userA.id).all()
        if likesA and likesB:
            if likesA.like == likesB.like:
                return likesA
        return None

    def get_user_chats(self, userA):
        db = next(self.get_db())
        chats = db.query(Chats).filter(Chats.userA_id == userA.id | Chats.userB_id == userA.id).all()
        return chats

    def get_chat(self, chat_id):
        db = next(self.get_db())
        chat = db.query(Chats).filter(Chats.id == chat_id).all()
        messages = db.query(Messages).filter(Messages.chat_id == chat_id).all()
        return {'chat':chat, 'messages': messages}

    def set_chat(self, userA, userB, chat_flag: bool):
        db = next(self.get_db())
        chat = db.query(Chats).filter(Chats.userA_id == userA.id | Chats.userB_id == userA.id).all()
        if chat and chat_flag is False:
            db.delete(chat)
            db.commit()
            return True
        elif not chat and chat_flag is True:
            new_chat = Chats(userA_id = userA.id, userB_id = userB.id)
            db.add(new_chat)
            db.commit()
            return True
        return False

    def send_message(self, chat, user, message_text, photos=None):
        db = next(self.get_db())
        message = Messages(chat_id = chat.id, sender_id = user.id, message_text = message_text)
        db.add(message)
        if photos:
            for photo in photos:
                new_photo_message = MessagesPhotos(message_id=message.id, photo_id=photo.id)
                db.add(new_photo_message)
        db.commit()
        return message

    def set_blacklist(self, userA, userB, blacklist_flag: bool):
        db = next(self.get_db())
        blacklist = db.query(BlackLists).filter((BlackLists.userA_id == userA.id) & (BlackLists.userB_id == userB.id)).first()
        if blacklist and blacklist_flag is False:
            db.delete(blacklist)
            db.commit()
            return True
        elif not blacklist and blacklist_flag is True:
            new_blacklist = BlackLists(userA_id = userA.id, userB_id = userB.id)
            db.add(new_blacklist)
            db.commit()
            return True
        return False

    def send_notification(self, userA, userB):
        print('send userA', userA)
        print('send userB', userB)

        return True