import { vars } from '@minuk-hwang-design-system/style-tokens';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { borderSprinkles } from '../../style/border/sprinkles.css';
import { colorSprinkles } from '../../style/color/sprinkles.css';
import { layoutSprinkles } from '../../style/layout/sprinkles.css';
import { shadowSprinkles } from '../../style/shadow/sprinkles.css';
import { spacingSprinkles } from '../../style/spacing/sprinkles.css';

export const infoButtonRecipe = recipe({
  base: [
    borderSprinkles({ borderRadius: 'ml' }),
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
          backgroundColor: 'pink500',
        }),
        {
          selectors: {
            '&:hover': {
              backgroundColor: vars.color.$palette.pink[400],
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
