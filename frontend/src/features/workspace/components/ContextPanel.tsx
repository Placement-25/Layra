import React from 'react';
import {
  FileText,
  ExternalLink,
  Cpu,
  CheckCircle2,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';
import { ChatMessage } from '../types/workspace';
import { cn } from '@/lib/utils';

interface ContextPanelProps {
  message?: ChatMessage | null;
  onClose?: () => void;
  className?: string;
}

export const ContextPanel: React.FC<ContextPanelProps> = ({
  message,
  className,
}) => {
  const sources = message?.sources || [];
  const tools = message?.toolSteps || [];

  return (
    <aside
      className={cn(
        'w-80 h-full border-l border-layra-border bg-layra-surface/40 flex flex-col flex-shrink-0 overflow-hidden select-none',
        className
      )}
    >
      {/* Header */}
      <div className="h-14 px-4 border-b border-layra-border flex items-center justify-between bg-layra-surface/70">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-layra-primary" />
          <h3 className="text-xs font-semibold text-layra-text uppercase tracking-wider font-mono">
            Reasoning Context
          </h3>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-layra-elevated text-layra-muted border border-layra-border font-mono">
          Evidence
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Simulation Notice */}
        <div className="p-2.5 rounded-lg bg-layra-primary/10 border border-layra-primary/20 text-[11px] text-layra-muted flex items-start gap-2">
          <Info className="w-3.5 h-3.5 text-layra-primary flex-shrink-0 mt-0.5" />
          <span>
            Demonstration context. Citations reflect vectorized mock documents ready for FastAPI backend retrieval.
          </span>
        </div>

        {/* Cited Evidence Sources */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="text-xs font-medium text-layra-text flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-layra-secondary" />
              <span>Referenced Sources ({sources.length})</span>
            </h4>
          </div>

          {sources.length === 0 ? (
            <div className="p-4 rounded-lg bg-layra-surface/40 border border-dashed border-layra-border text-center text-xs text-layra-muted">
              No specific documents cited in this turn.
            </div>
          ) : (
            <div className="space-y-2.5">
              {sources.map((src) => (
                <div
                  key={src.id}
                  className="p-3 rounded-lg bg-layra-surface border border-layra-border hover:border-layra-border-light transition-all group"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-xs font-medium text-white truncate group-hover:text-layra-primary transition-colors">
                      {src.documentTitle}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-layra-elevated text-layra-secondary border border-layra-secondary/20">
                      {Math.round(src.relevanceScore * 100)}% Match
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-layra-muted mb-2 font-mono">
                    {src.pageNumber && <span>Page {src.pageNumber}</span>}
                    {src.section && (
                      <>
                        <span>•</span>
                        <span className="truncate">{src.section}</span>
                      </>
                    )}
                  </div>

                  <p className="text-[11px] text-layra-muted/90 italic bg-layra-bg/60 p-2 rounded border border-layra-border/60 leading-relaxed">
                    "{src.snippet}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tool Activity Steps */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="text-xs font-medium text-layra-text flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-layra-primary" />
              <span>Tool Execution Pipeline ({tools.length})</span>
            </h4>
          </div>

          {tools.length === 0 ? (
            <div className="p-4 rounded-lg bg-layra-surface/40 border border-dashed border-layra-border text-center text-xs text-layra-muted">
              Direct generation without external tool dispatch.
            </div>
          ) : (
            <div className="space-y-2">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  className="p-2.5 rounded-lg bg-layra-surface/60 border border-layra-border text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 font-medium text-layra-text text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-layra-success" />
                      <span>{tool.toolName}</span>
                    </div>
                    {tool.executionTimeMs && (
                      <span className="text-[10px] font-mono text-layra-muted flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {tool.executionTimeMs}ms
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-layra-muted leading-tight">
                    {tool.summary}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
