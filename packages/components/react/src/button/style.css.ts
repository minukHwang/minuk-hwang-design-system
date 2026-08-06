import { vars } from '@minuk-hwang-design-system/style-tokens';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { borderSprinkles } from '@minuk-hwang-design-system/styles/border';
import { colorSprinkles } from '@minuk-hwang-design-system/styles/color';
import { spacingSprinkles } from '@minuk-hwang-design-system/styles/spacing';

export const buttonRecipe = recipe({
  base: [
    {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      borderRadius: vars.borderRadius[8],
      textAlign: 'center',
      cursor: 'pointer',
    },
    spacingSprinkles({ columnGap: 4 }),
  ],

  variants: {
    size: {
      s: [spacingSprinkles({ paddingY: 2, paddingX: 8 }), { height: '2.5rem' }],
      m: [spacingSprinkles({ paddingY: 6, paddingX: 12 }), { height: '3rem' }],
      l: [spacingSprinkles({ paddingY: 10, paddingX: 16 }), { height: '3.5rem' }],
    },
    variant: {
      primary: colorSprinkles({ color: 'white' }),
      secondary: colorSprinkles({ color: 'white' }),
      tertiary: colorSprinkles({ color: 'slate500' }),
    },
    design: {
      fill: [
        {
          selectors: {
            '&:hover': {
              backgroundColor: vars.color.$palette.blue[700],
            },
            '&:disabled': {
              backgroundColor: vars.color.$palette.slate[500],
              cursor: 'not-allowed',
              opacity: vars.color.$absolute.opacity.disabledContent,
            },
          },
        },
      ],
      outline: [
        borderSprinkles({
          borderWidth: 1,
          borderStyle: 'solid',
        }),
        {
          selectors: {
            '&:hover': {
              color: vars.color.$palette.blue[700],
              border: `0.0625rem solid ${vars.color.$palette.blue[700]}`,
            },
            '&:disabled': {
              borderColor: vars.color.$palette.slate[500],
              color: vars.color.$palette.slate[500],
              cursor: 'not-allowed',
              opacity: vars.color.$absolute.opacity.disabledContent,
            },
          },
        },
      ],
    },
  },

  compoundVariants: [
    {
      variants: { variant: 'primary', design: 'fill' },
      style: [
        colorSprinkles({ color: 'white', backgroundColor: 'accentNormal' }),
        {
          selectors: {
            '&:hover': {
              color: vars.color.$absolute.color.white,
              backgroundColor: vars.color.$palette.blue[700],
            },
            '&:disabled': {
              color: vars.color.$palette.slate[200],
              backgroundColor: vars.color.$palette.slate[50],
              opacity: vars.color.$absolute.opacity.disabledContainer,
              cursor: 'not-allowed',
            },
          },
        },
      ],
    },
    {
      variants: { variant: 'primary', design: 'outline' },
      style: [
        colorSprinkles({ color: 'accentNormal' }),
        borderSprinkles({ borderColor: 'accentNormal' }),
        {
          selectors: {
            '&:hover': {
              border: `0.0625rem solid ${vars.color.$palette.blue[700]}`,
            },
            '&:disabled': {
              border: `0.0625rem solid ${vars.color.$semantic.accent.normal}`,
              opacity: vars.color.$absolute.opacity.disabledContainer,
              cursor: 'not-allowed',
            },
          },
        },
      ],
    },
    {
      variants: { variant: 'secondary', design: 'fill' },
      style: [
        // slate-500 with white text measured 4.41:1, just under the 4.5:1 floor,
        // and only cleared it on hover. The resting state has to pass on its own,
        // so the whole ramp moved one step darker: 600 rests at 6.54:1.
        colorSprinkles({
          color: 'white',
          backgroundColor: 'slate600',
        }),
        {
          selectors: {
            '&:hover': {
              color: vars.color.$absolute.color.white,
              backgroundColor: vars.color.$palette.slate[700],
            },
            '&:disabled': {
              color: vars.color.$absolute.color.white,
              backgroundColor: vars.color.$palette.slate[600],
              opacity: vars.color.$absolute.opacity.disabledContainer,
              cursor: 'not-allowed',
            },
          },
        },
      ],
    },
    {
      variants: { variant: 'secondary', design: 'outline' },
      style: [
        colorSprinkles({ color: 'textNormal' }),
        borderSprinkles({ borderColor: 'neutral200' }),
        {
          selectors: {
            '&:hover': {
              color: vars.color.$palette.text.normal,
              backgroundColor: vars.color.$palette.neutral[100],
              border: `0.0625rem solid ${vars.color.$palette.neutral[200]}`,
            },
            '&:disabled': {
              color: vars.color.$palette.text.normal,
              border: `0.0625rem solid ${vars.color.$palette.neutral[200]}`,
              opacity: vars.color.$absolute.opacity.disabledContainer,
              cursor: 'not-allowed',
            },
          },
        },
      ],
    },
    {
      variants: { variant: 'tertiary' },
      style: [
        colorSprinkles({ color: 'slate500' }),
        {
          selectors: {
            '&:hover': {
              color: vars.color.$palette.slate[500],
              backgroundColor: vars.color.$palette.slate[50],
            },
            '&:disabled': {
              color: vars.color.$palette.slate[500],
              backgroundColor: vars.color.$palette.slate[500],
              cursor: 'not-allowed',
            },
          },
        },
      ],
    },
  ],
  defaultVariants: {
    size: 'm',
    variant: 'primary',
    design: 'fill',
  },
});

export type ButtonVariants = RecipeVariants<typeof buttonRecipe>;
