import { vars } from '@minuk-hwang-design-system/style-tokens';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

const { border } = vars.color.$semantic;

/**
 * One-sided and all-round borders.
 *
 * This recipe is where directional border colours live now. They used to be
 * sprinkles props, which meant generating a class for every palette value on
 * each of four sides — more classes than the rest of the system combined, to
 * serve callers that only ever wanted a divider.
 *
 * Colour comes from the semantic layer rather than a raw step, so retuning what
 * "a divider" looks like is a one-line change here rather than a search across
 * every component.
 */
export const borderRecipe = recipe({
  variants: {
    borderType: {
      border: {
        borderColor: border.subtle,
        borderStyle: 'solid',
        borderWidth: vars.spacing[1],
      },
      borderTop: {
        borderTopColor: border.subtle,
        borderTopStyle: 'solid',
        borderTopWidth: vars.spacing[1],
      },
      borderBottom: {
        borderBottomColor: border.subtle,
        borderBottomStyle: 'solid',
        borderBottomWidth: vars.spacing[1],
      },
      borderLeft: {
        borderLeftColor: border.subtle,
        borderLeftStyle: 'solid',
        borderLeftWidth: vars.spacing[1],
      },
      borderRight: {
        borderRightColor: border.subtle,
        borderRightStyle: 'solid',
        borderRightWidth: vars.spacing[1],
      },
    },
  },
});

export type BorderVariants = NonNullable<RecipeVariants<typeof borderRecipe>>;
