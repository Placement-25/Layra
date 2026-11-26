import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  MessageSquareText,
  Database,
  Bot,
  GitFork,
  ChevronLeft,
  ChevronRight,
  Settings,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { useUIStore } from '@/store/uiStore';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed, toggleSidebar, setToast } = useUIStore();
  const { currentUser } = useAppStore();
  const location = useLocation();

  const navigationItems = [
    {
      name: 'AI Workspace',
      path: '/workspace',
      icon: MessageSquareText,
      badge: 'Active',
    },
    {
      name: 'Knowledge Base',
      path: '/knowledge',
      icon: Database,
    },
    {
      name: 'AI Agents',
      path: '/agents',
      icon: Bot,
    },
    {
      name: 'Workflows',
      path: '/workflows',
      icon: GitFork,
    },
  ];

  return (
    <aside
      className={cn(
        'relative flex flex-col h-screen border-r border-layra-border bg-layra-sidebar transition-all duration-300 ease-in-out z-30 select-none flex-shrink-0',
        sidebarCollapsed ? 'w-18' : 'w-64'
      )}
    >
      {/* Brand Header */}
      <div className={cn('h-16 flex items-center px-4 border-b border-layra-border/60', sidebarCollapsed && 'justify-center px-2')}>
        <NavLink to="/workspace" className="focus:outline-none">
          <Logo collapsed={sidebarCollapsed} size="md" />
        </NavLink>
      </div>

      {/* Main Navigation Items (Only 4 primary items strictly as required) */}
      <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        <div className={cn('px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-layra-muted/60', sidebarCollapsed && 'sr-only')}>
          Intelligence Core
        </div>

        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={sidebarCollapsed ? item.name : undefined}
              className={cn(
                'group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                isActive
                  ? 'text-white bg-layra-surface border border-layra-border-light shadow-sm'
                  : 'text-layra-muted hover:text-layra-text hover:bg-layra-surface/50'
              )}
            >
              {/* Active glow pill on left */}
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-layra-primary rounded-r shadow-glow-primary" />
              )}

              <Icon
                className={cn(
                  'w-5 h-5 flex-shrink-0 transition-colors',
                  isActive ? 'text-layra-primary' : 'text-layra-muted group-hover:text-layra-text'
                )}
              />

              {!sidebarCollapsed && (
                <span className="truncate flex-1 tracking-tight">{item.name}</span>
              )}

              {!sidebarCollapsed && item.badge && isActive && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-layra-primary/15 text-layra-primary border border-layra-primary/20 font-mono">
                  {item.badge}
                </span>
              )}

              {/* Tooltip on collapse */}
              {sidebarCollapsed && (
                <div className="absolute left-full ml-3 px-2.5 py-1 bg-layra-elevated text-white text-xs rounded-md shadow-xl border border-layra-border whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50">
                  {item.name}
                </div>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* System Status Pill */}
      {!sidebarCollapsed && (
        <div className="mx-3 mb-2 p-2.5 rounded-lg bg-layra-surface/40 border border-layra-border/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-layra-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-layra-secondary" />
            </span>
            <div className="text-[11px] text-layra-muted font-medium">Ready for Backend</div>
          </div>
          <Sparkles className="w-3.5 h-3.5 text-layra-secondary/70" />
        </div>
      )}

      {/* Bottom User & Settings Area */}
      <div className="p-3 border-t border-layra-border/60 space-y-1.5 bg-layra-sidebar">
        <div className="flex items-center justify-between gap-1">
          <button
            onClick={() => setToast('Settings: Demo workspace settings and model routing preferences.')}
            className="flex-1 flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-layra-muted hover:text-layra-text hover:bg-layra-surface/60 transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4 text-layra-muted flex-shrink-0" />
            {!sidebarCollapsed && <span>Settings</span>}
          </button>

          <button
            onClick={() => setToast('Help & Docs: Architecture blueprints & LangGraph integration guide.')}
            className="p-2 rounded-lg text-xs text-layra-muted hover:text-layra-text hover:bg-layra-surface/60 transition-colors"
            title="Help"
          >
            <HelpCircle className="w-4 h-4 text-layra-muted" />
          </button>

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-xs text-layra-muted hover:text-layra-text hover:bg-layra-surface/60 transition-colors"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4 text-layra-primary" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* User Profile */}
        <div
          className={cn(
            'flex items-center gap-3 p-2 rounded-lg bg-layra-surface/50 border border-layra-border/40',
            sidebarCollapsed && 'justify-center p-1.5'
          )}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-layra-primary to-layra-secondary flex items-center justify-center text-xs font-bold text-white shadow-sm flex-shrink-0">
            EV
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-layra-text truncate">{currentUser.name}</div>
              <div className="text-[10px] text-layra-muted font-mono truncate">{currentUser.tier}</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
