import { vars } from '@minuk-hwang-design-system/style-tokens';
import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { colorSprinkles } from '@minuk-hwang-design-system/styles/color';
import { spacingSprinkles } from '@minuk-hwang-design-system/styles/spacing';

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
      // warning and danger both read crimson500 before, which left them
      // indistinguishable. They now resolve to different status scales.
      warning: colorSprinkles({
        color: 'statusWarningStrong',
        backgroundColor: 'statusWarningSurface',
      }),
      danger: colorSprinkles({
        // onNormal records which text colour clears AA on top of `normal`,
        // so this stays legible if the error hue is ever retuned.
        color: 'statusErrorOnNormal',
        backgroundColor: 'statusErrorNormal',
      }),
    },
  },
  defaultVariants: {
    state: 'default',
  },
});

export type StateVariants = RecipeVariants<typeof stateStyle>;
