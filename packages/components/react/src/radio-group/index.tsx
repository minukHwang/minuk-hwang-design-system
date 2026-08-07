'use client';

import { Label } from '@minuk-hwang-design-system/base-react/label';
import { RadioGroup as Base } from '@minuk-hwang-design-system/base-react/radio-group';
import clsx from 'clsx';
import * as React from 'react';

import * as css from '../checkbox/styles.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type RadioGroupItemProps = React.ComponentPropsWithoutRef<typeof Base.Item> & {
  children?: React.ReactNode;
};

/*
 * ============================================
 * Parts
 * ============================================
 */

/**
 * Exactly one choice from a small set.
 *
 * Radix gives the group roving focus, so the whole group is one tab stop and the
 * arrow keys move between options — which is the behaviour a screen reader user
 * expects, and the part hand-rolled radio groups almost always miss.
 *
 * Above five or so options this becomes a wall; use `Select` there.
 */
const Root = React.forwardRef<
  React.ElementRef<typeof Base.Root>,
  React.ComponentPropsWithoutRef<typeof Base.Root>
>(function RadioGroupRoot({ className, ...props }, ref) {
  return <Base.Root {...props} ref={ref} className={clsx(css.group, className)} />;
});

/** Round rather than square, which is what tells a user only one can be chosen. */
const Item = React.forwardRef<React.ElementRef<typeof Base.Item>, RadioGroupItemProps>(
  function RadioGroupItem({ id, className, children, disabled, ...props }, ref) {
    const generatedId = React.useId();
    const controlId = id ?? generatedId;

    const control = (
      <Base.Item
        {...props}
        ref={ref}
        id={controlId}
        disabled={disabled}
        className={clsx(css.shape.radio, className)}
      >
        <Base.Indicator className={css.indicator}>
          <span className={css.radioDot} />
        </Base.Indicator>
      </Base.Item>
    );

    if (!children) return control;

    return (
      <div className={css.row}>
        {control}
        <Label htmlFor={controlId} className={css.rowLabel} data-disabled={disabled || undefined}>
          {children}
        </Label>
      </div>
    );
  }
);

/*
 * ============================================
 * Export
 * ============================================
 */

export const RadioGroup = { Root, Item };
