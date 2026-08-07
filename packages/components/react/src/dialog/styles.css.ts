import { vars } from '@minuk-hwang-design-system/style-tokens';
import { keyframes, style, styleVariants } from '@vanilla-extract/css';

const { surface, border } = vars.color.$semantic;

/**
 * Rises 8px as it appears rather than scaling from the centre.
 *
 * A dialog is a sheet arriving from somewhere, and a scale makes it look like it
 * is being inflated. Popovers scale because they belong to the trigger they grew
 * from; this one does not belong to anything on the page.
 */
const contentIn = keyframes({
  from: { opacity: 0, transform: 'translate(-50%, calc(-50% + 8px))' },
  to: { opacity: 1, transform: 'translate(-50%, -50%)' },
});

const contentOut = keyframes({
  from: { opacity: 1, transform: 'translate(-50%, -50%)' },
  to: { opacity: 0, transform: 'translate(-50%, calc(-50% + 4px))' },
});

export const content = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  width: 'calc(100vw - 32px)',
  // Never taller than the viewport, and the body scrolls rather than the page —
  // a dialog whose actions have scrolled off screen has no way out.
  maxHeight: 'calc(100vh - 64px)',
  borderRadius: vars.borderRadius[16],
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: border.normal,
  backgroundColor: surface.canvas,
  boxShadow: vars.shadow.l,
  outline: 'none',
  selectors: {
    '&[data-state="open"]': {
      animationName: contentIn,
      animationDuration: vars.motion.duration[200],
      animationTimingFunction: vars.motion.easing.entrance,
    },
    '&[data-state="closed"]': {
      animationName: contentOut,
      animationDuration: vars.motion.duration[150],
      animationTimingFunction: vars.motion.easing.exit,
    },
  },
});

export const size = styleVariants({
  s: { maxWidth: '400px' },
  m: { maxWidth: '520px' },
  l: { maxWidth: '720px' },
});

export type DialogSize = keyof typeof size;

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[6],
  padding: `${vars.spacing[24]} ${vars.spacing[24]} ${vars.spacing[16]}`,
  // Room for the close button, so a long title does not run under it.
  paddingRight: vars.spacing[48],
});

export const body = style({
  padding: `0 ${vars.spacing[24]}`,
  overflowY: 'auto',
});

export const footer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: vars.spacing[8],
  padding: `${vars.spacing[20]} ${vars.spacing[24]} ${vars.spacing[24]}`,
});

export const close = style({
  position: 'absolute',
  top: vars.spacing[16],
  right: vars.spacing[16],
});
