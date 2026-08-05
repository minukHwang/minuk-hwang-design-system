'use client';

import { Root as RadixVisuallyHidden } from '@radix-ui/react-visually-hidden';

/**
 * Content for screen readers only.
 *
 * Not the same as `display: none` or `visibility: hidden`, which remove the
 * content from the accessibility tree as well. This keeps it announced while
 * taking no visual space.
 *
 * Most common use here: a dialog whose design has no visible title still needs
 * one, so wrap it rather than dropping it.
 */
export const VisuallyHidden = RadixVisuallyHidden;
