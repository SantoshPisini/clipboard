from typing import Optional, Union

from bson import ObjectId
from pydantic import BaseModel
from pydantic.fields import Field


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid Object Id")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class CoreModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    is_active: bool = Field(default=True)
    is_deleted: bool = Field(default=False)
    created_by: Optional[Union[PyObjectId, str]]
    created_at: Optional[str]
    modified_by: Optional[Union[PyObjectId, str]]
    modified_at: Optional[str]

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
