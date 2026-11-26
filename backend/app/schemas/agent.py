from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class AgentLogSchema(BaseModel):
    id: str
    timestamp: datetime
    action: str
    duration_ms: int
    status: str
    query_sample: Optional[str] = None

class AgentCreate(BaseModel):
    name: str
    category: str
    description: str
    instructions: str
    tools: List[str]
    temperature: float = 0.2
    model_name: str = "gemini-1.5-pro"

class AgentResponse(BaseModel):
    id: str
    name: str
    category: str
    description: str
    long_description: Optional[str] = None
    role: str
    instructions: str
    tools: List[str]
    status: str
    icon_name: str
    accent_color: str
    model_name: str
    temperature: float
    total_invocations: int
    avg_latency_ms: int
    execution_history: Optional[List[AgentLogSchema]] = None
    is_custom: bool = False
