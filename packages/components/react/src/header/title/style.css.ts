import { vars } from '@minuk-hwang-design-system/style-tokens';
import { style } from '@vanilla-extract/css';

import { colorSprinkles } from '@minuk-hwang-design-system/styles/color';

export const titleStyle = style([
  colorSprinkles({
    backgroundColor: 'backgroundNormalPrimary',
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
