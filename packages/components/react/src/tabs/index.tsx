'use client';

import { Tabs as Base } from '@minuk-hwang-design-system/base-react/tabs';
import clsx from 'clsx';
import * as React from 'react';

import * as css from './styles.css';
import { useIndicator } from './useIndicator';

/*
 * ============================================
 * Helpers
 * ============================================
 */

/** Sends one node to the caller's ref and to ours, whichever shape theirs is. */
const mergeRefs =
  <T,>(...refs: (React.Ref<T> | undefined)[]) =>
  (node: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<T | null>).current = node;
    });
  };

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
/** 15 and 17, which are `Button`'s `m` and `l`. */
export type TabsSize = 'm' | 'l';

export type TabsListProps = React.ComponentPropsWithoutRef<typeof Base.List> & {
  /**
   * How large every tab in the strip is.
   *
   * On the list rather than on each trigger, because a strip with one tab larger
   * than its neighbours is a bug rather than a layout, and adding a tab should
   * not be a chance to get it wrong.
   */
  size?: TabsSize;
  /**
   * Divides the strip evenly between the tabs instead of sizing each to its
   * label.
   *
   * For a strip that is the width of the thing it belongs to — a card header, a
   * panel — where tabs sitting at one end and empty space at the other reads as
   * a layout that did not finish. Left off, the strip is as wide as its labels
   * and scrolls when there are too many.
   */
  fill?: boolean;
};

const List = React.forwardRef<React.ElementRef<typeof Base.List>, TabsListProps>(function TabsList(
  { className, children, size = 'm', fill, ...props },
  ref
) {
  /*
   * The bar is a child of the list rather than of the active tab, which is
   * what lets it move between them. Its position comes from measuring, so the
   * list needs a ref of its own alongside whatever the caller passed.
   */
  const strip = React.useRef<HTMLDivElement>(null);
  const { placement, ready } = useIndicator(strip);

  return (
    <Base.List
      {...props}
      ref={mergeRefs(ref, strip)}
      data-size={size}
      data-fill={fill || undefined}
      className={clsx(css.list, className)}
    >
      {children}
      <span
        aria-hidden
        className={css.indicator}
        data-placed={placement ? '' : undefined}
        data-ready={ready ? '' : undefined}
        style={{ left: placement?.left ?? 0, width: placement?.width ?? 0 }}
      />
    </Base.List>
  );
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

/**
 * The parts again, as named exports.
 *
 * `Tabs` is one object held by one binding, and a `'use client'` module's
 * exports do not cross into a server component as values — each becomes a
 * reference to a client component. A reference has no properties, so
 * `Tabs.Root` reads as `undefined` and React reports an invalid element
 * type. The namespace only works from another client component.
 *
 * Naming each part gives the boundary something it can carry. `<TabsRoot>`
 * renders from a server component; `Tabs.Root` still works everywhere it
 * did before. Radix ships both for the same reason.
 */
export const TabsRoot = Root;
export const TabsList = List;
export const TabsTrigger = Trigger;
export const TabsPanel = Panel;
