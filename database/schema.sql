-- ==============================================================================
-- LAYRA DATABASE SCHEMA (PostgreSQL 16+)
-- Beyond Retrieval, Into Reasoning
-- ==============================================================================

-- Enable UUID and Vector extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CONVERSATIONS TABLE
CREATE TABLE IF NOT EXISTS conversations (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    user_id VARCHAR(64) NOT NULL DEFAULT 'usr_default',
    pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- 2. MESSAGES TABLE
CREATE TABLE IF NOT EXISTS messages (
    id VARCHAR(64) PRIMARY KEY,
    conversation_id VARCHAR(64) NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    tokens INTEGER DEFAULT 0,
    reasoning_time_seconds NUMERIC(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. CITATIONS TABLE (Evidence Grounding)
CREATE TABLE IF NOT EXISTS citations (
    id VARCHAR(64) PRIMARY KEY,
    message_id VARCHAR(64) NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    document_id VARCHAR(64) NOT NULL,
    document_title VARCHAR(255) NOT NULL,
    file_type VARCHAR(10) NOT NULL,
    page_number INTEGER,
    section VARCHAR(120),
    snippet TEXT NOT NULL,
    relevance_score NUMERIC(4,3) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. DOCUMENTS TABLE (Knowledge Base Corpus)
CREATE TABLE IF NOT EXISTS documents (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    file_type VARCHAR(10) NOT NULL CHECK (file_type IN ('pdf', 'docx', 'txt', 'csv', 'xlsx')),
    file_size BIGINT NOT NULL,
    storage_path VARCHAR(512),
    indexing_status VARCHAR(20) NOT NULL DEFAULT 'queued' CHECK (indexing_status IN ('indexed', 'processing', 'queued', 'failed')),
    category VARCHAR(100) NOT NULL DEFAULT 'General',
    total_chunks INTEGER DEFAULT 0,
    total_tokens INTEGER DEFAULT 0,
    summary TEXT,
    extracted_preview TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. DOCUMENT CHUNKS TABLE (Semantic Partitions)
CREATE TABLE IF NOT EXISTS document_chunks (
    id VARCHAR(64) PRIMARY KEY,
    document_id VARCHAR(64) NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    chunk_index INTEGER NOT NULL,
    text_content TEXT NOT NULL,
    token_count INTEGER NOT NULL,
    vector_id VARCHAR(128),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. AI AGENTS TABLE
CREATE TABLE IF NOT EXISTS agents (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    category VARCHAR(60) NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    role VARCHAR(120) NOT NULL,
    instructions TEXT NOT NULL,
    tools JSONB NOT NULL DEFAULT '[]'::jsonb,
    status VARCHAR(20) NOT NULL DEFAULT 'idle' CHECK (status IN ('active', 'idle', 'executing')),
    icon_name VARCHAR(50) DEFAULT 'Bot',
    accent_color VARCHAR(10) DEFAULT '#8B7CFF',
    model_name VARCHAR(80) DEFAULT 'gemini-1.5-pro',
    temperature NUMERIC(3,2) DEFAULT 0.20,
    total_invocations INTEGER DEFAULT 0,
    avg_latency_ms INTEGER DEFAULT 0,
    is_custom BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. AGENT EXECUTION LOGS
CREATE TABLE IF NOT EXISTS agent_execution_logs (
    id VARCHAR(64) PRIMARY KEY,
    agent_id VARCHAR(64) NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
    action VARCHAR(255) NOT NULL,
    duration_ms INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('success', 'warning', 'error')),
    query_sample TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. WORKFLOWS TABLE
CREATE TABLE IF NOT EXISTS workflows (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('active', 'draft', 'archived')),
    nodes JSONB NOT NULL DEFAULT '[]'::jsonb,
    edges JSONB NOT NULL DEFAULT '[]'::jsonb,
    nodes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. WORKFLOW EXECUTION RUNS
CREATE TABLE IF NOT EXISTS workflow_runs (
    id VARCHAR(64) PRIMARY KEY,
    workflow_id VARCHAR(64) NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('running', 'success', 'failed')),
    execution_time_ms INTEGER NOT NULL,
    execution_logs JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES for Query Optimization
CREATE INDEX IF NOT EXISTS idx_messages_conv_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_citations_msg_id ON citations(message_id);
CREATE INDEX IF NOT EXISTS idx_chunks_doc_id ON document_chunks(document_id);
CREATE INDEX IF NOT EXISTS idx_logs_agent_id ON agent_execution_logs(agent_id);
