from fastapi import FastAPI
import db
from routers import auth, books
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",  
    "http://localhost:3001",
    "https://ourprojectdeployserver.com",  
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(books.router)

@app.on_event("startup")
async def startup_event():
    await db.init_db()

@app.get("/")
async def root():
    return {"message": "Это бэкенд API!"}

