import { vars, textMetrics } from '@minuk-hwang-design-system/style-tokens';
import { keyframes, style } from '@vanilla-extract/css';

import { pressable } from './press.css';
import { hoverLayer } from './state';

const { accent, background, border, textColor } = vars.color.$semantic;
const { opacity } = vars;

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

/** The panel's own corner. Read by the rows inside it, so see `MENU_PADDING`. */
const PANEL_RADIUS = vars.borderRadius[12];

/**
 * The gap between the panel's edge and the rows inside it.
 *
 * It was four, which is the same as saying the panel has no inside: the rows sat
 * against a corner drawn to be seen, and the two ran out of room for each other
 * at the top of the radius dial. Eight is a gutter the panel can round into.
 *
 * It also sets how round a row is, which is the other half of the same problem.
 * The row's corner is this subtracted from the panel's, so a gutter too small to
 * see leaves almost the whole of the panel's corner on the row — 14px of it at
 * `large` and `full`, on a row 36px tall. At eight that comes down to 10.
 *
 * Exported because it is half of a pair, and a menu that sets its own padding
 * without saying so here would put the two out of step. `Select` reads it for
 * that reason.
 */
export const MENU_PADDING = vars.spacing[8];

/**
 * How far a row stops short of the panel's sides.
 *
 * The same `min` the accordion's hover uses, and for the same reason. The gutter
 * exists so a rounded row has somewhere to be rounded against; at
 * `radius="none"` there is no corner to show, and a highlight that stops four
 * pixels short of a square panel is a margin doing nothing. Taking the smaller
 * of the two sends it to zero there and leaves it alone everywhere else.
 *
 * The row gives the gutter back as padding, so the label does not move when the
 * dial does.
 */
const ROW_INSET = `min(${MENU_PADDING}, ${PANEL_RADIUS})`;

/**
 * What the row reclaims: zero on every scale but `none`, where it is the gutter.
 *
 * Exported so anything overriding one of the row's own paddings keeps it. Drop
 * it and that edge stops moving with the rest of the row at `radius="none"`.
 */
export const ROW_BLEED = `calc(${MENU_PADDING} - ${ROW_INSET})`;

/**
 * The floating panel every overlay shares.
 *
 * Shadow alone, where this used to carry a border as well. The argument for both
 * was that an overlay lands on arbitrary content, so it needs the shadow to say
 * it is above and the border to hold its edge against something busy. In
 * practice the line read as a seam around a surface that was already separated,
 * and the two edges — the border and the corner the shadow follows — never quite
 * agreed at the top of the radius dial.
 *
 * Which leaves the shadow doing both jobs, so it steps up to `l`. `m` was tuned
 * to sit under a panel that had an outline of its own.
 */
export const panel = style({
  borderRadius: PANEL_RADIUS,
  backgroundColor: background.overlay,
  boxShadow: vars.shadow.l,
  // Radix measures the space between the trigger and the viewport edge and
  // publishes it here. Without it a long menu near the bottom simply overflows.
  maxHeight: 'var(--radix-popper-available-height)',
  overflowY: 'auto',
});

export const scrim = style({
  position: 'fixed',
  inset: 0,
  zIndex: vars.zIndex.overlay,
  backgroundColor: background.scrim,
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
  padding: MENU_PADDING,
});

/**
 * Menu row.
 *
 * Highlighting is driven by `data-highlighted`, which Radix sets for both the
 * pointer and the keyboard. Styling `:hover` instead is the bug where arrowing
 * through a menu highlights nothing until you touch the mouse.
 */
export const item = style([
  pressable,
  {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: vars.spacing[8],
    /*
     * Left padding leaves room for a check mark, so a list of options does not
     * shift sideways when one of them becomes selected.
     *
     * Both sides also carry `ROW_BLEED`, which is zero everywhere but
     * `radius="none"` — there it gives back exactly what the negative margin
     * below takes, so the row reaches the panel's edge without the label
     * following it out.
     */
    paddingTop: vars.spacing[8],
    paddingBottom: vars.spacing[8],
    paddingLeft: `calc(${vars.spacing[28]} + ${ROW_BLEED})`,
    paddingRight: `calc(${vars.spacing[10]} + ${ROW_BLEED})`,
    marginInline: `calc(-1 * ${ROW_BLEED})`,
    /*
     * Concentric with the panel rather than a step of its own.
     *
     * A rounded shape sitting inside another one has to be the outer corner less
     * the gap between them, or the two curves are not parallel and the inner one
     * reads as clipped. Step 6 was fixed while the panel's 12 climbs with the
     * dial, so the mismatch grew with it: level at `small`, two pixels short at
     * `medium`, five at `large` and `full`.
     *
     * Which leaves the gutter deciding how round a row is, and that is the right
     * place for the decision — see `MENU_PADDING`.
     *
     * `max` because `radius="none"` takes the panel to zero, and zero less the
     * padding is a negative corner. The row squares off with everything else
     * instead.
     */
    borderRadius: `max(0px, calc(${PANEL_RADIUS} - ${MENU_PADDING}))`,
    color: textColor.normal,
    ...textMetrics(14),
    cursor: 'pointer',
    userSelect: 'none',
    outline: 'none',
    selectors: {
      '&[data-highlighted]': { backgroundImage: hoverLayer },
      '&[data-state="checked"]': { color: accent.strong },
      '&[data-disabled]': {
        cursor: 'not-allowed',
        opacity: opacity.disabled,
      },
    },
  },
]);

/** For menus with no selectable state, where the check-mark gutter would be dead space. */
export const itemFlush = style({
  paddingLeft: `calc(${vars.spacing[10]} + ${ROW_BLEED})`,
});

export const itemIndicator = style({
  position: 'absolute',
  /*
   * Four, not eight. The gutter the row reserves is 28 and the mark is 16 wide,
   * so at eight it ended four pixels from the label and read as part of the
   * word. At four it clears it by eight, the same gap the row keeps between any
   * two of its own children.
   *
   * Measured from the row's box, which moves at `radius="none"`. Without the
   * bleed the mark would follow it out and stop lining up with the label.
   */
  left: `calc(${vars.spacing[4]} + ${ROW_BLEED})`,
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
