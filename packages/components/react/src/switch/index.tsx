'use client';

import { Label } from '@minuk-hwang-design-system/base-react/label';
import { Switch as Base } from '@minuk-hwang-design-system/base-react/switch';
import clsx from 'clsx';
import * as React from 'react';

import { rowLabel } from '../checkbox/styles.css';

import * as css from './styles.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type SwitchProps = React.ComponentPropsWithoutRef<typeof Base.Root> & {
  children?: React.ReactNode;
};

/*
 * ============================================
 * Component
 * ============================================
 */

/**
 * On/off control that takes effect immediately.
 *
 * If the change needs a Save button, it is a `Checkbox` — the shape is a promise
 * about when something happens, and breaking it is how a settings page ends up
 * with people wondering whether their change stuck.
 */
export const Switch = React.forwardRef<React.ElementRef<typeof Base.Root>, SwitchProps>(
  function Switch({ id, className, children, disabled, ...props }, ref) {
    const generatedId = React.useId();
    const controlId = id ?? generatedId;

    const control = (
      <Base.Root
        {...props}
        ref={ref}
        id={controlId}
        disabled={disabled}
        className={clsx(css.root, className)}
      >
        <Base.Thumb className={css.thumb} />
      </Base.Root>
    );

    if (!children) return control;

    return (
      <div className={css.row}>
        {control}
        <Label htmlFor={controlId} className={rowLabel} data-disabled={disabled || undefined}>
          {children}
        </Label>
      </div>
    );
  }
);
