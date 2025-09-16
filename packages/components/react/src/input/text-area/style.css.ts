import { vars } from '@minuk-hwang-design-system/style-tokens';
import { style } from '@vanilla-extract/css';

export const inputStyle = style({
  width: '100%',
  selectors: {
    '&::placeholder': {
      color: vars.color.$palette.gray[200],
    },
  },
});
