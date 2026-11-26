import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
  shortcut?: string;
  wrapperClassName?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  shortcut = '⌘K',
  wrapperClassName,
  className,
  placeholder = 'Search anything...',
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={cn('relative flex items-center w-full', wrapperClassName)}>
      <Search className="absolute left-3 w-4 h-4 text-layra-muted pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange?.(e);
          onSearch?.(e.target.value);
        }}
        placeholder={placeholder}
        className={cn(
          'w-full pl-9 pr-12 py-1.5 bg-layra-surface border border-layra-border rounded-lg text-sm text-layra-text placeholder:text-layra-muted/60 focus:outline-none focus:border-layra-primary/60 focus:ring-1 focus:ring-layra-primary/40 transition-colors',
          className
        )}
        {...props}
      />
      {shortcut && (
        <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-layra-muted bg-layra-elevated border border-layra-border rounded pointer-events-none">
          {shortcut}
        </kbd>
      )}
    </div>
  );
};
