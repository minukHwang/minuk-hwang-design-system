import { vars } from '@minuk-hwang-design-system/style-tokens';
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

const spacingProperties = defineProperties({
  properties: {
    marginTop: vars.spacing,
    marginRight: vars.spacing,
    marginBottom: vars.spacing,
    marginLeft: vars.spacing,
    paddingTop: vars.spacing,
    paddingRight: vars.spacing,
    paddingBottom: vars.spacing,
    paddingLeft: vars.spacing,
    gap: vars.spacing,
    rowGap: vars.spacing,
    columnGap: vars.spacing,
  },
  shorthands: {
    margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
    padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
  },
});

export const spacingSprinkles = createSprinkles(spacingProperties);

export type SpacingSprinkles = Parameters<typeof spacingSprinkles>[0];
