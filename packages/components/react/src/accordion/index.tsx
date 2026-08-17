'use client';

import { Accordion as Base } from '@minuk-hwang-design-system/base-react/accordion';
import clsx from 'clsx';
import * as React from 'react';

import { Icon } from '../icon';

import * as css from './styles.css';

/*
 * ============================================
 * Parts
 * ============================================
 */

/**
 * Collapsible sections.
 *
 * `Trigger` renders inside a heading element, which the base layer supplies —
 * that is what lets a screen reader user jump between sections by heading rather
 * than tabbing through every one.
 *
 * The chevron comes with the trigger and rotates from `data-state`, so no call
 * site has to track open state to point an arrow the right way.
 */
/**
 * Wrapped rather than re-exported from the base, so it can carry a class.
 *
 * It had none, which left the list unable to be narrower than its widest row in
 * any flex or grid parent — see `root` in the stylesheet.
 */
const Root = React.forwardRef<
  React.ElementRef<typeof Base.Root>,
  React.ComponentPropsWithoutRef<typeof Base.Root>
>(function AccordionRoot({ className, ...props }, ref) {
  return <Base.Root {...props} ref={ref} className={clsx(css.root, className)} />;
});

const Item = React.forwardRef<
  React.ElementRef<typeof Base.Item>,
  React.ComponentPropsWithoutRef<typeof Base.Item>
>(function AccordionItem({ className, ...props }, ref) {
  return <Base.Item {...props} ref={ref} className={clsx(css.item, className)} />;
});

const Trigger = React.forwardRef<
  React.ElementRef<typeof Base.Trigger>,
  React.ComponentPropsWithoutRef<typeof Base.Trigger>
>(function AccordionTrigger({ className, children, ...props }, ref) {
  return (
    <Base.Trigger {...props} ref={ref} className={clsx(css.trigger, className)}>
      {/* Wrapped rather than passed straight through — see `label` for why a
          bare string cannot be laid out here on its own. */}
      <span className={css.label}>{children}</span>
      <Icon name="expand_more" size={20} className={css.chevron} />
    </Base.Trigger>
  );
});

const Content = React.forwardRef<
  React.ElementRef<typeof Base.Content>,
  React.ComponentPropsWithoutRef<typeof Base.Content>
>(function AccordionContent({ className, children, ...props }, ref) {
  return (
    <Base.Content {...props} ref={ref} className={clsx(css.content, className)}>
      <div className={css.contentInner}>{children}</div>
    </Base.Content>
  );
});

/*
 * ============================================
 * Export
 * ============================================
 */

export const Accordion = { Root, Item, Trigger, Content };

/**
 * The parts again, as named exports.
 *
 * `Accordion` is one object held by one binding, and a `'use client'` module's
 * exports do not cross into a server component as values — each becomes a
 * reference to a client component. A reference has no properties, so
 * `Accordion.Root` reads as `undefined` and React reports an invalid element
 * type. The namespace only works from another client component.
 *
 * Naming each part gives the boundary something it can carry. `<AccordionRoot>`
 * renders from a server component; `Accordion.Root` still works everywhere it
 * did before. Radix ships both for the same reason.
 */
export const AccordionRoot = Root;
export const AccordionItem = Item;
export const AccordionTrigger = Trigger;
export const AccordionContent = Content;

/**
 * The parts under their short names, so `import * as Accordion` gives a namespace
 * that works on either side of the server boundary.
 *
 * A module namespace is assembled at the import site out of the module's own
 * exports, and each export of a `'use client'` module crosses the boundary as
 * its own reference. The object above is a single export holding several
 * values, so it crosses as one reference with nothing readable on it and
 * `Accordion.Root` is `undefined` in a server component.
 *
 * Same components either way. The only difference is whether the grouping
 * happens here or at the import, and only one of those survives the crossing.
 * This is the shape Radix ships, for the same reason.
 */
export { Root, Item, Trigger, Content };
