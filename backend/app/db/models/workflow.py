from sqlalchemy import Column, String, Text, Integer, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base import Base

class Workflow(Base):
    __tablename__ = "workflows"

    id = Column(String(64), primary_key=True)
    name = Column(String(200), nullable=False)
    description = Column(Text)
    status = Column(String(20), default="draft", nullable=False)
    nodes = Column(JSON, default=list, nullable=False)
    edges = Column(JSON, default=list, nullable=False)
    nodes_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    runs = relationship("WorkflowRun", back_populates="workflow", cascade="all, delete-orphan")

class WorkflowRun(Base):
    __tablename__ = "workflow_runs"

    id = Column(String(64), primary_key=True)
    workflow_id = Column(String(64), ForeignKey("workflows.id", ondelete="CASCADE"), nullable=False)
    status = Column(String(20), nullable=False)
    execution_time_ms = Column(Integer, nullable=False)
    execution_logs = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)

    workflow = relationship("Workflow", back_populates="runs")
