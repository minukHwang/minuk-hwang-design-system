'use client';

import { Theme } from '@minuk-hwang-design-system/components-react/theme';
import {
  defaultAccentColor,
  defaultNeutralColor,
  defaultRadiusScale,
  type AccentColor,
  type NeutralColor,
  type RadiusScale,
} from '@minuk-hwang-design-system/style-tokens';
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
  neutral: NeutralColor;
  radius: RadiusScale;
  setAppearance: (value: Appearance) => void;
  setAccent: (value: AccentColor) => void;
  setNeutral: (value: NeutralColor) => void;
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
 * The values are state and nothing else. `Theme` turns them into attributes,
 * which is the same thing any consumer of this system does — the site used to
 * write them onto `html` by hand, from a time when `Theme` could not carry an
 * appearance.
 *
 * `localStorage` is the one thing here that is not the library's business, so it
 * stays: a reload should open on the dials you left.
 */
export const DialsProvider = ({ children }: { children: React.ReactNode }) => {
  const [appearance, setAppearance] = React.useState<Appearance>('system');
  /*
   * The dials start where the library starts, read from it rather than repeated
   * here. Written out, the two drifted apart the moment the defaults changed,
   * and the site then opened on an appearance an install would not produce.
   */
  const [accent, setAccent] = React.useState<AccentColor>(defaultAccentColor);
  const [neutral, setNeutral] = React.useState<NeutralColor>(defaultNeutralColor);
  const [radius, setRadius] = React.useState<RadiusScale>(defaultRadiusScale);

  // Read once on mount rather than during render: the server has no
  // localStorage, and initialising from it would make the first client render
  // disagree with the HTML it is hydrating.
  React.useEffect(() => {
    const stored = {
      theme: window.localStorage.getItem('theme') as Appearance | null,
      accent: window.localStorage.getItem('accent') as AccentColor | null,
      neutral: window.localStorage.getItem('neutral') as NeutralColor | null,
      radius: window.localStorage.getItem('radius') as RadiusScale | null,
    };
    if (stored.theme) setAppearance(stored.theme);
    if (stored.accent) setAccent(stored.accent);
    if (stored.neutral) setNeutral(stored.neutral);
    if (stored.radius) setRadius(stored.radius);
  }, []);

  /*
   * `system` is remembered by forgetting. Storing the word would pin whichever
   * theme the OS reported at the time and stop following it afterwards.
   */
  React.useEffect(() => {
    if (appearance === 'system') window.localStorage.removeItem('theme');
    else window.localStorage.setItem('theme', appearance);
  }, [appearance]);

  React.useEffect(() => {
    window.localStorage.setItem('accent', accent);
  }, [accent]);

  React.useEffect(() => {
    window.localStorage.setItem('neutral', neutral);
  }, [neutral]);

  React.useEffect(() => {
    window.localStorage.setItem('radius', radius);
  }, [radius]);

  const value = React.useMemo(
    () => ({
      appearance,
      accent,
      neutral,
      radius,
      setAppearance,
      setAccent,
      setNeutral,
      setRadius,
    }),
    [appearance, accent, neutral, radius]
  );

  /*
   * The site is a consumer of its own library here, not a special case. The
   * dials are state; `Theme` is what turns state into the attributes the token
   * stylesheet reads, and it paints the page from them because `body` is above
   * every element React renders and cannot be reached from inside.
   */
  return (
    <DialsContext.Provider value={value}>
      <Theme
        appearance={appearance}
        accentColor={accent}
        neutralColor={neutral}
        radius={radius}
        pageBackground="raised"
      >
        {children}
      </Theme>
    </DialsContext.Provider>
  );
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
 * looking at the light theme's numbers over the dark theme's colors.
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
