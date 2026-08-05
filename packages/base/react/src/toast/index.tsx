'use client';

import * as RadixToast from '@radix-ui/react-toast';

/**
 * Transient message.
 *
 * The hard part is announcement rather than appearance: a toast has to reach a
 * screen reader without stealing focus, which means a live region with the right
 * politeness. Radix also pauses the dismiss timer on hover and focus, and gives
 * keyboard users a way in through `Viewport`'s hotkey (F8 by default).
 *
 * Mount `Provider` and one `Viewport` near the root; render `Root` per message.
 */
export const Toast = {
  Provider: RadixToast.Provider,
  /** Where toasts stack. Mount once. */
  Viewport: RadixToast.Viewport,
  Root: RadixToast.Root,
  Title: RadixToast.Title,
  Description: RadixToast.Description,
  /** An action inside the toast. Requires altText for screen readers. */
  Action: RadixToast.Action,
  Close: RadixToast.Close,
};
