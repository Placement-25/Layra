import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GitFork,
  Plus,
  Play,
  Clock,
  Sparkles,
  ArrowRight,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { INITIAL_WORKFLOWS, WORKFLOW_TEMPLATES } from '../data/mockWorkflows';
import { WorkflowItem } from '../types/workflow';
import { PageTransition } from '@/components/layout/PageTransition';
import { formatDate } from '@/lib/utils';
import { useUIStore } from '@/store/uiStore';

export const WorkflowsPage: React.FC = () => {
  const navigate = useNavigate();
  const [workflows, setWorkflows] = useState<WorkflowItem[]>(() => {
    const saved = localStorage.getItem('layra_workflows');
    return saved ? JSON.parse(saved) : INITIAL_WORKFLOWS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const { setToast } = useUIStore();

  const handleCreateFromTemplate = (templateId: string) => {
    const template = WORKFLOW_TEMPLATES.find((t) => t.id === templateId);
    if (!template) return;

    const newWf: WorkflowItem = {
      id: `wf_${Date.now()}`,
      name: `${template.name} (Custom)`,
      description: template.description,
      updatedAt: new Date().toISOString(),
      nodesCount: template.nodesCount,
      status: 'active',
      lastRunStatus: 'idle',
      nodes: template.initialNodes,
      edges: template.initialEdges,
    };

    const updated = [newWf, ...workflows];
    setWorkflows(updated);
    localStorage.setItem('layra_workflows', JSON.stringify(updated));
    setToast(`Workflow created from template "${template.name}".`);
    navigate(`/workflows/${newWf.id}`);
  };

  const handleCreateBlank = () => {
    const newWf: WorkflowItem = {
      id: `wf_${Date.now()}`,
      name: 'Untitled Reasoning Workflow',
      description: 'Custom node orchestration pipeline created from scratch.',
      updatedAt: new Date().toISOString(),
      nodesCount: 2,
      status: 'draft',
      lastRunStatus: 'idle',
      nodes: [
        {
          id: 'node_in',
          type: 'custom',
          position: { x: 100, y: 150 },
          data: {
            label: 'Input Data',
            type: 'input',
            description: 'Accepts query input or document payload',
          },
        },
        {
          id: 'node_out',
          type: 'custom',
          position: { x: 450, y: 150 },
          data: {
            label: 'Output Synthesis',
            type: 'output',
            description: 'Generates final reasoned response',
          },
        },
      ],
      edges: [{ id: 'e_in_out', source: 'node_in', target: 'node_out', animated: false }],
    };

    const updated = [newWf, ...workflows];
    setWorkflows(updated);
    localStorage.setItem('layra_workflows', JSON.stringify(updated));
    navigate(`/workflows/${newWf.id}`);
  };

  const filteredWorkflows = workflows.filter(
    (w) =>
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageTransition className="p-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Workflows
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-layra-primary/10 text-layra-primary border border-layra-primary/20">
              Visual Orchestration
            </span>
          </div>
          <p className="text-xs text-layra-muted">
            Connect intelligent steps into repeatable reasoning processes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCreateBlank}
            className="flex items-center gap-2 px-4 py-2 bg-layra-primary hover:bg-layra-primary-hover text-white text-xs font-medium rounded-lg transition-colors shadow-glow-primary active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create Workflow</span>
          </button>
        </div>
      </div>

      {/* Templates Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-layra-text uppercase tracking-wider font-mono flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-layra-primary" />
            <span>Reasoning Pipeline Templates</span>
          </h2>
          <span className="text-[11px] text-layra-muted font-mono">
            4 Production Blueprints
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {WORKFLOW_TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => handleCreateFromTemplate(tpl.id)}
              className="p-4 rounded-xl bg-layra-surface/70 border border-layra-border hover:border-layra-border-light hover:bg-layra-elevated/80 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-layra-elevated text-layra-primary border border-layra-primary/20 mb-2.5 inline-block">
                  {tpl.category}
                </span>
                <h3 className="text-sm font-semibold text-white group-hover:text-layra-primary transition-colors mb-1.5">
                  {tpl.name}
                </h3>
                <p className="text-xs text-layra-muted leading-relaxed line-clamp-3 mb-4">
                  {tpl.description}
                </p>
              </div>

              <div className="pt-3 border-t border-layra-border/60 flex items-center justify-between text-[11px] text-layra-muted font-mono">
                <span>{tpl.nodesCount} Nodes</span>
                <div className="flex items-center gap-1 text-layra-primary group-hover:translate-x-1 transition-transform">
                  <span>Use Blueprint</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved / Active Workflows */}
      <div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <h2 className="text-xs font-semibold text-layra-text uppercase tracking-wider font-mono">
            Active Reasoning Workflows ({workflows.length})
          </h2>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-layra-muted" />
            <input
              type="text"
              placeholder="Filter workflows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-layra-surface border border-layra-border rounded-lg pl-9 pr-3 py-1.5 text-xs text-layra-text placeholder:text-layra-muted focus:outline-none focus:border-layra-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredWorkflows.map((wf) => (
            <div
              key={wf.id}
              onClick={() => navigate(`/workflows/${wf.id}`)}
              className="p-5 rounded-xl bg-layra-surface/60 border border-layra-border hover:border-layra-border-light hover:bg-layra-elevated/70 cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-layra-elevated border border-layra-border flex items-center justify-center text-layra-secondary">
                      <GitFork className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-layra-primary transition-colors">
                      {wf.name}
                    </h3>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-layra-elevated border border-layra-border text-layra-muted uppercase">
                    {wf.status}
                  </span>
                </div>

                <p className="text-xs text-layra-muted line-clamp-2 leading-relaxed mb-4">
                  {wf.description}
                </p>
              </div>

              <div className="pt-3 border-t border-layra-border/60 flex items-center justify-between text-xs text-layra-muted font-mono">
                <div className="flex items-center gap-2 text-[11px]">
                  <span>{wf.nodesCount} Nodes</span>
                  <span>•</span>
                  <span>Updated {formatDate(wf.updatedAt)}</span>
                </div>

                <button
                  type="button"
                  className="flex items-center gap-1.5 text-xs font-medium text-layra-primary group-hover:text-white transition-colors"
                >
                  <span>Open Canvas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};
