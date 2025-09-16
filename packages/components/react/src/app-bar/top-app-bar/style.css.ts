import { vars } from '@minuk-hwang-design-system/style-tokens';
import { style } from '@vanilla-extract/css';

export const topAppBarStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: `${vars.spacing.spacing[8]} ${vars.spacing.spacing[4]}`,
  color: vars.color.$palette.text.normal,
  backgroundColor: vars.color.$palette.background.normalPrimary,
});

export const leftContentStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.spacing[4],
});

export const textStyle = style({
  fontSize: vars.typography.fontSize[22],
  fontWeight: vars.typography.fontWeight[600],
  lineHeight: vars.typography.lineHeight[28],
});

const iconWrapper = {
  inner: style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: vars.spacing.spacing[24],
    height: vars.spacing.spacing[24],
    padding: vars.spacing.spacing[8],
  }),
  outer: style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: vars.spacing.spacing[48],
    height: vars.spacing.spacing[48],
  }),
};

export const iconWrapperStyle = {
  inner: iconWrapper.inner,
  outer: iconWrapper.outer,
};
