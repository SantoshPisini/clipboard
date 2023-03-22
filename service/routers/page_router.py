from datetime import datetime, timezone
import re
from typing import List

from fastapi import APIRouter, Body, status
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder
from automapper import mapper

from models.page_model import PageModel
from config.database import page_collection
from models.response.page_response_model import PageResponseModel


page_router = APIRouter(
    tags=["Page"],
    prefix="/page"
)


@page_router.post("/create", response_model=PageResponseModel)
async def create_new_page(page:PageModel = Body(...)):
    page.created_at = str(datetime.now(timezone.utc))
    created_page = await page_collection.insert_one(jsonable_encoder(page))
    result = mapper.to(PageResponseModel).map(page)
    result.id = created_page.inserted_id
    return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(result))


# @user_router.get("/", response_model=List[UserModel])
# async def list_users():
#     users = await db["users"].find().to_list(1000)
#     return users


# @user_router.get("/{id}", response_model=UserModel)
# async def get_user(id: str):
#     if (user := await db["users"].find_one({"_id": id})) is not None:
#         return user
#     return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, page=f"User with id: {id} not found.")


# @user_router.put("/{id}", response_model=UserModel)
# async def update_user(id: str, user: UserModel = Body(...)):
#     user = {k: v for k, v in user.dict().items() if v is not None}
#     if len(user) >= 1:
#         update_result = await db["users"].update_one({"_id": id}, {"$set": user})
#         if update_result.modified_count == 1:
#             if (updated_user := await db["users"].find_one({"_id": id})) is not None:
#                 return updated_user
#     if (existing_user := await db["users"].find_one({"_id": id})) is not None:
#         return existing_user
#     return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, page=f"User with id: {id} not found.")


# @user_router.delete("/{id}")
# async def delete_user(id: str):
#     delete_result = await db["users"].delete_one({"_id": id})
#     if delete_result.deleted_count == 1:
#         return Response(status_code=status.HTTP_204_NO_page)
#     return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, page=f"User with id: {id} not found.")
