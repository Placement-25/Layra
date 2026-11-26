from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_db, get_current_user_id
from app.schemas.workspace import MessageCreate, MessageResponse, ConversationResponse
from app.engine.agents.graph import graph_engine

router = APIRouter()

@router.post("/query", response_model=MessageResponse)
async def process_reasoning_query(
    payload: MessageCreate,
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(get_current_user_id),
):
    """Processes RAG query through multi-agent LangGraph reasoning pipeline."""
    result = await graph_engine.execute_reasoning_pipeline(
        query=payload.content,
        conversation_id=payload.conversation_id or "new",
    )
    return {
        "id": "msg_simulated",
        "role": "assistant",
        "content": result["synthesized_response"],
        "timestamp": "2026-11-26T15:00:00Z",
        "tokens": 280,
        "reasoning_time_seconds": 1.4,
        "sources": [],
        "tool_steps": [],
        "suggested_follow_ups": [],
    }
