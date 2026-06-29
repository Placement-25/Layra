// LAYRA RAG Dashboard JavaScript Controller

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const q = document.getElementById('q');
    const go = document.getElementById('go');
    const out = document.getElementById('out');
    
    const traceBox = document.getElementById('trace-box');
    const traceSteps = document.getElementById('trace-steps');
    
    const metricsBox = document.getElementById('metrics-box');
    const confidenceBadge = document.getElementById('confidence-badge');
    const confidenceBar = document.getElementById('confidence-bar');
    const domainBadge = document.getElementById('domain-badge');
    
    const citationsBox = document.getElementById('citations-box');
    const citationsList = document.getElementById('citations-list');
    
    const docCountMetric = document.getElementById('doc-count-metric');
    const documentList = document.getElementById('document-list');
    
    const addDocForm = document.getElementById('add-doc-form');
    
    // Agent toggles
    const agents = {
        battery: document.getElementById('agent-battery'),
        finance: document.getElementById('agent-finance'),
        legal: document.getElementById('agent-legal'),
        medical: document.getElementById('agent-medical')
    };

    // Helper functions
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    
    function toast(msg) {
        const t = document.getElementById('toast');
        t.textContent = msg;
        t.classList.add('show');
        setTimeout(() => {
            t.classList.remove('show');
        }, 3000);
    }

    // Mobile Tab switching logic
    const tabButtons = document.querySelectorAll('.tab-btn');
    const panels = {
        'workspace-panel': document.getElementById('workspace-panel'),
        'right-panel': document.getElementById('right-panel'),
        'left-panel': document.getElementById('left-panel')
    };

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetId = btn.getAttribute('data-target');
            Object.values(panels).forEach(panel => {
                if (panel) {
                    panel.classList.remove('active-panel');
                }
            });
            if (panels[targetId]) {
                panels[targetId].classList.add('active-panel');
            }
        });
    });

    // Dynamic document loading
    async function loadDocuments() {
        try {
            const res = await fetch('/docs');
            if (!res.ok) throw new Error("Failed to fetch documents");
            const data = await res.json();
            
            // Update stats
            docCountMetric.textContent = `${data.documents.length} Docs`;
            
            // Render explorer list
            documentList.innerHTML = '';
            data.documents.forEach(doc => {
                const item = document.createElement('div');
                item.className = 'document-item';
                item.innerHTML = `
                    <div class="doc-cat">${doc.category}</div>
                    <div class="doc-title">${doc.title}</div>
                    <div class="doc-body">${doc.content}</div>
                `;
                documentList.appendChild(item);
            });
        } catch (err) {
            console.error(err);
            toast("Error loading document index");
        }
    }

    // Token streaming
    async function streamTokens(text) {
        out.innerHTML = '';
        const words = text.split(/(\s+)/);
        for (const w of words) {
            const span = document.createElement('span');
            span.className = 'token';
            span.textContent = w;
            out.appendChild(span);
            await sleep(10 + Math.random() * 20);
        }
    }

    // Add Document Ingestion Form handler
    if (addDocForm) {
        addDocForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const title = document.getElementById('doc-title-input').value.trim();
            const category = document.getElementById('doc-cat-select').value;
            const content = document.getElementById('doc-content-input').value.trim();
            const url = document.getElementById('doc-url-input').value.trim();
            
            try {
                const res = await fetch('/add_doc', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, category, content, url })
                });
                
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Failed to add document");
                }
                
                toast("🚀 Document ingested successfully!");
                addDocForm.reset();
                
                // Reload explorer database
                await loadDocuments();
            } catch (err) {
                console.error(err);
                toast(`Upload error: ${err.message}`);
            }
        });
    }

    // Query Submission Handler
    async function runQuery() {
        const queryText = q.value.trim();
        if (!queryText) {
            q.focus();
            toast("Please enter a query prompt.");
            return;
        }

        // Gather enabled agent settings
        const enabledAgents = [];
        for (const [key, checkbox] of Object.entries(agents)) {
            if (checkbox && checkbox.checked) {
                enabledAgents.push(key);
            }
        }

        // Reset UI Components
        out.innerHTML = '<span style="color:var(--text-muted);">Contacting orchestration layer...</span>';
        traceBox.style.display = 'none';
        traceSteps.innerHTML = '';
        metricsBox.style.display = 'none';
        citationsBox.style.display = 'none';
        citationsList.innerHTML = '';

        try {
            const res = await fetch('/query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: queryText,
                    enabled_agents: enabledAgents
                })
            });

            if (!res.ok) {
                throw new Error(`Server returned error: ${res.status}`);
            }

            const data = await res.json();

            // 1. Show trace box and animate trace steps
            traceBox.style.display = 'block';
            for (let i = 0; i < data.trace.length; i++) {
                const stepText = data.trace[i];
                const stepDiv = document.createElement('div');
                stepDiv.className = 'trace-step active';
                stepDiv.innerHTML = `<span class="trace-icon">⏳</span> <span>${stepText}</span>`;
                traceSteps.appendChild(stepDiv);
                
                // Animate scroll with step updates
                traceBox.scrollTop = traceBox.scrollHeight;
                
                await sleep(350);
                
                stepDiv.className = 'trace-step success';
                stepDiv.innerHTML = `<span class="trace-icon">✔</span> <span>${stepText}</span>`;
            }

            // 2. Render telemetry/metrics metadata
            const confidencePct = Math.round(data.confidence * 100);
            confidenceBadge.textContent = `${confidencePct}%`;
            confidenceBar.style.width = `${confidencePct}%`;
            
            // Extract routed labels
            let routedLabel = 'General';
            if (data.citations && data.citations.length > 0) {
                const cats = [...new Set(data.citations.map(c => c.title.split(' ')[0]))];
                routedLabel = cats.join(' / ');
            }
            domainBadge.textContent = `Routed Domains: ${routedLabel}`;
            metricsBox.style.display = 'flex';

            // 3. Stream Response
            await streamTokens(data.answer);

            // 4. Render Citations
            if (data.citations && data.citations.length > 0) {
                data.citations.forEach(c => {
                    const card = document.createElement('a');
                    card.className = 'citation-card';
                    card.href = c.url;
                    card.target = '_blank';
                    card.innerHTML = `
                        <div class="citation-title">${c.title}</div>
                        <div class="citation-snippet">${c.snippet}</div>
                    `;
                    citationsList.appendChild(card);
                });
                citationsBox.style.display = 'block';
            }
        } catch (err) {
            console.error(err);
            out.innerHTML = `<span style="color:#ff5f56; font-weight:bold;">Orchestration Failure: ${err.message}</span><br/><span style="color:var(--text-muted); font-size:12px;">Check if the Flask server is operating.</span>`;
            toast("Connection failed");
        }
    }

    // Wire listeners
    go.addEventListener('click', runQuery);
    q.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            runQuery();
        }
    });

    // Initial corpus load
    loadDocuments();
});
