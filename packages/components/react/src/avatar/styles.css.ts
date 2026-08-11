import { vars } from '@minuk-hwang-design-system/style-tokens';
import { style, styleVariants } from '@vanilla-extract/css';

const { surface, textColor } = vars.color.$semantic;

export const root = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 'none',
  /*
   * `half` rather than a pill, so the avatar follows the radius dial instead of
   * standing outside it. A percentage is what makes that work across five sizes:
   * 50% is a circle on a 24px avatar and on a 64px one alike, where a pixel step
   * large enough to round the 64px would be past the 24px's clamp on the way.
   *
   * The factor carries it down the ladder — a rounded square at `small`, a
   * square at `none` — and back up, since 75% at `large` is clamped to the same
   * circle `medium` draws.
   */
  borderRadius: vars.borderRadius.half,
  backgroundColor: surface.default,
  // The image is clipped by the root, so nothing square can escape it.
  overflow: 'hidden',
  userSelect: 'none',
});

export const size = styleVariants({
  xs: { width: '24px', height: '24px' },
  s: { width: '32px', height: '32px' },
  m: { width: '40px', height: '40px' },
  l: { width: '48px', height: '48px' },
  xl: { width: '64px', height: '64px' },
});

export type AvatarSize = keyof typeof size;

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const fallback = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  color: textColor.assistive,
  fontWeight: vars.typography.fontWeight[600],
  // Initials read as a shape rather than a word at this size, and the extra
  // tracking is what stops two letters from touching.
  letterSpacing: '0.02em',
});

/** Scaled with the avatar, so initials fill the circle the same way at any size. */
export const fallbackText = styleVariants({
  xs: { fontSize: vars.typography.fontSize[12] },
  s: { fontSize: vars.typography.fontSize[13] },
  m: { fontSize: vars.typography.fontSize[14] },
  l: { fontSize: vars.typography.fontSize[16] },
  xl: { fontSize: vars.typography.fontSize[20] },
});
