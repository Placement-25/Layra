import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  Sparkles,
  Command,
} from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';

export const Topbar: React.FC = () => {
  const location = useLocation();
  const { setMobileMenuOpen, setCommandPaletteOpen, setToast } = useUIStore();
  const { currentUser } = useAppStore();

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path.startsWith('/workspace')) return { module: 'AI Workspace', sub: 'Reasoning Engine' };
    if (path.startsWith('/knowledge')) return { module: 'Knowledge Base', sub: 'Vector & Document Corpus' };
    if (path.startsWith('/agents')) return { module: 'AI Agents', sub: 'Specialized Multi-Agent Ecosystem' };
    if (path.startsWith('/workflows')) return { module: 'Workflows', sub: 'Visual Logic Pipelines' };
    return { module: 'LAYRA', sub: 'Beyond Retrieval, Into Reasoning' };
  };

  const breadcrumb = getBreadcrumb();

  return (
    <header className="h-16 border-b border-layra-border bg-layra-bg/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-4 lg:px-6 select-none">
      {/* Left: Mobile trigger & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 text-layra-muted hover:text-white rounded-lg hover:bg-layra-surface transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-layra-primary font-medium tracking-wide uppercase">
            {breadcrumb.module}
          </span>
          <span className="text-layra-border text-xs">/</span>
          <span className="text-xs text-layra-muted font-normal hidden sm:inline-block">
            {breadcrumb.sub}
          </span>
        </div>
      </div>

      {/* Center: Global Search Pill */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg bg-layra-surface/70 border border-layra-border text-xs text-layra-muted hover:text-layra-text hover:border-layra-border-light transition-all shadow-sm group"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-3.5 h-3.5 text-layra-primary group-hover:text-layra-secondary transition-colors" />
            <span>Search agents, documents, prompts, workflows...</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[10px] bg-layra-elevated px-1.5 py-0.5 rounded border border-layra-border">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right: Mode Badge, Notification, User */}
      <div className="flex items-center gap-2.5">
        {/* Backend Ready Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-layra-surface border border-layra-border text-[11px] font-mono text-layra-muted">
          <Sparkles className="w-3 h-3 text-layra-primary" />
          <span>Simulation Active</span>
        </div>

        {/* Global Search mobile button */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="md:hidden p-2 text-layra-muted hover:text-white rounded-lg hover:bg-layra-surface transition-colors"
          title="Search (Cmd+K)"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => setToast('Notifications: 2 pending agent reasoning logs available.')}
          className="relative p-2 text-layra-muted hover:text-white rounded-lg hover:bg-layra-surface transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-layra-primary ring-2 ring-layra-bg" />
        </button>

        {/* User Avatar Menu */}
        <div className="flex items-center gap-2 pl-2 border-l border-layra-border/60">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-layra-primary to-layra-secondary flex items-center justify-center text-xs font-semibold text-white shadow-sm ring-1 ring-layra-border">
            EV
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-medium text-layra-text leading-tight">{currentUser.name}</div>
            <div className="text-[10px] text-layra-muted leading-tight font-mono">{currentUser.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
};
