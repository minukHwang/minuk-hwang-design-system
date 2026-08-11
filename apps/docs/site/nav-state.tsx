'use client';

import * as React from 'react';

/*
 * ============================================
 * Context
 * ============================================
 */

type Nav = { open: boolean; setOpen: (value: boolean) => void };

const NavContext = React.createContext<Nav | null>(null);

/**
 * Whether the narrow-screen navigation is open.
 *
 * It lived inside `Sidebar` while the button that opens it lived there too. The
 * button belongs in the top bar — a disclosure on its own row under the bar is a
 * second bar, and the page starts two rows down — and a button in one component
 * cannot toggle state held in another. So the state moved up to where both can
 * reach it.
 */
export const NavProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  const value = React.useMemo(() => ({ open, setOpen }), [open]);
  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};

export const useNav = () => {
  const value = React.useContext(NavContext);
  if (!value) throw new Error('useNav must be used within NavProvider');
  return value;
};
