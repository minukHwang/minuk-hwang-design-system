import { vars } from '@minuk-hwang-design-system/style-tokens';
import { style, styleVariants } from '@vanilla-extract/css';

const { surface, border } = vars.color.$semantic;

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: vars.borderRadius[12],
  backgroundColor: surface.default,
  overflow: 'hidden',
});

/**
 * How the card separates itself from the page.
 *
 * `outlined` and `elevated` are alternatives rather than a scale: a border draws
 * a hard edge, a shadow implies height, and doing both reads as indecision. The
 * shadow steps to `s` on hover only when the card is interactive, which is what
 * `Card.Root` decides.
 */
export const elevation = styleVariants({
  flat: {},
  outlined: { borderWidth: '1px', borderStyle: 'solid', borderColor: border.normal },
  elevated: { boxShadow: vars.shadow.xs },
});

export type CardElevation = keyof typeof elevation;

export const interactive = style({
  cursor: 'pointer',
  transitionProperty: 'background-color, box-shadow',
  transitionDuration: vars.motion.duration[100],
  transitionTimingFunction: vars.motion.easing.standard,
  selectors: {
    '&:hover': { backgroundColor: surface.hover, boxShadow: vars.shadow.s },
    '&:focus-visible': {
      outline: `2px solid ${border.focus}`,
      outlineOffset: '2px',
    },
  },
});

/*
 * Sections.
 *
 * Padding lives on each section rather than on the root, so a card can hold a
 * full-bleed image between two padded blocks without fighting a container that
 * has already inset everything.
 */

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[4],
  padding: `${vars.spacing[16]} ${vars.spacing[16]} 0`,
});

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[8],
  padding: vars.spacing[16],
});

export const footer = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing[8],
  padding: `0 ${vars.spacing[16]} ${vars.spacing[16]}`,
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
