import React from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-layra-border bg-layra-surface/30',
        className
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-layra-surface border border-layra-border flex items-center justify-center text-layra-primary mb-4 shadow-sm">
        {icon}
      </div>
      <h3 className="text-base font-medium text-layra-text mb-1">{title}</h3>
      <p className="text-xs text-layra-muted max-w-sm mb-5 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-layra-primary hover:bg-layra-primary-hover rounded-lg transition-colors shadow-glow-primary active:scale-95"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
