import { vars, textMetrics } from '@minuk-hwang-design-system/style-tokens';
import { keyframes, style } from '@vanilla-extract/css';

import { pressable } from '../shared/press.css';
import { hoverLayer } from '../shared/state';

const { border, textColor } = vars.color.$semantic;
const { opacity } = vars.color.$absolute;

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

export const trigger = style([
  pressable,
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: vars.spacing[12],
    width: '100%',
    padding: `${vars.spacing[16]} ${vars.spacing[4]}`,
    border: 'none',
    color: textColor.normal,
    backgroundColor: 'transparent',
    ...textMetrics(16),
    fontFamily: 'inherit',
    fontWeight: vars.typography.fontWeight[600],
    textAlign: 'left',
    cursor: 'pointer',
    selectors: {
      '&:hover:not([data-disabled])': { backgroundImage: hoverLayer },
      '&:focus-visible': {
        outline: `2px solid ${border.focus}`,
        outlineOffset: '-2px',
        borderRadius: vars.borderRadius[4],
      },
      '&[data-disabled]': { cursor: 'not-allowed', opacity: opacity.disabledContent },
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
  padding: `0 ${vars.spacing[4]} ${vars.spacing[16]}`,
  color: textColor.assistive,
  ...textMetrics(15, 'reading'),
});
