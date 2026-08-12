import { vars, textMetrics } from '@minuk-hwang-design-system/style-tokens';
import { style } from '@vanilla-extract/css';

const { status } = vars.color.$semantic;
const { opacity } = vars;

/**
 * Column with a single gap, so a field reads the same whether it has a
 * description, an error, both or neither. Per-part margins collapse differently
 * depending on which parts render, which is how a form ends up with rows of
 * inconsistent height.
 */
export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[6],
});

/**
 * How far the field's own words sit in from its edge.
 *
 * The label and the messages are flush with the control's border, while the
 * control's own text starts a good deal further in — 16 at `m`, where the inset
 * is what keeps a value off the edge of its box. Set against that, a label
 * hanging at zero reads as belonging to the form rather than to the field.
 *
 * Four rather than the control's own sixteen: the two are not a column of text
 * to be aligned, they are a caption and a box. Matching them exactly would push
 * the label so far in that a row of fields loses its left edge altogether.
 *
 * Keyed to the control's own corner, which is the same idea the accordion and
 * the menu row follow. The inset is there to sit the words inside a rounded
 * shape, so it only earns its place once there is a shape to sit inside: the
 * corner has to be bigger than the inset itself, or the words are held off an
 * edge that is still effectively straight. That leaves `none` and `small` — 0
 * and 4 — flush, and everything above them at the full four.
 *
 * `clamp` rather than a nested `min` inside a `max`, which is the same
 * arithmetic written twice as long.
 */
const TEXT_INSET = `clamp(0px, calc(${vars.borderRadius[8]} - ${vars.spacing[4]}), ${vars.spacing[4]})`;

/**
 * A size of its own, rather than whatever the page happens to be set to.
 *
 * This carried no type rules at all, so a label took the ambient body size —
 * 16 here, and something else in any application with a different base. It is
 * the only text in a field that was not measured, sitting above a control whose
 * value is 16, which made the question look the same weight as the answer.
 *
 * 15 is a step down from the control and the same size a `Switch` or a
 * `Checkbox` labels its row with.
 */
export const label = style({
  display: 'inline-flex',
  alignItems: 'center',
  // Two put the asterisk against the last letter, close enough to read as part
  // of the word rather than as a mark beside it.
  gap: vars.spacing[4],
  paddingInline: TEXT_INSET,
  /*
   * A little more air under the label than the row gap gives, on the same
   * principle the error's `margin-top` follows: the question wants a moment's
   * separation from the box that answers it, while the description and the
   * error stay tucked under that box at the plain gap.
   */
  marginBottom: vars.spacing[2],
  ...textMetrics(15),
});

/** Helper text, inset with the label so the three lines share one left edge. */
export const description = style({
  paddingInline: TEXT_INSET,
});

/** The asterisk beside a required label, carried over from the legacy design. */
export const required = style({
  color: status.error.normal,
});

export const disabled = style({
  opacity: opacity.disabled,
});

/**
 * A little space above the message, on top of the row gap.
 *
 * The error sits closer to the control than to whatever follows the field, which
 * is what makes it read as belonging to that control rather than introducing the
 * next one.
 */
export const error = style({
  marginTop: vars.spacing[2],
  paddingInline: TEXT_INSET,
});
