from sqlalchemy import Column, String, Text, Boolean, Integer, Numeric, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base import Base

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(String(64), primary_key=True)
    title = Column(String(255), nullable=False)
    user_id = Column(String(64), default="usr_default", nullable=False)
    pinned = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    meta_info = Column(JSON, default=dict)

    messages = relationship("Message", back_populates="conversation", cascade="all, delete-orphan")

class Message(Base):
    __tablename__ = "messages"

    id = Column(String(64), primary_key=True)
    conversation_id = Column(String(64), ForeignKey("conversations.id", ondelete="CASCADE"), nullable=False)
    role = Column(String(20), nullable=False)
    content = Column(Text, nullable=False)
    tokens = Column(Integer, default=0)
    reasoning_time_seconds = Column(Numeric(5, 2))
    created_at = Column(DateTime, default=datetime.utcnow)

    conversation = relationship("Conversation", back_populates="messages")
    citations = relationship("Citation", back_populates="message", cascade="all, delete-orphan")

class Citation(Base):
    __tablename__ = "citations"

    id = Column(String(64), primary_key=True)
    message_id = Column(String(64), ForeignKey("messages.id", ondelete="CASCADE"), nullable=False)
    document_id = Column(String(64), nullable=False)
    document_title = Column(String(255), nullable=False)
    file_type = Column(String(10), nullable=False)
    page_number = Column(Integer)
    section = Column(String(120))
    snippet = Column(Text, nullable=False)
    relevance_score = Column(Numeric(4, 3), nullable=False)

    message = relationship("Message", back_populates="citations")
