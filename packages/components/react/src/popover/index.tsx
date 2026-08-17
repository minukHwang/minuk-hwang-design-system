'use client';

import { Popover as Base } from '@minuk-hwang-design-system/base-react/popover';
import clsx from 'clsx';
import * as React from 'react';

import { animated, panel } from '../shared/overlay.css';
import { useThemeContainer } from '../theme';

import { arrow, content } from './styles.css';

/*
 * ============================================
 * Parts
 * ============================================
 */

/**
 * Anchored panel holding interactive content.
 *
 * Reach for `Tooltip` only when the content is a short label nobody has to
 * interact with. A link or a button inside a tooltip is unreachable — tooltips
 * close on blur, so tabbing towards the link dismisses it.
 */
const Content = React.forwardRef<
  React.ElementRef<typeof Base.Content>,
  React.ComponentPropsWithoutRef<typeof Base.Content>
>(function PopoverContent({ className, ...props }, ref) {
  return (
    <Base.Content
      {...props}
      ref={ref}
      container={useThemeContainer()}
      className={clsx(panel, content, animated, className)}
    />
  );
});

const Arrow = React.forwardRef<
  React.ElementRef<typeof Base.Arrow>,
  React.ComponentPropsWithoutRef<typeof Base.Arrow>
>(function PopoverArrow({ className, ...props }, ref) {
  return <Base.Arrow {...props} ref={ref} className={clsx(arrow, className)} />;
});

/*
 * ============================================
 * Export
 * ============================================
 */

export const Popover = {
  Root: Base.Root,
  Trigger: Base.Trigger,
  Anchor: Base.Anchor,
  Close: Base.Close,
  Content,
  Arrow,
};

/**
 * The parts again, as named exports.
 *
 * `Popover` is one object held by one binding, and a `'use client'` module's
 * exports do not cross into a server component as values — each becomes a
 * reference to a client component. A reference has no properties, so
 * `Popover.Root` reads as `undefined` and React reports an invalid element
 * type. The namespace only works from another client component.
 *
 * Naming each part gives the boundary something it can carry. `<PopoverRoot>`
 * renders from a server component; `Popover.Root` still works everywhere it
 * did before. Radix ships both for the same reason.
 */
export const PopoverRoot = Base.Root;
export const PopoverTrigger = Base.Trigger;
export const PopoverAnchor = Base.Anchor;
export const PopoverClose = Base.Close;
export const PopoverContent = Content;
export const PopoverArrow = Arrow;

/**
 * The parts under their short names, so `import * as Popover` gives a namespace
 * that works on either side of the server boundary.
 *
 * A module namespace is assembled at the import site out of the module's own
 * exports, and each export of a `'use client'` module crosses the boundary as
 * its own reference. The object above is a single export holding several
 * values, so it crosses as one reference with nothing readable on it and
 * `Popover.Root` is `undefined` in a server component.
 *
 * Same components either way. The only difference is whether the grouping
 * happens here or at the import, and only one of those survives the crossing.
 * This is the shape Radix ships, for the same reason.
 */
export { Content, Arrow };
export const { Root, Trigger, Anchor, Close } = Popover;
