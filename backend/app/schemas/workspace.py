from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class CitationSchema(BaseModel):
    id: str
    document_id: str
    document_title: str
    file_type: str
    page_number: Optional[int] = None
    section: Optional[str] = None
    snippet: str
    relevance_score: float

class ToolStepSchema(BaseModel):
    id: str
    tool_name: str
    status: str
    execution_time_ms: Optional[int] = None
    summary: str

class MessageCreate(BaseModel):
    conversation_id: Optional[str] = None
    content: str
    attachments: Optional[List[str]] = None

class MessageResponse(BaseModel):
    id: str
    role: str
    content: str
    timestamp: datetime
    tokens: int
    reasoning_time_seconds: Optional[float] = None
    sources: Optional[List[CitationSchema]] = None
    tool_steps: Optional[List[ToolStepSchema]] = None
    suggested_follow_ups: Optional[List[str]] = None

class ConversationResponse(BaseModel):
    id: str
    title: str
    created_at: datetime
    updated_at: datetime
    messages: List[MessageResponse]
    pinned: bool = False
