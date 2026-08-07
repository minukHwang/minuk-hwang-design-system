import type { AccentColor, RadiusScale } from '@minuk-hwang-design-system/style-tokens';
import clsx from 'clsx';
import * as React from 'react';

import * as css from './styles.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type { AccentColor, RadiusScale };

export type ThemeProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * The brand colour. Any of the fourteen chromatic scales.
   *
   * The text colour that clears AA on each one is measured per theme alongside
   * it, so this cannot quietly put white on yellow.
   */
  accentColor?: AccentColor;
  /**
   * How round every corner in the system is.
   *
   * A multiplier over the radius scale rather than a second set of values, so
   * the steps keep their relationship to each other. `none` squares everything
   * including pills, which is what asking for no radius means.
   */
  radius?: RadiusScale;
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
 * <Theme accentColor="violet" radius="large">
 *   <App />
 * </Theme>
 * ```
 *
 * Nothing is rebuilt and no component takes a new prop. Every stylesheet in the
 * system already reads `--accent-500` rather than `--blue-500`, and
 * `--border-radius-8` rather than `0.5rem`; this writes the two attributes those
 * properties are keyed off, and inheritance carries them down.
 *
 * That is also why it nests. A pricing section in violet inside a blue
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
export const Theme = ({ accentColor, radius, className, children, ...props }: ThemeProps) => (
  <div
    {...props}
    data-accent={accentColor}
    data-radius={radius}
    className={clsx(css.root, className)}
  >
    {children}
  </div>
);
