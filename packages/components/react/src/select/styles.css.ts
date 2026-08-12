import { vars, pillWhenFull, textMetrics } from '@minuk-hwang-design-system/style-tokens';
import { style, styleVariants } from '@vanilla-extract/css';

import { MENU_PADDING } from '../shared/overlay.css';

const { background, border, fill, status, textColor } = vars.color.$semantic;
const { opacity } = vars;

/**
 * The trigger is built to match `Input` exactly.
 *
 * A form with a text field above a select should read as one column, and two
 * controls that differ by a pixel of height or a shade of border look like a
 * mistake rather than a distinction. The rules are duplicated rather than shared
 * because the two have genuinely different states — an input has `:read-only`,
 * a select has `data-placeholder`.
 */
const trigger = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.spacing[8],
  width: '100%',
  // The trigger is a control and follows the input; the list it opens is a
  // surface and follows the popover. Only this half takes the pill.
  borderRadius: pillWhenFull(vars.borderRadius[8]),
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: border.normal,
  color: textColor.normal,
  backgroundColor: background.raised,
  fontFamily: 'inherit',
  textAlign: 'left',
  cursor: 'pointer',
  transitionProperty: 'border-color',
  transitionDuration: vars.motion.duration[70],
  transitionTimingFunction: vars.motion.easing.standard,

  selectors: {
    '&:hover:not([data-disabled]):not([aria-invalid])': { borderColor: border.strong },
    // One stroke across the border, not a border plus a shadow beside it. See
    // `Input`, which this matches and where the reason is written out.
    '&:focus-visible': {
      outline: `2px solid ${border.focus}`,
      outlineOffset: '-1px',
    },
    // Radix sets this while nothing is chosen, which is how the placeholder gets
    // to look like a placeholder rather than a value.
    '&[data-placeholder]': { color: textColor.assistive },
    '&[aria-invalid]': { borderColor: status.error.normal },
    '&[data-disabled]': {
      cursor: 'not-allowed',
      backgroundColor: fill.subtle,
      opacity: opacity.disabled,
    },
  },
});

/**
 * Heights match the button scale, and the insets and the type step with them.
 *
 * The insets were 10, 12, 16 — two pixels between the small and the medium, four
 * between the medium and the large, so the middle size sat almost on top of the
 * one below it and a long way from the one above. The type was 16 flat, on the
 * shared base, so a small select and a large one said the same word at the same
 * size. `Input` carries all three of these, for the reasons written there.
 */
export const size = styleVariants({
  s: [trigger, { height: '32px', padding: `0 ${vars.spacing[12]}`, ...textMetrics(14) }],
  m: [trigger, { height: '40px', padding: `0 ${vars.spacing[16]}`, ...textMetrics(16) }],
  l: [trigger, { height: '48px', padding: `0 ${vars.spacing[20]}`, ...textMetrics(17) }],
});

export type SelectSize = keyof typeof size;

/**
 * The chosen label, inside the trigger.
 *
 * A flex item will not shrink below the width of its content, so a value longer
 * than the control pushed the chevron out of the box and off the end of it.
 * `min-width: 0` lets it give way; the three properties after that say what
 * happens when it does.
 *
 * The trigger is a fixed-width control by nature — it sits in a form column with
 * other fields — so the label truncates here and the list below shows it whole.
 */
export const value = style({
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

/** Rotates to point up while the list is open. */
export const chevron = style({
  color: textColor.assistive,
  transitionProperty: 'transform',
  transitionDuration: vars.motion.duration[150],
  transitionTimingFunction: vars.motion.easing.standard,
  selectors: {
    '[data-state="open"] &': { transform: 'rotate(180deg)' },
  },
});

export const content = style({
  zIndex: vars.zIndex.popover,
  /*
   * At least the trigger's width, and as much more as the options need.
   *
   * `min-width` rather than `width`: a list narrower than the control it drops
   * from looks like a different control, and one clipped to that width would
   * hide the ends of the very labels it exists to let you compare. Radix
   * measures the trigger and publishes it here.
   *
   * The cap is what stops that from running off the screen. Radix measures the
   * room between the trigger and the viewport edge as well, so a long option
   * widens the list until it reaches the edge and wraps after that, rather than
   * being positioned somewhere it cannot be read.
   */
  minWidth: 'var(--radix-select-trigger-width)',
  maxWidth: 'var(--radix-select-content-available-width)',
  maxHeight: 'var(--radix-select-content-available-height)',
  // The shared one, because the rows inside subtract it from the panel's corner
  // to find their own.
  padding: MENU_PADDING,
});

/** Arrow shown when the list is long enough to scroll. */
export const scrollButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '24px',
  color: textColor.assistive,
  cursor: 'default',
});
