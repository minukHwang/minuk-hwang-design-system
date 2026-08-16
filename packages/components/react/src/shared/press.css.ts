import { vars } from '@minuk-hwang-design-system/style-tokens';
import { createVar, style } from '@vanilla-extract/css';

import { pressedLayer } from './state';

/**
 * How far a control gives way under a press.
 *
 * Small enough to be felt rather than seen: at 0.97 a 40px button loses just
 * over a pixel on each edge. Nearer 0.9 turns a button into a toy, and on a
 * wide control the same ratio moves the far edge far enough to read as a layout
 * shift.
 *
 * Uniform rather than per-size, because the press is a physical gesture and a
 * finger does not know how large the target is. The proportion is the constant;
 * the distance follows from it.
 *
 * Held in a property so `prefers-reduced-motion` can set it to 1. Removing the
 * transition alone would be worse than leaving it: the scale would still apply,
 * and it would snap.
 */
const scale = createVar();

/**
 * The press, for anything a pointer can hold down.
 *
 * Two selectors, and both are needed. `data-pressed` comes from `usePress` in
 * the behavior layer, which watches pointer, touch and keyboard — `:active`
 * never fires for a keyboard activation and touch support for it is
 * inconsistent enough that a control can answer a mouse and not a finger.
 * `:active` stays for anything rendered without the hook behind it.
 *
 * CSS rather than a motion library. This is one transform across one frame
 * boundary, it composites off the main thread, and a runtime animation
 * dependency would be paid for by every application that installs the system.
 */
export const pressable = style({
  vars: { [scale]: '0.97' },
  transitionProperty: 'background-image, transform',
  transitionDuration: vars.motion.duration[70],
  transitionTimingFunction: vars.motion.easing.standard,
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      vars: { [scale]: '1' },
    },
  },
  selectors: {
    '&[data-pressed]:not(:disabled):not([data-disabled])': {
      transform: `scale(${scale})`,
      backgroundImage: pressedLayer,
    },
    '&:active:not(:disabled):not([data-disabled])': {
      transform: `scale(${scale})`,
      backgroundImage: pressedLayer,
    },
  },
});
