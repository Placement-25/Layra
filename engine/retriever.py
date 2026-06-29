# Retriever Module for LAYRA
import re
from engine.document_store import store

def clean_text(text):
    """Normalize text for basic keyword matching."""
    return set(re.findall(r'\w+', text.lower()))

def hybrid_retrieve(query, top_k=2):
    """
    Simulates a Hybrid Retrieval Engine (BM25 + Semantic/Category boost).
    Calculates overlap scores and categories to rank documents.
    """
    query_words = clean_text(query)
    if not query_words:
        return [], 0.0

    scored_docs = []
    documents = store.get_all_documents()

    for doc in documents:
        # Title words get triple weight
        title_words = clean_text(doc["title"])
        content_words = clean_text(doc["content"])
        category_words = clean_text(doc["category"])
        
        # Calculate intersections
        title_match = len(query_words.intersection(title_words)) * 3.0
        content_match = len(query_words.intersection(content_words)) * 1.0
        category_match = len(query_words.intersection(category_words)) * 2.0
        
        # Keyword density score
        raw_score = title_match + content_match + category_match
        
        # Exact phrase match boost
        phrase_boost = 0.0
        cleaned_query = query.lower()
        if doc["title"].lower() in cleaned_query or cleaned_query in doc["title"].lower():
            phrase_boost += 5.0
        if cleaned_query in doc["content"].lower():
            phrase_boost += 3.0
            
        final_score = raw_score + phrase_boost
        if final_score > 0:
            scored_docs.append((doc, final_score))
            
    # Sort by score descending
    scored_docs.sort(key=lambda x: x[1], reverse=True)
    
    # Take top_k
    results = [item[0] for item in scored_docs[:top_k]]
    
    # Compute relative match confidence (0.4 to 0.95)
    if scored_docs:
        top_score = scored_docs[0][1]
        confidence = min(0.95, max(0.40, 0.40 + (top_score / 15.0) * 0.55))
    else:
        confidence = 0.40
        
    return results, confidence
