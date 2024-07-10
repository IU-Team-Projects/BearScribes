from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    city = Column(String)
    phone_number = Column(String) 
    telegram_profile = Column(String)
    hashed_password = Column(String)
    books = relationship("Book", back_populates="owner") 

class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    open_library_book = Column(String, index=True)  
    cover_url = Column(Text)
    title = Column(String)
    description = Column(String)
    authors = Column(String)  
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="books")
