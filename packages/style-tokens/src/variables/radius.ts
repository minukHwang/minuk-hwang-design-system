/**
 * Corner radius, keyed by pixels — the same rule the spacing and type scales
 * follow. A design says 12 and the code says `borderRadius[12]`, with no size
 * vocabulary in between.
 *
 * The t-shirt names this replaced had a step called `s` (4px) sitting beside one
 * called `sm` (6px), and `m` (10px) beside `ml` (12px). Nothing about those
 * names says which is bigger, and `base` (8px) hid in the middle of the ladder
 * rather than at one end.
 *
 * Two names are left, because neither is a measurement.
 *
 * `full` asks for a pill regardless of the element's height, which is what 999px
 * is for — simply past anything real. `half` asks for the roundest a box can be
 * at whatever size it happens to render, which is what a percentage is for: 50%
 * of a square is a circle at 24px and at 64px alike. An avatar wants the second,
 * and would need a different pixel step per size to get it from the first.
 *
 * `half` is only meaningful on a square. On a 80×32 box it draws 40px by 16px
 * corners, which is a lozenge rather than a pill.
 *
 * ---
 *
 * Two exports, for the same reason the colour tokens have `$static` beside
 * `$palette`: one is the value, the other is the name to reach it by.
 *
 * `borderRadiusValues` is what the stylesheet generator emits. `borderRadius` is
 * what a component uses, and it points at the custom properties rather than
 * carrying the numbers — which is what lets `<Theme radius="large">` reach
 * seventeen components' stylesheets without any of them being rebuilt. Inlining
 * the literal, which is what this did before, put `border-radius: 0.5rem` in
 * every compiled rule and left nothing for a theme to change.
 */

const VALUES = {
  0: '0rem', // 0px
  2: '0.125rem',
  4: '0.25rem',
  6: '0.375rem',
  8: '0.5rem',
  10: '0.625rem',
  12: '0.75rem',
  16: '1rem',
  24: '1.5rem',
  36: '2.25rem',
  half: '50%', // the roundest a square can be, at any size
  full: '62.4375rem', // 999px, past anything real
} as const;

export const borderRadiusValues = VALUES;

export const borderRadius = Object.fromEntries(
  Object.keys(VALUES).map(step => [step, `var(--border-radius-${step})`])
) as { [K in keyof typeof VALUES]: string };

/**
 * A radius that becomes a pill at `radius="full"` and is the given step at every
 * other scale.
 *
 * `--border-radius-pill-full` is `0` on four of the five scales, so `max()`
 * returns the step and the component is a rounded rectangle. On `full` it is
 * 999px and wins, at every size the component has — which is the part a factor
 * large enough to clamp a 40px control into a pill could not do for a 56px one.
 *
 * Used by the controls a consumer would expect to go pill-shaped together:
 * buttons, badges, inputs, selects. A card or a dialog reads the step directly
 * and stays a rectangle no matter where the dial is.
 */
export const pillWhenFull = (radius: string) => `max(${radius}, var(--border-radius-pill-full))`;
