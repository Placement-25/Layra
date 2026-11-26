import React, { useState } from 'react';
import { X, Bot, Sparkles, Plus, Check } from 'lucide-react';
import { AgentCategory, AgentDefinition } from '../types/agent';
import { useUIStore } from '@/store/uiStore';

interface CreateAgentModalProps {
  open: boolean;
  onClose: () => void;
  onCreateAgent: (newAgent: AgentDefinition) => void;
}

const AVAILABLE_TOOLS = [
  'Vector Search (ChromaDB)',
  'BM25 Keyword Search',
  'Python 3.11 Sandbox',
  'Pandas Dataframe',
  'Scikit-learn Regressor',
  'Cross-Encoder Re-ranker',
  'LLM Context Manager',
  'Document Structure Parser',
];

export const CreateAgentModal: React.FC<CreateAgentModalProps> = ({
  open,
  onClose,
  onCreateAgent,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<AgentCategory>('Knowledge Retrieval');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [selectedTools, setSelectedTools] = useState<string[]>([
    'Vector Search (ChromaDB)',
  ]);
  const [temperature, setTemperature] = useState(0.2);
  const { setToast } = useUIStore();

  if (!open) return null;

  const toggleTool = (tool: string) => {
    if (selectedTools.includes(tool)) {
      setSelectedTools(selectedTools.filter((t) => t !== tool));
    } else {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const handleSave = () => {
    if (!name.trim()) return;

    const newAgent: AgentDefinition = {
      id: `agent_${Date.now()}`,
      name: name.trim(),
      category: category,
      description: description.trim() || 'Custom user-configured reasoning agent.',
      longDescription: instructions.trim() || 'Executes customized domain tasks according to system instructions.',
      role: 'Custom Autonomous Agent',
      instructions: instructions.trim(),
      tools: selectedTools,
      status: 'active',
      iconName: 'Bot',
      accentColor: '#8B7CFF',
      modelName: 'Gemini 1.5 Pro (Simulated)',
      temperature: temperature,
      totalInvocations: 0,
      avgLatencyMs: 140,
      executionHistory: [],
      isCustom: true,
    };

    onCreateAgent(newAgent);
    setToast(`Agent "${newAgent.name}" created in local workspace.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-layra-surface border border-layra-border rounded-2xl shadow-2xl overflow-hidden glass-panel-elevated">
        {/* Header */}
        <div className="px-6 py-4 border-b border-layra-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-layra-primary/10 text-layra-primary border border-layra-primary/20">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Create Custom AI Agent</h3>
              <p className="text-[11px] text-layra-muted">Configure role, tools, and execution prompt</p>
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
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-mono uppercase text-layra-muted mb-1">
              Agent Name
            </label>
            <input
              type="text"
              placeholder="e.g. Clinical Trial Synthesizer"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-layra-elevated border border-layra-border rounded-lg px-3 py-2 text-xs text-layra-text placeholder:text-layra-muted focus:outline-none focus:border-layra-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono uppercase text-layra-muted mb-1">
                Domain Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AgentCategory)}
                className="w-full bg-layra-elevated border border-layra-border rounded-lg px-3 py-2 text-xs text-layra-text focus:outline-none"
              >
                <option value="Knowledge Retrieval">Knowledge Retrieval</option>
                <option value="Data Analysis">Data Analysis</option>
                <option value="Predictive Intelligence">Predictive Intelligence</option>
                <option value="Response Generation">Response Generation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-layra-muted mb-1">
                Temperature ({temperature})
              </label>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full mt-2 accent-layra-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-layra-muted mb-1">
              Short Description
            </label>
            <input
              type="text"
              placeholder="What this agent specializes in..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-layra-elevated border border-layra-border rounded-lg px-3 py-2 text-xs text-layra-text placeholder:text-layra-muted focus:outline-none focus:border-layra-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-layra-muted mb-1">
              System Instructions & Prompting
            </label>
            <textarea
              rows={3}
              placeholder="Specify the strict logic, constraints, and synthesis behaviors..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full bg-layra-elevated border border-layra-border rounded-lg px-3 py-2 text-xs text-layra-text placeholder:text-layra-muted focus:outline-none focus:border-layra-primary leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-layra-muted mb-2">
              Select Connected Capabilities
            </label>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_TOOLS.map((tool) => {
                const isSelected = selectedTools.includes(tool);
                return (
                  <div
                    key={tool}
                    onClick={() => toggleTool(tool)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-layra-primary/10 border-layra-primary/40 text-white'
                        : 'bg-layra-elevated/40 border-layra-border text-layra-muted hover:text-white'
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                        isSelected
                          ? 'bg-layra-primary border-layra-primary text-white'
                          : 'border-layra-border'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5" />}
                    </div>
                    <span className="truncate">{tool}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-layra-border bg-layra-elevated/40 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-layra-muted hover:text-white rounded-lg hover:bg-layra-surface transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!name.trim()}
            className="px-4 py-2 text-xs font-medium text-white bg-layra-primary hover:bg-layra-primary-hover rounded-lg transition-colors shadow-glow-primary disabled:opacity-50"
          >
            Create Agent
          </button>
        </div>
      </div>
    </div>
  );
};
