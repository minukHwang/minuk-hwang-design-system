import { vars } from '@minuk-hwang-design-system/style-tokens';
import { keyframes, style } from '@vanilla-extract/css';

const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
});

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
  borderStyle: 'solid',
  borderRadius: vars.borderRadius.full,
  borderColor: 'currentColor',
  borderRightColor: 'transparent',
  animationName: spin,
  animationDuration: '600ms',
  animationTimingFunction: vars.motion.easing.linear,
  animationIterationCount: 'infinite',
});
