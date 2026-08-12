/**
 * Opacity, applied to an element rather than painted over one.
 *
 * Not a colour, which is why this is not under `color`. It lived there because
 * the file it shared was about things that do not follow the theme, and these do
 * not — but neither does `spacing`. Every consumer spends this on the `opacity`
 * property, not on a fill.
 *
 * A scrim adds a layer; this modulates what is already drawn. Disabled is the
 * only case in this system that needs it: hover and press are a layer over the
 * surface rather than a change to the element, so they read the `dim` and
 * `lighten` ramps through `color.$semantic.state`.
 */
export const opacity = {
  /**
   * A disabled control, whatever the control is.
   *
   * One value, because there was never a second thing to say. It used to be two,
   * `disabledContent` at 0.38 and `disabledContainer` at 0.12, taken from
   * Material — where those are the alphas of a *fill* and its *text*, not two
   * element opacities. Spent as element opacity the container figure put six
   * components at 12%: a disabled input's text measured 1.27:1 against the page
   * and its border 1.05:1, which is not a disabled control so much as a missing
   * one.
   *
   * 0.38 is the common figure and the one this system was already half using.
   * It puts that text at 2.38:1 — clearly unavailable, still clearly there.
   */
  disabled: 0.38,
};
