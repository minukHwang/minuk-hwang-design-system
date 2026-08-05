'use client';

import * as RadixCheckbox from '@radix-ui/react-checkbox';

/**
 * Checkbox, including the indeterminate state.
 *
 * Radix renders a real hidden input, so the control submits with a form and
 * participates in native validation — which a styled div never does. Pass
 * `checked="indeterminate"` for the mixed state; `aria-checked="mixed"` follows.
 */
export const Checkbox = {
  Root: RadixCheckbox.Root,
  /** Renders only while checked or indeterminate. Put the mark here. */
  Indicator: RadixCheckbox.Indicator,
};
