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
# start docker containers (MongoDB)
docker compose up -d

# install dependencies
uv sync

# run development server
(root) make dev
```