import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { borderSprinkles } from '@minuk-hwang-design-system/styles/border';
import { colorSprinkles } from '@minuk-hwang-design-system/styles/color';
import { spacingSprinkles } from '@minuk-hwang-design-system/styles/spacing';

export const badgeRecipe = recipe({
  base: [borderSprinkles({ borderRadius: 4 })],
  variants: {
    size: {
      s: spacingSprinkles({ paddingX: 4, paddingY: 2 }),
      m: spacingSprinkles({ paddingX: 4, paddingY: 2 }),
      l: spacingSprinkles({ paddingX: 6, paddingY: 4 }),
    },
    color: {
      blue: colorSprinkles({ backgroundColor: 'blue50' }),
      crimson: colorSprinkles({ backgroundColor: 'crimson50' }),
      orange: colorSprinkles({ backgroundColor: 'orange50' }),
      green: colorSprinkles({ backgroundColor: 'green50' }),
      white: colorSprinkles({ backgroundColor: 'lighten200' }),
      ghost: {},
      ghostWhite: {},
    },
  },
  defaultVariants: {
    size: 'm',
    color: 'blue',
  },
});

export type BadgeVariants = RecipeVariants<typeof badgeRecipe>;
