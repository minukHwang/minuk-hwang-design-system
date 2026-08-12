/**
 * Opacities applied to an element rather than painted over one.
 *
 * Not a colour, which is why this is not under `color`. It lived there because
 * the file it shared was about things that do not follow the theme, and these do
 * not — but neither does `spacing`. Every consumer spends these on the `opacity`
 * property, not on a fill.
 *
 * A scrim adds a layer; these modulate what is already drawn. Disabled is the
 * only case in this system that needs it: hover and press are a layer over the
 * surface rather than a change to the element, so they read the `dim` and
 * `lighten` ramps through `color.$semantic.state`.
 */
export const opacity = {
  /** Text, icons and other content inside a disabled component. */
  disabledContent: 0.38,
  /** The container of a disabled component: still legible as a shape. */
  disabledContainer: 0.12,
};
