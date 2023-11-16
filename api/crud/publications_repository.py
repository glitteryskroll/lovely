import psycopg2
from configurations import db_user, db_name, db_host, db_password
from sqlalchemy.orm import sessionmaker, joinedload
from db import User, Comment, engine, db_name, Session, Post
from sqlalchemy import desc
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Функция для получения данных поста по его ID
def get_post(db, post_id: int):
    print('daruyut',post_id)
    post = db.query(Post).filter(Post.post_id == post_id).first()
    return post

# Функция для получения данных поста по его ID
def get_posts(offset: int):

    connection = psycopg2.connect(
        host=db_host,
        database=db_name,
        user=db_user,
        password=db_password,
        cursor_factory = psycopg2.extras.RealDictCursor
    )

    cursor = connection.cursor()

    sql_query = f'''SELECT post_id, post_date, post_header, post_text, user_id, first_name, last_name, avatar, email FROM posts NATURAL JOIN users OFFSET {offset} LIMIT 10; '''
    cursor.execute(sql_query)
    posts = cursor.fetchall()

    return posts


# Функция для удаления поста по его ID
def delete_post(db, post_id: int):
    post = db.query(Post).filter(Post.post_id == post_id).first()
    post_comments = db.query(Comment).filter(Comment.post_id == post_id).all()
    post_complaints = db.query(Complaint).filter(Complaint.post_id == post_id).all()
    if post_comments:
        for comment in post_comments:
            db.delete(comment)
            db.commit()
    if post_complaints:
        for complaint in post_complaints:
            db.delete(complaint)
            db.commit()
    if post:
        db.delete(post)
        db.commit()
        return True
    return False

# Функция для редактирования поста по его ID
def edit_post(db, post_id: int, post: object):
    existing_post = db.query(Post).filter(Post.post_id == post_id).first()
    if existing_post:
        existing_post.post_text = post.post_text
        existing_post.post_images_json = post.post_images
        db.commit()
        db.refresh(existing_post)
        return existing_post
    return None

# Функция для редактирования поста по его ID
def add_post_like(db, post_id: int):
    existing_post = db.query(Post).filter(Post.post_id == post_id).first()
    if existing_post:
        existing_post.likes = existing_post.likes + 1
        db.commit()
        db.refresh(existing_post)
        return existing_post
    return None

# Функция для подачи жалобы на пост по его ID
def report_post(db, post_id: int):
    post = db.query(Post).filter(Post.post_id == post_id).first()
    if post:
        # Здесь можете реализовать логику подачи жалобы на пост
        # Например, добавить запись в таблицу жалоб или отправить уведомление
        return True
    return False
