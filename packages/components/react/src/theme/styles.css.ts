import { style } from '@vanilla-extract/css';

/**
 * A box that is not a box.
 *
 * `Theme` exists to put a few attributes somewhere the rest of the tree can
 * inherit from, and an element that carried a real box would change the layout
 * of whatever it was dropped into — a flex child suddenly having a wrapper is a
 * different grid.
 *
 * `display: contents` removes the box and keeps the element, which is exactly
 * the trade wanted here: custom properties still cascade from it, and nothing
 * measures it.
 */
export const root = style({
  display: 'contents',
});

/**
 * The one that paints: the outermost one, and any section that names an
 * appearance of its own.
 *
 * It has to be a real box, because `display: contents` has no surface to colour.
 * That is the trade the root makes and the nested ones do not: at the top of an
 * app there is nothing above to disturb, and the alternative is worse than a
 * wrapper — `body` is an ancestor of everything React renders, so a page whose
 * gray dial moved would keep its old background behind the new one.
 *
 * A size is not part of it. A dark footer under a light page paints the footer,
 * and nothing about naming an appearance says how tall the region is.
 */
export const painted = style({
  /*
   * `var(--background-base)` written out rather than taken from `vars`.
   *
   * `vars.color.$semantic.background.base` resolves to `--level-base`, the step
   * the page sits on, and the page-background dial does not move that — it
   * moves `--background-base`, the property defined in terms of it. Reading the
   * step here painted the tinted page under a `pageBackground="raised"` that had
   * correctly changed everything else.
   */
  backgroundColor: 'var(--background-base)',
  color: 'var(--text-color-normal)',
});

/**
 * The page, which only the outermost one is.
 *
 * Filling the viewport is the root's job and was briefly everyone's: the two
 * were one class, so a nested `<Theme appearance="dark">` around three lines of
 * a footer took a full screen of height with it.
 *
 * `min-height` rather than `height`, so a long page still scrolls. `100dvh`
 * because a mobile browser's toolbars make `100vh` taller than the window, and
 * the difference is a strip of the old background at the bottom.
 */
export const page = style({
  minHeight: '100dvh',
});
