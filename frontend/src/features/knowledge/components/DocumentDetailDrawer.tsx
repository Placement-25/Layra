import React from 'react';
import {
  X,
  FileText,
  Calendar,
  HardDrive,
  Hash,
  CheckCircle2,
  Trash2,
  RotateCcw,
  Sparkles,
  Layers,
} from 'lucide-react';
import { DocumentItem } from '../types/knowledge';
import { formatBytes, formatDate } from '@/lib/utils';
import { StatusIndicator } from '@/components/common/StatusIndicator';

interface DocumentDetailDrawerProps {
  document: DocumentItem | null;
  open: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  onReprocess: (id: string) => void;
}

export const DocumentDetailDrawer: React.FC<DocumentDetailDrawerProps> = ({
  document,
  open,
  onClose,
  onDelete,
  onReprocess,
}) => {
  if (!open || !document) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full max-w-lg bg-layra-surface border-l border-layra-border shadow-2xl flex flex-col glass-panel-elevated animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-layra-border flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-layra-elevated border border-layra-border flex items-center justify-center text-layra-secondary flex-shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-white truncate">{document.name}</h3>
            <span className="text-[11px] font-mono text-layra-muted uppercase">
              {document.category}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-layra-muted hover:text-white rounded-lg hover:bg-layra-elevated"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Status & Metadata Bar */}
        <div className="p-4 rounded-xl bg-layra-bg/70 border border-layra-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-layra-muted font-medium">Index Status</span>
            <StatusIndicator status={document.indexingStatus} label={document.indexingStatus} />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-layra-border/60 text-xs">
            <div>
              <span className="text-layra-muted flex items-center gap-1 text-[11px]">
                <HardDrive className="w-3 h-3" /> File Size
              </span>
              <span className="font-mono text-white mt-0.5 block">{formatBytes(document.fileSize)}</span>
            </div>
            <div>
              <span className="text-layra-muted flex items-center gap-1 text-[11px]">
                <Calendar className="w-3 h-3" /> Uploaded
              </span>
              <span className="text-white mt-0.5 block">{formatDate(document.uploadDate)}</span>
            </div>
            <div>
              <span className="text-layra-muted flex items-center gap-1 text-[11px]">
                <Layers className="w-3 h-3" /> Chunks Generated
              </span>
              <span className="font-mono text-white mt-0.5 block">{document.totalChunks} Chunks</span>
            </div>
            <div>
              <span className="text-layra-muted flex items-center gap-1 text-[11px]">
                <Hash className="w-3 h-3" /> Token Estimate
              </span>
              <span className="font-mono text-white mt-0.5 block">~{document.totalTokens.toLocaleString()} Tokens</span>
            </div>
          </div>
        </div>

        {/* Processing Timeline */}
        <div>
          <h4 className="text-xs font-semibold text-layra-text uppercase tracking-wider font-mono mb-3">
            Processing Pipeline
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2.5 p-2 rounded-lg bg-layra-surface border border-layra-border">
              <CheckCircle2 className="w-4 h-4 text-layra-success" />
              <span className="text-white font-medium">Document Parsing & Text Extraction</span>
              <span className="text-[10px] font-mono text-layra-muted ml-auto">Completed</span>
            </div>
            <div className="flex items-center gap-2.5 p-2 rounded-lg bg-layra-surface border border-layra-border">
              <CheckCircle2 className="w-4 h-4 text-layra-success" />
              <span className="text-white font-medium">Semantic Chunking (512 token windows)</span>
              <span className="text-[10px] font-mono text-layra-muted ml-auto">Completed</span>
            </div>
            <div className="flex items-center gap-2.5 p-2 rounded-lg bg-layra-surface border border-layra-border">
              <CheckCircle2 className="w-4 h-4 text-layra-success" />
              <span className="text-white font-medium">Vector Embedding (Simulated Dense 1536d)</span>
              <span className="text-[10px] font-mono text-layra-muted ml-auto">Active</span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div>
          <h4 className="text-xs font-semibold text-layra-text uppercase tracking-wider font-mono mb-2">
            Executive Summary
          </h4>
          <p className="text-xs text-layra-muted leading-relaxed bg-layra-bg/40 p-3 rounded-lg border border-layra-border">
            {document.summary}
          </p>
        </div>

        {/* Extracted Text Preview */}
        <div>
          <h4 className="text-xs font-semibold text-layra-text uppercase tracking-wider font-mono mb-2">
            Extracted Text Preview
          </h4>
          <div className="p-3 rounded-lg bg-layra-bg/60 border border-layra-border font-mono text-[11px] text-layra-muted leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap">
            {document.extractedPreview}
          </div>
        </div>

        {/* Chunks Inspection */}
        <div>
          <h4 className="text-xs font-semibold text-layra-text uppercase tracking-wider font-mono mb-2 flex items-center justify-between">
            <span>Indexed Chunks ({document.chunks.length})</span>
            <span className="text-[10px] text-layra-primary font-mono">Demo View</span>
          </h4>
          <div className="space-y-2">
            {document.chunks.map((chunk) => (
              <div
                key={chunk.id}
                className="p-3 rounded-lg bg-layra-surface border border-layra-border text-xs"
              >
                <div className="flex items-center justify-between text-[10px] text-layra-muted font-mono mb-1.5">
                  <span className="text-layra-secondary">Chunk #{chunk.chunkIndex}</span>
                  <span>{chunk.tokenCount} tokens • {chunk.embeddingDimension}d</span>
                </div>
                <p className="text-layra-text/90 text-[11px] leading-relaxed">
                  "{chunk.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-layra-border bg-layra-elevated/40 flex items-center justify-between">
        <button
          onClick={() => {
            onDelete(document.id);
            onClose();
          }}
          className="flex items-center gap-1.5 px-3 py-2 text-xs text-layra-danger hover:bg-layra-danger/10 rounded-lg transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete Document</span>
        </button>

        <button
          onClick={() => onReprocess(document.id)}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-layra-surface border border-layra-border hover:bg-layra-elevated rounded-lg transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-layra-primary" />
          <span>Reprocess Chunks</span>
        </button>
      </div>
    </div>
  );
};
