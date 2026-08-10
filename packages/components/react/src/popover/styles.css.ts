import { vars } from '@minuk-hwang-design-system/style-tokens';
import { style } from '@vanilla-extract/css';

const { surface, border } = vars.color.$semantic;

export const content = style({
  zIndex: vars.zIndex.popover,
  minWidth: '220px',
  maxWidth: 'min(360px, calc(100vw - 32px))',
  padding: vars.spacing[16],
  outline: 'none',
});

/**
 * The pointer has to be filled explicitly — Radix renders an unstyled SVG, and a
 * transparent arrow on a bordered panel reads as a notch cut out of the edge.
 */
export const arrow = style({
  fill: surface.canvas,
  stroke: border.normal,
  strokeWidth: 1,
});
