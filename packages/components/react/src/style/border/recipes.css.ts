import { vars } from '@minuk-hwang-design-system/style-tokens';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

export const borderRecipe = recipe({
  variants: {
    borderType: {
      border: {
        borderColor: vars.color.$palette.gray[50],
        borderStyle: 'solid',
        borderWidth: vars.spacing.spacing[1],
      },
      borderTop: {
        borderTopColor: vars.color.$palette.gray[50],
        borderTopStyle: 'solid',
        borderTopWidth: vars.spacing.spacing[1],
      },
      borderBottom: {
        borderBottomColor: vars.color.$palette.gray[50],
        borderBottomStyle: 'solid',
        borderBottomWidth: vars.spacing.spacing[1],
      },
      borderLeft: {
        borderLeftColor: vars.color.$palette.gray[50],
        borderLeftStyle: 'solid',
        borderLeftWidth: vars.spacing.spacing[1],
      },
      borderRight: {
        borderRightColor: vars.color.$palette.gray[50],
        borderRightStyle: 'solid',
        borderRightWidth: vars.spacing.spacing[1],
      },
    },
  },
});

export type BorderVariants = NonNullable<RecipeVariants<typeof borderRecipe>>;
