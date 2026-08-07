import { vars } from '@minuk-hwang-design-system/style-tokens';
import { style } from '@vanilla-extract/css';

const { status } = vars.color.$semantic;
const { opacity } = vars.color.$absolute;

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

export const label = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing[2],
});

/** The asterisk beside a required label, carried over from the legacy design. */
export const required = style({
  color: status.error.normal,
});

export const disabled = style({
  opacity: opacity.disabledContent,
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
