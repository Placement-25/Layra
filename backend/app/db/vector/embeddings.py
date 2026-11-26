from typing import List

class EmbeddingService:
    def __init__(self):
        # Stub for Gemini / SentenceTransformers embedding generator
        self.dimension = 1536

    async def get_embeddings(self, texts: List[str]) -> List[List[float]]:
        """Generates 1536-dimensional embeddings for incoming texts."""
        # Ready for google.genai.Client or SentenceTransformer integration
        return [[0.0] * self.dimension for _ in texts]

embedding_service = EmbeddingService()
