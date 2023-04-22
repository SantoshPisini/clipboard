from functools import lru_cache
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from config.settings import ConfigSettings

from routers.page_router import page_router

# For response serilization
import pydantic
from bson import ObjectId
pydantic.json.ENCODERS_BY_TYPE[ObjectId]=str # type: ignore


app = FastAPI()

@lru_cache()
def get_settings():
    return ConfigSettings()

# App Config
origins = [
    "http://localhost:3000",
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

# Routers

app.include_router(page_router)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=7003, reload=True)


# pipenv install -r requirements.txt
# uvicorn main:app --reload 