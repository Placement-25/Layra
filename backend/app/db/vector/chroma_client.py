import chromadb
from chromadb.config import Settings as ChromaSettings
from app.core.config import settings

class ChromaDBClient:
    def __init__(self):
        # Initializes connection to ChromaDB
        self.client = chromadb.HttpClient(
            host=settings.CHROMA_HOST,
            port=settings.CHROMA_PORT,
            settings=ChromaSettings(allow_reset=True, anonymized_telemetry=False)
        )
        self.document_collection = self.client.get_or_create_collection("layra_documents")
        self.chunk_collection = self.client.get_or_create_collection("layra_chunks")

    def query_chunks(self, query_embeddings: list, n_results: int = 5, where: dict = None):
        """Perform semantic similarity query on chunk vectors."""
        return self.chunk_collection.query(
            query_embeddings=query_embeddings,
            n_results=n_results,
            where=where,
        )

chroma_client = ChromaDBClient()
