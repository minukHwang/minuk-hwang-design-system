'use client';

import { Checkbox as Base } from '@minuk-hwang-design-system/base-react/checkbox';
import { Label } from '@minuk-hwang-design-system/base-react/label';
import clsx from 'clsx';
import * as React from 'react';

import { Icon } from '../icon';

import * as css from './styles.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type CheckboxProps = React.ComponentPropsWithoutRef<typeof Base.Root> & {
  /**
   * Label text. Given one, the component renders the row and the association;
   * without one, it renders the box alone for a caller placing it in a table
   * cell or a list row that has its own label.
   */
  children?: React.ReactNode;
};

/*
 * ============================================
 * Component
 * ============================================
 */

/**
 * Checkbox.
 *
 * Pass `checked="indeterminate"` for a parent whose children are partly
 * selected. That is a real third state rather than a visual trick — the base
 * layer reports it as `aria-checked="mixed"`, which is what tells a screen
 * reader user that toggling it will affect several things.
 */
export const Checkbox = React.forwardRef<React.ElementRef<typeof Base.Root>, CheckboxProps>(
  function Checkbox({ id, className, children, disabled, ...props }, ref) {
    const generatedId = React.useId();
    const controlId = id ?? generatedId;

    const control = (
      <Base.Root
        {...props}
        ref={ref}
        id={controlId}
        disabled={disabled}
        className={clsx(css.shape.checkbox, className)}
      >
        <Base.Indicator className={css.indicator}>
          {props.checked === 'indeterminate' ? (
            <Icon name="remove" size={16} />
          ) : (
            <Icon name="check" size={16} />
          )}
        </Base.Indicator>
      </Base.Root>
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
