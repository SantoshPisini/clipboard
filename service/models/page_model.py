from typing import Union
from pydantic import validator

from models.core_model import CoreModel


class PageModel(CoreModel):
    title: str
    content: Union[str, None]
    key: Union[str, None]
    expires_at: Union[str, None]

    @validator('title')
    def title_validator(cls, v):
        if not v or len(v) < 3 or len(v) > 20:
            raise ValueError('Title is not valid, and it should be 3-20 characters long')
        return v
