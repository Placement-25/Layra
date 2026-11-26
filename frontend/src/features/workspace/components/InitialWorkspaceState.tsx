import React from 'react';
import {
  FileSearch,
  GitCompare,
  Lightbulb,
  Compass,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface InitialWorkspaceStateProps {
  onSelectPrompt: (promptText: string) => void;
}

export const InitialWorkspaceState: React.FC<InitialWorkspaceStateProps> = ({
  onSelectPrompt,
}) => {
  const suggestedPrompts = [
    {
      title: 'Analyze a Document',
      description: 'Extract deep semantic structures, thermal thresholds, or compliance requirements.',
      icon: FileSearch,
      prompt: 'Analyze the indexed battery degradation report and highlight the failure modes at high operating temperatures.',
      color: 'border-layra-primary/30 hover:border-layra-primary text-layra-primary',
    },
    {
      title: 'Compare Multiple Sources',
      description: 'Synthesize cross-corpus evidence, identifying discrepancies and common assertions.',
      icon: GitCompare,
      prompt: 'Compare the regulatory risk exposures in our legal filings against Q3 disclosures.',
      color: 'border-layra-secondary/30 hover:border-layra-secondary text-layra-secondary',
    },
    {
      title: 'Extract Key Insights',
      description: 'Distill dense datasets and technical papers into actionable executive takeaways.',
      icon: Lightbulb,
      prompt: 'Extract all quantitative metrics, percentages, and financial ratios from recent uploads.',
      color: 'border-layra-warning/30 hover:border-layra-warning text-layra-warning',
    },
    {
      title: 'Explore a Research Topic',
      description: 'Formulate hypotheses and inspect knowledge graph trajectories autonomously.',
      icon: Compass,
      prompt: 'Explore the trade-offs between ceramic oxide and sulfide electrolytes in high-energy density cells.',
      color: 'border-layra-primary/30 hover:border-layra-primary text-layra-primary',
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-3xl mx-auto w-full text-center">
      {/* Futuristic Visual Graphic */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-2xl bg-layra-surface border border-layra-border flex items-center justify-center relative z-10 shadow-glow-primary">
          <Sparkles className="w-10 h-10 text-layra-primary animate-pulse-glow" />
        </div>
        <div className="absolute inset-0 bg-layra-primary/20 rounded-2xl blur-xl" />
      </div>

      {/* Primary Brand Vision Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
        Think beyond information.
      </h1>
      <p className="text-sm sm:text-base text-layra-muted max-w-md mx-auto mb-10 leading-relaxed">
        Explore your knowledge. Connect ideas. Discover insights.
      </p>

      {/* Suggested Prompt Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full text-left">
        {suggestedPrompts.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.title}
              onClick={() => onSelectPrompt(card.prompt)}
              className="p-4 rounded-xl bg-layra-surface/70 border border-layra-border hover:bg-layra-elevated hover:border-layra-border-light transition-all duration-200 group text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-layra-elevated border border-layra-border">
                      <Icon className="w-4 h-4 text-layra-primary" />
                    </div>
                    <span className="text-sm font-semibold text-layra-text group-hover:text-white transition-colors">
                      {card.title}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-layra-muted group-hover:text-layra-primary group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-xs text-layra-muted leading-relaxed">
                  {card.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
