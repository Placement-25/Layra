export const API_ENDPOINTS = {
  // Query & Reasoning endpoints
  REASONING_QUERY: '/query',
  STREAM_REASONING: '/query/stream',

  // Knowledge base endpoints
  DOCUMENTS_LIST: '/docs',
  DOCUMENT_UPLOAD: '/add_doc',
  DOCUMENT_CHUNKS: (id: string) => `/docs/${id}/chunks`,

  // Multi-agent endpoints
  AGENTS_LIST: '/agents',
  AGENT_EXECUTE: (agentId: string) => `/agents/${agentId}/execute`,

  // Workflows endpoints
  WORKFLOWS_RUN: (workflowId: string) => `/workflows/${workflowId}/run`,
} as const;
