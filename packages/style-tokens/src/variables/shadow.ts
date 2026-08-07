/**
 * Elevation shadows.
 *
 * Geometry here, colour in the palette. A shadow's offset and blur describe how
 * far something floats above the page, which is a fact about the layout and does
 * not change with the theme. Its colour describes how much it darkens what is
 * behind it, and that depends entirely on what is behind it — 8% black reads
 * clearly on white and is invisible on `#141414`.
 *
 * Splitting them is what makes these work in the dark theme. The values used to
 * be literal `rgba(0, 0, 0, 0.1)`, so a card that floated in the light theme
 * went flat in the dark one, and nothing in the type system noticed.
 *
 * Steps above `xs` are two layers, which is how a shadow reads as cast rather
 * than painted on:
 *
 *   direct    tight, offset further down, negative spread — the key light
 *   ambient   wide and soft, barely offset — everything else in the room
 *
 * Names stay in t-shirt sizes while the rest of the system moved to pixels,
 * because a shadow is four lengths and a colour. There is no single number to
 * key it by, and `shadow[16]` would be naming one of five values arbitrarily.
 */

const AMBIENT = 'var(--shadow-color-ambient)';
const DIRECT = 'var(--shadow-color-direct)';

/*
 * ============================================
 * Ladder
 * ============================================
 */

type Layer = {
  /** Vertical offset in pixels, before direction is applied. */
  y: number;
  blur: number;
  /** Negative spread pulls the shadow in at the sides, so it reads as cast down. */
  spread: number;
  ink: string;
};

/**
 * Elevation, as data rather than as strings.
 *
 * Keeping the numbers apart from their rendering is what lets the same ladder be
 * cast in two directions without a second copy of it — a copy that would be
 * edited once and then diverge.
 */
const LADDER: Record<'xs' | 's' | 'm' | 'l', Layer[]> = {
  /** Resting card. Separation only — barely more than a hairline. */
  xs: [{ y: 1, blur: 2, spread: 0, ink: AMBIENT }],
  /** Raised: a hovered card, a small menu. */
  s: [
    { y: 2, blur: 4, spread: -1, ink: DIRECT },
    { y: 1, blur: 3, spread: 0, ink: AMBIENT },
  ],
  /** Floating: dropdown, popover, tooltip, toast. */
  m: [
    { y: 8, blur: 16, spread: -4, ink: DIRECT },
    { y: 3, blur: 6, spread: -2, ink: AMBIENT },
  ],
  /** Overlay: dialog, drawer, anything with a scrim under it. */
  l: [
    { y: 16, blur: 32, spread: -8, ink: DIRECT },
    { y: 6, blur: 12, spread: -4, ink: AMBIENT },
  ],
};

const cast = (direction: 1 | -1) =>
  Object.fromEntries(
    Object.entries(LADDER).map(([step, layers]) => [
      step,
      layers.map(l => `0 ${l.y * direction}px ${l.blur}px ${l.spread}px ${l.ink}`).join(', '),
    ])
  ) as Record<keyof typeof LADDER, string>;

/*
 * ============================================
 * Export
 * ============================================
 */

/**
 * Down by default, because light comes from above and almost everything casts
 * that way.
 *
 * `up` is the same ladder mirrored, for anything pinned to the bottom edge of
 * the screen — a bottom sheet, a tab bar, a sticky footer. Content passes above
 * those rather than below, so a downward shadow lands on nothing.
 *
 * Direction is a modifier on elevation rather than a value beside it. The
 * version this replaced had `elevatedTop` and `elevatedBottom` sitting in the
 * same flat list as `xs` through `l`, which mixed two axes: you could not ask
 * for a subtle bottom bar or an emphatic one, only for the single weight
 * someone had baked in.
 */
export const shadow = {
  ...cast(1),
  up: cast(-1),
};
