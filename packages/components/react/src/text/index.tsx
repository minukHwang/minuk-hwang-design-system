import type { TextStep } from '@minuk-hwang-design-system/style-tokens';
import clsx from 'clsx';
import * as React from 'react';

import * as css from './styles.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

/**
 * The bottom ten steps of the scale, defined in the token package.
 *
 * Text stops at `title3` because nothing above 24px is ever run as body copy —
 * a 28px paragraph is a heading that forgot to say so. `Heading` takes the top
 * ten, and the six they share are the band where either is a real answer.
 */
export type TextSize = TextStep;

export type TextProps = Omit<React.HTMLAttributes<HTMLElement>, 'color'> & {
  /** Element to render. Pick the one that is true of the content. */
  as?: React.ElementType;
  size?: TextSize;
  weight?: css.TextWeight;
  /**
   * `reading` keeps the size and opens the line height, for text that will be
   * read as a paragraph rather than scanned as a label.
   */
  leading?: 'normal' | 'reading';
  color?: css.TextColor;
  align?: css.TextAlign;
  /** One line, with an ellipsis. */
  truncate?: boolean;
  /** Clamp to this many lines. Ignored when `truncate` is set. */
  lines?: number;
};

/*
 * ============================================
 * Component
 * ============================================
 */

/**
 * Body text at one of the system's steps.
 *
 * `size` chooses the step; `as` chooses the element. They are separate on
 * purpose — a caption that has to be a `dd` is still a caption, and collapsing
 * the two is how a document outline quietly stops matching what is on screen.
 *
 * For anything that is a heading, reach for `Heading`. It takes a `level`
 * rather than an element, so the outline cannot be left to whoever remembered.
 */
export const Text = React.forwardRef<HTMLElement, TextProps>(function Text(
  {
    as: Component = 'p',
    size = 'body2',
    weight = 'regular',
    leading = 'normal',
    color = 'normal',
    align,
    truncate,
    lines,
    className,
    style,
    children,
    ...props
  },
  ref
) {
  const clamped = !truncate && lines !== undefined && lines > 1;

  return (
    <Component
      {...props}
      ref={ref}
      className={clsx(
        css.sizeStyle[size],
        css.weightStyle[weight],
        leading === 'reading' && css.hasReading[size] && css.readingStyle[size],
        css.colorStyle[color],
        align && css.alignStyle[align],
        truncate && css.truncateStyle,
        clamped && css.clampStyle,
        className
      )}
      style={clamped ? ({ '--text-lines': lines, ...style } as React.CSSProperties) : style}
    >
      {children}
    </Component>
  );
});
