import { vars } from '@minuk-hwang-design-system/style-tokens';
import { keyframes, style } from '@vanilla-extract/css';

const { textColor } = vars.color.$semantic;

/**
 * Inverted rather than panelled.
 *
 * A tooltip is a label floating over content, not a surface sitting on it. The
 * inverse fill separates it from anything underneath without needing a border,
 * and at this size a border would be most of what you see.
 */
const fadeIn = keyframes({
  from: { opacity: 0, transform: 'scale(0.94)' },
  to: { opacity: 1, transform: 'scale(1)' },
});

export const content = style({
  zIndex: vars.zIndex.tooltip,
  maxWidth: '260px',
  padding: `${vars.spacing[6]} ${vars.spacing[10]}`,
  borderRadius: vars.borderRadius[6],
  color: textColor.inverse,
  backgroundColor: textColor.normal,
  fontSize: vars.typography.fontSize[13],
  lineHeight: vars.typography.lineHeight[18],
  boxShadow: vars.shadow.s,
  transformOrigin: 'var(--radix-tooltip-content-transform-origin)',
  selectors: {
    '&[data-state="delayed-open"]': {
      animationName: fadeIn,
      animationDuration: vars.motion.duration[100],
      animationTimingFunction: vars.motion.easing.entrance,
    },
  },
});

export const arrow = style({
  fill: textColor.normal,
});
