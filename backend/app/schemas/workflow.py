from typing import List, Dict, Any, Optional
from pydantic import BaseModel
from datetime import datetime

class WorkflowCreate(BaseModel):
    name: str
    description: Optional[str] = None
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

class WorkflowResponse(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    updated_at: datetime
    nodes_count: int
    status: str
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]
    last_run_status: Optional[str] = "idle"

class WorkflowRunResponse(BaseModel):
    id: str
    workflow_id: str
    status: str
    execution_time_ms: int
    logs: List[Dict[str, Any]]
