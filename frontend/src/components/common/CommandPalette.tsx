import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MessageSquareText, Database, Bot, GitFork, ArrowRight, X } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';

const SEARCH_ITEMS = [
  {
    title: 'Analyze Document Architecture',
    subtitle: 'AI Workspace prompt',
    path: '/workspace',
    category: 'Workspace',
    icon: MessageSquareText,
  },
  {
    title: 'Multi-Source Synthesizer',
    subtitle: 'Recent session',
    path: '/workspace/chat_02',
    category: 'Workspace',
    icon: MessageSquareText,
  },
  {
    title: 'Battery Cell Degradation Report (PDF)',
    subtitle: 'Knowledge Base • 4.2 MB',
    path: '/knowledge/doc_01',
    category: 'Knowledge Base',
    icon: Database,
  },
  {
    title: 'Q3 Financial Disclosures (DOCX)',
    subtitle: 'Knowledge Base • 1.8 MB',
    path: '/knowledge/doc_02',
    category: 'Knowledge Base',
    icon: Database,
  },
  {
    title: 'Retrieval Agent',
    subtitle: 'Vector & Keyword Search',
    path: '/agents/agent_retrieval',
    category: 'AI Agents',
    icon: Bot,
  },
  {
    title: 'Analysis Agent',
    subtitle: 'Pandas & Statistical Insights',
    path: '/agents/agent_analysis',
    category: 'AI Agents',
    icon: Bot,
  },
  {
    title: 'Document Intelligence Pipeline',
    subtitle: 'Workflow • 4 Nodes',
    path: '/workflows/wf_01',
    category: 'Workflows',
    icon: GitFork,
  },
  {
    title: 'Knowledge Comparison Matrix',
    subtitle: 'Workflow • 4 Nodes',
    path: '/workflows/wf_04',
    category: 'Workflows',
    icon: GitFork,
  },
];

export const CommandPalette: React.FC = () => {
  const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      } else if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  const filtered = SEARCH_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    navigate(path);
    setCommandPaletteOpen(false);
    setQuery('');
  };

  if (!commandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl bg-layra-surface border border-layra-border rounded-xl shadow-2xl overflow-hidden glass-panel-elevated"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 border-b border-layra-border gap-3">
          <Search className="w-5 h-5 text-layra-primary" />
          <input
            autoFocus
            type="text"
            placeholder="Search modules, agents, documents, or workflows..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-sm text-layra-text placeholder:text-layra-muted focus:outline-none"
          />
          <button
            onClick={() => setCommandPaletteOpen(false)}
            className="p-1 text-layra-muted hover:text-white rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-layra-border/40">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-layra-muted">
              No matching resources found for "{query}".
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.title}
                  onClick={() => handleSelect(item.path)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${
                    isSelected ? 'bg-layra-primary/15 border border-layra-primary/30' : 'hover:bg-layra-elevated'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-layra-elevated border border-layra-border flex items-center justify-center text-layra-primary">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-layra-text">{item.title}</div>
                      <div className="text-xs text-layra-muted">{item.subtitle}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-layra-elevated text-layra-muted border border-layra-border">
                      {item.category}
                    </span>
                    <ArrowRight className="w-4 h-4 text-layra-muted" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="px-4 py-2 border-t border-layra-border bg-layra-elevated/40 flex items-center justify-between text-[11px] text-layra-muted">
          <span>Navigate with arrows or click to select</span>
          <span className="font-mono">ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
