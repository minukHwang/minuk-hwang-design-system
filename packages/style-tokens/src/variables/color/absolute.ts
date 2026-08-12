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

/**
 * Opacities applied to an element rather than painted over one.
 *
 * A scrim adds a layer; these modulate what is already drawn, which is a
 * different CSS mechanism (`opacity`, not `background`). Disabled is the only
 * case in this system that needs it: hover and press are a layer over the
 * surface rather than a change to the element, so they read the `dim` and
 * `lighten` ramps above through `state`.
 *
 * That used to say the interaction states moved along the neutral scale
 * instead, "which stays visible on dark surfaces where a 4% veil does not".
 * The veil was the right mechanism and the wrong colour — 4% of black over a
 * near-black surface moves it by one part in 255. Pointing each theme at the
 * ramp that shows up on it is what the note was missing.
 */
export const opacity = {
  /** Text, icons and other content inside a disabled component. */
  disabledContent: 0.38,
  /** The container of a disabled component: still legible as a shape. */
  disabledContainer: 0.12,
};
