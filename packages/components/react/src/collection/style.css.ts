import { style } from '@vanilla-extract/css';
import { vars } from '@minuk-hwang-design-system/style-tokens';

export const sizeStyle = {
  s: style({
    display: 'flex',
    flexDirection: 'column',
    width: '96px',
    color: vars.color.$palette.text.normal,
    gap: vars.spacing.spacing[12],
  }),
  m: style({
    display: 'flex',
    flexDirection: 'column',
    width: '182px',
    color: vars.color.$palette.text.normal,
    gap: vars.spacing.spacing[12],
  }),
};

export const infoStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.spacing[4],
});
