'use client';

import * as RadixAvatar from '@radix-ui/react-avatar';

/**
 * User image with a fallback.
 *
 * The value is in the timing. `Fallback` waits before appearing, so a fast image
 * never flashes initials first; if the image fails or never loads, the fallback
 * stays. Doing this with `onError` alone produces exactly that flicker.
 */
export const Avatar = {
  Root: RadixAvatar.Root,
  Image: RadixAvatar.Image,
  /** Shown while loading and after a failure. `delayMs` tunes the wait. */
  Fallback: RadixAvatar.Fallback,
};
