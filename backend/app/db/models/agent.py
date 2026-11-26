from sqlalchemy import Column, String, Text, Boolean, Integer, Numeric, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base import Base

class Agent(Base):
    __tablename__ = "agents"

    id = Column(String(64), primary_key=True)
    name = Column(String(120), nullable=False)
    category = Column(String(60), nullable=False)
    description = Column(Text, nullable=False)
    long_description = Column(Text)
    role = Column(String(120), nullable=False)
    instructions = Column(Text, nullable=False)
    tools = Column(JSON, default=list, nullable=False)
    status = Column(String(20), default="idle", nullable=False)
    icon_name = Column(String(50), default="Bot")
    accent_color = Column(String(10), default="#8B7CFF")
    model_name = Column(String(80), default="gemini-1.5-pro")
    temperature = Column(Numeric(3, 2), default=0.20)
    total_invocations = Column(Integer, default=0)
    avg_latency_ms = Column(Integer, default=0)
    is_custom = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    logs = relationship("AgentExecutionLog", back_populates="agent", cascade="all, delete-orphan")

class AgentExecutionLog(Base):
    __tablename__ = "agent_execution_logs"

    id = Column(String(64), primary_key=True)
    agent_id = Column(String(64), ForeignKey("agents.id", ondelete="CASCADE"), nullable=False)
    action = Column(String(255), nullable=False)
    duration_ms = Column(Integer, nullable=False)
    status = Column(String(20), nullable=False)
    query_sample = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    agent = relationship("Agent", back_populates="logs")
