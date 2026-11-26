# LAYRA Database Architecture

## Overview
LAYRA utilizes a dual-database architecture:
1. **PostgreSQL 16+**: Relational data store for structured entities (conversations, messages, citations, agent configurations, execution logs, workflow graph topologies, and audit traces).
2. **ChromaDB**: Dedicated vector database storing dense embeddings (`text-embedding-004` or `SentenceTransformers`) for hybrid similarity searches.

## Files
- `schema.sql`: Full DDL defining 9 relational tables and indexes.
- `seed_data.sql`: Seed definitions for the 4 core agents (Retrieval, Analysis, Prediction, Response).
- `vector_schema.json`: Schema definition for ChromaDB collections (`layra_documents`, `layra_chunks`).
- `init.sql`: Initial database and role provisioning.

## Initialization
```bash
# Initialize PostgreSQL schema
psql -U postgres -d layra_db -f schema.sql
psql -U postgres -d layra_db -f seed_data.sql
```
