import { vars } from '@minuk-hwang-design-system/style-tokens';
import { colorSprinkles } from '@minuk-hwang-design-system/styles/color';
import { style } from '@vanilla-extract/css';

export const titleStyle = style([
  colorSprinkles({
    backgroundColor: 'surfaceCanvas',
  }),
  {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    padding: vars.spacing[16],
    paddingTop: vars.spacing[64],
    borderBottom: `0.0625rem soild ${vars.color.$palette.neutral[100]}`,
  },
]);
