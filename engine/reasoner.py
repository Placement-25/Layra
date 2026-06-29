# Reasoner Module for LAYRA
import re
import json
import urllib.request
import urllib.error
from engine.retriever import hybrid_retrieve

AGENT_MAP = {
    "battery": "Battery Technology",
    "finance": "Finance & Markets",
    "legal": "Legal & Compliance",
    "medical": "Healthcare & Medicine"
}

def get_ollama_model():
    """Queries local Ollama tags API to find the first active model name."""
    try:
        req = urllib.request.Request("http://localhost:11434/api/tags")
        with urllib.request.urlopen(req, timeout=1.5) as response:
            data = json.loads(response.read().decode('utf-8'))
            models = data.get("models", [])
            if models:
                return models[0]["name"]
    except Exception:
        pass
    return None

def query_ollama(model, prompt):
    """Sends prompt to local Ollama server and returns synthesized output."""
    try:
        payload = {
            "model": model,
            "prompt": prompt,
            "stream": False
        }
        data = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(
            "http://localhost:11434/api/generate",
            data=data,
            headers={'Content-Type': 'application/json'}
        )
        with urllib.request.urlopen(req, timeout=8.0) as response:
            res = json.loads(response.read().decode('utf-8'))
            return res.get("response", "").strip()
    except Exception:
        return None

def extract_key_sentences(query, text, doc_title, max_sentences=3):
    """
    Splits text into sentences and ranks them by word/bigram overlap with the query.
    Used for pure Python local dynamic synthesis fallback.
    """
    # Clean query into lowercase words
    query_words = set(re.findall(r'\w+', query.lower()))
    if not query_words:
        return []
        
    query_bigrams = set(zip(list(query_words)[:-1], list(query_words)[1:]))
    
    # Split text into sentences
    sentences = re.split(r'(?<=[.!?])\s+', text)
    scored_sentences = []
    
    for sent in sentences:
        sent_clean = sent.strip()
        if not sent_clean:
            continue
            
        sent_words = re.findall(r'\w+', sent_clean.lower())
        sent_word_set = set(sent_words)
        
        # Calculate matching overlap
        overlap = len(query_words.intersection(sent_word_set))
        
        # Calculate bigram matches
        sent_bigrams = set(zip(sent_words[:-1], sent_words[1:]))
        bigram_overlap = len(query_bigrams.intersection(sent_bigrams))
        
        # Title match bonus
        title_words = set(re.findall(r'\w+', doc_title.lower()))
        title_overlap = len(title_words.intersection(sent_word_set))
        
        score = (overlap * 2.0) + (bigram_overlap * 3.0) + (title_overlap * 0.5)
        
        if score > 0:
            scored_sentences.append((sent_clean, score))
            
    # Sort sentences by score descending
    scored_sentences.sort(key=lambda x: x[1], reverse=True)
    
    # Return top N sentences
    results = [s[0] for s in scored_sentences[:max_sentences]]
    
    # Fallback to first few sentences if no matches scored
    if not results and sentences:
        results = [s.strip() for s in sentences[:max_sentences] if s.strip()]
        
    return results

def generate_reasoned_answer(query, docs):
    """
    Synthesizes retrieved facts to form a dynamic answer.
    First tries local Ollama, then falls back to local TF-IDF sentence-extraction.
    """
    if not docs:
        return (
            "I could not find any active, relevant documentation in my knowledge base to answer your query. "
            "Please check if the relevant expert agents are enabled, or upload custom documents to expand the search."
        )

    # 1. Try local Ollama model if running
    active_model = get_ollama_model()
    if active_model:
        # Construct RAG context
        context_blocks = []
        for i, doc in enumerate(docs, 1):
            context_blocks.append(f"[{i}] Source: {doc['title']} ({doc['category']})\nContent: {doc['content']}")
            
        context_text = "\n\n".join(context_blocks)
        prompt = (
            "You are LAYRA, an AI Reasoning Engine.\n"
            "Answer the user's query based ONLY on the following retrieved context documents.\n"
            "If the context does not contain the answer, synthesize the closest possible response from the context, or state what is missing.\n"
            "Keep the answer concise, grounded, and informative. Reference the citations [1] or [2] matching the sources.\n\n"
            f"Context:\n{context_text}\n\n"
            f"User Query: {query}\n"
            "Reasoned Answer:"
        )
        ollama_response = query_ollama(active_model, prompt)
        if ollama_response:
            return f"[Ollama AI generated using {active_model}]\n\n{ollama_response}"

    # 2. Local Fallback: Dynamic Sentence Extraction & Synthesis
    answer = "Based on the retrieved context, here is the dynamically synthesized breakdown:\n\n"
    
    for i, doc in enumerate(docs, 1):
        key_points = extract_key_sentences(query, doc["content"], doc["title"])
        
        answer += f"**From {doc['category']} ({doc['title']}) [{i}]:**\n"
        if key_points:
            for pt in key_points:
                # Add bullet points
                answer += f"• {pt}\n"
        else:
            # Fallback if no specific sentences extract
            answer += f"• {doc['content'][:150]}...\n"
            
        answer += "\n"
        
    answer += f"Citations: " + ", ".join([f"[{idx}] {d['title']}" for idx, d in enumerate(docs, 1)])
    return answer.strip()

def process_reasoning(query, enabled_agents=None):
    """
    Executes the planning, retrieval, multi-agent filter, and reasoning synthesis.
    """
    if enabled_agents is None:
        enabled_agents = ["battery", "finance", "legal", "medical"]

    # 1. Routing / Domain Check
    query_lower = query.lower()
    routed_domains = []
    
    # Map raw query to potential categories
    possible_categories = []
    if any(k in query_lower for k in ["battery", "charging", "runaway", "dendrite"]):
        possible_categories.append("Battery Technology")
        routed_domains.append("Battery Expert")
    if any(k in query_lower for k in ["finance", "market", "forecast", "predict", "automl", "churn"]):
        possible_categories.append("Finance & Markets")
        routed_domains.append("Markets Expert")
    if any(k in query_lower for k in ["legal", "compliance", "gdpr", "ccpa", "privacy"]):
        possible_categories.append("Legal & Compliance")
        routed_domains.append("Compliance Expert")
    if any(k in query_lower for k in ["medical", "implant", "pacemaker", "clinical", "health"]):
        possible_categories.append("Healthcare & Medicine")
        routed_domains.append("Medical Expert")

    trace = []
    
    # 2. Plan trace
    if routed_domains:
        trace.append(f"[PLAN] Analyzing query intent. Routing to specialized agents: {', '.join(routed_domains)}")
    else:
        trace.append("[PLAN] Analyzing query intent. No matching system domain agents; routing to general agent.")

    # Check agent status
    active_categories = []
    ignored_agents = []
    for agent_key, cat_name in AGENT_MAP.items():
        if agent_key in enabled_agents:
            active_categories.append(cat_name)
        else:
            ignored_agents.append(agent_key.upper())

    if ignored_agents:
        trace.append(f"[PLAN] Status check: Agent modules {', '.join(ignored_agents)} are DISABLED in system configs.")

    # 3. Retrieve
    retrieved_docs, raw_confidence = hybrid_retrieve(query, top_k=2)
    trace.append(f"[RETRIEVE] Consulted hybrid document store. Found {len(retrieved_docs)} potential matching documents.")

    # Filter retrieved docs based on active categories
    filtered_docs = []
    for doc in retrieved_docs:
        # Custom documents are always enabled
        if doc["id"].startswith("custom_doc_") or doc["category"] in active_categories:
            filtered_docs.append(doc)
        else:
            trace.append(f"[ROUTE] Blocked retrieval of '{doc['title']}' because the {doc['category']} agent is disabled.")

    # Calculate final confidence
    if retrieved_docs and not filtered_docs:
        # Matches were found but blocked
        confidence = 0.40
        trace.append("[FUSION] Warning: All matching candidate contexts were blocked by active agent filters.")
    elif filtered_docs:
        confidence = raw_confidence
        trace.append(f"[FUSION] Consolidated contexts from: {', '.join([d['title'] for d in filtered_docs])} using Reciprocal Rank Fusion.")
    else:
        confidence = 0.40
        trace.append("[FUSION] Zero documents retrieved from database.")

    # Determine if using Ollama or Fallback
    active_model = get_ollama_model()
    if active_model and filtered_docs:
        trace.append(f"[REASON] Reasoning engine: Connected to local Ollama. Executing model `{active_model}`.")
    else:
        trace.append("[REASON] Reasoning engine: Ollama offline/no models. Executing dynamic sentence-extraction synthesizer.")

    # 5. Synthesize
    answer = generate_reasoned_answer(query, filtered_docs)
    trace.append(f"[SYNTHESIS] Synthesis complete. Computed grounding confidence rating: {confidence:.2f}")

    citations = []
    for doc in filtered_docs:
        citations.append({
            "title": doc["title"],
            "url": doc["url"],
            "snippet": doc["content"][:120] + "..." if len(doc["content"]) > 120 else doc["content"]
        })

    return {
        "answer": answer,
        "citations": citations,
        "confidence": confidence,
        "trace": trace
    }
