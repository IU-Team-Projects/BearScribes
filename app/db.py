from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from models import Base
import os
from dotenv import load_dotenv

load_dotenv()

DB_URL = os.getenv("DATABASE_URL")
engine = create_async_engine(DB_URL)

async def get_db():
    async with AsyncSession(engine) as session:
        try:
            yield session
            await session.commit() 
        except Exception:
            await session.rollback()
            raise 

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)