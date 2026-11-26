import React from 'react';
import { cn } from '@/lib/utils';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label?: string;
  variant?: 'ghost' | 'surface' | 'primary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  variant = 'ghost',
  size = 'md',
  active = false,
  className,
  title,
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7 p-1 text-sm',
    md: 'w-9 h-9 p-2 text-base',
    lg: 'w-11 h-11 p-2.5 text-lg',
  };

  const variantClasses = {
    ghost: cn(
      'text-layra-muted hover:text-layra-text hover:bg-layra-surface/80 active:bg-layra-elevated',
      active && 'text-layra-primary bg-layra-primary/10 border border-layra-primary/30'
    ),
    surface: cn(
      'bg-layra-surface text-layra-muted border border-layra-border hover:text-layra-text hover:border-layra-border-light hover:bg-layra-elevated',
      active && 'text-layra-primary border-layra-primary/40 bg-layra-primary/10'
    ),
    primary: 'bg-layra-primary text-white hover:bg-layra-primary-hover shadow-glow-primary active:scale-95',
    danger: 'text-layra-danger hover:bg-layra-danger/10 active:bg-layra-danger/20',
  };

  return (
    <button
      type="button"
      title={label || title}
      aria-label={label || title}
      className={cn(
        'inline-flex items-center justify-center rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-layra-primary/50 disabled:opacity-50 disabled:pointer-events-none',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
};
