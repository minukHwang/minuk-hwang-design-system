'use client';

import type {
  AccentColor,
  Appearance,
  NeutralColor,
  PageBackground,
  RadiusScale,
} from '@minuk-hwang-design-system/style-tokens';
import clsx from 'clsx';
import * as React from 'react';

import * as css from './styles.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type { AccentColor, Appearance, NeutralColor, PageBackground, RadiusScale };

export type ThemeProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Light, dark, or the operating system's answer.
   *
   * `system` is the absence of a choice rather than a third set of values, so
   * choosing it removes the attribute and lets `prefers-color-scheme` decide
   * again. Omitting the prop inherits whatever an outer `Theme` was given, the
   * same as the dials below.
   */
  appearance?: Appearance;
  /**
   * The brand color. Any of the fourteen chromatic scales.
   *
   * The text color that clears AA on each one is measured per theme alongside
   * it, so this cannot quietly put white on yellow.
   */
  accentColor?: AccentColor;
  /**
   * Which gray family the surfaces and borders are drawn from.
   *
   * `mono` is gray with no hue in it; `gray` and `slate` lean progressively
   * toward blue. Text does not move with this — those values answer to contrast
   * against the surfaces rather than to the family they sit on.
   */
  neutralColor?: NeutralColor;
  /**
   * How round every corner in the system is.
   *
   * A multiplier over the radius scale rather than a second set of values, so
   * the steps keep their relationship to each other. `none` squares everything
   * including pills, which is what asking for no radius means.
   */
  radius?: RadiusScale;
  /**
   * Which level the page itself sits on.
   *
   * `base` is the default: a tinted page with the surfaces raised off it.
   * `raised` brings the page level with them, which is the white-page
   * arrangement — and there the color that told a card from the page is gone,
   * so give cards `elevation="outlined"`.
   */
  pageBackground?: PageBackground;
  /**
   * Whether this `Theme` paints the ground under it.
   *
   * Left alone it is true for the outermost `Theme` and for any nested one that
   * names an `appearance`, which is the pair of cases where the values below it
   * no longer match the surface it was dropped onto. Set it false to place a
   * themed region on a background the page has already painted.
   */
  hasBackground?: boolean;
};

/*
 * ============================================
 * Context
 * ============================================
 */

type ThemeSettings = {
  appearance?: Appearance;
  accentColor?: AccentColor;
  neutralColor?: NeutralColor;
  radius?: RadiusScale;
  pageBackground?: PageBackground;
  /** The element carrying the attributes, for anything that leaves the tree. */
  container: HTMLElement | null;
};

/**
 * The settings in force, and whether a `Theme` already encloses this one.
 *
 * `undefined` means nothing above, which is how the root knows it is the root:
 * it paints, and it marks itself so the document can read its appearance.
 * Asking the caller which one they are would put the answer in the hands of
 * whoever is nesting, and they are usually the one person who cannot know.
 *
 * The element rides along because the DOM is not the only tree here. A dialog, a
 * popover, a tooltip and a menu all render through a portal, and a portal into
 * `body` lands outside every `Theme` — so inheritance, which is how the
 * attributes reach everything else, reaches none of them. Turning a dial left
 * those four surfaces on the theme the page opened with.
 *
 * React's tree still contains them, so the portal can be told where to go:
 * into this element rather than into `body`. Nothing has to be re-applied on
 * the other side, because there is no other side.
 */
const ThemeContext = React.createContext<ThemeSettings | undefined>(undefined);

/**
 * Where a portal should render so that it stays inside the theme.
 *
 * `undefined` when there is no `Theme` above, which lets a portal keep its own
 * default of `body` — with nothing overriding the document there is nothing to
 * be stranded from.
 */
export const useThemeContainer = (): HTMLElement | undefined =>
  React.useContext(ThemeContext)?.container ?? undefined;

/*
 * ============================================
 * Component
 * ============================================
 */

/**
 * Sets the appearance, the accent, the gray and the radius for everything inside.
 *
 * ```tsx
 * <Theme appearance="dark" accentColor="purple" neutralColor="slate" radius="large">
 *   <App />
 * </Theme>
 * ```
 *
 * Nothing is rebuilt and no component takes a new prop. Every stylesheet in the
 * system already reads `--accent-500` rather than `--green-500`, and
 * `--border-radius-8` rather than `0.5rem`; this writes the attributes those
 * properties are keyed off, and inheritance carries them down.
 *
 * That is also why it nests. A pricing section in teal inside a green
 * application is a second `Theme` around that section, and a dark footer under a
 * light page is a second `Theme` with an `appearance`. The selectors are
 * unqualified, so the nearest ancestor wins.
 *
 * Omitting a prop inherits it rather than resetting it, which is what makes a
 * nested `<Theme radius="full">` keep the accent it was given.
 *
 * The outermost one is a box and the rest are not. A wrapper with a layout of
 * its own would change the grid of whatever it is dropped into, which is why
 * the nested ones are `display: contents` — the element stays, the box does
 * not, and custom properties still cascade. The root has nothing above it to
 * disturb and one thing only it can do: paint the page. `body` is its ancestor,
 * not its child, so no element a component renders can colour the page from
 * inside. The root fills the viewport and paints instead.
 */
export const Theme = ({
  appearance,
  accentColor,
  neutralColor,
  radius,
  pageBackground,
  hasBackground,
  className,
  children,
  ...props
}: ThemeProps) => {
  const inherited = React.useContext(ThemeContext);
  const isRoot = inherited === undefined;

  /*
   * State rather than a ref, because a portal needs to re-render once the
   * element exists. A ref would be filled after the render that needed it and
   * the first dialog of the session would open into `body`.
   */
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  /*
   * Omitting a prop inherits it rather than resetting it, and the context has to
   * say so too — a portal reading these must see what is actually in force, not
   * the handful of props the nearest `Theme` happened to name.
   */
  const settings = React.useMemo(
    () => ({
      appearance: appearance ?? inherited?.appearance,
      accentColor: accentColor ?? inherited?.accentColor,
      neutralColor: neutralColor ?? inherited?.neutralColor,
      radius: radius ?? inherited?.radius,
      pageBackground: pageBackground ?? inherited?.pageBackground,
      container,
    }),
    [appearance, accentColor, neutralColor, radius, pageBackground, inherited, container]
  );

  /*
   * A themed region that names an appearance paints too, whether or not it is
   * the root: light content on a surface that just went dark is the one case
   * where inheriting the ground under you is wrong.
   */
  const paints = hasBackground ?? (isRoot || appearance === 'light' || appearance === 'dark');

  return (
    <ThemeContext.Provider value={settings}>
      <div
        {...props}
        ref={setContainer}
        /*
         * Every dial in force, not only the ones this `Theme` was given.
         *
         * A custom property is substituted where it is declared. `--accent-500:
         * var(--purple-500)` written on an outer `Theme` resolves against that
         * element's scales, so a nested `<Theme appearance="dark">` that wrote
         * only `data-theme` would inherit the accent as a light-theme purple and
         * have no way to recompute it. Restating the inherited value here puts
         * the declaration on the element whose scales just changed.
         *
         * `system` is the absence of an override, so it writes no attribute and
         * the stylesheet goes back to asking the operating system.
         */
        data-theme={settings.appearance === 'system' ? undefined : settings.appearance}
        data-accent={settings.accentColor}
        data-neutral={settings.neutralColor}
        data-radius={settings.radius}
        data-page-background={settings.pageBackground}
        /*
         * Marks the element as a theme scope, for the rule that follows the
         * operating system. `system` writes no `data-theme`, so without a mark
         * there is nothing for `:not([data-theme])` to select but the document,
         * and an element left on `system` kept the document's grays rather than
         * its own.
         */
        data-theme-scope=""
        // Read by `:root:has()` so the browser can paint the canvas and the
        // scrollbars to match. Only the outermost one, or a dark section would
        // take the whole window with it.
        data-theme-root={isRoot ? '' : undefined}
        className={clsx(paints ? css.painted : css.root, className)}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
