/**
 * usePress
 * Press behavior shared by button-like components, independent of styling.
 */

import * as React from 'react';

import { mergeHandlers } from '../utils';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

interface UsePressOptions {
  /** Blocks every interaction while true */
  disabled?: boolean;
  /** Fired on click, or on Enter/Space for non-native elements */
  onPress?: (e: React.SyntheticEvent) => void;
  /** Fired on pointerdown, for driving a visual pressed state */
  onPressStart?: (e: React.SyntheticEvent) => void;
}

/*
 * ============================================
 * Hook
 * ============================================
 */

/**
 * Provides the event handlers a button-like element needs.
 *
 * Native `<button>` elements already turn Enter/Space into a click, so they must
 * use `pressProps`. Elements relying on `role="button"` get no such behavior from
 * the browser and must use `virtualPressProps` instead.
 *
 * @param opts - Press options
 * @returns Handler sets for native and non-native elements, plus a merge helper
 *
 * @example
 * const { pressProps } = usePress({ onPress: handleClick });
 * return <button {...pressProps} />;
 */
export function usePress(opts: UsePressOptions = {}) {
  /*
   * --------------------------------------------
   * 1. Callbacks
   * --------------------------------------------
   */
  const { disabled, onPress, onPressStart } = opts;

  /** Swallows the click entirely while disabled */
  const onClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (disabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      onPress?.(e);
    },
    [disabled, onPress]
  );

  /** Keyboard activation for elements the browser does not treat as buttons */
  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key !== 'Enter' && e.key !== ' ') return;
      // Space would otherwise scroll the page
      if (e.key === ' ') e.preventDefault();
      onPress?.(e);
    },
    [disabled, onPress]
  );

  /** Signals the start of a press, before the click resolves */
  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      onPressStart?.(e);
    },
    [disabled, onPressStart]
  );

  /*
   * --------------------------------------------
   * 2. Return
   * --------------------------------------------
   */
  const pressProps = { onClick, onPointerDown };

  return {
    /** For native `<button>`; keyboard activation is left to the browser */
    pressProps,
    /** For elements using `role="button"`, which need keyboard activation */
    virtualPressProps: { ...pressProps, onKeyDown },
    /**
     * Layers press behavior onto props the consumer already supplied.
     *
     * @param p - Props to extend
     * @param virtual - True when the target is not a native button
     */
    mergeInto: <T extends React.HTMLAttributes<HTMLElement>>(p: T, virtual = false): T =>
      ({
        ...p,
        onClick: mergeHandlers(p.onClick, onClick),
        onPointerDown: mergeHandlers(p.onPointerDown, onPointerDown),
        ...(virtual ? { onKeyDown: mergeHandlers(p.onKeyDown, onKeyDown) } : null),
      }) as T,
  };
}
