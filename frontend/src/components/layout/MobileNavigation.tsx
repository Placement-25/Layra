import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  MessageSquareText,
  Database,
  Bot,
  GitFork,
  X,
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';

export const MobileNavigation: React.FC = () => {
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore();

  const navigationItems = [
    { name: 'AI Workspace', path: '/workspace', icon: MessageSquareText },
    { name: 'Knowledge Base', path: '/knowledge', icon: Database },
    { name: 'AI Agents', path: '/agents', icon: Bot },
    { name: 'Workflows', path: '/workflows', icon: GitFork },
  ];

  if (!mobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-72 bg-layra-sidebar border-r border-layra-border p-4 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-layra-border">
            <Logo size="md" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 text-layra-muted hover:text-white rounded-lg hover:bg-layra-surface"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-6 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'text-white bg-layra-surface border border-layra-border text-layra-primary'
                        : 'text-layra-muted hover:text-white hover:bg-layra-surface/50'
                    )
                  }
                >
                  <Icon className="w-5 h-5 text-layra-primary" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="p-3 bg-layra-surface/40 rounded-lg border border-layra-border text-xs text-layra-muted">
          LAYRA Reasoning Interface v1.0
        </div>
      </div>
    </div>
  );
};
