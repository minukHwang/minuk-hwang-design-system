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
      {children}
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

export const Accordion = { Root: Base.Root, Item, Trigger, Content };

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
export const AccordionRoot = Base.Root;
export const AccordionItem = Item;
export const AccordionTrigger = Trigger;
export const AccordionContent = Content;
