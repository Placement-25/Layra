import React from 'react';
import { cn } from '@/lib/utils';

export const AnimatedBackground: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('fixed inset-0 pointer-events-none overflow-hidden z-0', className)}>
      {/* Top primary ambient glow */}
      <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-layra-primary/10 rounded-full blur-[140px]" />
      
      {/* Bottom right cyan ambient glow */}
      <div className="absolute -bottom-[20%] right-[5%] w-[550px] h-[450px] bg-layra-secondary/8 rounded-full blur-[130px]" />

      {/* Subtle fine geometric grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #8B7CFF 1px, transparent 1px), linear-gradient(to bottom, #8B7CFF 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
};
