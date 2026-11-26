import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center select-none">
      <div className="w-16 h-16 rounded-2xl bg-layra-surface border border-layra-border flex items-center justify-center text-layra-primary mb-4 shadow-glow-primary">
        <Compass className="w-8 h-8" />
      </div>

      <h1 className="text-2xl font-bold text-white mb-2">404 — Knowledge Node Not Found</h1>
      <p className="text-xs text-layra-muted max-w-sm mb-6 leading-relaxed">
        The destination module or reasoning route does not exist or has been restructured.
      </p>

      <button
        onClick={() => navigate('/workspace')}
        className="flex items-center gap-2 px-4 py-2 bg-layra-primary text-white text-xs font-medium rounded-lg hover:bg-layra-primary-hover transition-colors shadow-glow-primary"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to AI Workspace</span>
      </button>
    </div>
  );
};
