import { vars } from '@minuk-hwang-design-system/style-tokens';
import { style, styleVariants } from '@vanilla-extract/css';

const { surface, border, textColor, status } = vars.color.$semantic;
const { opacity } = vars.color.$absolute;

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
  borderRadius: vars.borderRadius[8],
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: border.normal,
  color: textColor.normal,
  backgroundColor: surface.canvas,
  fontSize: vars.typography.fontSize[16],
  lineHeight: vars.typography.lineHeight[21],
  fontFamily: 'inherit',
  textAlign: 'left',
  cursor: 'pointer',
  transitionProperty: 'border-color, box-shadow',
  transitionDuration: vars.motion.duration[70],
  transitionTimingFunction: vars.motion.easing.standard,

  selectors: {
    '&:hover:not([data-disabled]):not([aria-invalid])': { borderColor: border.strong },
    '&:focus-visible': {
      outline: 'none',
      borderColor: border.focus,
      boxShadow: `0 0 0 1px ${border.focus}`,
    },
    // Radix sets this while nothing is chosen, which is how the placeholder gets
    // to look like a placeholder rather than a value.
    '&[data-placeholder]': { color: textColor.assistive },
    '&[aria-invalid]': { borderColor: status.error.normal },
    '&[data-disabled]': {
      cursor: 'not-allowed',
      backgroundColor: surface.default,
      opacity: opacity.disabledContainer,
    },
  },
});

export const size = styleVariants({
  s: [trigger, { height: '40px', padding: `0 ${vars.spacing[10]}` }],
  m: [trigger, { height: '48px', padding: `0 ${vars.spacing[12]}` }],
  l: [trigger, { height: '56px', padding: `0 ${vars.spacing[16]}` }],
});

export type SelectSize = keyof typeof size;

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
  // Matches the trigger's width so the list does not jump wider than the control
  // it belongs to. Radix measures the trigger and publishes it here.
  minWidth: 'var(--radix-select-trigger-width)',
  maxHeight: 'var(--radix-select-content-available-height)',
  padding: vars.spacing[4],
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
