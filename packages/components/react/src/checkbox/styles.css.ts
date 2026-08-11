import { vars } from '@minuk-hwang-design-system/style-tokens';
import { style, styleVariants } from '@vanilla-extract/css';

const { accent, surface, border, status } = vars.color.$semantic;
const { opacity } = vars.color.$absolute;

/**
 * Checkbox and radio share everything but the corner radius, which is the whole
 * convention: square means "any number of these", round means "exactly one".
 * Users read that shape before they read the label, so it is not decoration.
 */
const control = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 'none',
  width: '20px',
  height: '20px',
  padding: 0,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: border.strong,
  color: accent.onNormal,
  backgroundColor: surface.canvas,
  cursor: 'pointer',
  transitionProperty: 'background-color, border-color',
  transitionDuration: vars.motion.duration[70],
  transitionTimingFunction: vars.motion.easing.standard,

  selectors: {
    '&:hover:not([data-disabled])': { borderColor: accent.normal },
    '&:focus-visible': {
      outline: `2px solid ${border.focus}`,
      outlineOffset: '2px',
    },
    // Indeterminate is filled too — it means "some are checked", which is closer
    // to on than to off, and an empty box would read as none.
    '&[data-state="checked"], &[data-state="indeterminate"]': {
      borderColor: accent.normal,
      backgroundColor: accent.normal,
    },
    '&[aria-invalid]': { borderColor: status.error.normal },
    '&[data-disabled]': {
      cursor: 'not-allowed',
      opacity: opacity.disabledContainer,
    },
  },
});

/**
 * The one radius in the system the dial cannot reach.
 *
 * A checkbox is square and a radio is round, and that is not decoration — it is
 * how someone knows before clicking whether picking this one unpicks the other.
 * Wire the radio to the dial and `radius="none"` squares it into a checkbox,
 * leaving two controls that look identical and behave differently.
 *
 * So `50%` is written out. The checkbox beside it does follow the dial, because
 * a rounder square is still a square.
 */
export const shape = styleVariants({
  checkbox: [control, { borderRadius: vars.borderRadius[4] }],
  radio: [control, { borderRadius: '50%' }],
});

export const indicator = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

/**
 * The dot inside a selected radio. Drawn rather than an icon, so it stays
 * perfectly centred, and round for the same reason its container is.
 */
export const radioDot = style({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: 'currentColor',
});

/**
 * Control and label as one row.
 *
 * `align-items: flex-start` rather than centre, so a label that wraps to three
 * lines keeps its box beside the first line instead of floating to the middle.
 */
export const row = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: vars.spacing[8],
});

export const rowLabel = style({
  cursor: 'pointer',
  selectors: {
    '&[data-disabled]': { cursor: 'not-allowed', opacity: opacity.disabledContent },
  },
});

export const group = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[10],
});
