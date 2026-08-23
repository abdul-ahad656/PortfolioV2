'use client';

import { createContext, useContext } from 'react';

interface NavContextValue {
  navigate: (id: string) => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  sidebarOpen: boolean;
}

export const NavContext = createContext<NavContextValue>({
  navigate: () => {},
  openSidebar: () => {},
  closeSidebar: () => {},
  sidebarOpen: false,
});

export function useNav() {
  return useContext(NavContext);
}
