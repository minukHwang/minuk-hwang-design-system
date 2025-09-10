import { style } from '@vanilla-extract/css';
import { vars } from '@minuk-hwang-design-system/style-tokens';

export const headlineStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  paddingLeft: vars.spacing.spacing[16],
  paddingRight: vars.spacing.spacing[4],
  color: vars.color.$palette.text.normal,
  textAlign: 'center',
});

export const iconStyle = style({
  color: vars.color.$palette.text.assistive,
});

export const headlineSubStyle = style({
  display: 'flex',
  alignItems: 'center',
  padding: vars.spacing.spacing[12],
  gap: vars.spacing.spacing[4],
});
