import { vars } from '@minuk-hwang-design-system/style-tokens';
import { style } from '@vanilla-extract/css';

const { accent, border, surface } = vars.color.$semantic;
const { opacity } = vars.color.$absolute;

/**
 * A switch takes effect immediately; a checkbox waits for a submit.
 *
 * That is the whole distinction, and it is why the two look nothing alike: the
 * track reads as a physical control that has been moved, not a box that has been
 * ticked. Putting a switch in a form with a Save button is the usual misuse.
 *
 * ---
 *
 * The inset is padding, not a transparent border. It was a 1px border, and with
 * `box-sizing: border-box` that turned the 44×24 track into a 42×22 box while the
 * thumb was still positioned as if it were 44×24. The gaps came out at 2px on the
 * left, 1px top and bottom, and nothing at all on the right once it was on.
 *
 * Padding of 2px leaves exactly 40×20 for a 20px thumb: an even 2px all the way
 * round, and a travel of 20px that needs no arithmetic to check.
 */
export const root = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  flex: 'none',
  width: '44px',
  height: '24px',
  padding: '2px',
  border: 'none',
  /*
   * Step 12 rather than a pill, so the track follows the radius dial. The two
   * agree at the default and above: the track is 24px tall, a browser holds
   * `border-radius` to half the box, and 12 × 1 is already that half — so
   * `medium` and everything rounder draw the pill the pill token drew, and only
   * `small` and `none` differ, which is the point of asking for them.
   */
  borderRadius: vars.borderRadius[12],
  // Off is a filled track rather than an outlined one, so the two states differ
  // by colour alone and the control never changes shape. `strong` rather than
  // `normal` because the white thumb has to read against it.
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
  /*
   * The track's radius less the 2px it is inset by, so the two curves are
   * concentric at every setting rather than only where both are round. At
   * `small` that is a 6px track around a 4px thumb; taking `half` of the thumb
   * instead would put 5px inside 6px and read as a thumb slightly too round for
   * its slot.
   *
   * `max` guards the bottom: at `none` the track is 0 and the subtraction goes
   * negative, which is not a radius.
   */
  borderRadius: `max(0px, calc(${vars.borderRadius[12]} - 2px))`,
  backgroundColor: surface.canvas,
  boxShadow: vars.shadow.xs,
  transform: 'translateX(0)',
  transitionProperty: 'transform',
  transitionDuration: vars.motion.duration[150],
  transitionTimingFunction: vars.motion.easing.standard,
  willChange: 'transform',
  selectors: {
    '&[data-state="checked"]': { transform: 'translateX(20px)' },
  },
});

export const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing[10],
});
