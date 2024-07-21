from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from schemas import Book, BookStandart, User
from db import get_db
from models import Book as BookModel, User as UserModel
import httpx
from .auth import get_current_user

router = APIRouter(
    prefix="/books",
    tags=["Books"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=Book, status_code=status.HTTP_201_CREATED)
async def add_book(book_data: BookStandart, db: AsyncSession = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    open_library_id = book_data.open_library_book
    print(f"https://openlibrary.org/works/{open_library_id}.json")
    async with httpx.AsyncClient(follow_redirects=True, timeout=30.0) as client:
        response = await client.get(f"https://openlibrary.org/works/{open_library_id}.json")
    
    print(f'response: {response}')
    book_info = response.json()
    print(f'book_info: {book_info}')
    title = book_info.get("title", "Название не найдено")
    author_keys = book_info.get("authors", [])
    authors = []

    for entry in author_keys:
        author = entry.get("author")
        if author:
            author_key = author.get("key")
            if author_key:
                async with httpx.AsyncClient(follow_redirects=True, timeout=30.0) as client:
                    author_response = await client.get(f"https://openlibrary.org{author_key}.json")
                author_info = author_response.json()
                authors.append(author_info.get("name", "Имя автора не найдено"))

    authors_str = ", ".join(authors)

    cover_url = f"https://covers.openlibrary.org/b/id/{book_info.get('covers', [None])[0]}-L.jpg" if book_info.get('covers') else None  
    db_book = BookModel(
        open_library_book=open_library_id,
        title=title,
        authors=authors_str,
        cover_url=cover_url,
        owner_id=current_user.id,
    )

    db.add(db_book)
    await db.commit()
    await db.refresh(db_book)
    return db_book

@router.get("/", response_model=list[Book])
async def get_user_books(db: AsyncSession = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    result = await db.execute(select(BookModel).filter(BookModel.owner_id == current_user.id))
    books = result.scalars().all()
    return books

@router.get("/{book_id}", response_model=Book)
async def get_user_book(book_id: int, db: AsyncSession = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    result = await db.execute(select(BookModel).filter(BookModel.id == book_id, BookModel.owner_id == current_user.id))
    book = result.scalars().first()
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

@router.delete("/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user_book(book_id: int, db: AsyncSession = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    result = await db.execute(select(BookModel).filter(BookModel.id == book_id, BookModel.owner_id == current_user.id))
    book = result.scalars().first()
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    await db.delete(book)
    await db.commit()
    return {"detail": "Book deleted successfully"}

@router.get("/any_user/{book_id}", response_model=dict)
async def get_book_any_user(book_id: int, db: AsyncSession = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    result = await db.execute(
        select(BookModel, UserModel)
        .join(UserModel, BookModel.owner_id == UserModel.id)
        .filter(BookModel.id == book_id)
    )
    book_with_owner = result.fetchone()

    if book_with_owner is None:
        raise HTTPException(status_code=404, detail="Book not found")

    book, owner = book_with_owner
    is_owner = owner.id == current_user.id  # Проверяем, является ли текущий пользователь владельцем книги

    return {
        "book": Book.model_validate(book),
        "owner": User.model_validate(owner),
        "is_owner": is_owner  # Добавляем информацию о том, является ли текущий пользователь владельцем книги
    }

@router.get("/users_book/search", response_model=list[Book])
async def search_books_by_title(title: str, db: AsyncSession = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    result = await db.execute(
        select(BookModel)
        .join(UserModel, BookModel.owner_id == UserModel.id)
        .filter(BookModel.title.ilike(f"%{title}%"))
        .filter(UserModel.city == current_user.city)
    )
    books = result.scalars().all()
    return books
