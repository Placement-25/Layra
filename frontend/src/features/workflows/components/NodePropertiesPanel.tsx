import React from 'react';
import { X, Sliders, Trash2, Cpu } from 'lucide-react';
import { WorkflowNodeData } from '../types/workflow';

interface NodePropertiesPanelProps {
  selectedNode: { id: string; data: WorkflowNodeData } | null;
  onClose: () => void;
  onUpdateLabel: (id: string, newLabel: string) => void;
  onUpdateDescription: (id: string, newDesc: string) => void;
  onDeleteNode: (id: string) => void;
}

export const NodePropertiesPanel: React.FC<NodePropertiesPanelProps> = ({
  selectedNode,
  onClose,
  onUpdateLabel,
  onUpdateDescription,
  onDeleteNode,
}) => {
  if (!selectedNode) return null;

  return (
    <div className="w-72 border-l border-layra-border bg-layra-sidebar p-4 flex flex-col justify-between shadow-xl z-20 overflow-y-auto">
      <div className="space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-layra-border">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-layra-primary" />
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Node Properties
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-layra-muted hover:text-white rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase text-layra-muted mb-1">
            Node Identifier
          </label>
          <div className="text-xs font-mono text-white bg-layra-surface px-2.5 py-1.5 rounded border border-layra-border">
            {selectedNode.id}
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase text-layra-muted mb-1">
            Operation Type
          </label>
          <div className="text-xs font-mono text-layra-secondary uppercase bg-layra-surface px-2.5 py-1.5 rounded border border-layra-border">
            {selectedNode.data.type}
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase text-layra-muted mb-1">
            Step Label
          </label>
          <input
            type="text"
            value={selectedNode.data.label}
            onChange={(e) => onUpdateLabel(selectedNode.id, e.target.value)}
            className="w-full bg-layra-elevated border border-layra-border rounded-lg px-2.5 py-1.5 text-xs text-layra-text focus:outline-none focus:border-layra-primary"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase text-layra-muted mb-1">
            Step Instructions
          </label>
          <textarea
            rows={3}
            value={selectedNode.data.description}
            onChange={(e) => onUpdateDescription(selectedNode.id, e.target.value)}
            className="w-full bg-layra-elevated border border-layra-border rounded-lg px-2.5 py-1.5 text-xs text-layra-text focus:outline-none focus:border-layra-primary leading-relaxed"
          />
        </div>

        <div className="p-2.5 rounded-lg bg-layra-surface/40 border border-layra-border text-[11px] text-layra-muted">
          Ready for future parameter binding to LangChain/LangGraph tools.
        </div>
      </div>

      <div className="pt-4 border-t border-layra-border">
        <button
          onClick={() => onDeleteNode(selectedNode.id)}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium text-layra-danger hover:bg-layra-danger/10 border border-layra-danger/30 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete Node</span>
        </button>
      </div>
    </div>
  );
};
