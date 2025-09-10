import { style } from '@vanilla-extract/css';
import { colorSprinkles } from '../../style/color/sprinkles.css';

export const commonStyle = style({
  cursor: 'pointer',
});

export const stateStyle = {
  default: style([colorSprinkles({ color: 'textAssistive' })]),
  active: style([colorSprinkles({ color: 'textNormal' })]),
};
