import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { borderSprinkles } from '@minuk-hwang-design-system/styles/border';
import { colorSprinkles } from '@minuk-hwang-design-system/styles/color';

export const messageListRecipe = recipe({
  variants: {
    variant: {
      default: colorSprinkles({ backgroundColor: 'backgroundNormalPrimary' }),
      // These used to point at step 10, which sits within 5/255 of white and so
      // rendered as no tint at all against the page. Step 10 is the canvas, not
      // a wash; the surface role is what these wanted.
      danger: colorSprinkles({ backgroundColor: 'statusErrorSurface' }),
      warning: colorSprinkles({ backgroundColor: 'statusWarningSurface' }),
    },
    mode: {
      default: {},
      round: borderSprinkles({ borderRadius: 12 }),
    },
  },
  defaultVariants: {
    variant: 'default',
  },

  compoundVariants: [
    {
      variants: { variant: 'danger', mode: 'default' },
      style: borderSprinkles({
        borderTopWidth: 1,
        borderTopStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderColor: 'crimson500',
      }),
    },
    {
      variants: { variant: 'danger', mode: 'round' },
      style: borderSprinkles({ borderWidth: 1, borderStyle: 'solid', borderColor: 'crimson500' }),
    },
  ],
});

export type MessageListVariants = RecipeVariants<typeof messageListRecipe>;
