import { vars } from '@minuk-hwang-design-system/style-tokens';
import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

const { accent, surface, border, textColor } = vars.color.$semantic;
const { opacity } = vars.color.$absolute;

/**
 * Pill-shaped control: filters, tags, toggles.
 *
 * Selection is expressed through `aria-pressed` rather than a variant prop.
 * Toggling is what a chip is for, and driving the appearance from the attribute
 * that announces it means a chip cannot look selected while telling a screen
 * reader it is not.
 */
export const chipRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: vars.spacing[4],
    borderRadius: vars.borderRadius.full,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: border.normal,
    color: textColor.normal,
    backgroundColor: surface.canvas,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transitionProperty: 'background-color, border-color, color',
    transitionDuration: vars.motion.duration[70],
    transitionTimingFunction: vars.motion.easing.standard,

    selectors: {
      '&:hover:not(:disabled)': { backgroundColor: surface.hover },
      '&:focus-visible': {
        outline: `2px solid ${border.focus}`,
        outlineOffset: '2px',
      },
      '&[aria-pressed="true"]': {
        color: accent.strong,
        backgroundColor: accent.surface,
        borderColor: accent.normal,
      },
      '&[aria-pressed="true"]:hover:not(:disabled)': { backgroundColor: accent.subtle },
      '&:disabled': {
        cursor: 'not-allowed',
        opacity: opacity.disabledContainer,
      },
    },
  },

  variants: {
    size: {
      s: {
        padding: `${vars.spacing[4]} ${vars.spacing[8]}`,
        fontSize: vars.typography.fontSize[13],
        lineHeight: vars.typography.lineHeight[18],
      },
      m: {
        padding: `${vars.spacing[6]} ${vars.spacing[12]}`,
        fontSize: vars.typography.fontSize[14],
        lineHeight: vars.typography.lineHeight[19],
      },
      l: {
        padding: `${vars.spacing[6]} ${vars.spacing[12]}`,
        fontSize: vars.typography.fontSize[15],
        lineHeight: vars.typography.lineHeight[20],
      },
    },
  },

  defaultVariants: { size: 'm' },
});

export type ChipVariants = RecipeVariants<typeof chipRecipe>;

/**
 * Remove control, nested inside a chip.
 *
 * A separate focusable button rather than a click target on the chip itself:
 * "remove this filter" and "toggle this filter" are different actions, and a
 * keyboard user needs to reach both.
 */
export const remove = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: `calc(-1 * ${vars.spacing[2]})`,
  padding: 0,
  border: 'none',
  borderRadius: vars.borderRadius.full,
  color: 'inherit',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  opacity: 0.7,
  selectors: {
    '&:hover': { opacity: 1 },
    '&:focus-visible': {
      outline: `2px solid ${border.focus}`,
      outlineOffset: '1px',
      opacity: 1,
    },
  },
});
