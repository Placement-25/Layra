import React from 'react';
import { Plus, MessageSquare, Pin, Trash2, X } from 'lucide-react';
import { Conversation } from '../types/workspace';
import { cn } from '@/lib/utils';

interface ConversationListDrawerProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  open: boolean;
  onClose: () => void;
}

export const ConversationListDrawer: React.FC<ConversationListDrawerProps> = ({
  conversations,
  activeId,
  onSelect,
  onNew,
  onDelete,
  open,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div className="absolute inset-y-0 left-0 z-30 w-72 bg-layra-sidebar border-r border-layra-border shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
      <div className="p-4 border-b border-layra-border flex items-center justify-between">
        <h3 className="text-xs font-semibold text-layra-text uppercase tracking-wider font-mono">
          Session History
        </h3>
        <button
          onClick={onClose}
          className="p-1 text-layra-muted hover:text-white rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3">
        <button
          onClick={() => {
            onNew();
            onClose();
          }}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-layra-primary text-white text-xs font-medium hover:bg-layra-primary-hover transition-colors shadow-glow-primary"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Reasoning Session</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {conversations.map((c) => {
          const isActive = c.id === activeId;
          return (
            <div
              key={c.id}
              onClick={() => {
                onSelect(c.id);
                onClose();
              }}
              className={cn(
                'group flex items-center justify-between p-2.5 rounded-lg text-xs cursor-pointer transition-colors',
                isActive
                  ? 'bg-layra-surface border border-layra-border text-white'
                  : 'text-layra-muted hover:text-layra-text hover:bg-layra-surface/50'
              )}
            >
              <div className="flex items-center gap-2 min-w-0">
                <MessageSquare className="w-3.5 h-3.5 text-layra-primary flex-shrink-0" />
                <span className="truncate">{c.title}</span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(c.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 text-layra-muted hover:text-layra-danger transition-all"
                title="Delete session"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
