import React from 'react';
import {
  X,
  Bot,
  Cpu,
  Clock,
  Sparkles,
  Sliders,
  CheckCircle2,
  Activity,
  ShieldCheck,
} from 'lucide-react';
import { AgentDefinition } from '../types/agent';
import { StatusIndicator } from '@/components/common/StatusIndicator';
import { formatDate } from '@/lib/utils';
import { useUIStore } from '@/store/uiStore';

interface AgentDetailModalProps {
  agent: AgentDefinition | null;
  open: boolean;
  onClose: () => void;
  onUpdateAgent?: (updated: AgentDefinition) => void;
}

export const AgentDetailModal: React.FC<AgentDetailModalProps> = ({
  agent,
  open,
  onClose,
}) => {
  const { setToast } = useUIStore();
  if (!open || !agent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-layra-surface border border-layra-border rounded-2xl shadow-2xl overflow-hidden glass-panel-elevated flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-layra-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl bg-layra-elevated border border-layra-border flex items-center justify-center"
              style={{ color: agent.accentColor }}
            >
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-white">{agent.name}</h3>
                <StatusIndicator status={agent.status} label={agent.status} />
              </div>
              <span className="text-xs font-mono text-layra-muted">{agent.category}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-layra-muted hover:text-white rounded-lg hover:bg-layra-elevated"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Simulation disclaimer */}
          <div className="p-2.5 rounded-lg bg-layra-primary/10 border border-layra-primary/20 flex items-start gap-2 text-xs text-layra-muted">
            <Sparkles className="w-4 h-4 text-layra-primary flex-shrink-0 mt-0.5" />
            <span>
              Demonstration agent configuration. Ready to bind directly with Python LangGraph multi-agent teams on backend connection.
            </span>
          </div>

          {/* Core Responsibilities */}
          <div>
            <h4 className="text-xs font-semibold text-layra-text uppercase tracking-wider font-mono mb-2">
              Mission & Role
            </h4>
            <p className="text-xs text-layra-muted leading-relaxed bg-layra-bg/40 p-3 rounded-lg border border-layra-border">
              {agent.longDescription}
            </p>
          </div>

          {/* Model Config Placeholder */}
          <div>
            <h4 className="text-xs font-semibold text-layra-text uppercase tracking-wider font-mono mb-3 flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-layra-primary" />
              <span>Model Routing & Hyperparameters</span>
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-layra-surface border border-layra-border">
                <span className="text-layra-muted text-[11px] block mb-1">Target Engine</span>
                <span className="font-mono text-white font-medium">{agent.modelName}</span>
              </div>
              <div className="p-3 rounded-lg bg-layra-surface border border-layra-border">
                <span className="text-layra-muted text-[11px] block mb-1">Temperature</span>
                <span className="font-mono text-white font-medium">{agent.temperature} (Focused)</span>
              </div>
            </div>
          </div>

          {/* Connected Tools */}
          <div>
            <h4 className="text-xs font-semibold text-layra-text uppercase tracking-wider font-mono mb-2 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-layra-secondary" />
              <span>Active Agent Tools</span>
            </h4>
            <div className="space-y-2">
              {agent.tools.map((tool, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-layra-surface border border-layra-border text-xs"
                >
                  <div className="flex items-center gap-2 text-white font-medium">
                    <ShieldCheck className="w-4 h-4 text-layra-success" />
                    <span>{tool}</span>
                  </div>
                  <span className="text-[10px] font-mono text-layra-muted">Ready</span>
                </div>
              ))}
            </div>
          </div>

          {/* Execution Log History */}
          <div>
            <h4 className="text-xs font-semibold text-layra-text uppercase tracking-wider font-mono mb-2 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-layra-warning" />
              <span>Execution Log Activity ({agent.executionHistory.length})</span>
            </h4>
            <div className="space-y-2">
              {agent.executionHistory.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-lg bg-layra-surface border border-layra-border text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-white">{log.action}</span>
                    <span className="text-[10px] font-mono text-layra-muted flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {log.durationMs}ms
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-layra-primary/90 bg-layra-bg/70 px-2 py-1 rounded border border-layra-border/60">
                    {log.querySample}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-layra-border bg-layra-elevated/40 flex items-center justify-between">
          <span className="text-xs text-layra-muted font-mono">
            Total Invocations: {agent.totalInvocations}
          </span>
          <button
            onClick={() => {
              setToast(`Agent ${agent.name} parameters synchronized locally.`);
              onClose();
            }}
            className="px-4 py-2 text-xs font-medium text-white bg-layra-primary hover:bg-layra-primary-hover rounded-lg transition-colors shadow-glow-primary"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
