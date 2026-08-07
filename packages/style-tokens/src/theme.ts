/**
 * The two dials a consumer turns to make the system look like theirs.
 *
 * Kept out of `vars` and `classes` because they are neither — those namespaces
 * are walked wholesale by the two generators, and a list of names left in either
 * would come out as custom properties or as utility classes matching nothing.
 *
 * ---
 *
 * Both work the same way, and neither touches a component.
 *
 * The stylesheet defines the accent ramp and the radius factor once, and every
 * component already reads them: `--accent-500` rather than `--blue-500`,
 * `--border-radius-8` rather than `0.5rem`. Setting `data-accent` or
 * `data-radius` on an ancestor redefines those properties for that subtree, and
 * inheritance does the rest. Twenty-two components change appearance and not one
 * of them is rebuilt.
 *
 * The attributes are unqualified selectors rather than `html[data-accent]`, so a
 * region of a page can carry its own accent — a pricing table in teal inside a
 * blue application — by wrapping it in a second `Theme`.
 */

/*
 * ============================================
 * Accent
 * ============================================
 */

/**
 * Every chromatic scale the palette generates, in wheel order.
 *
 * All fourteen are already emitted as custom properties in both themes, and the
 * text colour that clears AA on each one is measured per theme alongside them.
 * That is what makes swapping the accent safe rather than a guess: choosing
 * `yellow` does not quietly put white text on a yellow button.
 */
export const accentColors = [
  'red',
  'crimson',
  'pink',
  'magenta',
  'purple',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'lime',
  'yellow',
  'amber',
  'orange',
] as const;

export type AccentColor = (typeof accentColors)[number];

/** What the accent is when nothing says otherwise. */
export const defaultAccentColor: AccentColor = 'blue';

/**
 * The steps the accent ramp needs.
 *
 * Not the whole thirteen-step scale — only what the semantic layer reads, plus
 * the two either side of them so that a consumer reaching past the semantic
 * names still lands on the accent rather than on blue.
 */
export const accentSteps = [10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 990] as const;

/*
 * ============================================
 * Radius
 * ============================================
 */

/**
 * A multiplier rather than a second scale.
 *
 * Every radius token is emitted as `calc(<value> * var(--border-radius-factor))`,
 * so one number moves the whole ladder and the steps keep their relationship to
 * each other. A parallel set of five hand-picked ladders would let `small` and
 * `large` disagree about which of two corners is rounder.
 *
 * `none` is the exception that has to be spelt out: zeroing the factor squares
 * every corner except a pill, whose 999px is asking for something the factor
 * cannot express. It sets `full` to zero directly, because a square avatar is
 * what `radius="none"` means.
 */
export const radiusScales = ['none', 'small', 'medium', 'large', 'full'] as const;

export type RadiusScale = (typeof radiusScales)[number];

/**
 * `full` is 3 rather than something enormous, and that is enough.
 *
 * A browser clamps `border-radius` to half the box, so a 48px-tall button at
 * 8px × 3 asks for 24px, gets 24px, and is a pill. A card at 12px × 3 asks for
 * 36px and keeps it, because the card is taller than 72px. The clamp does the
 * work of telling controls apart from containers, which is why one number can
 * mean "pill" for one and "generously round" for the other.
 *
 * Turning the factor up further only affects the containers — the controls are
 * already at their maximum — so it buys a rounder dialog and nothing else.
 */
export const radiusFactors: Record<RadiusScale, number> = {
  none: 0,
  small: 0.5,
  medium: 1,
  large: 1.5,
  full: 3,
};

export const defaultRadiusScale: RadiusScale = 'medium';
