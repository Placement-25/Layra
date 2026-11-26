export type DocumentFileType = 'pdf' | 'docx' | 'txt' | 'csv' | 'xlsx';

export type IndexingStatus = 'indexed' | 'processing' | 'queued' | 'failed';

export interface DocumentChunk {
  id: string;
  chunkIndex: number;
  text: string;
  tokenCount: number;
  embeddingDimension: number;
}

export interface DocumentItem {
  id: string;
  name: string;
  fileType: DocumentFileType;
  fileSize: number; // in bytes
  uploadDate: string;
  indexingStatus: IndexingStatus;
  category: string;
  totalChunks: number;
  totalTokens: number;
  summary: string;
  extractedPreview: string;
  chunks: DocumentChunk[];
}

export interface KnowledgeMetrics {
  totalDocuments: number;
  indexedDocuments: number;
  processingCount: number;
  totalStorageBytes: number;
  vectorDimensions: number;
}
