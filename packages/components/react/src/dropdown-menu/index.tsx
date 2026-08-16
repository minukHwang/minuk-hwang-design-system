'use client';

import { DropdownMenu as Base } from '@minuk-hwang-design-system/base-react/dropdown-menu';
import clsx from 'clsx';
import * as React from 'react';

import { Icon } from '../icon';
import * as overlay from '../shared/overlay.css';
import { useThemeContainer } from '../theme';

import { destructiveItem, subTrigger, subTriggerIcon } from './styles.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type DropdownMenuItemProps = React.ComponentPropsWithoutRef<typeof Base.Item> & {
  /** Styles the row as destructive. Announcement still comes from the label's words. */
  destructive?: boolean;
};

/*
 * ============================================
 * Parts
 * ============================================
 */

const Content = React.forwardRef<
  React.ElementRef<typeof Base.Content>,
  React.ComponentPropsWithoutRef<typeof Base.Content>
>(function DropdownMenuContent({ className, ...props }, ref) {
  return (
    <Base.Content
      {...props}
      ref={ref}
      container={useThemeContainer()}
      className={clsx(overlay.panel, overlay.menu, overlay.animated, className)}
    />
  );
});

/**
 * A row that does something.
 *
 * `itemFlush` removes the check-mark gutter, because a plain item has no
 * selected state to indicate and the reserved space would read as a stray indent.
 * `CheckboxItem` and `RadioItem` below keep the gutter.
 */
const Item = React.forwardRef<React.ElementRef<typeof Base.Item>, DropdownMenuItemProps>(
  function DropdownMenuItem({ destructive, className, ...props }, ref) {
    return (
      <Base.Item
        {...props}
        ref={ref}
        className={clsx(overlay.item, overlay.itemFlush, destructive && destructiveItem, className)}
      />
    );
  }
);

const CheckboxItem = React.forwardRef<
  React.ElementRef<typeof Base.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof Base.CheckboxItem>
>(function DropdownMenuCheckboxItem({ className, children, ...props }, ref) {
  return (
    <Base.CheckboxItem {...props} ref={ref} className={clsx(overlay.item, className)}>
      <Base.ItemIndicator className={overlay.itemIndicator}>
        <Icon name="check" size={16} />
      </Base.ItemIndicator>
      {children}
    </Base.CheckboxItem>
  );
});

const RadioItem = React.forwardRef<
  React.ElementRef<typeof Base.RadioItem>,
  React.ComponentPropsWithoutRef<typeof Base.RadioItem>
>(function DropdownMenuRadioItem({ className, children, ...props }, ref) {
  return (
    <Base.RadioItem {...props} ref={ref} className={clsx(overlay.item, className)}>
      <Base.ItemIndicator className={overlay.itemIndicator}>
        <Icon name="radio_button_checked" size={16} />
      </Base.ItemIndicator>
      {children}
    </Base.RadioItem>
  );
});

/** Heading for a group. Not focusable — arrow keys skip it, which is the point. */
const Label = React.forwardRef<
  React.ElementRef<typeof Base.Label>,
  React.ComponentPropsWithoutRef<typeof Base.Label>
>(function DropdownMenuLabel({ className, ...props }, ref) {
  return <Base.Label {...props} ref={ref} className={clsx(overlay.label, className)} />;
});

const Separator = React.forwardRef<
  React.ElementRef<typeof Base.Separator>,
  React.ComponentPropsWithoutRef<typeof Base.Separator>
>(function DropdownMenuSeparator({ className, ...props }, ref) {
  return <Base.Separator {...props} ref={ref} className={clsx(overlay.separator, className)} />;
});

const SubTrigger = React.forwardRef<
  React.ElementRef<typeof Base.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof Base.SubTrigger>
>(function DropdownMenuSubTrigger({ className, children, ...props }, ref) {
  return (
    <Base.SubTrigger
      {...props}
      ref={ref}
      className={clsx(overlay.item, overlay.itemFlush, subTrigger, className)}
    >
      {children}
      <Icon name="chevron_right" size={16} className={subTriggerIcon} />
    </Base.SubTrigger>
  );
});

const SubContent = React.forwardRef<
  React.ElementRef<typeof Base.SubContent>,
  React.ComponentPropsWithoutRef<typeof Base.SubContent>
>(function DropdownMenuSubContent({ className, ...props }, ref) {
  return (
    <Base.SubContent
      {...props}
      ref={ref}
      className={clsx(overlay.panel, overlay.menu, overlay.animated, className)}
    />
  );
});

/*
 * ============================================
 * Export
 * ============================================
 */

export const DropdownMenu = {
  Root: Base.Root,
  Trigger: Base.Trigger,
  Group: Base.Group,
  RadioGroup: Base.RadioGroup,
  Sub: Base.Sub,
  Content,
  Item,
  CheckboxItem,
  RadioItem,
  Label,
  Separator,
  SubTrigger,
  SubContent,
};

/**
 * The parts again, as named exports.
 *
 * `DropdownMenu` is one object held by one binding, and a `'use client'` module's
 * exports do not cross into a server component as values — each becomes a
 * reference to a client component. A reference has no properties, so
 * `DropdownMenu.Root` reads as `undefined` and React reports an invalid element
 * type. The namespace only works from another client component.
 *
 * Naming each part gives the boundary something it can carry. `<DropdownMenuRoot>`
 * renders from a server component; `DropdownMenu.Root` still works everywhere it
 * did before. Radix ships both for the same reason.
 */
export const DropdownMenuRoot = Base.Root;
export const DropdownMenuTrigger = Base.Trigger;
export const DropdownMenuGroup = Base.Group;
export const DropdownMenuRadioGroup = Base.RadioGroup;
export const DropdownMenuSub = Base.Sub;
export const DropdownMenuContent = Content;
export const DropdownMenuItem = Item;
export const DropdownMenuCheckboxItem = CheckboxItem;
export const DropdownMenuRadioItem = RadioItem;
export const DropdownMenuLabel = Label;
export const DropdownMenuSeparator = Separator;
export const DropdownMenuSubTrigger = SubTrigger;
export const DropdownMenuSubContent = SubContent;
