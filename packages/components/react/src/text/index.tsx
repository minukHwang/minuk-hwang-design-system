import { typographyRecipe, TypographyVariants } from '@minuk-hwang-design-system/styles/typography';
import clsx from 'clsx';
import * as React from 'react';

import { textColor, TextColor, truncate as truncateStyle } from './styles.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type TextProps = React.HTMLAttributes<HTMLElement> &
  NonNullable<TypographyVariants> & {
    /** Element to render. Pick the one that is true of the content, not the one that looks right. */
    as?: React.ElementType;
    color?: TextColor;
    /** Truncates to a single line with an ellipsis. */
    truncate?: boolean;
  };

/*
 * ============================================
 * Component
 * ============================================
 */

/**
 * Text at one of the system's type steps.
 *
 * `textType` chooses the step; `as` chooses the element. They are separate on
 * purpose — a section heading that needs to read small is still an `h2`, and
 * collapsing the two is how a page ends up with six `h1`s or none.
 *
 * Colour is restricted to the semantic roles. A one-off hue belongs in the
 * caller's own class rather than in a prop that makes it look sanctioned.
 */
export const Text = React.forwardRef<HTMLElement, TextProps>(function Text(
  {
    as: Component = 'p',
    textType = 'body1',
    textMode = 'default',
    textAlign,
    color = 'normal',
    truncate,
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <Component
      {...props}
      ref={ref}
      className={clsx(
        typographyRecipe({ textType, textMode, textAlign }),
        textColor[color],
        truncate && truncateStyle,
        className
      )}
    >
      {children}
    </Component>
  );
});
