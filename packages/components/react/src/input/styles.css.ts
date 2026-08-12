import { vars, pillWhenFull, textMetrics } from '@minuk-hwang-design-system/style-tokens';
import { style, styleVariants } from '@vanilla-extract/css';

const { surface, border, textColor, status } = vars.color.$semantic;
const { opacity } = vars.color.$absolute;

/**
 * Shared by `Input` and `Textarea`.
 *
 * `aria-invalid` drives the error appearance rather than a variant prop. `Field`
 * already sets that attribute from its own `invalid` state, so styling from it
 * means the two can never disagree — there is no way to render a red border on a
 * control that a screen reader still calls valid.
 */
const control = style({
  width: '100%',
  // Pill-shaped at `full`, with the button it sits beside in a form. A field and
  // its submit differing in shape is the kind of thing nobody names and everyone
  // sees.
  borderRadius: pillWhenFull(vars.borderRadius[8]),
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: border.normal,
  color: textColor.normal,
  backgroundColor: surface.raised,
  ...textMetrics(16),
  fontFamily: 'inherit',
  transitionProperty: 'border-color, box-shadow, background-color',
  transitionDuration: vars.motion.duration[70],
  transitionTimingFunction: vars.motion.easing.standard,

  selectors: {
    '&::placeholder': { color: textColor.assistive },
    '&:hover:not(:disabled):not([aria-invalid])': { borderColor: border.strong },
    // The focus ring is a border colour change plus a same-colour shadow, so the
    // ring thickens without the control resizing.
    '&:focus': {
      outline: 'none',
      borderColor: border.focus,
      boxShadow: `0 0 0 1px ${border.focus}`,
    },
    '&[aria-invalid]': { borderColor: status.error.normal },
    '&[aria-invalid]:focus': { boxShadow: `0 0 0 1px ${status.error.normal}` },
    '&:disabled': {
      backgroundColor: surface.sunken,
      cursor: 'not-allowed',
      opacity: opacity.disabledContainer,
    },
    '&:read-only:not(:disabled)': { backgroundColor: surface.sunken },
  },
});

/** Heights match the button scale, so a control and its submit line up. */
export const input = styleVariants({
  s: [control, { height: '32px', padding: `0 ${vars.spacing[10]}` }],
  m: [control, { height: '40px', padding: `0 ${vars.spacing[12]}` }],
  l: [control, { height: '48px', padding: `0 ${vars.spacing[16]}` }],
});

export type InputSize = keyof typeof input;

export const textarea = style([
  control,
  {
    display: 'block',
    /*
     * Back to the plain step, undoing the pill the single-line control opts into.
     * A pill is a shape for something one line tall; on a box that starts at 96px
     * and grows as it is dragged, `full` would ask for a 48px corner and then a
     * larger one, and the text inside would have to be inset to clear it.
     */
    borderRadius: vars.borderRadius[8],
    padding: `${vars.spacing[10]} ${vars.spacing[12]}`,
    minHeight: '96px',
    // Vertical only. Horizontal resize breaks whatever column the field sits in.
    resize: 'vertical',
  },
]);
