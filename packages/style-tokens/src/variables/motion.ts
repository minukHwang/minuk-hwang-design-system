/**
 * Duration and easing.
 *
 * The base layer is Radix, which animates by putting `data-state="open"` on an
 * element and leaving the transition to CSS. Without these, every component
 * writes its own number, and a dropdown ends up opening faster than the tooltip
 * beside it for no reason anyone can name.
 *
 * Two rules decide which value to reach for.
 *
 * **Distance sets duration.** A tooltip fading in travels almost nowhere and
 * should be done in 150ms; a sheet crossing the screen needs 400ms or it reads
 * as a jump cut. Holding one duration for both makes the small thing sluggish
 * and the large thing violent.
 *
 * **Direction sets easing.** Something arriving decelerates — it should land
 * rather than stop. Something leaving accelerates and can be quicker than its
 * entrance, because nobody wants to wait for a dismissal they already asked for.
 */

/*
 * ============================================
 * Duration
 * ============================================
 */

/**
 * Keyed by milliseconds, like every other measurable scale here.
 *
 * Anything past 400ms starts to feel like the interface is thinking. That is
 * occasionally the point — a deliberate, full-screen transition — but it is
 * never the default.
 */
export const duration = {
  /** Instant. For disabling a transition without removing the declaration. */
  0: '0ms',
  /** Micro-feedback: hover and press color changes. Below this it reads as a jump. */
  70: '70ms',
  /** Small state flips: checkbox, switch, icon rotation. */
  100: '100ms',
  /** Small entrances: tooltip, badge, inline expand. */
  150: '150ms',
  /** The default. Popover, dropdown, toast, accordion. */
  200: '200ms',
  /** Larger surfaces: dialog, drawer. */
  300: '300ms',
  /** Full-screen travel: bottom sheet, page transition. */
  400: '400ms',
};

/*
 * ============================================
 * Easing
 * ============================================
 */

/**
 * Named rather than numbered, for the same reason shadows are: a curve is four
 * numbers, and no single one of them could stand for it.
 *
 * The curves come from Material 3's emphasized set, which is the most
 * thoroughly documented published pair for entrance and exit.
 */
export const easing = {
  /** Moves and resizes — anything that stays on screen throughout. */
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  /** Appearing. Fast out of the gate, settling at the end. */
  entrance: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
  /** Leaving. Slow to commit, then gone — the mirror of entrance. */
  exit: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
  /** No curve. Spinners and progress, where a curve would imply a rhythm the work does not have. */
  linear: 'linear',
};
