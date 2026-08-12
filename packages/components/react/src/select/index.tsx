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
 * The chosen option's label.
 *
 * It is the one part of the trigger that has to be allowed to shrink — without
 * that a value longer than the control pushes the chevron out past the box — and
 * a caller should not have to know that.
 *
 * The span around it is not decoration and must not be flattened away. Radix's
 * own `Value` destructures `className` and `style` out of its props and renders
 * the span without them, because it sets a `pointer-events` of its own; a class
 * passed to it is silently dropped, which looks exactly like a stylesheet that
 * did not load. So the truncation lives on an element we control, and the base's
 * span sits inside it.
 */
const Value = React.forwardRef<
  React.ElementRef<typeof Base.Value>,
  React.ComponentPropsWithoutRef<typeof Base.Value>
>(function SelectValue({ className, ...props }, ref) {
  return (
    <span className={clsx(css.value, className)}>
      <Base.Value {...props} ref={ref} />
    </span>
  );
});

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
  Value,
  Group: Base.Group,
  Trigger,
  Content,
  Item,
  Label,
  Separator,
};

/**
 * The parts again, as named exports.
 *
 * `Select` is one object held by one binding, and a `'use client'` module's
 * exports do not cross into a server component as values — each becomes a
 * reference to a client component. A reference has no properties, so
 * `Select.Root` reads as `undefined` and React reports an invalid element
 * type. The namespace only works from another client component.
 *
 * Naming each part gives the boundary something it can carry. `<SelectRoot>`
 * renders from a server component; `Select.Root` still works everywhere it
 * did before. Radix ships both for the same reason.
 */
export const SelectRoot = Base.Root;
export const SelectValue = Value;
export const SelectGroup = Base.Group;
export const SelectTrigger = Trigger;
export const SelectContent = Content;
export const SelectItem = Item;
export const SelectLabel = Label;
export const SelectSeparator = Separator;
