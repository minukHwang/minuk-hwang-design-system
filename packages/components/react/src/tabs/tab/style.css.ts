import { colorSprinkles } from '@minuk-hwang-design-system/styles/color';
import { style } from '@vanilla-extract/css';

export const commonStyle = style({
  cursor: 'pointer',
});

export const stateStyle = {
  default: style([colorSprinkles({ color: 'textAssistive' })]),
  active: style([colorSprinkles({ color: 'textNormal' })]),
};
