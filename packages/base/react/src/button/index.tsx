'use client';

import { usePress } from '@minuk-hwang-design-system/behavior-react/usePress';
import { mergeHandlers } from '@minuk-hwang-design-system/behavior-react/utils';
import * as React from 'react';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

type BaseButtonElement = 'button' | 'a' | 'div';

export type BaseButtonProps = React.HTMLAttributes<HTMLElement> & {
  /** Element to render. Anything other than 'button' gets button semantics applied manually */
  as?: BaseButtonElement;
  disabled?: boolean;
  /** Treated as disabled, and exposed to assistive tech via aria-busy */
  loading?: boolean;
  /** Set only for toggle buttons; presence adds aria-pressed */
  pressed?: boolean;
  /** Used when as='a' */
  href?: string;
  /** Used when as='button' */
  type?: 'button' | 'submit' | 'reset';
};

/*
 * ============================================
 * Component
 * ============================================
 */

/**
 * Unstyled button primitive.
 *
 * Owns accessibility semantics and press behavior only; appearance is left to
 * the layer above. Rendering as an anchor or div keeps the same keyboard and
 * screen reader contract as a native button.
 *
 * @param as - Element to render
 * @param disabled - Blocks interaction
 * @param loading - Blocks interaction and sets aria-busy
 * @param pressed - Toggle state, surfaced as aria-pressed
 * @param href - Destination when rendering an anchor
 * @param type - Button type when rendering a native button
 */
export const BaseButton = React.forwardRef<HTMLElement, BaseButtonProps>(function BaseButton(
  {
    as = 'button',
    disabled = false,
    loading = false,
    pressed,
    href,
    type = 'button',
    tabIndex,
    children,
    onClick,
    onPointerDown,
    onKeyDown,
    ...rest
  },
  ref
) {
  /*
   * --------------------------------------------
   * 1. Derived Values
   * --------------------------------------------
   */
  const isDisabled = disabled || loading;
  const isNativeButton = as === 'button';

  /*
   * --------------------------------------------
   * 2. Custom Hooks
   * --------------------------------------------
   */
  const { pressProps, virtualPressProps } = usePress({
    disabled: isDisabled,
    onPress: e => onClick?.(e as React.MouseEvent<HTMLElement>),
    onPressStart: e => onPointerDown?.(e as React.PointerEvent<HTMLElement>),
  });

  /*
   * --------------------------------------------
   * 3. Computed Values
   * --------------------------------------------
   */
  /** Props common to every rendered element */
  const shared = {
    ...rest,
    'aria-busy': loading || undefined,
  };

  /*
   * --------------------------------------------
   * 4. Return
   * --------------------------------------------
   */
  if (isNativeButton) {
    // The browser already fires click on Enter/Space here. Attaching a keyboard
    // handler on top of that would invoke onClick twice.
    return (
      <button
        {...(shared as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        {...pressProps}
        onKeyDown={onKeyDown}
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={isDisabled}
        aria-pressed={pressed}
      >
        {children}
      </button>
    );
  }

  /** Button semantics a non-native element has to declare for itself */
  const semantics = {
    ...virtualPressProps,
    onKeyDown: mergeHandlers(onKeyDown, virtualPressProps.onKeyDown),
    role: 'button' as const,
    tabIndex: isDisabled ? -1 : (tabIndex ?? 0),
    'aria-disabled': isDisabled || undefined,
    'aria-pressed': pressed,
  };

  if (as === 'a') {
    return (
      <a
        {...(shared as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        {...semantics}
        ref={ref as React.Ref<HTMLAnchorElement>}
        // Dropping href is what actually prevents navigation while disabled
        href={isDisabled ? undefined : href}
      >
        {children}
      </a>
    );
  }

  return (
    <div
      {...(shared as React.HTMLAttributes<HTMLDivElement>)}
      {...semantics}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      {children}
    </div>
  );
});
