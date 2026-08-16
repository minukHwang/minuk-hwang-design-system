'use client';

import clsx from 'clsx';
import * as React from 'react';

import { Icon } from '../icon';

import { chipRecipe, ChipVariants, remove } from './styles.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type ChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  NonNullable<ChipVariants> & {
    /** Toggle state. Present makes this a toggle; absent leaves it a plain button. */
    selected?: boolean;
    /** Adds a remove control. The label it needs is built from `children`. */
    onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  };

/*
 * ============================================
 * Component
 * ============================================
 */

/**
 * Pill-shaped control for filters, tags and toggles.
 *
 * `selected` becomes `aria-pressed`, which is both what styles the selected
 * state and what a screen reader announces. There is no way for the two to
 * disagree.
 *
 * With `onRemove` the chip holds a second button. That is deliberate: removing a
 * filter and toggling it are different actions, and putting both on one element
 * leaves a keyboard user unable to reach one of them.
 */
export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { size, selected, onRemove, className, children, type = 'button', ...props },
  ref
) {
  const iconSize = size === 's' ? 14 : 16;

  return (
    <button
      {...props}
      ref={ref}
      type={type}
      aria-pressed={selected}
      className={clsx(chipRecipe({ size }), className)}
    >
      {children}
      {onRemove && (
        <span
          className={remove}
          role="button"
          tabIndex={0}
          aria-label={typeof children === 'string' ? `Remove ${children}` : 'Remove'}
          // The chip is itself a button, so this cannot be one — nesting buttons
          // is invalid HTML and browsers resolve it by dropping the inner one.
          // A span with button semantics keeps both reachable.
          onClick={event => {
            event.stopPropagation();
            onRemove(event as unknown as React.MouseEvent<HTMLButtonElement>);
          }}
          onKeyDown={event => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            event.stopPropagation();
            onRemove(event as unknown as React.MouseEvent<HTMLButtonElement>);
          }}
        >
          <Icon name="close" size={iconSize} />
        </span>
      )}
    </button>
  );
});
