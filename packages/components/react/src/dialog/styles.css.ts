import { vars } from '@minuk-hwang-design-system/style-tokens';
import { globalStyle, keyframes, style, styleVariants } from '@vanilla-extract/css';

const { background } = vars.color.$semantic;

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
  zIndex: vars.zIndex.modal,
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
  backgroundColor: background.overlay,
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

/*
 * A secondary button on a dark dialog, dropped a level.
 *
 * `secondary` is filled with `neutral.surface`, which is step 100. A dialog is
 * the overlay level: the raised step mixed five per cent towards white. In the
 * dark theme that arithmetic lands on the button's own colour — the surface
 * comes out at #2a2a2a and the button is #2b2b2b, one part in 255 apart — so a
 * tonal button on a dialog was a rectangle of text with no button under it.
 *
 * The light theme has no such problem: raised is white there, and the tint is a
 * clear step down from it.
 *
 * `background.raised` rather than a step written out, because that is what the
 * button is being asked to do — sit one level below the surface it is on. It
 * resolves to the same 50 the dialog was mixed from, which is a step down where
 * every other separation in the dark theme is a step up. That is the right
 * direction here: the button is not floating above the dialog, it is cut into
 * it.
 *
 * Written three times because that is how many ways the dark theme can be
 * chosen — the attribute, the class, and the operating system with neither set.
 */
const DARK_DIALOG = ['html[data-theme="dark"]', 'html.dark']
  .map(root => `${root} ${content} [data-variant='secondary']`)
  .join(', ');

globalStyle(DARK_DIALOG, {
  backgroundColor: background.raised,
});

globalStyle(`html:not([data-theme]) ${content} [data-variant='secondary']`, {
  '@media': {
    '(prefers-color-scheme: dark)': { backgroundColor: background.raised },
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
  // The same gap `Card` keeps between its title and description, so the two
  // surfaces set their headings the same way.
  gap: vars.spacing[8],
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
