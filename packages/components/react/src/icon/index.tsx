import clsx from 'clsx';
import * as React from 'react';

import { textColor, TextColor } from '../text/styles.css';

import { icon } from './styles.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type IconProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'color' | 'children'> & {
  /** Material Symbols name, e.g. `search`, `close`, `chevron_right`. */
  name: string;
  /** Matches the type scale, so an icon beside 14px text can be told to be 14px. */
  size?: 14 | 16 | 18 | 20 | 24;
  color?: TextColor;
  /**
   * Description for assistive tech. Omit it for anything decorative — an icon
   * beside its own label is decorative, and reading it twice is worse than not
   * reading it at all.
   */
  label?: string;
};

/*
 * ============================================
 * Component
 * ============================================
 */

/**
 * Material Symbols glyph.
 *
 * The font arrives with the token stylesheet, so there is nothing to install.
 * Names come from the Material Symbols set and are passed as text content —
 * that is how the font maps a ligature to a glyph.
 *
 * Without `label` the icon is hidden from screen readers. That is the right
 * default: most icons sit next to the words they illustrate, and announcing both
 * makes the interface read like it stutters.
 */
export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(function Icon(
  { name, size = 20, color = 'normal', label, className, ...props },
  ref
) {
  return (
    <span
      {...props}
      ref={ref}
      className={clsx('material-symbols-outlined', icon, textColor[color], className)}
      style={{ fontSize: `${size}px`, ...props.style }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {name}
    </span>
  );
});
