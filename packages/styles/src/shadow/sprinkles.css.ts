import { vars } from '@minuk-hwang-design-system/style-tokens';
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

const shadowProperties = defineProperties({
  properties: {
    boxShadow: vars.shadow.shadow,
  },
});

export const shadowSprinkles = createSprinkles(shadowProperties);

export type ShadowSprinkles = Parameters<typeof shadowSprinkles>[0];
