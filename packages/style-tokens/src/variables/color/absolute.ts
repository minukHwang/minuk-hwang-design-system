/**
 * Absolute colours — the only values that do not flip with the theme.
 *
 * Everything in the palette swaps when the theme changes, so `blue-500` means
 * "the blue that reads correctly here" rather than one fixed colour. These do
 * not: pure white is pure white on either ground, and darkening a surface is
 * darkening it regardless of what the surface happens to be.
 */

/** Pure black and white. Used where a literal value is meant, not a tint. */
export const color = {
  black: '#000000',
  white: '#ffffff',
};

/**
 * `dim` and `lighten` are operations, not colours.
 *
 * They exist because "make this darker" and "make this lighter" work over any
 * background — a photo, a coloured card, a grey panel. That is also why no other
 * hue gets an alpha scale: there is no such thing as "make this bluer" as a
 * general-purpose overlay.
 *
 * The step number is the alpha in thousandths, matching the palette's step
 * numbering so the two read the same way.
 */
export const dim = {
  100: 'rgba(0 0 0 / 0.1)',
  200: 'rgba(0 0 0 / 0.2)',
  500: 'rgba(0 0 0 / 0.5)',
  700: 'rgba(0 0 0 / 0.7)',
  950: 'rgba(0 0 0 / 0.95)',
};

export const lighten = {
  100: 'rgba(255 255 255 / 0.1)',
  200: 'rgba(255 255 255 / 0.2)',
  500: 'rgba(255 255 255 / 0.5)',
  700: 'rgba(255 255 255 / 0.7)',
  950: 'rgba(255 255 255 / 0.95)',
};

/**
 * Opacities applied to an element rather than painted over one.
 *
 * A scrim adds a layer; these modulate what is already drawn, which is a
 * different CSS mechanism (`opacity`, not `background`). Disabled is the only
 * case in this system that genuinely needs it — hover, press and selected are
 * handled by moving along the scale instead, which stays visible on dark
 * surfaces where a 4% veil does not.
 */
export const opacity = {
  /** Text, icons and other content inside a disabled component. */
  disabledContent: 0.38,
  /** The container of a disabled component: still legible as a shape. */
  disabledContainer: 0.12,
};
