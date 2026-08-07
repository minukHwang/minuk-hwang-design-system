'use client';

import { Tabs as Base } from '@minuk-hwang-design-system/base-react/tabs';
import clsx from 'clsx';
import * as React from 'react';

import * as css from './styles.css';

/*
 * ============================================
 * Parts
 * ============================================
 */

/**
 * Tabs.
 *
 * Radix supplies the roving tabindex, the arrow keys and the `aria-controls`
 * wiring between each trigger and its panel — the parts that make a tab strip a
 * tab strip rather than a row of buttons that happen to swap content.
 *
 * `Panel` is named for what it is; Radix calls the same thing `Content`, which
 * reads oddly beside `Dialog.Content` when both are in one file.
 */
const List = React.forwardRef<
  React.ElementRef<typeof Base.List>,
  React.ComponentPropsWithoutRef<typeof Base.List>
>(function TabsList({ className, ...props }, ref) {
  return <Base.List {...props} ref={ref} className={clsx(css.list, className)} />;
});

const Trigger = React.forwardRef<
  React.ElementRef<typeof Base.Trigger>,
  React.ComponentPropsWithoutRef<typeof Base.Trigger>
>(function TabsTrigger({ className, ...props }, ref) {
  return <Base.Trigger {...props} ref={ref} className={clsx(css.trigger, className)} />;
});

const Panel = React.forwardRef<
  React.ElementRef<typeof Base.Content>,
  React.ComponentPropsWithoutRef<typeof Base.Content>
>(function TabsPanel({ className, ...props }, ref) {
  return <Base.Content {...props} ref={ref} className={clsx(css.panel, className)} />;
});

const Root = React.forwardRef<
  React.ElementRef<typeof Base.Root>,
  React.ComponentPropsWithoutRef<typeof Base.Root>
>(function TabsRoot({ className, ...props }, ref) {
  return <Base.Root {...props} ref={ref} className={clsx(css.root, className)} />;
});

/*
 * ============================================
 * Export
 * ============================================
 */

export const Tabs = { Root, List, Trigger, Panel };
