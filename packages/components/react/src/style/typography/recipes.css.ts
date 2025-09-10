import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { vars } from '@minuk-hwang-design-system/style-tokens';

export const typographyRecipe = recipe({
  base: { fontFamily: vars.typography.fontFamily.main },

  variants: {
    textType: {
      display1: {
        fontSize: vars.typography.fontSize[60],
        lineHeight: vars.typography.lineHeight[72],
        fontWeight: vars.typography.fontWeight[400],
      },
      display2: {
        fontSize: vars.typography.fontSize[40],
        lineHeight: vars.typography.lineHeight[48],
        fontWeight: vars.typography.fontWeight[400],
      },
      title1: {
        fontSize: vars.typography.fontSize[34],
        lineHeight: vars.typography.lineHeight[41],
        fontWeight: vars.typography.fontWeight[400],
      },
      title2: {
        fontSize: vars.typography.fontSize[28],
        lineHeight: vars.typography.lineHeight[34],
        fontWeight: vars.typography.fontWeight[400],
      },
      title3: {
        fontSize: vars.typography.fontSize[24],
        lineHeight: vars.typography.lineHeight[30],
        fontWeight: vars.typography.fontWeight[400],
      },
      heading1: {
        fontSize: vars.typography.fontSize[22],
        lineHeight: vars.typography.lineHeight[28],
        fontWeight: vars.typography.fontWeight[400],
      },
      heading2: {
        fontSize: vars.typography.fontSize[20],
        lineHeight: vars.typography.lineHeight[25],
        fontWeight: vars.typography.fontWeight[400],
      },
      headline: {
        fontSize: vars.typography.fontSize[18],
        lineHeight: vars.typography.lineHeight[23],
        fontWeight: vars.typography.fontWeight[400],
      },
      body1: {
        fontSize: vars.typography.fontSize[17],
        lineHeight: vars.typography.lineHeight[22],
        fontWeight: vars.typography.fontWeight[400],
      },
      body2: {
        fontSize: vars.typography.fontSize[16],
        lineHeight: vars.typography.lineHeight[21],
        fontWeight: vars.typography.fontWeight[400],
      },
      body3: {
        fontSize: vars.typography.fontSize[15],
        lineHeight: vars.typography.lineHeight[20],
        fontWeight: vars.typography.fontWeight[400],
      },
      label: {
        fontSize: vars.typography.fontSize[14],
        lineHeight: vars.typography.lineHeight[19],
        fontWeight: vars.typography.fontWeight[400],
      },
      footnote: {
        fontSize: vars.typography.fontSize[13],
        lineHeight: vars.typography.lineHeight[18],
        fontWeight: vars.typography.fontWeight[400],
      },
      caption: {
        fontSize: vars.typography.fontSize[12],
        lineHeight: vars.typography.lineHeight[16],
        fontWeight: vars.typography.fontWeight[400],
      },
    },
    textMode: {
      default: {},
      reading: {},
      bold: {},
    },
    textAlign: {
      left: { textAlign: 'left' },
      center: { textAlign: 'center' },
      right: { textAlign: 'right' },
      justify: { textAlign: 'justify' },
    },
  },

  compoundVariants: [
    {
      variants: { textType: 'body1', textMode: 'reading' },
      style: { lineHeight: vars.typography.lineHeight[28] },
    },
    {
      variants: { textType: 'body2', textMode: 'reading' },
      style: { lineHeight: vars.typography.lineHeight[26] },
    },
    {
      variants: { textType: 'body3', textMode: 'reading' },
      style: { lineHeight: vars.typography.lineHeight[24] },
    },
    {
      variants: { textType: 'label', textMode: 'reading' },
      style: { lineHeight: vars.typography.lineHeight[22] },
    },
    {
      variants: { textType: 'display1', textMode: 'bold' },
      style: { fontWeight: vars.typography.fontWeight[700] },
    },
    {
      variants: { textType: 'display2', textMode: 'bold' },
      style: { fontWeight: vars.typography.fontWeight[700] },
    },
    {
      variants: { textType: 'title1', textMode: 'bold' },
      style: { fontWeight: vars.typography.fontWeight[700] },
    },
    {
      variants: { textType: 'title2', textMode: 'bold' },
      style: { fontWeight: vars.typography.fontWeight[700] },
    },
    {
      variants: { textType: 'title3', textMode: 'bold' },
      style: { fontWeight: vars.typography.fontWeight[700] },
    },
    {
      variants: { textType: 'body1', textMode: 'bold' },
      style: { fontWeight: vars.typography.fontWeight[600] },
    },
    {
      variants: { textType: 'body2', textMode: 'bold' },
      style: { fontWeight: vars.typography.fontWeight[600] },
    },
    {
      variants: { textType: 'body3', textMode: 'bold' },
      style: { fontWeight: vars.typography.fontWeight[600] },
    },
    {
      variants: { textType: 'caption', textMode: 'bold' },
      style: { fontWeight: vars.typography.fontWeight[600] },
    },
    {
      variants: { textType: 'footnote', textMode: 'bold' },
      style: { fontWeight: vars.typography.fontWeight[600] },
    },
    {
      variants: { textType: 'heading1', textMode: 'bold' },
      style: { fontWeight: vars.typography.fontWeight[600] },
    },
    {
      variants: { textType: 'heading2', textMode: 'bold' },
      style: { fontWeight: vars.typography.fontWeight[600] },
    },
    {
      variants: { textType: 'headline', textMode: 'bold' },
      style: { fontWeight: vars.typography.fontWeight[600] },
    },
    {
      variants: { textType: 'label', textMode: 'bold' },
      style: { fontWeight: vars.typography.fontWeight[600] },
    },
  ],
});

export type TypographyVariants = NonNullable<RecipeVariants<typeof typographyRecipe>>;
