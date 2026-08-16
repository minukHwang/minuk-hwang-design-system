/**
 * Event handler utilities
 * Helpers for composing React event handlers.
 */

import type { SyntheticEvent } from 'react';

/**
 * Runs two event handlers in order.
 * The second handler is skipped when the first one calls preventDefault.
 *
 * @param a - Handler to run first, typically the consumer's own
 * @param b - Handler to run second, typically the internal behavior
 * @returns A single handler invoking both
 */
export function mergeHandlers<E extends SyntheticEvent>(
  a?: (e: E) => void,
  b?: (e: E) => void
): (e: E) => void {
  return e => {
    a?.(e);
    if (!e.defaultPrevented) b?.(e);
  };
}
