-- Initial Seed Data for LAYRA Platform

-- Seed 4 Core Autonomous Agents
INSERT INTO agents (id, name, category, description, long_description, role, instructions, tools, status, icon_name, accent_color, model_name, temperature, total_invocations, avg_latency_ms, is_custom)
VALUES
(
    'agent_retrieval',
    'Retrieval Agent',
    'Knowledge Retrieval',
    'Traverses vector indices and knowledge graphs to isolate high-affinity citations.',
    'The Retrieval Agent executes hybrid semantic vector similarity queries paired with BM25 keyword lookups to retrieve precision evidence passages from the corpus.',
    'Autonomous knowledge crawler & context retriever',
    'Index incoming queries, perform dense vector retrieval using HNSW search, filter out noise with cross-encoder re-ranking, and return cited document chunks.',
    '["Vector Search (ChromaDB)", "BM25 Keyword Search", "Cross-Encoder Re-ranker"]'::jsonb,
    'active',
    'Search',
    '#55D6E8',
    'gemini-1.5-pro',
    0.10,
    1420,
    124,
    FALSE
),
(
    'agent_analysis',
    'Analysis Agent',
    'Data Analysis',
    'Executes programmatic computation, tabular decomposition, and statistical analysis.',
    'Leverages sandboxed Python execution and Pandas dataframes to compute mathematical ratios, statistical distributions, and extract quantitative matrices.',
    'Quantitative data analyst & dataframe processor',
    'Parse tabular datasets, generate descriptive statistics, detect outliers, and validate quantitative statements against ground truth data.',
    '["Python 3.11 Sandbox", "Pandas Dataframe", "NumPy Matrix Solver"]'::jsonb,
    'active',
    'BarChart3',
    '#8B7CFF',
    'gemini-1.5-pro',
    0.20,
    890,
    240,
    FALSE
),
(
    'agent_prediction',
    'Prediction Agent',
    'Predictive Intelligence',
    'Projects trend trajectories and evaluates risk probabilities using predictive modeling.',
    'Applies Scikit-learn regressors and classification algorithms on historical time-series telemetry to project prospective thresholds and trend variances.',
    'Predictive modeler & risk forecaster',
    'Ingest historical trend vectors, fit calibrated regressors, estimate confidence intervals (95% CI), and output probability surfaces for future states.',
    '["Scikit-learn", "Time-series Regressor", "Bayesian Forecaster"]'::jsonb,
    'idle',
    'TrendingUp',
    '#F3B96B',
    'gemini-1.5-flash',
    0.30,
    430,
    310,
    FALSE
),
(
    'agent_response',
    'Response Agent',
    'Response Generation',
    'Synthesizes multi-agent evidence into coherent, verifiable, and cited natural language.',
    'The final synthesis conductor: harmonizes retrieval findings, analysis charts, and predictive projections into clear, executive-grade answers.',
    'Synthesis orchestrator & natural language communicator',
    'Compile cited sources from the Retrieval Agent and quantitative outputs from the Analysis Agent into structured markdown responses.',
    '["LLM Orchestrator", "Context Manager", "Citation Anchor Engine"]'::jsonb,
    'active',
    'MessageSquareText',
    '#39C99A',
    'gemini-1.5-pro',
    0.40,
    2150,
    512,
    FALSE
)
ON CONFLICT (id) DO NOTHING;
