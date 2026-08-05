'use client';

import { Root as RadixSeparator } from '@radix-ui/react-separator';

/**
 * Divider between content.
 *
 * Defaults to decorative, which hides it from screen readers — correct for a
 * line that is purely visual. Set `decorative={false}` when the rule genuinely
 * separates meaning, and it announces as `role="separator"`.
 */
export const Separator = RadixSeparator;
