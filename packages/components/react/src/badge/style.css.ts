import { recipe } from '@vanilla-extract/recipes';
import { borderSprinkles } from '../style/border/sprinkles.css';
import { spacingSprinkles } from '../style/spacing/sprinkles.css';
import { colorSprinkles } from '../style/color/sprinkles.css';
import { RecipeVariants } from '@vanilla-extract/recipes';

export const badgeRecipe = recipe({
  base: [borderSprinkles({ borderRadius: 's' })],
  variants: {
    size: {
      s: spacingSprinkles({ paddingX: 4, paddingY: 2 }),
      m: spacingSprinkles({ paddingX: 4, paddingY: 2 }),
      l: spacingSprinkles({ paddingX: 6, paddingY: 4 }),
    },
    color: {
      blue: colorSprinkles({ backgroundColor: 'blue50' }),
      pink: colorSprinkles({ backgroundColor: 'pink50' }),
      orange: colorSprinkles({ backgroundColor: 'orange50' }),
      green: colorSprinkles({ backgroundColor: 'green50' }),
      white: colorSprinkles({ backgroundColor: 'opacityWhite200' }),
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
