## RAG-based tool to track repeated expressions in diary entries
- Collects diary entries from this repo  
- Indexes them in a vector database  
- Uses RAG to search and highlight previously used expressions  


```
📦 root/
├── backend/src/backend/ (uv workspace)
│   └── app/ (FastAPI)
│  
└── frontend/
```

```bash
# start docker containers (MongoDB & ChromaDB)
docker compose up -d

# install dependencies
cd backend && uv sync

# run development server
cd backend && uv run uvicorn app.main:app 


# install dependencies (frontend)
cd frontend && pnpm install
```