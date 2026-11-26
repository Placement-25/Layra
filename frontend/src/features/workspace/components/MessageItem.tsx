import React, { useState } from 'react';
import {
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  FileText,
  Clock,
  Layers,
} from 'lucide-react';
import { ChatMessage } from '../types/workspace';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/uiStore';

interface MessageItemProps {
  message: ChatMessage;
  onRegenerate?: () => void;
  onSelectFollowUp?: (prompt: string) => void;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  onRegenerate,
  onSelectFollowUp,
}) => {
  const [copied, setCopied] = useState(false);
  const { setToast } = useUIStore();
  const isAssistant = message.role === 'assistant';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setToast('Response copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'group flex flex-col w-full max-w-4xl mx-auto py-5 px-4 md:px-6 transition-colors',
        isAssistant ? 'bg-layra-surface/30 rounded-2xl border border-layra-border/50' : 'bg-transparent'
      )}
    >
      {/* Top Header of the Message */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          {isAssistant ? (
            <div className="w-7 h-7 rounded-lg bg-layra-elevated border border-layra-border flex items-center justify-center shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-layra-primary" />
            </div>
          ) : (
            <div className="w-7 h-7 rounded-lg bg-layra-primary/20 border border-layra-primary/40 flex items-center justify-center text-xs font-semibold text-layra-primary">
              U
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-layra-text tracking-tight">
              {isAssistant ? 'LAYRA Reasoning Core' : 'You'}
            </span>

            {isAssistant && message.reasoningTimeSeconds && (
              <span className="text-[10px] font-mono text-layra-muted flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                {message.reasoningTimeSeconds}s synthesis
              </span>
            )}
          </div>
        </div>

        {/* Actions for Assistant */}
        {isAssistant && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className="p-1.5 text-layra-muted hover:text-white rounded-md hover:bg-layra-elevated transition-colors"
              title="Copy message"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-layra-success" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            {onRegenerate && (
              <button
                onClick={onRegenerate}
                className="p-1.5 text-layra-muted hover:text-white rounded-md hover:bg-layra-elevated transition-colors"
                title="Regenerate reasoning"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Message Content */}
      <div className="pl-9 text-sm leading-relaxed text-layra-text font-normal whitespace-pre-wrap">
        {message.content}
      </div>

      {/* Citations Preview Strip */}
      {isAssistant && message.sources && message.sources.length > 0 && (
        <div className="pl-9 mt-4 pt-3 border-t border-layra-border/40 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-layra-muted flex items-center gap-1 mr-1">
            <FileText className="w-3 h-3 text-layra-secondary" />
            Cited:
          </span>
          {message.sources.map((src) => (
            <div
              key={src.id}
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-layra-surface border border-layra-border text-[11px] text-layra-muted hover:text-layra-text hover:border-layra-secondary/40 transition-colors"
            >
              <span className="font-medium text-layra-text">{src.documentTitle}</span>
              {src.pageNumber && (
                <span className="text-[10px] font-mono text-layra-secondary">
                  p.{src.pageNumber}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Follow-up Prompts */}
      {isAssistant && message.suggestedFollowUps && message.suggestedFollowUps.length > 0 && (
        <div className="pl-9 mt-3 flex flex-wrap gap-2">
          {message.suggestedFollowUps.map((followUp, idx) => (
            <button
              key={idx}
              onClick={() => onSelectFollowUp?.(followUp)}
              className="text-xs text-layra-muted hover:text-layra-primary px-2.5 py-1 rounded-lg bg-layra-surface/60 border border-layra-border hover:border-layra-primary/40 transition-colors text-left"
            >
              + {followUp}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
