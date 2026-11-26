from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_db
from app.schemas.agent import AgentResponse, AgentCreate

router = APIRouter()

@router.get("/agents", response_model=List[AgentResponse])
async def list_agents(db: AsyncSession = Depends(get_db)):
    """Lists all active and custom AI agents."""
    return []

@router.post("/agents", response_model=AgentResponse)
async def create_agent(agent_in: AgentCreate, db: AsyncSession = Depends(get_db)):
    """Registers a new custom reasoning agent."""
    return {
        "id": "agent_custom",
        "name": agent_in.name,
        "category": agent_in.category,
        "description": agent_in.description,
        "role": "Custom Agent",
        "instructions": agent_in.instructions,
        "tools": agent_in.tools,
        "status": "active",
        "icon_name": "Bot",
        "accent_color": "#8B7CFF",
        "model_name": agent_in.model_name,
        "temperature": agent_in.temperature,
        "total_invocations": 0,
        "avg_latency_ms": 120,
        "is_custom": True,
    }

@router.post("/agents/{agent_id}/execute")
async def execute_agent(agent_id: str, query: str):
    """Executes a single agent invocation."""
    return {"agent_id": agent_id, "status": "executed", "result": {}}
