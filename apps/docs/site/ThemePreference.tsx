'use client';

import * as React from 'react';

/**
 * Reapplies the accent and radius chosen on the Theme page to every other page.
 *
 * The picker lives on one page but changes the whole site on purpose — judging a
 * brand colour on a single sample block is how you pick a hue that works on a
 * single sample block. This is the part that makes the choice survive a
 * navigation.
 *
 * Renders nothing. The attributes go on `html`, which is where the token
 * stylesheet's dials are read from, and where React does not own the DOM.
 */
export const ThemePreference = () => {
  React.useEffect(() => {
    const root = document.documentElement;
    (['accent', 'radius'] as const).forEach(key => {
      const stored = window.localStorage.getItem(key);
      if (stored) root.setAttribute(`data-${key}`, stored);
    });
  }, []);

  return null;
};
