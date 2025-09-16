import { vars } from '@minuk-hwang-design-system/style-tokens';
import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { colorSprinkles } from '../style/color/sprinkles.css';
import { spacingSprinkles } from '../style/spacing/sprinkles.css';

/**
 * 공통 스타일
 */
export const commonStyle = style([
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: vars.radius.borderRadius.base,
    // boxShadow: vars.shadow.shadow.s,
  },
  spacingSprinkles({ paddingY: 16, paddingX: 20, gap: 20 }),
]);

export const stateStyle = recipe({
  base: [commonStyle],
  variants: {
    state: {
      default: colorSprinkles({
        color: 'textNormal',
        backgroundColor: 'backgroundElevatedPrimary',
      }),
      warning: colorSprinkles({
        color: 'pink500',
        backgroundColor: 'backgroundElevatedPrimary',
      }),
      danger: colorSprinkles({
        color: 'white',
        backgroundColor: 'pink500',
      }),
    },
  },
  defaultVariants: {
    state: 'default',
  },
});

export type StateVariants = RecipeVariants<typeof stateStyle>;
