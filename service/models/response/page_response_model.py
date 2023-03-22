from typing import Union
from pydantic import BaseModel, Field, validator

from models.core_model import PyObjectId


class PageResponseModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title: str
    content: Union[str, None]
    key: Union[str, None]
    expires_at: Union[str, None]