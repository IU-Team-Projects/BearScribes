from fastapi import FastAPI
import db 
from routers import auth, books

app = FastAPI()

app.include_router(auth.router)
app.include_router(books.router)

@app.on_event("startup")
async def startup_event():
    await db.init_db()



@app.get("/")
async def root():
    return {"message": "Это бэкенд API!"}



