from models.page_model import PageModel

import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient('')

database = client["clipboard"]

page_collection = database["pages"]