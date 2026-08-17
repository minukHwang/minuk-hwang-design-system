'use client';

import { Tooltip as Base } from '@minuk-hwang-design-system/base-react/tooltip';
import clsx from 'clsx';
import * as React from 'react';

import { useThemeContainer } from '../theme';

import { arrow, content } from './styles.css';

/*
 * ============================================
 * Parts
 * ============================================
 */

/**
 * Short label shown on hover or focus.
 *
 * Only ever supplementary. A tooltip is invisible on touch, gone the moment
 * focus moves, and unreachable by keyboard past its trigger — so anything a user
 * must read to proceed belongs in the interface itself, and anything they must
 * click belongs in a `Popover`.
 *
 * Mount `Tooltip.Provider` once near the app root. It shares the open and close
 * delays, which is what stops a row of icon buttons from each running its own.
 */
const Content = React.forwardRef<
  React.ElementRef<typeof Base.Content>,
  React.ComponentPropsWithoutRef<typeof Base.Content>
>(function TooltipContent({ className, ...props }, ref) {
  return (
    <Base.Content
      {...props}
      ref={ref}
      container={useThemeContainer()}
      className={clsx(content, className)}
    />
  );
});

const Arrow = React.forwardRef<
  React.ElementRef<typeof Base.Arrow>,
  React.ComponentPropsWithoutRef<typeof Base.Arrow>
>(function TooltipArrow({ className, ...props }, ref) {
  return <Base.Arrow {...props} ref={ref} className={clsx(arrow, className)} />;
});

/*
 * ============================================
 * Export
 * ============================================
 */

export const Tooltip = {
  Provider: Base.Provider,
  Root: Base.Root,
  Trigger: Base.Trigger,
  Content,
  Arrow,
};

/**
 * The parts again, as named exports.
 *
 * `Tooltip` is one object held by one binding, and a `'use client'` module's
 * exports do not cross into a server component as values — each becomes a
 * reference to a client component. A reference has no properties, so
 * `Tooltip.Provider` reads as `undefined` and React reports an invalid element
 * type. The namespace only works from another client component.
 *
 * Naming each part gives the boundary something it can carry. `<TooltipProvider>`
 * renders from a server component; `Tooltip.Provider` still works everywhere it
 * did before. Radix ships both for the same reason.
 */
export const TooltipProvider = Base.Provider;
export const TooltipRoot = Base.Root;
export const TooltipTrigger = Base.Trigger;
export const TooltipContent = Content;
export const TooltipArrow = Arrow;

/**
 * The parts under their short names, so `import * as Tooltip` gives a namespace
 * that works on either side of the server boundary.
 *
 * A module namespace is assembled at the import site out of the module's own
 * exports, and each export of a `'use client'` module crosses the boundary as
 * its own reference. The object above is a single export holding several
 * values, so it crosses as one reference with nothing readable on it and
 * `Tooltip.Root` is `undefined` in a server component.
 *
 * Same components either way. The only difference is whether the grouping
 * happens here or at the import, and only one of those survives the crossing.
 * This is the shape Radix ships, for the same reason.
 */
export { Content, Arrow };
export const { Provider, Root, Trigger } = Tooltip;
