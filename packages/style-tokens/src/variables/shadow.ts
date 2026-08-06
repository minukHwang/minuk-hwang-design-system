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

export const shadow = {
  /** Resting card. Separation only — barely more than a hairline. */
  xs: `0 1px 2px 0 ${AMBIENT}`,
  /** Raised: a hovered card, a small menu. */
  s: `0 2px 4px -1px ${DIRECT}, 0 1px 3px 0 ${AMBIENT}`,
  /** Floating: dropdown, popover, tooltip, toast. */
  m: `0 8px 16px -4px ${DIRECT}, 0 3px 6px -2px ${AMBIENT}`,
  /** Overlay: dialog, drawer, anything with a scrim under it. */
  l: `0 16px 32px -8px ${DIRECT}, 0 6px 12px -4px ${AMBIENT}`,
  /** Sticky header, casting down onto content that scrolls beneath it. */
  elevatedTop: `0 4px 12px -2px ${AMBIENT}`,
  /** Sticky footer or bottom sheet, casting up. The mirror of elevatedTop. */
  elevatedBottom: `0 -4px 12px -2px ${AMBIENT}`,
};
