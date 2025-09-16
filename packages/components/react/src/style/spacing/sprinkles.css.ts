import { vars } from '@minuk-hwang-design-system/style-tokens';
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

const spacingProperties = defineProperties({
  properties: {
    marginTop: vars.spacing.spacing,
    marginRight: vars.spacing.spacing,
    marginBottom: vars.spacing.spacing,
    marginLeft: vars.spacing.spacing,
    paddingTop: vars.spacing.spacing,
    paddingRight: vars.spacing.spacing,
    paddingBottom: vars.spacing.spacing,
    paddingLeft: vars.spacing.spacing,
    gap: vars.spacing.spacing,
    rowGap: vars.spacing.spacing,
    columnGap: vars.spacing.spacing,
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
