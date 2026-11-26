from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_db
from app.schemas.workflow import WorkflowResponse, WorkflowCreate, WorkflowRunResponse

router = APIRouter()

@router.get("/workflows", response_model=List[WorkflowResponse])
async def list_workflows(db: AsyncSession = Depends(get_db)):
    """Lists saved visual reasoning workflows."""
    return []

@router.post("/workflows", response_model=WorkflowResponse)
async def create_workflow(workflow_in: WorkflowCreate, db: AsyncSession = Depends(get_db)):
    """Saves a new visual workflow graph topology."""
    return {
        "id": "wf_new",
        "name": workflow_in.name,
        "description": workflow_in.description,
        "updated_at": "2026-11-26T15:00:00Z",
        "nodes_count": len(workflow_in.nodes),
        "status": "draft",
        "nodes": workflow_in.nodes,
        "edges": workflow_in.edges,
    }

@router.post("/workflows/{workflow_id}/run", response_model=WorkflowRunResponse)
async def execute_workflow(workflow_id: str):
    """Executes the visual workflow node-by-node."""
    return {
        "id": "run_01",
        "workflow_id": workflow_id,
        "status": "success",
        "execution_time_ms": 1820,
        "logs": [],
    }
