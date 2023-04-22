from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Body, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from automapper import mapper

from models.page_model import PageModel
from config.database import page_collection
from models.response.page_response_model import PageResponseModel


page_router = APIRouter(
    tags=["Page"],
    prefix="/page"
)


@page_router.post("/", response_model=PageResponseModel)
async def create_page(page: PageModel = Body(...)):
    page.created_at = str(datetime.now(timezone.utc))
    page.modified_at = page.created_at
    page.expires_at = str(datetime.now(timezone.utc) + timedelta(days=3))
    if (_ := await page_collection.find_one({"key": page.key})) is None:
        created_page = await page_collection.insert_one(jsonable_encoder(page))
        result = mapper.to(PageResponseModel).map(page)
        result.id = created_page.inserted_id
        return JSONResponse(status_code=status.HTTP_200_OK, content=jsonable_encoder(result))
    else:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=f"Please choose other key")


@page_router.get("/{id}", response_model=PageResponseModel)
async def get_page(id: str):
    if (page := await page_collection.find_one({"_id": id})) is not None:
        x = PageResponseModel(**page)
        return jsonable_encoder(x)
    return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content=f"Page not found with id: {id}")


@page_router.get("/key/{id}", response_model=PageResponseModel)
async def get_page_by_key(id: str):
    if (page := await page_collection.find_one({"key": id})) is not None:
        x = PageResponseModel(**page)
        return jsonable_encoder(x)
    return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content=f"Page not found with id: {id}")


@page_router.put("/{id}", response_model=PageResponseModel)
async def update_page(id: str, page: PageModel = Body(...)):
    if page is not None and (db_page := await page_collection.find_one({"_id": id})) is not None:
        db_page = PageModel(**db_page)
        db_page.modified_at = str(datetime.now(timezone.utc))
        db_page.expires_at = str(datetime.now(timezone.utc) + timedelta(days=3))
        db_page.title = page.title
        db_page.content = page.content
        update_result = await page_collection.update_one({"_id": id}, {"$set": jsonable_encoder(db_page)})
        if update_result.modified_count == 1 and (updated_user := await page_collection.find_one({"_id": id})) is not None:
            return updated_user
    return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content=f"Page not found with id: {id}")


@page_router.delete("/{id}", response_model=str)
async def delete_page(id: str):
    delete_result = await page_collection.delete_one({"_id": id})
    if delete_result.deleted_count == 1:
        return f"Page deleted. Id: {id}"
    return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content=f"Page not found with id: {id}")
