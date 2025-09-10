import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@minuk-hwang-design-system/style-tokens';

export const commonStyle = style({
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '3rem',
  paddingLeft: vars.spacing.spacing[12],
  paddingRight: vars.spacing.spacing[18],
  borderRadius: vars.radius.borderRadius.base,
  gap: vars.spacing.spacing[8],
  fontSize: vars.typography.fontSize[16],
  lineHeight: vars.typography.lineHeight[21],
});

export const inputStyle = style({
  width: '100%',
  padding: vars.spacing.spacing[6],
  border: 'none',
  textAlign: 'left',
  fontSize: vars.typography.fontSize[16],
  lineHeight: vars.typography.lineHeight[21],
  backgroundColor: vars.color.$palette.background.normalPrimary,
  selectors: {
    '&::placeholder': {
      color: vars.color.$palette.gray[200],
    },
    '&:focus': {
      outline: 'none',
    },
    '&:disabled': {
      backgroundColor: vars.color.$palette.gray[50],
      color: vars.color.$palette.gray[200],
    },
  },
});

export const inputStateStyle = styleVariants({
  default: {},
  highlight: {
    backgroundColor: vars.color.$palette.gray[100],
  },
  warning: {},
  disabled: {},
  readonly: {},
});

export const buttonStyle = style({
  display: 'flex',
  alignItems: 'center',
  padding: '0px',
  border: 'none',
  color: vars.color.$palette.gray[200],
  backgroundColor: 'transparent',
  cursor: 'pointer',
});

/**
 * 공통 div 스타일
 */
const baseDivStyle = style({
  border: `0.0625rem solid ${vars.color.$palette.gray[200]}`,
});

export const divStateStyle = styleVariants({
  default: [
    baseDivStyle,
    {
      color: vars.color.$palette.gray[500],
      backgroundColor: vars.color.$palette.background.normalPrimary,
    },
  ],
  highlight: [
    baseDivStyle,
    {
      color: vars.color.$palette.gray[700],
      backgroundColor: vars.color.$palette.gray[100],
    },
  ],
  warning: [
    baseDivStyle,
    {
      color: vars.color.$palette.pink[700],
      border: `0.0625rem solid ${vars.color.$palette.pink[500]}`,
      backgroundColor: vars.color.$palette.background.normalPrimary,
    },
  ],
  disabled: [
    baseDivStyle,
    {
      color: vars.color.$palette.gray[200],
      backgroundColor: vars.color.$palette.gray[50],
    },
  ],
  readonly: [
    baseDivStyle,
    {
      color: vars.color.$palette.gray[500],
      backgroundColor: vars.color.$palette.background.normalPrimary,
    },
  ],
});

/**
 * span(왼쪽 아이콘) 공통 스타일
 */
export const iconStyle = style({
  color: vars.color.$palette.text.assistive,
});

export const disabledIconStyle = style({
  color: vars.color.$palette.gray[50],
});
