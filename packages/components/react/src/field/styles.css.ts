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
  /*
   * A little more air under the label than the row gap gives, on the same
   * principle the error's `margin-top` follows: the question wants a moment's
   * separation from the box that answers it, while the description and the
   * error stay tucked under that box at the plain gap.
   */
  marginBottom: vars.spacing[2],
  ...textMetrics(15),
});

/**
 * Helper text. No inset of its own.
 *
 * The label and the messages used to sit a few pixels in, keyed to the control's
 * corner, on the argument that words should start inside a rounded shape rather
 * than against it. On a page of examples it did the opposite: a field's label no
 * longer lined up with the section title above it or with anything else in the
 * column, so the correction was more visible than the thing it corrected.
 */
export const description = style({});

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
});
