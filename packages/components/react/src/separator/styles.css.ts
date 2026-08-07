import { vars } from '@minuk-hwang-design-system/style-tokens';
import { style, styleVariants } from '@vanilla-extract/css';

const { border } = vars.color.$semantic;

export const separator = style({
  flex: 'none',
  border: 'none',
  backgroundColor: border.subtle,
});

/**
 * A hairline, not a token step. 1px is the thinnest a divider can be and still
 * be one, and the spacing scale's smallest entry happens to be that — but the
 * two would drift for different reasons, so this stays literal.
 */
export const orientation = styleVariants({
  horizontal: { width: '100%', height: '1px' },
  vertical: { width: '1px', alignSelf: 'stretch' },
});

export type SeparatorOrientation = keyof typeof orientation;
