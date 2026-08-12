import { vars, textMetrics } from '@minuk-hwang-design-system/style-tokens';
import { style, styleVariants } from '@vanilla-extract/css';

const { fill, textColor } = vars.color.$semantic;

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
  /*
   * Two steps up the ramp rather than one, because one is already taken.
   *
   * This was `surface.default`, which is exactly what `Card` paints itself — so
   * an avatar in a card header disappeared into it. One step up to
   * `surface.hover` fixes that and moves the same bug rather than removing it:
   * an interactive card hovers to that value, so the avatar would vanish under
   * the pointer instead of at rest.
   *
   * `pressed` is the first step clear of all three. It reads 0.146 in OKLab
   * lightness from the canvas, 0.116 from a card and 0.080 from a hovered one,
   * so the circle is visible on every surface a component in this system paints.
   * The name is about where the step sits on the ramp, not about a state this
   * avatar is in — the same reason `Badge`'s neutral tone reads `hover`.
   */
  backgroundColor: fill.strong,
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
  /*
   * The initials moved with the background they sit on.
   *
   * `assistive` is the grey for text that should recede, and it recedes against
   * a pale surface: on the darker fill above it measures 3.42:1 on light and
   * 3.89:1 on dark, under the 4.5:1 that applies because the `xs` avatar sets
   * these at 12px.
   *
   * `normal` clears it at 10.84:1, and looks like it — near-black initials read
   * as a label shouting next to the name they usually sit beside. `alternative`
   * is the step between, at 6.98:1 on light and 6.58:1 on dark: legible without
   * competing with the title in the same row.
   */
  color: textColor.alternative,
  fontWeight: vars.typography.fontWeight[600],
  // Initials read as a shape rather than a word at this size, and the extra
  // tracking is what stops two letters from touching.
  letterSpacing: '0.02em',
});

/** Scaled with the avatar, so initials fill the circle the same way at any size. */
export const fallbackText = styleVariants({
  xs: textMetrics(12),
  s: textMetrics(13),
  m: textMetrics(14),
  l: textMetrics(16),
  xl: textMetrics(20),
});
