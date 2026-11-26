from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class ChunkSchema(BaseModel):
    id: str
    chunk_index: int
    text: str
    token_count: int
    embedding_dimension: int = 1536

class DocumentCreate(BaseModel):
    name: str
    category: str
    content: Optional[str] = None

class DocumentResponse(BaseModel):
    id: str
    name: str
    file_type: str
    file_size: int
    upload_date: datetime
    indexing_status: str
    category: str
    total_chunks: int
    total_tokens: int
    summary: Optional[str] = None
    extracted_preview: Optional[str] = None
    chunks: Optional[List[ChunkSchema]] = None

class KnowledgeMetricsResponse(BaseModel):
    total_documents: int
    indexed_documents: int
    processing_count: int
    total_storage_bytes: int
    vector_dimensions: int = 1536
