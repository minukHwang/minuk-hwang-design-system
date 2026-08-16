'use client';

import * as React from 'react';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

/** Where the bar should be, in pixels from the strip's left edge. */
type Placement = { left: number; width: number } | null;

/*
 * ============================================
 * Hook
 * ============================================
 */

/**
 * Follows the active tab with a single bar.
 *
 * The alternative is a pseudo-element on every trigger, scaled in on the active
 * one, and it is genuinely cheaper: no measuring, nothing to resynchronise. It
 * also cannot travel. One bar that moves says the two tabs are the same control
 * in two positions; a bar that fades out here and in over there says they are
 * two controls, and the eye has nothing to follow between them.
 *
 * So this measures, and everything below is about the measurement staying true.
 *
 * `data-state` is watched rather than a value being passed in, because the list
 * is not told which tab is active — Radix puts that on the trigger and keeps the
 * value in a context this component has no access to. Reading the DOM is reading
 * the same answer from the other end.
 *
 * `useLayoutEffect` so the first measurement lands before paint. In an effect
 * the bar would be drawn at zero and moved on the next frame, which is a flicker
 * on every mount.
 */
export const useIndicator = (list: React.RefObject<HTMLElement>) => {
  const [placement, setPlacement] = React.useState<Placement>(null);

  /*
   * The first placement is not animated.
   *
   * A bar that slides in from the left edge on load is announcing a change that
   * did not happen. It only travels once it has somewhere to travel from.
   */
  const [ready, setReady] = React.useState(false);

  React.useLayoutEffect(() => {
    const strip = list.current;
    if (!strip) return;

    const measure = () => {
      const active = strip.querySelector<HTMLElement>('[data-state="active"]');
      if (!active) {
        setPlacement(null);
        return;
      }
      setPlacement({ left: active.offsetLeft, width: active.offsetWidth });
    };

    measure();
    // Two frames, because the first placement must not animate and React has to
    // have committed it before the transition is allowed back on.
    const raf = requestAnimationFrame(() => setReady(true));

    /*
     * Three things move the bar, and only one of them is a click.
     *
     * The attribute changes when a tab is chosen. The strip resizes when the
     * window does, and each trigger resizes when a webfont finally loads and the
     * labels reflow — which happens after the first measurement and would
     * otherwise leave the bar under the wrong tab until the next click.
     */
    const attributes = new MutationObserver(measure);
    attributes.observe(strip, {
      subtree: true,
      attributes: true,
      attributeFilter: ['data-state'],
    });

    const sizes = new ResizeObserver(measure);
    sizes.observe(strip);
    strip.querySelectorAll('[role="tab"]').forEach(tab => sizes.observe(tab));

    return () => {
      cancelAnimationFrame(raf);
      attributes.disconnect();
      sizes.disconnect();
    };
  }, [list]);

  return { placement, ready };
};
