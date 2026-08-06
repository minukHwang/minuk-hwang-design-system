import { vars } from '@minuk-hwang-design-system/style-tokens';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { borderSprinkles } from '@minuk-hwang-design-system/styles/border';
import { colorSprinkles } from '@minuk-hwang-design-system/styles/color';
import { layoutSprinkles } from '@minuk-hwang-design-system/styles/layout';
import { shadowSprinkles } from '@minuk-hwang-design-system/styles/shadow';
import { spacingSprinkles } from '@minuk-hwang-design-system/styles/spacing';

export const infoButtonRecipe = recipe({
  base: [
    borderSprinkles({ borderRadius: 12 }),
    shadowSprinkles({ boxShadow: 's' }),
    layoutSprinkles({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    }),
    { position: 'relative' },
  ],
  variants: {
    size: {
      s: [spacingSprinkles({ padding: 6 }), { width: '96px', height: '96px' }],
      m: [spacingSprinkles({ paddingX: 16, paddingY: 10, gap: 18 }), { height: '128px' }],
    },
    variant: {
      default: [
        colorSprinkles({
          backgroundColor: 'backgroundElevatedPrimary',
        }),
        {
          selectors: {
            '&:hover': {
              backgroundColor: vars.color.$palette.background.elevatedSecondary,
            },
          },
        },
      ],
      danger: [
        colorSprinkles({
          backgroundColor: 'crimson500',
        }),
        {
          selectors: {
            '&:hover': {
              backgroundColor: vars.color.$palette.crimson[400],
            },
          },
        },
      ],
      warning: [
        colorSprinkles({
          backgroundColor: 'blue500',
        }),
        {
          selectors: {
            '&:hover': {
              backgroundColor: vars.color.$palette.blue[400],
            },
          },
        },
      ],
      ghost: {},
    },
  },
  defaultVariants: {
    size: 's',
    variant: 'default',
  },
});

export type InfoButtonVariants = RecipeVariants<typeof infoButtonRecipe>;
