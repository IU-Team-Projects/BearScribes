from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from jose import JWTError, jwt
from datetime import timedelta
from schemas import UserCreate, User, Token
from db import get_db
from models import User as UserModel
from .hash_token import verify_password, get_password_hash, create_access_token
from dotenv import load_dotenv
import os 

load_dotenv()
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=User, status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate, db: AsyncSession = Depends(get_db)):
    hashed_password = get_password_hash(user.password)
    db_user = UserModel(
        name=user.name,
        city=user.city,
        phone_number=user.phone_number,
        telegram_profile=user.telegram_profile,
        hashed_password=hashed_password,
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user


async def authenticate_user(db: AsyncSession, username: str, password: str):
    query = select(UserModel).where(UserModel.name == username)
    result = await db.execute(query)
    user = result.scalars().first()  

    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Incorrect username or password"
        )
    return user

@router.post("/token", response_model=Token, status_code=status.HTTP_201_CREATED)
async def get_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    user = await authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token_time_life = timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(
        data={"sub": user.name}, expires_delta=token_time_life
    )
    print(access_token)
    
    response = JSONResponse(content={"access_token": access_token, "token_type": "bearer"})
    response.set_cookie(key="access_token", value=f"Bearer {access_token}", httponly=True, samesite='None', secure=True, domain='www.backendus.com')
    
    return response


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")



async def get_current_user(request: Request, db: AsyncSession = Depends(get_db)):
    token = request.cookies.get("access_token")
    print(type(token))
    print(f"Token from cookies: {token}") 
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        #payload = jwt.decode(token.split(" ")[1], SECRET_KEY, algorithms=[ALGORITHM])
        payload = jwt.decode(token.replace('%22', '').strip('"'), SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    result = await db.execute(select(UserModel).filter(UserModel.name == username))
    user = result.scalars().first()
    if user is None:
        raise credentials_exception
    return user

@router.get("/user_info", response_model=User)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return current_user