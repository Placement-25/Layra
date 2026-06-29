from flask import Flask, render_template, request, jsonify
from engine import store, process_reasoning

app = Flask(__name__)

@app.route('/')
def home():
    """Renders the main dashboard page."""
    return render_template('index.html')

@app.route('/query', methods=['POST'])
def handle_query():
    """Processes RAG query through the reasoning pipeline."""
    data = request.get_json() or {}
    query = data.get("query", "").strip()
    enabled_agents = data.get("enabled_agents", ["battery", "finance", "legal", "medical"])
    
    if not query:
        return jsonify({"error": "Query cannot be empty"}), 400
        
    result = process_reasoning(query, enabled_agents=enabled_agents)
    return jsonify(result)

@app.route('/docs', methods=['GET'])
def get_documents():
    """API endpoint to retrieve all documents currently in the corpus."""
    docs = store.get_all_documents()
    return jsonify({"documents": docs})

@app.route('/add_doc', methods=['POST'])
def add_document():
    """API endpoint to dynamically add custom snippets to the RAG database."""
    data = request.get_json() or {}
    title = data.get("title", "").strip()
    category = data.get("category", "").strip()
    content = data.get("content", "").strip()
    url = data.get("url", "").strip() or None
    
    if not title or not category or not content:
        return jsonify({"error": "Title, Category, and Content are required fields."}), 400
        
    try:
        new_doc = store.add_document(title=title, category=category, content=content, url=url)
        return jsonify({"success": True, "document": new_doc}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)