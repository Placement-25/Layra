import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNavigation } from './MobileNavigation';
import { AnimatedBackground } from '@/components/common/AnimatedBackground';
import { CommandPalette } from '@/components/common/CommandPalette';
import { useUIStore } from '@/store/uiStore';
import { CheckCircle2, X } from 'lucide-react';

export const AppShell: React.FC = () => {
  const { toastMessage, setToast } = useUIStore();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, setToast]);

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-layra-bg text-layra-text font-sans">
      <AnimatedBackground />

      {/* Main Persistent Sidebar */}
      <Sidebar />

      {/* Mobile drawer */}
      <MobileNavigation />

      {/* Global Command Palette */}
      <CommandPalette />

      {/* Right Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative z-10 overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto relative">
          <Outlet />
        </main>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-layra-surface border border-layra-primary/40 rounded-xl shadow-2xl glass-panel-elevated animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-4 h-4 text-layra-secondary flex-shrink-0" />
          <span className="text-xs text-layra-text font-medium">{toastMessage}</span>
          <button
            onClick={() => setToast(null)}
            className="p-1 text-layra-muted hover:text-white rounded"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
