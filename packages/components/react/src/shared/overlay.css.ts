import { vars, textMetrics } from '@minuk-hwang-design-system/style-tokens';
import { keyframes, style } from '@vanilla-extract/css';

const { surface, border, textColor, accent } = vars.color.$semantic;
const { opacity } = vars.color.$absolute;

/*
 * ============================================
 * Motion
 * ============================================
 */

/**
 * Radix keeps a closing element mounted while `data-state="closed"` is set, so
 * both halves of the transition can be real animations. Without that an overlay
 * would fade in and then vanish, which reads as a glitch rather than a dismissal.
 *
 * Entering scales from 96% rather than 0 — a panel that grows from nothing looks
 * like it is being created, and a menu is being revealed.
 */
const fadeIn = keyframes({
  from: { opacity: 0, transform: 'scale(0.96)' },
  to: { opacity: 1, transform: 'scale(1)' },
});

const fadeOut = keyframes({
  from: { opacity: 1, transform: 'scale(1)' },
  to: { opacity: 0, transform: 'scale(0.96)' },
});

const overlayIn = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } });
const overlayOut = keyframes({ from: { opacity: 1 }, to: { opacity: 0 } });

/**
 * Exit is quicker than entry and uses the accelerating curve: nobody wants to
 * wait out a dismissal they already asked for.
 */
export const animated = style({
  transformOrigin: 'var(--radix-popper-transform-origin)',
  selectors: {
    '&[data-state="open"]': {
      animationName: fadeIn,
      animationDuration: vars.motion.duration[150],
      animationTimingFunction: vars.motion.easing.entrance,
    },
    '&[data-state="closed"]': {
      animationName: fadeOut,
      animationDuration: vars.motion.duration[100],
      animationTimingFunction: vars.motion.easing.exit,
    },
  },
});

/*
 * ============================================
 * Surfaces
 * ============================================
 */

/**
 * The floating panel every overlay shares.
 *
 * Border and shadow together, unlike `Card` where they are alternatives: an
 * overlay sits on top of arbitrary content, so it needs the shadow to say it is
 * above and the border to hold its edge against a busy background.
 */
export const panel = style({
  borderRadius: vars.borderRadius[12],
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: border.normal,
  backgroundColor: surface.canvas,
  boxShadow: vars.shadow.m,
  // Radix measures the space between the trigger and the viewport edge and
  // publishes it here. Without it a long menu near the bottom simply overflows.
  maxHeight: 'var(--radix-popper-available-height)',
  overflowY: 'auto',
});

export const scrim = style({
  position: 'fixed',
  inset: 0,
  zIndex: vars.zIndex.overlay,
  backgroundColor: surface.scrim,
  selectors: {
    '&[data-state="open"]': {
      animationName: overlayIn,
      animationDuration: vars.motion.duration[200],
      animationTimingFunction: vars.motion.easing.entrance,
    },
    '&[data-state="closed"]': {
      animationName: overlayOut,
      animationDuration: vars.motion.duration[150],
      animationTimingFunction: vars.motion.easing.exit,
    },
  },
});

/*
 * ============================================
 * Menu contents
 * ============================================
 */

export const menu = style({
  zIndex: vars.zIndex.popover,
  minWidth: '180px',
  padding: vars.spacing[4],
});

/**
 * Menu row.
 *
 * Highlighting is driven by `data-highlighted`, which Radix sets for both the
 * pointer and the keyboard. Styling `:hover` instead is the bug where arrowing
 * through a menu highlights nothing until you touch the mouse.
 */
export const item = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing[8],
  // Left padding leaves room for a check mark, so a list of options does not
  // shift sideways when one of them becomes selected.
  padding: `${vars.spacing[8]} ${vars.spacing[10]} ${vars.spacing[8]} ${vars.spacing[28]}`,
  borderRadius: vars.borderRadius[6],
  color: textColor.normal,
  ...textMetrics(14),
  cursor: 'pointer',
  userSelect: 'none',
  outline: 'none',
  selectors: {
    '&[data-highlighted]': { backgroundColor: surface.hover },
    '&[data-state="checked"]': { color: accent.strong },
    '&[data-disabled]': {
      cursor: 'not-allowed',
      opacity: opacity.disabledContent,
    },
  },
});

/** For menus with no selectable state, where the check-mark gutter would be dead space. */
export const itemFlush = style({
  paddingLeft: vars.spacing[10],
});

export const itemIndicator = style({
  position: 'absolute',
  left: vars.spacing[8],
  display: 'inline-flex',
  alignItems: 'center',
});

export const label = style({
  padding: `${vars.spacing[6]} ${vars.spacing[10]}`,
  color: textColor.assistive,
  ...textMetrics(12),
  fontWeight: vars.typography.fontWeight[600],
});

export const separator = style({
  height: '1px',
  margin: `${vars.spacing[4]} ${vars.spacing[6]}`,
  backgroundColor: border.subtle,
});
