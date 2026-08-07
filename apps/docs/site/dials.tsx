'use client';

import type { AccentColor, RadiusScale } from '@minuk-hwang-design-system/style-tokens';
import * as React from 'react';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type Appearance = 'light' | 'dark' | 'system';

type Dials = {
  appearance: Appearance;
  accent: AccentColor;
  radius: RadiusScale;
  setAppearance: (value: Appearance) => void;
  setAccent: (value: AccentColor) => void;
  setRadius: (value: RadiusScale) => void;
};

/*
 * ============================================
 * Context
 * ============================================
 */

const DialsContext = React.createContext<Dials | null>(null);

/**
 * Everything that decides what the document looks like, in one place.
 *
 * The three settings used to be spread across the components that rendered
 * their controls, which was fine while there was one of them. It stopped being
 * fine when the Theme page grew a picker for the same values the toolbar owns —
 * two copies of the same state, agreeing only until someone used both.
 *
 * All three are attributes on `html` rather than React state applied to a
 * wrapper, because that is where the token stylesheet reads them: `data-theme`
 * has to sit on the document so the rule that follows the operating system can
 * ask whether the document as a whole has overridden it.
 */
export const DialsProvider = ({ children }: { children: React.ReactNode }) => {
  const [appearance, setAppearance] = React.useState<Appearance>('system');
  const [accent, setAccent] = React.useState<AccentColor>('blue');
  const [radius, setRadius] = React.useState<RadiusScale>('medium');

  // Read once on mount rather than during render: the server has no
  // localStorage, and initialising from it would make the first client render
  // disagree with the HTML it is hydrating.
  React.useEffect(() => {
    const stored = {
      theme: window.localStorage.getItem('theme') as Appearance | null,
      accent: window.localStorage.getItem('accent') as AccentColor | null,
      radius: window.localStorage.getItem('radius') as RadiusScale | null,
    };
    if (stored.theme) setAppearance(stored.theme);
    if (stored.accent) setAccent(stored.accent);
    if (stored.radius) setRadius(stored.radius);
  }, []);

  /*
   * Removing the attribute hands control back to the OS, which is not the same
   * as writing whichever theme the OS currently reports — that would pin a guess
   * and stop following it.
   */
  React.useEffect(() => {
    const root = document.documentElement;
    if (appearance === 'system') {
      root.removeAttribute('data-theme');
      window.localStorage.removeItem('theme');
    } else {
      root.setAttribute('data-theme', appearance);
      window.localStorage.setItem('theme', appearance);
    }
  }, [appearance]);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
    window.localStorage.setItem('accent', accent);
  }, [accent]);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-radius', radius);
    window.localStorage.setItem('radius', radius);
  }, [radius]);

  const value = React.useMemo(
    () => ({ appearance, accent, radius, setAppearance, setAccent, setRadius }),
    [appearance, accent, radius]
  );

  return <DialsContext.Provider value={value}>{children}</DialsContext.Provider>;
};

export const useDials = () => {
  const context = React.useContext(DialsContext);
  if (!context) throw new Error('useDials must be used within DialsProvider');
  return context;
};

/**
 * Which theme is actually showing, with `system` resolved.
 *
 * `appearance` is what was asked for; pages that display per-theme data need
 * what was given. Subscribing to the media query rather than reading it once
 * matters — someone switching their OS to dark at dusk should not be left
 * looking at the light theme's numbers over the dark theme's colours.
 */
export const useResolvedAppearance = (): 'light' | 'dark' => {
  const { appearance } = useDials();
  const [systemIsDark, setSystemIsDark] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemIsDark(query.matches);
    const onChange = (event: MediaQueryListEvent) => setSystemIsDark(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  if (appearance !== 'system') return appearance;
  return systemIsDark ? 'dark' : 'light';
};
