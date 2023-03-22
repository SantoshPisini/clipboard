from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from routers.page_router import page_router

app = FastAPI()

origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "Welcome to Clipboard"}

app.include_router(page_router)


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=7003, reload=True)


# pipenv install -r requirements.txt
# uvicorn main:app --reload 