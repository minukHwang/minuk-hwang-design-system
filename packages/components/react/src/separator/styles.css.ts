import { vars } from '@minuk-hwang-design-system/style-tokens';
import { createVar, fallbackVar, style, styleVariants } from '@vanilla-extract/css';

const { border } = vars.color.$semantic;

/**
 * How thick the line is, held in a property because which dimension it lands on
 * depends on the orientation — height when the rule runs across, width when it
 * runs down. One value, read by whichever variant is in play, rather than two
 * ladders that have to be kept saying the same thing.
 */
const thickness = createVar();

export const separator = style({
  flex: 'none',
  border: 'none',
  backgroundColor: border.subtle,
});

/**
 * The long axis fills, the short axis is the thickness.
 *
 * `alignSelf: stretch` rather than a height, so a vertical rule is as tall as
 * the row it sits in without being told how tall that is.
 */
export const orientation = styleVariants({
  horizontal: { width: '100%', height: fallbackVar(thickness, '1px') },
  vertical: { width: fallbackVar(thickness, '1px'), alignSelf: 'stretch' },
});

export type SeparatorOrientation = keyof typeof orientation;

/**
 * Thickness in pixels, named by the number rather than by a t-shirt letter.
 *
 * A separator has two dimensions a size could mean, and its length is already
 * decided by whatever holds it — so `size="l"` would be a guess about which one
 * is being set. `size={2}` is not.
 *
 * A doubling ladder, because the difference between a 1px rule and a 2px one is
 * the whole difference at the thin end, while at the thick end nobody can tell
 * 12 from 14. The two ends do different jobs: 1px divides items in a list, and
 * 16px is the band that says one part of a page has finished and another has
 * started.
 */
export const size = styleVariants({
  1: { vars: { [thickness]: '1px' } },
  2: { vars: { [thickness]: '2px' } },
  4: { vars: { [thickness]: '4px' } },
  8: { vars: { [thickness]: '8px' } },
  16: { vars: { [thickness]: '16px' } },
});

export type SeparatorSize = keyof typeof size;
