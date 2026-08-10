/**
 * Stacking order.
 *
 * There was none, and the overlays were `position: fixed` with `z-index: auto`.
 * That works right up until the page has a sticky header with a `z-index` on it,
 * at which point the header paints over the dialog and its scrim: an element at
 * level 10 beats one at `auto` no matter which comes later in the document. The
 * documentation site's own toolbar found this within a day.
 *
 * The values are spread far apart on purpose. An application will have its own
 * stacking to fit around ours, and leaving room between the steps is what stops
 * that from becoming a negotiation.
 */
export const zIndex = {
  /** Sits on the page: a sticky header, a floating action button. */
  raised: 10,
  /** The scrim behind a modal. Everything below it is unreachable. */
  overlay: 1000,
  /** Dialogs and sheets, above their own scrim. */
  modal: 1010,
  /** Popovers, dropdowns and selects, which can open from inside a modal. */
  popover: 1020,
  /**
   * Tooltips, above everything.
   *
   * A tooltip can be attached to a control inside a popover inside a dialog, and
   * it is never the thing that should be covered.
   */
  tooltip: 1030,
};
