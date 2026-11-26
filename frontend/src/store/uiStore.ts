import { create } from 'zustand';

interface UIState {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;

  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;

  activeNotificationCount: number;
  toastMessage: string | null;
  setToast: (message: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: typeof window !== 'undefined' && localStorage.getItem('layra_sidebar_collapsed') === 'true',
  setSidebarCollapsed: (collapsed) => {
    localStorage.setItem('layra_sidebar_collapsed', String(collapsed));
    set({ sidebarCollapsed: collapsed });
  },
  toggleSidebar: () =>
    set((state) => {
      const next = !state.sidebarCollapsed;
      localStorage.setItem('layra_sidebar_collapsed', String(next));
      return { sidebarCollapsed: next };
    }),

  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

  commandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  toggleCommandPalette: () => set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),

  activeNotificationCount: 2,
  toastMessage: null,
  setToast: (toastMessage) => set({ toastMessage }),
}));
