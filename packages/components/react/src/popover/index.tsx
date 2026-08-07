'use client';

import { Popover as Base } from '@minuk-hwang-design-system/base-react/popover';
import clsx from 'clsx';
import * as React from 'react';

import { animated, panel } from '../shared/overlay.css';

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
    <Base.Content {...props} ref={ref} className={clsx(panel, content, animated, className)} />
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
