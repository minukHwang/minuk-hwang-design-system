import { vars } from '@minuk-hwang-design-system/style-tokens';
import { style } from '@vanilla-extract/css';

export const labelStyle = style({
  display: 'flex',
  paddingBottom: vars.spacing[8],
  color: vars.color.$palette.text.normal,
  gap: vars.spacing[4],
  fontSize: vars.typography.fontSize[15],
  lineHeight: vars.typography.lineHeight[18],
});

export const starStyle = style({
  color: vars.color.$palette.crimson[500],
});

export const inputStyle = style({
  display: 'flex',
  gap: vars.spacing[10],
  selectors: {
    '&.disabledStyle': {
      // backgroundColor: vars.color.$palette.neutral[50],
    },
    '&.highlightStyle': {},
    '&.warningStyle': {},
  },
});

export const warningStyle = style({
  display: 'flex',
  paddingTop: vars.spacing[6],
  color: vars.color.$palette.crimson[500],
  fontSize: vars.typography.fontSize[13],
  lineHeight: vars.typography.lineHeight[18],
});
