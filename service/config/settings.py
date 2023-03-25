from pydantic import BaseSettings


class ConfigSettings(BaseSettings):
    mongo_uri: str = ""
    
    class Config:
        env_file = ".env"

settings = ConfigSettings()