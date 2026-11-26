import React from 'react';
import { cn } from '@/lib/utils';

export type StatusType = 
  | 'active' 
  | 'processing' 
  | 'executing' 
  | 'idle' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'indexed' 
  | 'failed' 
  | 'queued';

interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  pulse?: boolean;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  pulse = true,
  className,
}) => {
  const statusStyles: Record<StatusType, { dot: string; text: string; badge: string }> = {
    active: {
      dot: 'bg-layra-secondary shadow-[0_0_8px_#55D6E8]',
      text: 'text-layra-secondary',
      badge: 'bg-layra-secondary/10 border-layra-secondary/20 text-layra-secondary',
    },
    executing: {
      dot: 'bg-layra-primary shadow-[0_0_8px_#8B7CFF]',
      text: 'text-layra-primary',
      badge: 'bg-layra-primary/10 border-layra-primary/20 text-layra-primary',
    },
    processing: {
      dot: 'bg-layra-primary shadow-[0_0_8px_#8B7CFF]',
      text: 'text-layra-primary',
      badge: 'bg-layra-primary/10 border-layra-primary/20 text-layra-primary',
    },
    indexed: {
      dot: 'bg-layra-success shadow-[0_0_8px_#39C99A]',
      text: 'text-layra-success',
      badge: 'bg-layra-success/10 border-layra-success/20 text-layra-success',
    },
    success: {
      dot: 'bg-layra-success shadow-[0_0_8px_#39C99A]',
      text: 'text-layra-success',
      badge: 'bg-layra-success/10 border-layra-success/20 text-layra-success',
    },
    warning: {
      dot: 'bg-layra-warning shadow-[0_0_8px_#F3B96B]',
      text: 'text-layra-warning',
      badge: 'bg-layra-warning/10 border-layra-warning/20 text-layra-warning',
    },
    error: {
      dot: 'bg-layra-danger shadow-[0_0_8px_#FF6B6B]',
      text: 'text-layra-danger',
      badge: 'bg-layra-danger/10 border-layra-danger/20 text-layra-danger',
    },
    failed: {
      dot: 'bg-layra-danger shadow-[0_0_8px_#FF6B6B]',
      text: 'text-layra-danger',
      badge: 'bg-layra-danger/10 border-layra-danger/20 text-layra-danger',
    },
    idle: {
      dot: 'bg-layra-muted/60',
      text: 'text-layra-muted',
      badge: 'bg-layra-surface border-layra-border text-layra-muted',
    },
    queued: {
      dot: 'bg-layra-muted/60',
      text: 'text-layra-muted',
      badge: 'bg-layra-surface border-layra-border text-layra-muted',
    },
  };

  const style = statusStyles[status] || statusStyles.idle;

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <span className="relative flex h-2 w-2">
        {pulse && (status === 'processing' || status === 'active' || status === 'executing') && (
          <span
            className={cn(
              'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
              style.dot
            )}
          />
        )}
        <span className={cn('relative inline-flex rounded-full h-2 w-2', style.dot)} />
      </span>
      {label && (
        <span className={cn('text-xs font-medium capitalize', style.text)}>
          {label}
        </span>
      )}
    </div>
  );
};
