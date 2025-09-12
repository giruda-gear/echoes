## RAG-based tool to track repeated expressions in diary entries
- Collects diary entries from this repo  
- Indexes them in a vector database  
- Uses RAG to search and highlight previously used expressions  


```
📦 root/
├── backend
│   └── app/ (FastAPI)
│  
├── frontend
│   └── app/ (Remix)
```

```bash
# start docker containers (MongoDB & ChromaDB)
docker compose up -d

# install dependencies (backend)
cd backend && uv sync

# run development server
cd backend && uv run uvicorn app.main:app 

# install dependencies (frontend)
cd frontend && pnpm install

# run development server
cd frontend && pnpm dev
```