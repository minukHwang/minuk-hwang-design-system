import { vars, textMetrics } from '@minuk-hwang-design-system/style-tokens';
import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { hoverLayer, restLayer } from '../shared/state';

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
    /*
     * Step 24 rather than the pill token, so the chip has more than two shapes.
     *
     * On the pill it was a pill at four of the dial's five positions and a square
     * at the fifth — `none` or nothing. A chip is 28 to 34px tall, so 24 clamps to
     * a pill from `medium` up: the default stays exactly the pill it was, and
     * `small` gains a rounded rectangle of its own.
     *
     * Three shapes out of five is the ceiling for a control this short, since
     * 24 × 1.5 is long past half of 34. A control this size cannot use the whole
     * ladder, which is the argument against a `radius` prop that would offer five
     * values and deliver three.
     */
    borderRadius: vars.borderRadius[24],
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: border.normal,
    color: textColor.normal,
    backgroundColor: surface.raised,
    backgroundImage: restLayer,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transitionProperty: 'background-image, background-color, border-color, color',
    transitionDuration: vars.motion.duration[70],
    transitionTimingFunction: vars.motion.easing.standard,

    selectors: {
      '&:hover:not(:disabled)': { backgroundImage: hoverLayer },
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
        ...textMetrics(13),
      },
      m: {
        padding: `${vars.spacing[6]} ${vars.spacing[12]}`,
        ...textMetrics(14),
      },
      l: {
        padding: `${vars.spacing[6]} ${vars.spacing[12]}`,
        ...textMetrics(15),
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
  /*
   * The glyph is 14px on a small chip and the box around it was the same, which
   * is a 14×14 target. WCAG 2.2 asks for 24×24, and the exception for targets
   * with clearance does not apply — this one is inside another target.
   *
   * The hit area is a pseudo-element rather than padding, because padding here
   * would make the chip taller to hold it: a small chip is 28px, and 24px of
   * target plus the chip's own 4px of vertical padding does not fit inside that.
   * An overlay takes the same 24px without asking the layout for any of it.
   */
  position: 'relative',
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
    '&::after': {
      content: '',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '24px',
      height: '24px',
    },
    '&:hover': { opacity: 1 },
    '&:focus-visible': {
      outline: `2px solid ${border.focus}`,
      outlineOffset: '1px',
      opacity: 1,
    },
  },
});
