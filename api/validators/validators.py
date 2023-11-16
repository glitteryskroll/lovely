from pydantic import BaseModel

class Validators:
    class Register(BaseModel):
        name: str
        gender: str
        avatar: str
        date: str
        interests: list
        type: int
        city: str