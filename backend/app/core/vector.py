import chromadb
from pathlib import Path
from sentence_transformers import SentenceTransformer


CHROMA_STORE_PATH = Path(__file__).parent.parent.parent / "chroma_store"

client = None
diary_collection = None
model = None


def init_vector_store():
    global client, diary_collection, model
    if client is None:
        client = chromadb.PersistentClient(path=str(CHROMA_STORE_PATH))
        diary_collection = client.get_or_create_collection("diary_entries")
        model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")


def get_embedding(text: str):
    return model.encode(text, normalize_embeddings=True).tolist()


def save_diary_vector(user_id: str, diary_id: str, text: str):
    vector = get_embedding(text)
    diary_collection.add(
        ids=[diary_id],
        embeddings=[vector],
        documents=[text],
        metadatas=[{"user_id": user_id, "diary_id": diary_id}],
    )


def search_similar_diaries(user_id: str, query_text: str, top_k: int = 5):
    vector = get_embedding(query_text)
    results = diary_collection.query(
        query_embeddings=[vector], n_results=top_k, where={"user_id": user_id}
    )
    return results


def delete_diary_vector(diary_id: str):
    return diary_collection.delete(where={"diary_id": diary_id})
