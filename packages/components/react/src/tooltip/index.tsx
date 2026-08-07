'use client';

import { Tooltip as Base } from '@minuk-hwang-design-system/base-react/tooltip';
import clsx from 'clsx';
import * as React from 'react';

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
  return <Base.Content {...props} ref={ref} className={clsx(content, className)} />;
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
