'use client';

import { Slot as RadixSlot } from '@radix-ui/react-slot';

/**
 * Merges props onto a child instead of rendering an element.
 *
 * This is what makes an `asChild` prop possible: a component can hand its
 * behavior to whatever the caller passes, rather than forcing its own tag.
 *
 * ```tsx
 * <Button asChild>
 *   <a href="/docs">Docs</a>
 * </Button>
 * ```
 *
 * The anchor keeps being an anchor and still gets the button's handlers and
 * classes. Without it the choice is a wrapper element or a `renderAs` prop, and
 * both leak into the markup.
 */
export const Slot = RadixSlot;
