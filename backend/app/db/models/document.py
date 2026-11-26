from sqlalchemy import Column, String, Text, Integer, BigInteger, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(String(64), primary_key=True)
    name = Column(String(255), nullable=False)
    file_type = Column(String(10), nullable=False)
    file_size = Column(BigInteger, nullable=False)
    storage_path = Column(String(512))
    indexing_status = Column(String(20), default="queued", nullable=False)
    category = Column(String(100), default="General", nullable=False)
    total_chunks = Column(Integer, default=0)
    total_tokens = Column(Integer, default=0)
    summary = Column(Text)
    extracted_preview = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    chunks = relationship("DocumentChunk", back_populates="document", cascade="all, delete-orphan")

class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(String(64), primary_key=True)
    document_id = Column(String(64), ForeignKey("documents.id", ondelete="CASCADE"), nullable=False)
    chunk_index = Column(Integer, nullable=False)
    text_content = Column(Text, nullable=False)
    token_count = Column(Integer, nullable=False)
    vector_id = Column(String(128))

    document = relationship("Document", back_populates="chunks")
