import { vars } from '@minuk-hwang-design-system/style-tokens';
import { style, styleVariants } from '@vanilla-extract/css';

import { pressable } from '../shared/press.css';
import { hoverLayer, restLayer } from '../shared/state';

const { background, border } = vars.color.$semantic;

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: vars.borderRadius[12],
  backgroundColor: background.raised,
  backgroundImage: restLayer,
  overflow: 'hidden',
});

export const interactive = style([
  pressable,
  {
    cursor: 'pointer',
    transitionProperty: 'background-image, box-shadow',
    transitionDuration: vars.motion.duration[100],
    transitionTimingFunction: vars.motion.easing.standard,
    selectors: {
      '&:hover': { backgroundImage: hoverLayer, boxShadow: vars.shadow.s },
      '&:focus-visible': {
        outline: `2px solid ${border.focus}`,
        outlineOffset: '2px',
      },
    },
  },
]);

/**
 * How the card separates itself from the page.
 *
 * `outlined` and `elevated` are alternatives rather than a scale: a border draws
 * a hard edge, a shadow implies height, and doing both reads as indecision.
 *
 * `elevated` reads `m`, where it read `xs` — a step so slight that the variant
 * asking to look raised was hard to tell from the one asking to look flat. Not
 * the `l` the overlays take: those float over arbitrary content and have nothing
 * but the shadow to separate them, while a card sits in the page's own flow and
 * only has to look picked up from it.
 *
 * Which means the hover shadow has to be held off this one. `interactive` steps
 * to `s` on hover, which is a lift from nothing and a drop from `m`, so an
 * elevated card would have sunk under the pointer. It keeps its own step
 * instead, and the ink is what answers the hover.
 */
export const elevation = styleVariants({
  flat: {},
  outlined: { borderWidth: '1px', borderStyle: 'solid', borderColor: border.subtle },
  elevated: {
    boxShadow: vars.shadow.m,
    selectors: {
      [`&${interactive}:hover`]: { boxShadow: vars.shadow.m },
    },
  },
});

export type CardElevation = keyof typeof elevation;

/*
 * Sections.
 *
 * Padding lives on each section rather than on the root, so a card can hold a
 * full-bleed image between two padded blocks without fighting a container that
 * has already inset everything.
 *
 * Each section pads itself on all four sides, and only the seam between two
 * padded sections collapses. The header used to carry `padding-bottom: 0` and
 * the footer `padding-top: 0`, which assumed a body was always between them: a
 * card of nothing but a header had its text sitting on the bottom border, and a
 * header beside a footer had the two touching. Media is deliberately not in the
 * collapse rules — it has no padding of its own, so whatever follows it keeps
 * its own.
 */

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  // Four had the description sitting on the title's descenders. The two are a
  // heading and a sentence, not two lines of one paragraph.
  gap: vars.spacing[8],
  padding: vars.spacing[24],
});

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[8],
  // The header's, so the body's first word starts under the title rather than
  // eight pixels to its left.
  padding: vars.spacing[24],
  selectors: {
    // Two padded sections meeting would give 48px between them. The lower one
    // drops its top padding so the seam is the same 24 as every other edge.
    [`${header} + &`]: { paddingTop: 0 },
  },
});

export const footer = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing[8],
  padding: vars.spacing[24],
  selectors: {
    [`${header} + &`]: { paddingTop: 0 },
    [`${body} + &`]: { paddingTop: 0 },
  },
});

/** Pushes the footer's last child to the right — the usual cancel/confirm shape. */
export const footerEnd = style({
  justifyContent: 'flex-end',
});

/** Edge to edge, for media that should touch the card's corners. */
export const media = style({
  display: 'block',
  width: '100%',
  objectFit: 'cover',
});
