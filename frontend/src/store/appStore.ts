import { create } from 'zustand';
import { UserProfile } from '@/types';

interface AppState {
  currentUser: UserProfile;
  activeContextPanelOpen: boolean;
  toggleContextPanel: () => void;
  setContextPanelOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentUser: {
    id: 'usr_research_01',
    name: 'Dr. Evelyn Vance',
    email: 'evelyn.vance@layra.ai',
    role: 'Principal AI Researcher',
    tier: 'Enterprise Research',
  },
  activeContextPanelOpen: true,
  toggleContextPanel: () => set((state) => ({ activeContextPanelOpen: !state.activeContextPanelOpen })),
  setContextPanelOpen: (open) => set({ activeContextPanelOpen: open }),
}));
