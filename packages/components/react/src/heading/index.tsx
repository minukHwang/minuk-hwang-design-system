import type { HeadingStep } from '@minuk-hwang-design-system/style-tokens';
import clsx from 'clsx';
import * as React from 'react';

import * as css from '../text/styles.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

/**
 * The top ten steps of the scale, defined in the token package.
 *
 * Heading stops at `body2` because a card title set at 16px is a real thing,
 * and below that a heading stops being one. `Text` takes the bottom ten; the
 * six they share are the band where either is a real answer.
 */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = HeadingStep;

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
  /** Overrides the size this level would otherwise take. */
  size?: HeadingSize;
  weight?: css.TextWeight;
  color?: css.TextColor;
  align?: css.TextAlign;
  truncate?: boolean;
};

/*
 * ============================================
 * Component
 * ============================================
 */

/**
 * What each level looks like when nothing says otherwise.
 *
 * A default rather than a rule: an `h3` inside a card usually wants to be
 * smaller than an `h3` opening a page, and `size` is how you say so without
 * lying about where it sits in the document.
 */
const SIZE_FOR_LEVEL: Record<HeadingLevel, HeadingSize> = {
  1: 'title1',
  2: 'title2',
  3: 'title3',
  4: 'heading1',
  5: 'heading2',
  6: 'headline',
};

/**
 * A heading.
 *
 * `level` sets both the element and the default size, so the two cannot drift
 * apart by omission. Overriding `size` changes only what it looks like — the
 * outline stays whatever `level` said.
 *
 * Weight defaults to `bold`, because a heading that is not heavier than the
 * text under it is doing nothing that a paragraph could not.
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
        css.sizeStyle[size ?? SIZE_FOR_LEVEL[level]],
        css.weightStyle[weight],
        css.colorStyle[color],
        align && css.alignStyle[align],
        truncate && css.truncateStyle,
        className
      )}
    />
  );
});
