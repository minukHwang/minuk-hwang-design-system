import { vars, pillWhenFull, textMetrics } from '@minuk-hwang-design-system/style-tokens';
import { style, styleVariants } from '@vanilla-extract/css';

const { background, border, fill, status, textColor } = vars.color.$semantic;
const { opacity } = vars;

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
  backgroundColor: background.raised,
  fontFamily: 'inherit',
  transitionProperty: 'border-color, background-color',
  transitionDuration: vars.motion.duration[70],
  transitionTimingFunction: vars.motion.easing.standard,

  selectors: {
    '&::placeholder': { color: textColor.assistive },
    '&:hover:not(:disabled):not([aria-invalid])': { borderColor: border.strong },
    /*
     * One stroke, drawn across the border rather than beside it.
     *
     * This was a green border with a same-color 1px shadow outside it, which is
     * two rounded rectangles sharing an edge. On the straight sides they stack
     * on the pixel grid and the ring looks solid; on the corners each is
     * antialiased against the other's absence, so the pixels along the shared
     * curve end up half covered by one and half by the other and never reach
     * full opacity. The corners came out soft while the sides stayed crisp.
     *
     * A negative offset puts the outline's inner edge a pixel inside the border
     * box, so two pixels of outline occupy exactly the span those two rings did
     * — the control does not move and the ring does not grow. It is also how
     * every other control here draws focus.
     */
    '&:focus': {
      outline: `2px solid ${border.focus}`,
      outlineOffset: '-1px',
    },
    '&[aria-invalid]': { borderColor: status.error.normal },
    '&[aria-invalid]:focus': { outlineColor: status.error.normal },
    '&:disabled': {
      backgroundColor: fill.subtle,
      cursor: 'not-allowed',
      opacity: opacity.disabled,
    },
    '&:read-only:not(:disabled)': { backgroundColor: fill.subtle },
  },
});

/**
 * Heights match the button scale, so a control and its submit line up, and the
 * insets step evenly with them.
 *
 * They were 10, 12, 16 — two pixels between the small and the medium, four
 * between the medium and the large, so the middle size sat almost on top of the
 * one below it and a long way from the one above. `Select` carries the same
 * three, because a text field above a select should read as one column.
 *
 * The type is per-size too, where it used to be 16 on the shared base — so a
 * control could be made small and keep the same value at the same size as a
 * large one, which is the one thing changing the size was for.
 *
 * `m` stays at 16 rather than taking the button's 15. Mobile Safari zooms the
 * page when a field under 16px takes focus, and it is the default size, so the
 * common case is the one that must not do that. Asking for `s` is asking for a
 * denser control, and accepting the zoom with it.
 */
export const input = styleVariants({
  s: [control, { height: '32px', padding: `0 ${vars.spacing[12]}`, ...textMetrics(14) }],
  m: [control, { height: '40px', padding: `0 ${vars.spacing[16]}`, ...textMetrics(16) }],
  l: [control, { height: '48px', padding: `0 ${vars.spacing[20]}`, ...textMetrics(17) }],
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
    /*
     * The single-line control's `m` on the sides, which is the size a textarea
     * is nearly always stacked under. There is no `size` prop here to pick one,
     * so it takes the middle of the ladder rather than a number of its own —
     * left at 12 its first character started four pixels short of the field
     * above it.
     *
     * The same on the block axis, where a single-line control has none to
     * match: its text is centered in a fixed height. This box is as tall as its
     * content, so the inset is the only thing holding the first line off the
     * top edge, and 10 read as tight against sides that had grown to 16.
     */
    padding: vars.spacing[16],
    // The single-line control's `m` again, now that the type is set per size
    // rather than once on the base this shares.
    ...textMetrics(16),
    minHeight: '96px',
    // Vertical only. Horizontal resize breaks whatever column the field sits in.
    resize: 'vertical',
  },
]);
