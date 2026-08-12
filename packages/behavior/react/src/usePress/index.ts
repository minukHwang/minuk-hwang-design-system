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

  /*
   * --------------------------------------------
   * 2. Pressed state
   * --------------------------------------------
   */

  /**
   * Whether the control is being held down, across every way of holding it.
   *
   * `:active` is the CSS answer and it is not enough on its own: it never fires
   * for a keyboard activation, and on touch it is applied inconsistently — iOS
   * Safari withholds it entirely unless the element or an ancestor carries a
   * touch listener. A control that reacts to a mouse and not to a finger is the
   * kind of gap that only shows up on a device nobody tested on.
   *
   * Reported as state rather than as a style, so this layer stays free of any
   * opinion about what pressing should look like. The component layer turns it
   * into `data-pressed` and decides the rest.
   */
  const [isPressed, setPressed] = React.useState(false);

  /*
   * The release is watched on the window rather than on the element. A pointer
   * that goes down on a button and comes up somewhere else never fires
   * `pointerup` on the button, and the control would stay visibly held after
   * the finger had gone.
   */
  React.useEffect(() => {
    if (!isPressed) return;
    const release = () => setPressed(false);
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', release);
    return () => {
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', release);
    };
  }, [isPressed]);

  /** Signals the start of a press, before the click resolves */
  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      setPressed(true);
      onPressStart?.(e);
    },
    [disabled, onPressStart]
  );

  /*
   * A keyboard press has no duration the browser reports, so it is held for as
   * long as the key is. Enter repeats while held and Space does not, which is a
   * browser difference this layer deliberately does not paper over: both end on
   * `keyup`, and that is what turns the state off.
   */
  const onKeyDownPress = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ') setPressed(true);
    },
    [disabled]
  );

  const onKeyUp = React.useCallback(() => setPressed(false), []);

  /** A control that loses focus mid-press is no longer being pressed. */
  const onBlur = React.useCallback(() => setPressed(false), []);

  /*
   * --------------------------------------------
   * 3. Return
   * --------------------------------------------
   */
  const pressProps = {
    onClick,
    onPointerDown,
    onKeyDown: onKeyDownPress,
    onKeyUp,
    onBlur,
  };

  return {
    /** True while the control is held, by pointer, touch or key. */
    isPressed,
    /** For native `<button>`; keyboard activation is left to the browser */
    pressProps,
    /** For elements using `role="button"`, which need keyboard activation */
    virtualPressProps: {
      ...pressProps,
      onKeyDown: (e: React.KeyboardEvent) => {
        onKeyDownPress(e);
        onKeyDown(e);
      },
    },
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
        onKeyUp: mergeHandlers(p.onKeyUp, onKeyUp),
        onBlur: mergeHandlers(p.onBlur, onBlur),
        onKeyDown: mergeHandlers(
          p.onKeyDown,
          virtual
            ? (e: React.KeyboardEvent) => {
                onKeyDownPress(e);
                onKeyDown(e);
              }
            : onKeyDownPress
        ),
      }) as T,
  };
}
