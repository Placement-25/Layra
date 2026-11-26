export interface CitationSource {
  id: string;
  documentId: string;
  documentTitle: string;
  fileType: 'pdf' | 'docx' | 'txt' | 'csv' | 'xlsx';
  pageNumber?: number;
  section?: string;
  snippet: string;
  relevanceScore: number; // e.g. 0.94
}

export interface ToolExecutionStep {
  id: string;
  toolName: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  executionTimeMs?: number;
  summary: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  sources?: CitationSource[];
  toolSteps?: ToolExecutionStep[];
  isStreaming?: boolean;
  suggestedFollowUps?: string[];
  tokens?: number;
  reasoningTimeSeconds?: number;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
  pinned?: boolean;
}
