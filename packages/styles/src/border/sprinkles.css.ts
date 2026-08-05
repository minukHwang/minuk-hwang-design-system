import { vars } from '@minuk-hwang-design-system/style-tokens';
import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';

import { palette } from '../color/sprinkles.css';

/**
 * Border properties exposed as sprinkles props.
 *
 * `borderColor` is here; `borderTopColor` and its three siblings are not.
 *
 * Sprinkles generates a class per value × property pair, so opening the full
 * palette to four directional colour properties produced more classes than the
 * rest of the system combined — and the one place that used them picked a single
 * grey. Width and style stay per-direction because their value sets are small
 * enough that the multiplication does not matter.
 *
 * A component needing a one-sided coloured border should use a recipe, which is
 * what the border recipe alongside this file already does.
 */
const borderProperties = defineProperties({
  properties: {
    borderColor: palette,
    borderRadius: vars.radius.borderRadius,
    borderStyle: ['none', 'solid', 'dashed', 'dotted', 'double'],
    borderWidth: vars.spacing.spacing,

    borderBottomStyle: ['none', 'solid', 'dashed', 'dotted', 'double'],
    borderLeftStyle: ['none', 'solid', 'dashed', 'dotted', 'double'],
    borderRightStyle: ['none', 'solid', 'dashed', 'dotted', 'double'],
    borderTopStyle: ['none', 'solid', 'dashed', 'dotted', 'double'],

    borderBottomWidth: vars.spacing.spacing,
    borderLeftWidth: vars.spacing.spacing,
    borderRightWidth: vars.spacing.spacing,
    borderTopWidth: vars.spacing.spacing,
  },
});

export const borderSprinkles = createSprinkles(borderProperties);

export type BorderSprinkles = Parameters<typeof borderSprinkles>[0];
