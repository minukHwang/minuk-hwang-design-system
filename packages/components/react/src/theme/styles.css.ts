import { style } from '@vanilla-extract/css';

/**
 * A box that is not a box.
 *
 * `Theme` exists to put two attributes somewhere the rest of the tree can
 * inherit from, and an element that carried a real box would change the layout
 * of whatever it was dropped into — a flex child suddenly having a wrapper is a
 * different grid.
 *
 * `display: contents` removes the box and keeps the element, which is exactly
 * the trade wanted here: custom properties still cascade from it, and nothing
 * measures it.
 */
export const root = style({
  display: 'contents',
});
