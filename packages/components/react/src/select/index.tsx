'use client';

import { Select as Base } from '@minuk-hwang-design-system/base-react/select';
import clsx from 'clsx';
import * as React from 'react';

import { Icon } from '../icon';
import * as overlay from '../shared/overlay.css';

import * as css from './styles.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof Base.Trigger> & {
  size?: css.SelectSize;
};

/*
 * ============================================
 * Parts
 * ============================================
 */

/**
 * Single-choice control.
 *
 * A styled listbox rather than a native `select`, which is a trade rather than a
 * free win: the native element gets the platform's own picker on mobile, which is
 * usually better than anything a web page can draw. Use this when options need
 * icons, descriptions or grouping the native element cannot express.
 *
 * The chevron comes with the trigger so no call site has to remember it, and it
 * rotates from `data-state` rather than from React state.
 */
const Trigger = React.forwardRef<React.ElementRef<typeof Base.Trigger>, SelectTriggerProps>(
  function SelectTrigger({ size = 'm', className, children, ...props }, ref) {
    return (
      <Base.Trigger {...props} ref={ref} className={clsx(css.size[size], className)}>
        {children}
        <Base.Icon asChild>
          <Icon name="expand_more" size={20} className={css.chevron} />
        </Base.Icon>
      </Base.Trigger>
    );
  }
);

/**
 * The list.
 *
 * `Viewport` and the two scroll buttons are folded in here rather than exposed:
 * every select needs all three, in this order, and leaving them to the caller
 * only creates opportunities to omit one and get a list that cannot be scrolled.
 */
const Content = React.forwardRef<
  React.ElementRef<typeof Base.Content>,
  React.ComponentPropsWithoutRef<typeof Base.Content>
>(function SelectContent({ className, children, ...props }, ref) {
  return (
    <Base.Content
      {...props}
      ref={ref}
      className={clsx(overlay.panel, overlay.animated, css.content, className)}
    >
      <Base.ScrollUpButton className={css.scrollButton}>
        <Icon name="expand_less" size={16} />
      </Base.ScrollUpButton>
      <Base.Viewport>{children}</Base.Viewport>
      <Base.ScrollDownButton className={css.scrollButton}>
        <Icon name="expand_more" size={16} />
      </Base.ScrollDownButton>
    </Base.Content>
  );
});

/** One option. Keeps the check-mark gutter, since exactly one of these is always chosen. */
const Item = React.forwardRef<
  React.ElementRef<typeof Base.Item>,
  React.ComponentPropsWithoutRef<typeof Base.Item>
>(function SelectItem({ className, children, ...props }, ref) {
  return (
    <Base.Item {...props} ref={ref} className={clsx(overlay.item, className)}>
      <Base.ItemIndicator className={overlay.itemIndicator}>
        <Icon name="check" size={16} />
      </Base.ItemIndicator>
      <Base.ItemText>{children}</Base.ItemText>
    </Base.Item>
  );
});

const Label = React.forwardRef<
  React.ElementRef<typeof Base.Label>,
  React.ComponentPropsWithoutRef<typeof Base.Label>
>(function SelectLabel({ className, ...props }, ref) {
  return <Base.Label {...props} ref={ref} className={clsx(overlay.label, className)} />;
});

const Separator = React.forwardRef<
  React.ElementRef<typeof Base.Separator>,
  React.ComponentPropsWithoutRef<typeof Base.Separator>
>(function SelectSeparator({ className, ...props }, ref) {
  return <Base.Separator {...props} ref={ref} className={clsx(overlay.separator, className)} />;
});

/*
 * ============================================
 * Export
 * ============================================
 */

export const Select = {
  Root: Base.Root,
  Value: Base.Value,
  Group: Base.Group,
  Trigger,
  Content,
  Item,
  Label,
  Separator,
};
