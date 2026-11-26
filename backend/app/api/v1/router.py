from fastapi import APIRouter
from app.api.v1.endpoints import workspace, knowledge, agents, workflows

api_router = APIRouter()

api_router.include_router(workspace.router, tags=["AI Workspace"])
api_router.include_router(knowledge.router, tags=["Knowledge Base"])
api_router.include_router(agents.router, tags=["AI Agents"])
api_router.include_router(workflows.router, tags=["Workflows"])
