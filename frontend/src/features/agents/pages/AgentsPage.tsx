import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Bot,
  Plus,
  Search,
  Filter,
  Sparkles,
  Cpu,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { INITIAL_AGENTS } from '../data/mockAgents';
import { AgentDefinition } from '../types/agent';
import { AgentCard } from '../components/AgentCard';
import { AgentDetailModal } from '../components/AgentDetailModal';
import { CreateAgentModal } from '../components/CreateAgentModal';
import { PageTransition } from '@/components/layout/PageTransition';

export const AgentsPage: React.FC = () => {
  const { agentId } = useParams<{ agentId?: string }>();
  const navigate = useNavigate();

  const [agents, setAgents] = useState<AgentDefinition[]>(() => {
    const saved = localStorage.getItem('layra_agents');
    return saved ? JSON.parse(saved) : INITIAL_AGENTS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const activeAgent = agents.find((a) => a.id === agentId) || null;

  const saveAgents = (newAgents: AgentDefinition[]) => {
    setAgents(newAgents);
    localStorage.setItem('layra_agents', JSON.stringify(newAgents));
  };

  const handleCreateAgent = (newAgent: AgentDefinition) => {
    const updated = [newAgent, ...agents];
    saveAgents(updated);
  };

  const categories = ['all', 'Knowledge Retrieval', 'Data Analysis', 'Predictive Intelligence', 'Response Generation'];

  const filteredAgents = agents.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'all' || a.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <PageTransition className="p-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              AI Agents
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-layra-primary/10 text-layra-primary border border-layra-primary/20">
              Ecosystem
            </span>
          </div>
          <p className="text-xs text-layra-muted">
            Specialized intelligence working together to solve complex tasks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-layra-primary hover:bg-layra-primary-hover text-white text-xs font-medium rounded-lg transition-colors shadow-glow-primary active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create Agent</span>
          </button>
        </div>
      </div>

      {/* Control Center Summary Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-layra-surface via-layra-elevated to-layra-surface border border-layra-border mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-layra-primary/15 border border-layra-primary/30 flex items-center justify-center text-layra-primary shadow-sm">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Autonomous Agent Swarm</h3>
            <p className="text-xs text-layra-muted">
              4 Core Agents ready for collaborative multi-step execution.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono">
          <div>
            <div className="text-layra-muted text-[10px] uppercase">Active Agents</div>
            <div className="text-sm font-bold text-layra-secondary">4 Deployed</div>
          </div>
          <div>
            <div className="text-layra-muted text-[10px] uppercase">Avg Response</div>
            <div className="text-sm font-bold text-white">296ms</div>
          </div>
          <div>
            <div className="text-layra-muted text-[10px] uppercase">Reliability</div>
            <div className="text-sm font-bold text-layra-success">99.8%</div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-layra-muted" />
          <input
            type="text"
            placeholder="Search agents by name, capability, or tool..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-layra-surface border border-layra-border rounded-lg pl-9 pr-3 py-2 text-xs text-layra-text placeholder:text-layra-muted focus:outline-none focus:border-layra-primary"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === c
                  ? 'bg-layra-primary/20 border border-layra-primary/40 text-white'
                  : 'bg-layra-surface border border-layra-border text-layra-muted hover:text-white'
              }`}
            >
              {c === 'all' ? 'All Agents' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAgents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onSelect={(a) => navigate(`/agents/${a.id}`)}
          />
        ))}
      </div>

      {/* Detail Modal / Route View */}
      <AgentDetailModal
        agent={activeAgent}
        open={Boolean(activeAgent)}
        onClose={() => navigate('/agents')}
      />

      {/* Create Agent Modal */}
      <CreateAgentModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreateAgent={handleCreateAgent}
      />
    </PageTransition>
  );
};
