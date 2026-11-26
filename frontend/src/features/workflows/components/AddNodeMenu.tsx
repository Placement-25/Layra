import React from 'react';
import {
  UploadCloud,
  Database,
  BarChart2,
  Cpu,
  TrendingUp,
  FileCheck,
  Plus,
} from 'lucide-react';
import { WorkflowNodeType } from '../types/workflow';

interface AddNodeMenuProps {
  onAddNode: (type: WorkflowNodeType, label: string, desc: string) => void;
  open: boolean;
  onClose: () => void;
}

export const AddNodeMenu: React.FC<AddNodeMenuProps> = ({
  onAddNode,
  open,
  onClose,
}) => {
  if (!open) return null;

  const nodeOptions: {
    type: WorkflowNodeType;
    label: string;
    description: string;
    icon: React.ElementType;
    color: string;
  }[] = [
    {
      type: 'input',
      label: 'Input Source',
      description: 'Ingests user prompt, uploaded document, or dataset',
      icon: UploadCloud,
      color: 'text-blue-400',
    },
    {
      type: 'retrieval',
      label: 'Document Retrieval',
      description: 'Vector similarity search and keyword lookup',
      icon: Database,
      color: 'text-layra-secondary',
    },
    {
      type: 'analysis',
      label: 'AI Analysis',
      description: 'Executes Python data analysis and LLM deductions',
      icon: BarChart2,
      color: 'text-layra-primary',
    },
    {
      type: 'processing',
      label: 'Data Processing',
      description: 'Schema normalization, parsing, and filtering',
      icon: Cpu,
      color: 'text-emerald-400',
    },
    {
      type: 'prediction',
      label: 'Prediction',
      description: 'Runs Scikit-learn regressors and risk forecasting',
      icon: TrendingUp,
      color: 'text-layra-warning',
    },
    {
      type: 'output',
      label: 'Output Synthesis',
      description: 'Synthesizes formatted markdown or export artifact',
      icon: FileCheck,
      color: 'text-purple-400',
    },
  ];

  return (
    <div className="absolute top-14 left-4 z-30 w-72 bg-layra-surface border border-layra-border rounded-xl shadow-2xl p-2 glass-panel-elevated animate-in fade-in zoom-in-95 duration-150">
      <div className="px-2 py-1.5 text-[11px] font-mono uppercase text-layra-muted tracking-wider border-b border-layra-border mb-1">
        Add Workflow Step
      </div>
      <div className="space-y-1">
        {nodeOptions.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.type}
              onClick={() => {
                onAddNode(opt.type, opt.label, opt.description);
                onClose();
              }}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-layra-elevated text-left transition-colors group"
            >
              <div className={`p-1.5 rounded-lg bg-layra-elevated border border-layra-border ${opt.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white group-hover:text-layra-primary transition-colors">
                  {opt.label}
                </div>
                <div className="text-[10px] text-layra-muted truncate">
                  {opt.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
