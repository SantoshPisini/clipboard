from pydantic import BaseSettings


class ConfigSettings(BaseSettings):
    mongo_uri: str = ""
    ui_url: str = ""
    
    class Config:
        env_file = ".env"

settings = ConfigSettings()