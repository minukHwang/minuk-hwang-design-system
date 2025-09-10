import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';
import { vars } from '@minuk-hwang-design-system/style-tokens';
import { palette } from '../color/sprinkles.css';

const borderProperties = defineProperties({
  properties: {
    // 일반 border 속성
    borderColor: palette,
    borderRadius: vars.radius.borderRadius,
    borderStyle: ['none', 'solid', 'dashed', 'dotted', 'double'],
    borderWidth: vars.spacing.spacing,

    // 방향별 border 색상
    borderBottomColor: palette,
    borderLeftColor: palette,
    borderRightColor: palette,
    borderTopColor: palette,

    // 방향별 border 스타일
    borderBottomStyle: ['none', 'solid', 'dashed', 'dotted', 'double'],
    borderLeftStyle: ['none', 'solid', 'dashed', 'dotted', 'double'],
    borderRightStyle: ['none', 'solid', 'dashed', 'dotted', 'double'],
    borderTopStyle: ['none', 'solid', 'dashed', 'dotted', 'double'],

    // 방향별 border 너비
    borderBottomWidth: vars.spacing.spacing,
    borderLeftWidth: vars.spacing.spacing,
    borderRightWidth: vars.spacing.spacing,
    borderTopWidth: vars.spacing.spacing,
  },
});

export const borderSprinkles = createSprinkles(borderProperties);

export type BorderSprinkles = Parameters<typeof borderSprinkles>[0];
