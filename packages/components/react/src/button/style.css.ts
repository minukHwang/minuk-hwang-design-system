import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '@minuk-hwang-design-system/style-tokens';
import { borderSprinkles } from '../../src/style/border/sprinkles.css';
import { colorSprinkles } from '../../src/style/color/sprinkles.css';
import { spacingSprinkles } from '../../src/style/spacing/sprinkles.css';

export const buttonRecipe = recipe({
  base: [
    {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      borderRadius: vars.radius.borderRadius.base,
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
      tertiary: colorSprinkles({ color: 'blueGray500' }),
    },
    design: {
      fill: [
        {
          selectors: {
            '&:hover': {
              backgroundColor: vars.color.$palette.blue[700],
            },
            '&:disabled': {
              backgroundColor: vars.color.$palette.blueGray[500],
              cursor: 'not-allowed',
              opacity: 0.5,
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
              borderColor: vars.color.$palette.blueGray[500],
              color: vars.color.$palette.blueGray[500],
              cursor: 'not-allowed',
              opacity: 0.5,
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
        colorSprinkles({ color: 'white', backgroundColor: 'uiPrimaryNormal' }),
        {
          selectors: {
            '&:hover': {
              color: vars.color.$static.light.color.white,
              backgroundColor: vars.color.$palette.blue[700],
            },
            '&:disabled': {
              color: vars.color.$palette.blueGray[200],
              backgroundColor: vars.color.$palette.blueGray[50],
              opacity: 0.1,
              cursor: 'not-allowed',
            },
          },
        },
      ],
    },
    {
      variants: { variant: 'primary', design: 'outline' },
      style: [
        colorSprinkles({ color: 'uiPrimaryNormal' }),
        borderSprinkles({ borderColor: 'uiPrimaryNormal' }),
        {
          selectors: {
            '&:hover': {
              border: `0.0625rem solid ${vars.color.$palette.blue[700]}`,
            },
            '&:disabled': {
              border: `0.0625rem solid ${vars.color.$palette.ui.primaryNormal}`,
              opacity: 0.1,
              cursor: 'not-allowed',
            },
          },
        },
      ],
    },
    {
      variants: { variant: 'secondary', design: 'fill' },
      style: [
        colorSprinkles({
          color: 'white',
          backgroundColor: 'blueGray500',
        }),
        {
          selectors: {
            '&:hover': {
              color: vars.color.$static.light.color.white,
              backgroundColor: vars.color.$palette.blueGray[600],
            },
            '&:disabled': {
              color: vars.color.$static.light.color.white,
              backgroundColor: vars.color.$palette.blueGray[500],
              opacity: 0.1,
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
        borderSprinkles({ borderColor: 'gray200' }),
        {
          selectors: {
            '&:hover': {
              color: vars.color.$palette.text.normal,
              backgroundColor: vars.color.$palette.gray[100],
              border: `0.0625rem solid ${vars.color.$palette.gray[200]}`,
            },
            '&:disabled': {
              color: vars.color.$palette.text.normal,
              border: `0.0625rem solid ${vars.color.$palette.gray[200]}`,
              opacity: 0.1,
              cursor: 'not-allowed',
            },
          },
        },
      ],
    },
    {
      variants: { variant: 'tertiary' },
      style: [
        colorSprinkles({ color: 'blueGray500' }),
        {
          selectors: {
            '&:hover': {
              color: vars.color.$palette.blueGray[500],
              backgroundColor: vars.color.$palette.blueGray[50],
            },
            '&:disabled': {
              color: vars.color.$palette.blueGray[500],
              backgroundColor: vars.color.$palette.blueGray[500],
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
