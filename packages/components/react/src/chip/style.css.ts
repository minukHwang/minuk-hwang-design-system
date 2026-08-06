import { vars } from '@minuk-hwang-design-system/style-tokens';
import { style } from '@vanilla-extract/css';

/**
 * 공통 스타일
 */
export const baseStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: vars.borderRadius.full,
  textAlign: 'center',
});

/**
 * size 스타일
 */
const small = style({
  padding: `${vars.spacing[4]} ${vars.spacing[8]}`,
  fontSize: vars.typography.fontSize[13],
  lineHeight: vars.typography.lineHeight[18],
});

const medium = style({
  padding: `${vars.spacing[6]} ${vars.spacing[12]}`,
  fontSize: vars.typography.fontSize[14],
  lineHeight: vars.typography.lineHeight[19],
});

const large = style({
  padding: `${vars.spacing[6]} ${vars.spacing[12]}`,
  fontSize: vars.typography.fontSize[15],
  lineHeight: vars.typography.lineHeight[20],
});

export const sizeStyle = {
  s: small,
  m: medium,
  l: large,
};

/**
 * state 스타일
 */
const basic = style({
  color: vars.color.$palette.ui.primaryNormal,
  backgroundColor: vars.color.$palette.blue[100],
});

const outlinePrimary = style({
  border: `0.0625rem solid ${vars.color.$palette.blue[100]}`,
  color: vars.color.$palette.ui.primaryNormal,
});

const outlineSecondary = style({
  border: `0.0625rem solid ${vars.color.$palette.neutral[200]}`,
  color: vars.color.$palette.text.normal,
});

const activePrimary = style({
  color: vars.color.$absolute.lighten[950],
  backgroundColor: vars.color.$palette.ui.primaryNormal,
});

const activeSecondary = style({
  border: `0.0625rem solid ${vars.color.$palette.ui.primaryNormal}`,
  color: vars.color.$palette.ui.primaryNormal,
  backgroundColor: vars.color.$palette.blue[100],
});

const disabled = style({
  color: vars.color.$palette.slate[200],
  backgroundColor: vars.color.$palette.slate[50],
});

export const stateStyle = {
  default: basic,
  outlinePrimary: outlinePrimary,
  outlineSecondary: outlineSecondary,
  activePrimary: activePrimary,
  activeSecondary: activeSecondary,
  disabled: disabled,
};
