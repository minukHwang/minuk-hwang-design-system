/**
 * Absolute colors — the only values that do not flip with the theme.
 *
 * Everything in the palette swaps when the theme changes, so `blue-500` means
 * "the blue that reads correctly here" rather than one fixed color. These do
 * not: pure white is pure white on either ground, and darkening a surface is
 * darkening it regardless of what the surface happens to be.
 */

/** Pure black and white. Used where a literal value is meant, not a tint. */
export const color = {
  black: '#000000',
  white: '#ffffff',
};

/**
 * `dim` and `lighten` are operations, not colors.
 *
 * They exist because "make this darker" and "make this lighter" work over any
 * background — a photo, a colored card, a gray panel. That is also why no other
 * hue gets an alpha scale: there is no such thing as "make this bluer" as a
 * general-purpose overlay.
 *
 * The step number is the alpha in thousandths, so `dim[500]` is 50% black.
 *
 * The eleven steps are the palette's thirteen minus its two anchors, and the
 * anchors are missing here because they already exist elsewhere: 0% alpha is
 * `transparent`, and 100% is `color.black` / `color.white` above. What is left
 * is everything strictly between the two.
 */
export const dim = {
  50: 'rgba(0 0 0 / 0.05)',
  100: 'rgba(0 0 0 / 0.1)',
  200: 'rgba(0 0 0 / 0.2)',
  300: 'rgba(0 0 0 / 0.3)',
  400: 'rgba(0 0 0 / 0.4)',
  500: 'rgba(0 0 0 / 0.5)',
  600: 'rgba(0 0 0 / 0.6)',
  700: 'rgba(0 0 0 / 0.7)',
  800: 'rgba(0 0 0 / 0.8)',
  900: 'rgba(0 0 0 / 0.9)',
  950: 'rgba(0 0 0 / 0.95)',
};

export const lighten = {
  50: 'rgba(255 255 255 / 0.05)',
  100: 'rgba(255 255 255 / 0.1)',
  200: 'rgba(255 255 255 / 0.2)',
  300: 'rgba(255 255 255 / 0.3)',
  400: 'rgba(255 255 255 / 0.4)',
  500: 'rgba(255 255 255 / 0.5)',
  600: 'rgba(255 255 255 / 0.6)',
  700: 'rgba(255 255 255 / 0.7)',
  800: 'rgba(255 255 255 / 0.8)',
  900: 'rgba(255 255 255 / 0.9)',
  950: 'rgba(255 255 255 / 0.95)',
};
