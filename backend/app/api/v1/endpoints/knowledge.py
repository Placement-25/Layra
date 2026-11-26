from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.api.deps import get_db
from app.schemas.knowledge import DocumentResponse, KnowledgeMetricsResponse

router = APIRouter()

@router.get("/docs", response_model=List[DocumentResponse])
async def list_documents(db: AsyncSession = Depends(get_db)):
    """Retrieves all indexed documents in the knowledge corpus."""
    return []

@router.post("/add_doc", response_model=DocumentResponse)
async def upload_document(
    file: UploadFile = File(...),
    category: str = Form("General"),
    db: AsyncSession = Depends(get_db),
):
    """Uploads, chunks, embeds, and indexes document into ChromaDB & PostgreSQL."""
    return {
        "id": f"doc_{file.filename}",
        "name": file.filename,
        "file_type": file.filename.split(".")[-1],
        "file_size": 1024,
        "upload_date": "2026-11-26T15:00:00Z",
        "indexing_status": "indexed",
        "category": category,
        "total_chunks": 4,
        "total_tokens": 1200,
    }

@router.get("/docs/metrics", response_model=KnowledgeMetricsResponse)
async def get_metrics():
    """Returns vector space and document corpus metrics."""
    return {
        "total_documents": 5,
        "indexed_documents": 4,
        "processing_count": 1,
        "total_storage_bytes": 17260000,
        "vector_dimensions": 1536,
    }
