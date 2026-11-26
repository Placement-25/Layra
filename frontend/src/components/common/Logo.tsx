import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  collapsed?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className,
  size = 'md',
  showTagline = true,
  collapsed = false,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  return (
    <div className={cn('flex items-center gap-3 select-none', className)}>
      <div className={cn('relative flex-shrink-0 flex items-center justify-center', iconSizes[size])}>
        {/* Ambient glow behind logo */}
        <div className="absolute inset-0 bg-layra-primary/20 blur-md rounded-full pointer-events-none" />
        
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 drop-shadow-[0_0_10px_rgba(139,124,255,0.4)]"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B7CFF" />
              <stop offset="50%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#55D6E8" />
            </linearGradient>
            <linearGradient id="innerGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#55D6E8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B7CFF" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {/* Outer futuristic hexagon prism */}
          <polygon
            points="50,10 88,31 88,73 50,94 12,73 12,31"
            stroke="url(#logoGradient)"
            strokeWidth="3.5"
            fill="#0D1019"
          />
          {/* Inner faceted polygon */}
          <polygon
            points="50,24 76,38 76,64 50,78 24,64 24,38"
            stroke="url(#innerGrad)"
            strokeWidth="1.8"
            fill="none"
          />
          {/* Central neural core */}
          <circle cx="50" cy="51" r="7" fill="url(#logoGradient)" />
          {/* Synaptic vectors */}
          <line x1="50" y1="10" x2="50" y2="44" stroke="#55D6E8" strokeWidth="2" strokeLinecap="round" />
          <line x1="88" y1="73" x2="57" y2="55" stroke="#8B7CFF" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="73" x2="43" y2="55" stroke="#8B7CFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {!collapsed && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold tracking-[0.16em] text-lg text-white font-sans">
              LAYRA
            </span>
            <span className="text-[10px] px-1.5 py-0.2 bg-layra-primary/15 text-layra-primary border border-layra-primary/30 rounded font-mono font-medium tracking-normal">
              v1.0
            </span>
          </div>
          {showTagline && (
            <span className="text-[10px] tracking-tight text-layra-muted font-normal truncate">
              Beyond Retrieval, Into Reasoning
            </span>
          )}
        </div>
      )}
    </div>
  );
};
