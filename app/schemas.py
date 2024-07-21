from typing import List, Optional
from pydantic import BaseModel


class UserStandart(BaseModel): 
    name: str
    city: str 
    phone_number: str
    telegram_profile: str

class UserCreate(UserStandart):
    password: str

class User(UserStandart):
    id: int

    class Config: 
        from_attributes = True

class BookStandart(BaseModel):
    open_library_book: str

class Book(BookStandart):
    id: int
    title: str
    authors: str  
    cover_url: str

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str