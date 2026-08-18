'use client';

import { createContext, useContext } from 'react';

interface NavContextValue {
  navigate: (id: string) => void;
}

export const NavContext = createContext<NavContextValue>({ navigate: () => {} });

export function useNav() {
  return useContext(NavContext);
}
