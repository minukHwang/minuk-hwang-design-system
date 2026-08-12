import type {
  AccentColor,
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

export type { AccentColor, NeutralColor, PageBackground, RadiusScale };

export type ThemeProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * The brand colour. Any of the fourteen chromatic scales.
   *
   * The text colour that clears AA on each one is measured per theme alongside
   * it, so this cannot quietly put white on yellow.
   */
  accentColor?: AccentColor;
  /**
   * Which grey family the surfaces and borders are drawn from.
   *
   * `mono` is grey with no hue in it; `gray` and `slate` lean progressively
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
   * arrangement — and there the colour that told a card from the page is gone,
   * so give cards `elevation="outlined"`.
   *
   * Two things separate this from the dials above. It only moves in the light
   * theme, because dark has no equivalent to ask for: its page is already as far
   * from white as the ramp goes. And it is written to `<html>` rather than to
   * this element, because the page is `body` and no `div` contains it — a nested
   * `Theme` would recolour its own children and leave the page alone. So the
   * outermost `Theme` on a document wins, and a nested one ignores it.
   */
  pageBackground?: PageBackground;
};

/*
 * ============================================
 * Component
 * ============================================
 */

/**
 * Sets the accent and the radius for everything inside it.
 *
 * ```tsx
 * <Theme accentColor="purple" radius="large">
 *   <App />
 * </Theme>
 * ```
 *
 * Nothing is rebuilt and no component takes a new prop. Every stylesheet in the
 * system already reads `--accent-500` rather than `--blue-500`, and
 * `--border-radius-8` rather than `0.5rem`; this writes the two attributes those
 * properties are keyed off, and inheritance carries them down.
 *
 * That is also why it nests. A pricing section in teal inside a blue
 * application is a second `Theme` around that section — the attribute selectors
 * are unqualified, so the nearest ancestor wins.
 *
 * Omitting a prop inherits it rather than resetting it, which is what makes a
 * nested `<Theme radius="full">` keep the accent it was given.
 *
 * Appearance is not here. Light and dark are still chosen on the `html` element,
 * because the rule that follows the operating system has to be able to ask
 * whether the document as a whole has overridden it.
 *
 * There is nothing magic in this component — it is a `div` with two attributes,
 * and putting them on `<html>` by hand works identically. It exists so that the
 * set of legal values is a type rather than something to look up.
 */
export const Theme = ({
  accentColor,
  neutralColor,
  radius,
  pageBackground,
  className,
  children,
  ...props
}: ThemeProps) => {
  /*
   * The page level goes on the document, not on this element.
   *
   * `body` is not inside the `div` below, so an attribute written here could
   * never reach the one thing this prop is about. Everything else stays on the
   * element and nests, which is the difference the prop's own note explains.
   *
   * Cleaned up on unmount, and only by the `Theme` that set it: a nested one
   * passes `undefined` and never touches the attribute, so it cannot clear what
   * an outer one wrote.
   */
  React.useEffect(() => {
    if (!pageBackground) return;
    const root = document.documentElement;
    root.setAttribute('data-page-background', pageBackground);
    return () => root.removeAttribute('data-page-background');
  }, [pageBackground]);

  return (
    <div
      {...props}
      data-accent={accentColor}
      data-neutral={neutralColor}
      data-radius={radius}
      className={clsx(css.root, className)}
    >
      {children}
    </div>
  );
};
