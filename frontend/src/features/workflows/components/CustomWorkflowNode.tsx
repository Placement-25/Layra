import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import {
  UploadCloud,
  Database,
  BarChart2,
  Cpu,
  FileCheck,
  TrendingUp,
  Layers,
  Sparkles,
} from 'lucide-react';
import { WorkflowNodeData } from '../types/workflow';

export const CustomWorkflowNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as WorkflowNodeData;

  const getNodeTheme = (type: string) => {
    switch (type) {
      case 'input':
        return {
          icon: UploadCloud,
          border: 'border-blue-500/40',
          accent: '#3B82F6',
          bg: 'bg-blue-500/10',
          tag: 'INPUT',
        };
      case 'retrieval':
        return {
          icon: Database,
          border: 'border-layra-secondary/40',
          accent: '#55D6E8',
          bg: 'bg-layra-secondary/10',
          tag: 'RETRIEVAL',
        };
      case 'analysis':
        return {
          icon: BarChart2,
          border: 'border-layra-primary/40',
          accent: '#8B7CFF',
          bg: 'bg-layra-primary/10',
          tag: 'ANALYSIS',
        };
      case 'processing':
        return {
          icon: Cpu,
          border: 'border-emerald-500/40',
          accent: '#10B981',
          bg: 'bg-emerald-500/10',
          tag: 'PROCESSING',
        };
      case 'prediction':
        return {
          icon: TrendingUp,
          border: 'border-layra-warning/40',
          accent: '#F3B96B',
          bg: 'bg-layra-warning/10',
          tag: 'PREDICTION',
        };
      case 'output':
        return {
          icon: FileCheck,
          border: 'border-purple-500/40',
          accent: '#A855F7',
          bg: 'bg-purple-500/10',
          tag: 'OUTPUT',
        };
      default:
        return {
          icon: Layers,
          border: 'border-layra-border',
          accent: '#8B7CFF',
          bg: 'bg-layra-surface',
          tag: 'NODE',
        };
    }
  };

  const theme = getNodeTheme(nodeData.type);
  const IconComponent = theme.icon;

  const isRunning = nodeData.status === 'running';
  const isSuccess = nodeData.status === 'success';

  return (
    <div
      className={`w-64 rounded-xl bg-layra-surface border transition-all duration-200 shadow-xl overflow-hidden ${
        selected ? 'border-layra-primary ring-2 ring-layra-primary/40' : theme.border
      } ${isRunning ? 'animate-pulse ring-2 ring-layra-secondary' : ''}`}
    >
      {/* Top Source/Target Handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !-left-1.5 !bg-layra-primary !border-2 !border-layra-bg"
      />

      {/* Header bar */}
      <div className="px-3.5 py-2.5 bg-layra-elevated/70 border-b border-layra-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded-md flex items-center justify-center ${theme.bg}`}
            style={{ color: theme.accent }}
          >
            <IconComponent className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold text-white truncate max-w-[120px]">
            {nodeData.label}
          </span>
        </div>

        <span
          className="text-[9px] font-mono px-1.5 py-0.5 rounded uppercase"
          style={{
            backgroundColor: `${theme.accent}15`,
            color: theme.accent,
            border: `1px solid ${theme.accent}30`,
          }}
        >
          {theme.tag}
        </span>
      </div>

      {/* Body content */}
      <div className="p-3 text-xs">
        <p className="text-[11px] text-layra-muted leading-relaxed line-clamp-2">
          {nodeData.description || 'Configured reasoning operation step'}
        </p>

        {/* Runtime State Pill */}
        {nodeData.status && (
          <div className="mt-2.5 pt-2 border-t border-layra-border/50 flex items-center justify-between text-[10px] font-mono">
            <span className="text-layra-muted">State:</span>
            {isRunning && (
              <span className="text-layra-secondary flex items-center gap-1 font-medium animate-pulse">
                <Sparkles className="w-3 h-3 animate-spin" /> Executing
              </span>
            )}
            {isSuccess && <span className="text-layra-success font-medium">Completed</span>}
            {!isRunning && !isSuccess && <span className="text-layra-muted">Ready</span>}
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !-right-1.5 !bg-layra-secondary !border-2 !border-layra-bg"
      />
    </div>
  );
};
