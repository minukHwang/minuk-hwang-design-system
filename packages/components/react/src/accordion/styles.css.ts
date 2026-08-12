import { vars, textMetrics } from '@minuk-hwang-design-system/style-tokens';
import { keyframes, style } from '@vanilla-extract/css';

import { pressable } from '../shared/press.css';
import { hoverLayer } from '../shared/state';

const { border, textColor } = vars.color.$semantic;
const { opacity } = vars;

/**
 * Height animation without knowing the height.
 *
 * `height: auto` cannot be animated, and measuring the panel in JavaScript
 * breaks the moment its contents reflow. Radix measures it for us and publishes
 * the result as a custom property, which is what makes these keyframes possible.
 */
const slideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' },
});

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 },
});

export const item = style({
  borderBottom: `1px solid ${border.subtle}`,
});

/**
 * How far the hovered shape stops short of the row above and below it.
 *
 * Tied to the corner rather than fixed, because the two are the same idea: the
 * inset exists so a rounded shape has somewhere to be rounded against. At
 * `radius="none"` there is no corner to show, the shape is a rectangle again,
 * and pulling it in leaves a gap doing nothing — so `min` takes it to zero and
 * the row goes back to edge-to-edge without a second rule saying so.
 *
 * `min` rather than a comparison, so it also holds at `small`, where the corner
 * is 3px and the inset is still the smaller of the two.
 */
const HOVER_INSET = `min(${vars.spacing[2]}, ${vars.borderRadius[6]})`;

export const trigger = style([
  pressable,
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: vars.spacing[12],
    /*
     * The highlight is inset from the item's edges, and the label is not.
     *
     * A hovered row that runs edge to edge reads as a band across the panel
     * rather than as the row answering the pointer. The margin pulls the shape
     * in on all four sides and the padding gives back exactly what the margin
     * took, so the label does not move and the row does not change height: 8 and
     * 8 where there were 16, 8 and 2 where there were 0 and 10.
     *
     * On the sides it was 4 first, which measured correctly and could not be
     * seen. An inset nobody notices is the same as no inset.
     */
    width: '100%',
    margin: `${HOVER_INSET} 0`,
    padding: `calc(${vars.spacing[16]} - ${HOVER_INSET}) ${vars.spacing[10]}`,
    /*
     * The same corner a menu item takes, and for the same reason: the only time
     * this shape is drawn is when the row is hovered or pressed, and a hard
     * rectangle in a list of rounded surfaces reads as a seam rather than as a
     * highlight.
     *
     * Step 6 rather than a larger one, so it stays a rounded row instead of
     * becoming a pill. It still follows the dial — at `none` it squares off with
     * everything else, and at `full` the step is already past what a 56px row
     * would clamp to, so it does not run away.
     */
    borderRadius: vars.borderRadius[6],
    border: 'none',
    color: textColor.normal,
    backgroundColor: 'transparent',
    ...textMetrics(15),
    fontFamily: 'inherit',
    fontWeight: vars.typography.fontWeight[600],
    textAlign: 'left',
    cursor: 'pointer',
    selectors: {
      '&:hover:not([data-disabled])': { backgroundImage: hoverLayer },
      // The ring follows the shape now, rather than declaring one of its own.
      '&:focus-visible': {
        outline: `2px solid ${border.focus}`,
        outlineOffset: '-2px',
      },
      '&[data-disabled]': { cursor: 'not-allowed', opacity: opacity.disabled },
    },
  },
]);

export const chevron = style({
  flex: 'none',
  color: textColor.assistive,
  transitionProperty: 'transform',
  transitionDuration: vars.motion.duration[200],
  transitionTimingFunction: vars.motion.easing.standard,
  selectors: {
    '[data-state="open"] &': { transform: 'rotate(180deg)' },
  },
});

export const content = style({
  overflow: 'hidden',
  selectors: {
    '&[data-state="open"]': {
      animationName: slideDown,
      animationDuration: vars.motion.duration[200],
      animationTimingFunction: vars.motion.easing.standard,
    },
    '&[data-state="closed"]': {
      animationName: slideUp,
      animationDuration: vars.motion.duration[150],
      animationTimingFunction: vars.motion.easing.exit,
    },
  },
});

/**
 * Padding lives on an inner element rather than on the animated one. Animating a
 * box whose padding is part of its height makes the contents jump at the end of
 * the transition.
 */
export const contentInner = style({
  /*
   * The sides line up with the trigger above, which grew its own padding when it
   * took a corner to round. Left at 4 the answer started six pixels to the left
   * of the question.
   *
   * No gap above: the trigger's own bottom padding sits inside the shape it
   * highlights, so the space is already there.
   */
  padding: `0 ${vars.spacing[10]} ${vars.spacing[16]}`,
  color: textColor.assistive,
  /*
   * A step under the trigger. Both were 15 and 16, near enough that the pair
   * read as one block of text at two weights; a full step apart lets the
   * question and the answer be told apart before either is read.
   */
  ...textMetrics(14, 'reading'),
});
