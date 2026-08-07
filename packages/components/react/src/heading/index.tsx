import {
  headingSizeForLevel,
  type HeadingLevel,
  type HeadingSize,
} from '@minuk-hwang-design-system/style-tokens';
import clsx from 'clsx';
import * as React from 'react';

import * as text from '../text/styles.css';

import * as css from './styles.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type { HeadingLevel, HeadingSize };

export type HeadingProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'> & {
  /**
   * The document level, and the element. Required — there is no safe default.
   *
   * Radix Themes defaults this to `h1`, which means three headings on a page
   * silently produce three `h1`s: the screen looks right and the outline is
   * wrong, which is the failure nobody catches. A required prop costs one
   * keystroke and cannot be forgotten.
   */
  level: HeadingLevel;
  /** 1 is the smallest. Ten steps, 16px to 60px. Defaults to what `level` implies. */
  size?: HeadingSize;
  weight?: text.TextWeight;
  color?: text.TextColor;
  align?: text.TextAlign;
  truncate?: boolean;
};

/*
 * ============================================
 * Component
 * ============================================
 */

/**
 * A heading.
 *
 * `level` sets both the element and the default size, so the two cannot drift
 * apart by omission. Overriding `size` changes only what it looks like — the
 * outline stays whatever `level` said.
 *
 * Weight defaults to `bold`, because a heading no heavier than the text under
 * it is doing nothing a paragraph could not.
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { level, size, weight = 'bold', color = 'strong', align, truncate, className, ...props },
  ref
) {
  const Component = `h${level}` as 'h1';

  return (
    <Component
      {...props}
      ref={ref}
      className={clsx(
        css.sizeStyle[size ?? headingSizeForLevel[level]],
        text.weightStyle[weight],
        text.colorStyle[color],
        align && text.alignStyle[align],
        truncate && text.truncateStyle,
        className
      )}
    />
  );
});
