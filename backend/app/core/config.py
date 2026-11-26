from typing import List, Union
from pydantic import AnyHttpUrl, validator
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "LAYRA — Beyond Retrieval, Into Reasoning"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "temporary-secret-key-for-development"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[Union[str, AnyHttpUrl]] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

    # Database
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_USER: str = "layra_user"
    POSTGRES_PASSWORD: str = "layra_secure_password"
    POSTGRES_DB: str = "layra_db"
    POSTGRES_PORT: int = 5432

    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    # ChromaDB
    CHROMA_HOST: str = "localhost"
    CHROMA_PORT: int = 8000

    # LLM API
    GEMINI_API_KEY: str = ""
    OPENAI_API_KEY: str = ""

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
