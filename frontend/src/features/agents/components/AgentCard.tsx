import React from 'react';
import {
  Search,
  BarChart3,
  TrendingUp,
  MessageSquareText,
  Bot,
  ArrowRight,
  Cpu,
  Clock,
  Sparkles,
} from 'lucide-react';
import { AgentDefinition } from '../types/agent';
import { StatusIndicator } from '@/components/common/StatusIndicator';

interface AgentCardProps {
  agent: AgentDefinition;
  onSelect: (agent: AgentDefinition) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onSelect }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Search':
        return Search;
      case 'BarChart3':
        return BarChart3;
      case 'TrendingUp':
        return TrendingUp;
      case 'MessageSquareText':
        return MessageSquareText;
      default:
        return Bot;
    }
  };

  const IconComponent = getIcon(agent.iconName);

  return (
    <div
      onClick={() => onSelect(agent)}
      className="p-5 rounded-xl bg-layra-surface/70 border border-layra-border hover:border-layra-border-light hover:bg-layra-elevated/80 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-sm relative overflow-hidden"
    >
      {/* Subtle top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-70 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: agent.accentColor }}
      />

      <div>
        {/* Header: Icon, Name, Status */}
        <div className="flex items-start justify-between mb-3.5">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl bg-layra-elevated border border-layra-border flex items-center justify-center transition-transform group-hover:scale-105"
              style={{ color: agent.accentColor }}
            >
              <IconComponent className="w-5 h-5" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white group-hover:text-layra-primary transition-colors">
                {agent.name}
              </h3>
              <span className="text-[11px] font-mono text-layra-muted">
                {agent.category}
              </span>
            </div>
          </div>

          <StatusIndicator status={agent.status} label={agent.status} />
        </div>

        {/* Description */}
        <p className="text-xs text-layra-muted leading-relaxed mb-4">
          {agent.description}
        </p>

        {/* Configured Tools Strip */}
        <div className="space-y-1.5 mb-4">
          <div className="text-[10px] font-mono uppercase text-layra-muted/70 tracking-wider">
            Connected Capabilities
          </div>
          <div className="flex flex-wrap gap-1.5">
            {agent.tools.map((tool) => (
              <span
                key={tool}
                className="text-[10px] px-2 py-0.5 rounded bg-layra-bg/80 border border-layra-border text-layra-text font-mono truncate max-w-[200px]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Metrics & Action */}
      <div className="pt-3 border-t border-layra-border/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3 text-[11px] font-mono text-layra-muted">
          <span>{agent.totalInvocations} calls</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {agent.avgLatencyMs}ms
          </span>
        </div>

        <button
          type="button"
          className="flex items-center gap-1 text-xs font-medium text-layra-primary group-hover:translate-x-1 transition-transform"
        >
          <span>Configure</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
