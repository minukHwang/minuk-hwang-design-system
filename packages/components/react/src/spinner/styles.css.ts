import { vars } from '@minuk-hwang-design-system/style-tokens';
import { fallbackVar, keyframes, style } from '@vanilla-extract/css';

import { iconSize } from '../shared/icon-size.css';

const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
});

/**
 * Two less than the glyph the container asked for.
 *
 * The same property the icons read, so a spinner standing in for one lands at
 * the same place — but two pixels down, because matching the numbers does not
 * match the sizes. A Material Symbols glyph is drawn inside its em box with
 * space around it, so a 20px icon puts about 17px of ink on the screen. This
 * ring is ink edge to edge. Set to the same 20 it reads as the larger of the
 * two, which is how it looked when a button switched to `loading`.
 *
 * The subtraction is on the inherited value only. Passing `size` writes the
 * dimensions straight onto the element, where they outrank this, so a spinner
 * asked for 32px is 32px.
 */
const diameter = `calc(${fallbackVar(iconSize, '18px')} - 2px)`;

/**
 * A ring with one quarter missing, drawn entirely in `border`.
 *
 * `currentColor` on three sides and transparent on the fourth is what makes the
 * rotation legible — a full ring spinning looks static. Inheriting the colour
 * means the spinner is whatever the text around it is, so it works on a filled
 * button and on a page without being told which.
 *
 * The `prefers-reduced-motion` rule in the token stylesheet collapses the
 * duration to 0.01ms rather than removing the animation, so the ring stops
 * rather than disappearing.
 */
export const spinner = style({
  display: 'inline-block',
  flex: 'none',
  width: diameter,
  height: diameter,
  /*
   * Stroke scales with the ring — a 16px ring with a 2px stroke reads as a
   * smudge — but never below 1.5px, where it stops being a line at all.
   */
  borderWidth: `max(1.5px, calc(${diameter} / 10))`,
  borderStyle: 'solid',
  /*
   * Off the dial, like the radio. The shape is doing the animating — a ring with
   * one side missing reads as spinning because the gap travels round a circle.
   * Square it and the gap jumps corner to corner, which reads as broken rather
   * than as `radius="none"`.
   */
  borderRadius: '50%',
  borderColor: 'currentColor',
  borderRightColor: 'transparent',
  animationName: spin,
  animationDuration: '600ms',
  animationTimingFunction: vars.motion.easing.linear,
  animationIterationCount: 'infinite',
});
