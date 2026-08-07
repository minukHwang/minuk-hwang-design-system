'use client';

import { BaseButton, BaseButtonProps } from '@minuk-hwang-design-system/base-react/button';
import clsx from 'clsx';
import * as React from 'react';

import { Spinner } from '../spinner';

import { buttonRecipe, ButtonVariants } from './styles.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type ButtonProps = BaseButtonProps & NonNullable<ButtonVariants>;

/*
 * ============================================
 * Component
 * ============================================
 */

/**
 * Button.
 *
 * Behaviour comes from `base-react/button`, which owns press handling and keeps
 * the keyboard contract identical whether this renders a `button`, an `a` or a
 * `div`. Everything here is appearance.
 *
 * Icons are children rather than props:
 *
 * ```tsx
 * <Button>
 *   <Icon name="add" />
 *   Create
 * </Button>
 * ```
 *
 * The legacy version took `icon`, `leftSubText` and `rightSubText`, which meant
 * a fifth slot needed a sixth prop, and the order of the slots was fixed by the
 * component rather than by the caller.
 *
 * `loading` swaps the content for a spinner and blocks interaction, but keeps the
 * button's measured width — a button that shrinks mid-submit moves everything
 * beside it.
 */
export const Button = React.forwardRef<HTMLElement, ButtonProps>(function Button(
  { size, variant, block, iconOnly, loading, className, children, ...props },
  ref
) {
  return (
    <BaseButton
      {...props}
      ref={ref}
      loading={loading}
      className={clsx(buttonRecipe({ size, variant, block, iconOnly }), className)}
    >
      {loading ? <Spinner size={size === 'l' ? 20 : 16} /> : children}
    </BaseButton>
  );
});
