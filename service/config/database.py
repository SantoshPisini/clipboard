from config.settings import settings

import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient(settings.mongo_uri)

database = client["clipboard"]

page_collection = database["pages"]