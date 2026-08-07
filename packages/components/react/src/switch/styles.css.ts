import { vars } from '@minuk-hwang-design-system/style-tokens';
import { style } from '@vanilla-extract/css';

const { accent, border, surface } = vars.color.$semantic;
const { opacity } = vars.color.$absolute;

/**
 * A switch takes effect immediately; a checkbox waits for a submit.
 *
 * That is the whole distinction, and it is why the two look nothing alike — the
 * track reads as a physical control that has been moved, not a box that has been
 * ticked. Putting a switch in a form with a Save button is the usual misuse.
 */
export const root = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  flex: 'none',
  width: '44px',
  height: '24px',
  padding: 0,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'transparent',
  borderRadius: vars.borderRadius.full,
  backgroundColor: border.strong,
  cursor: 'pointer',
  transitionProperty: 'background-color',
  transitionDuration: vars.motion.duration[150],
  transitionTimingFunction: vars.motion.easing.standard,

  selectors: {
    '&[data-state="checked"]': { backgroundColor: accent.normal },
    '&:focus-visible': {
      outline: `2px solid ${border.focus}`,
      outlineOffset: '2px',
    },
    '&[data-disabled]': {
      cursor: 'not-allowed',
      opacity: opacity.disabledContainer,
    },
  },
});

/**
 * `translateX` rather than a changing offset, so the browser can move the knob
 * on the compositor. Animating `left` would lay the whole track out every frame.
 */
export const thumb = style({
  display: 'block',
  width: '20px',
  height: '20px',
  borderRadius: vars.borderRadius.full,
  backgroundColor: surface.canvas,
  boxShadow: vars.shadow.xs,
  transform: 'translateX(2px)',
  transitionProperty: 'transform',
  transitionDuration: vars.motion.duration[150],
  transitionTimingFunction: vars.motion.easing.standard,
  willChange: 'transform',
  selectors: {
    '&[data-state="checked"]': { transform: 'translateX(22px)' },
  },
});

export const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing[10],
});
