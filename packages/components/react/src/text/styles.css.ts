import { vars } from '@minuk-hwang-design-system/style-tokens';
import { style, styleVariants } from '@vanilla-extract/css';

const { textColor: semantic, status } = vars.color.$semantic;

/**
 * The colours text is allowed to be.
 *
 * Deliberately short. Every entry answers a question about the content — is this
 * body copy, a caption, a link, an error — rather than naming a hue. `crimson600`
 * as a prop value would let any caller invent a new meaning for red.
 */
export const textColor = styleVariants({
  normal: { color: semantic.normal },
  strong: { color: semantic.strong },
  assistive: { color: semantic.assistive },
  /** On a filled or inverted surface. */
  inverse: { color: semantic.inverse },
  link: { color: semantic.link },
  success: { color: status.success.strong },
  warning: { color: status.warning.strong },
  error: { color: status.error.strong },
});

export type TextColor = keyof typeof textColor;

export const truncate = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
