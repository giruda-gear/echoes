```
📦 root/
├── backend/
│   └── app/ (FastAPI)
│  
└── frontend/
```


```bash
# start docker containers (MongoDB)
docker compose up -d

# install dependencies
cd backend && uv sync

# run development server
(root) make dev
```