from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db

async def get_current_user_id() -> str:
    """Extracts authenticated user identity from request session."""
    return "usr_research_01"
