import clsx from 'clsx';
import * as React from 'react';

import { badgeRecipe, BadgeVariants } from './styles.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & NonNullable<BadgeVariants>;

/*
 * ============================================
 * Component
 * ============================================
 */

/**
 * Small label reporting state.
 *
 * Not interactive, and not focusable — if it can be clicked or dismissed it is a
 * `Chip`. That split is worth keeping: a badge inside a button would put two
 * focusable things where the user expects one.
 *
 * A tone carries meaning to people who can see it. If the meaning matters, put
 * it in the text too — "Failed" beside a red badge, not a red badge alone.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { size, tone, solid, className, ...props },
  ref
) {
  return (
    <span {...props} ref={ref} className={clsx(badgeRecipe({ size, tone, solid }), className)} />
  );
});
