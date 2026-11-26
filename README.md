# LAYRA — Beyond Retrieval, Into Reasoning

> Next-generation AI-powered knowledge and reasoning platform.

LAYRA is designed to transcend traditional retrieval-augmented generation (RAG) by synthesizing cross-corpus evidence, executing multi-agent reasoning graphs, and providing transparent citation chains and visual workflow orchestration.

---

## 1. Monorepo Architecture Overview

The repository is organized into three clean layers:

```text
layra/
├── frontend/             # React 18, Vite, TypeScript, Tailwind CSS, @xyflow/react
├── backend/              # Python FastAPI, LangGraph, ChromaDB, Pydantic schemas
├── database/             # PostgreSQL 16+ DDL schemas, seeds, ChromaDB vector configs
├── docker-compose.yml    # Full-stack multi-container orchestration
├── package.json          # Root workspace scripts (delegates to frontend)
└── vercel.json           # Vercel deployment configuration
```

---

## 2. Primary Frontend Modules (`frontend/`)

1. **AI Workspace (`/workspace`, `/workspace/:chatId`)**
   - Immersive reasoning workspace with contextual evidence panels.
   - Grounded citations with document page references and match scores.
   - Real-time simulation of multi-step tool execution and response regeneration.
   - Pinned conversation history with local persistence.

2. **Knowledge Base (`/knowledge`, `/knowledge/:documentId`)**
   - Unified corpus repository with vector indexing metrics.
   - Drag-and-drop document ingestion for PDF, DOCX, TXT, CSV, and XLSX.
   - Deep inspection of document chunks, token budgets, and extracted semantic previews.
   - Grid and list view toggles with category and status filters.

3. **AI Agents (`/agents`, `/agents/:agentId`)**
   - Autonomous multi-agent control center.
   - Pre-configured specialized agents:
     - **Retrieval Agent** (Vector Search & BM25 keyword traversal)
     - **Analysis Agent** (Python & Pandas quantitative computation)
     - **Prediction Agent** (Scikit-learn trend modeling & risk forecasting)
     - **Response Agent** (Executive markdown synthesis with citation anchors)
   - Custom Agent creation modal with tool selection and temperature controls.

4. **Workflows (`/workflows`, `/workflows/:workflowId`)**
   - Node-based reasoning pipeline canvas powered by `@xyflow/react`.
   - Four production blueprints (Document Intelligence, Research Assistant, Data Pipeline, Knowledge Comparison).
   - Interactive canvas: add steps, drag nodes, connect handles, and edit properties.
   - Step-by-step visual pipeline execution simulation.

---

## 3. Quick Start & Local Development

### Prerequisites

- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher
- **Python**: v3.11+ (for backend)
- **Docker**: (Optional, for full-stack local deployment)

### Frontend Development

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies (if not already installed)
npm install

# Start Vite development server
npm run dev
```

Alternatively, from the project root:
```bash
npm run dev     # Automatically proxies to frontend
npm run build   # Compiles frontend production bundle
```

Open your browser at `http://localhost:3000`.

### Backend Development (`backend/`)

```bash
cd backend

# Create virtual environment & activate
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn app.main:app --reload --port 8000
```

### Full Stack with Docker Compose

```bash
# Start PostgreSQL, ChromaDB, FastAPI Backend, and Nginx Frontend
docker-compose up --build
```

---

## 4. Database Architecture (`database/`)

- `database/schema.sql`: 9 relational tables (conversations, messages, citations, documents, document_chunks, agents, agent_execution_logs, workflows, workflow_runs).
- `database/seed_data.sql`: Seed data for the 4 core reasoning agents.
- `database/vector_schema.json`: ChromaDB collections (`layra_documents`, `layra_chunks`).
- `database/init.sql`: Role & database provisioning.

---

## 5. Vercel Deployment

The project is pre-configured for Vercel deployment:
- **Root Directory**: `frontend` (or default root with the provided `vercel.json` and root `package.json`).
- **Build Command**: `npm run build`
- **Output Directory**: `dist` (or `frontend/dist`)
- **SPA Rewrites**: Included in both `vercel.json` files for seamless client-side routing on nested paths.

---

## 6. License

MIT License. Designed and engineered for LAYRA.
