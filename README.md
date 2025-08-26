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