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
 * Neutral
 * ============================================
 */

/**
 * The three grey families, ordered by how much blue they carry.
 *
 * `mono` is neutral in the literal sense — no saturation at all. `gray` and
 * `slate` lean progressively toward blue, which is what most software actually
 * uses: a pure grey beside any saturated accent reads slightly warm, and the
 * usual fix is to bias the greys the other way rather than to desaturate the
 * accent.
 *
 * Surfaces and borders are what moves. Text does not, because those values are
 * picked for contrast against the surfaces rather than sampled off the same
 * ramp, and tinting the body copy to match the panels trades legibility for a
 * tint nobody asked for.
 */
export const neutralColors = ['mono', 'gray', 'slate'] as const;

export type NeutralColor = (typeof neutralColors)[number];

/** What the greys are when nothing says otherwise. */
export const defaultNeutralColor: NeutralColor = 'mono';

/**
 * The steps the neutral ramp needs.
 *
 * The whole thirteen rather than the six the semantic layer reads, because
 * unlike the accent these are also what a consumer reaches for directly when
 * building something the system does not ship.
 */
export const neutralSteps = [
  10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 990,
] as const;

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
 * A pill is the thing the factor cannot express, because 999px multiplied by
 * anything is still a pill and multiplied by zero is a square. So the scale
 * carries two flags beside the factor, and they point opposite ways:
 *
 * - `--border-radius-pill` is a pill everywhere except `none`. A chip is
 *   pill-shaped by nature, and asking for no radius is the one instruction that
 *   should square it.
 * - `--border-radius-pill-full` is zero everywhere except `full`. A button is a
 *   rounded rectangle until someone asks for pills, and then it is one at every
 *   size rather than only the sizes whose height happens to clamp.
 *
 * Which of the two a component reads is a statement about the component, not
 * about the dial. That is the part a single multiplier could not say.
 */
export const radiusScales = ['none', 'small', 'medium', 'large', 'full'] as const;

export type RadiusScale = (typeof radiusScales)[number];

/**
 * The factor stops at 1.5, and `full` is not a larger number than `large`.
 *
 * It was 3, on the argument that a browser clamps `border-radius` to half the
 * box and so one big multiplier could mean "pill" to a button and "generously
 * round" to a card. The clamp is real; leaning on it is not, because the number
 * it clamps to is the element's height. At 8px × 3 a 40px button asks for 24px
 * and is held to 20px — a pill — while a 56px button asks for the same 24px,
 * keeps it, and is not. One scale produced two shapes for the same component.
 *
 * So the multiplier does one job — how round is round — and `full` says which
 * components become pills, through `--border-radius-pill-full`. Freed of that,
 * the ceiling can be where it belongs: past 1.5 the controls have long since
 * clamped and only the containers keep growing, which buys a 48px dialog corner
 * and nothing else.
 */
export const radiusFactors: Record<RadiusScale, number> = {
  none: 0,
  small: 0.5,
  medium: 1,
  large: 1.5,
  full: 1.5,
};

export const defaultRadiusScale: RadiusScale = 'medium';

/*
 * ============================================
 * Page background
 * ============================================
 */

/**
 * Which level the page itself sits on.
 *
 * `base` is a page below the surfaces on it: a tinted ground with white cards,
 * which is what a settings screen looks like on every platform. `raised` puts
 * the page level with them, which is the white-page arrangement — and there the
 * colour that separated a card from the page is gone, so the card has to say so
 * with a border. `Card`'s `outlined` already does that.
 *
 * Two things make this unlike the other dials, and both are deliberate.
 *
 * It only moves in the light theme. Light reaches white at `raised` and has
 * nothing above it, so bringing the page up is the only way to arrange the two
 * levels differently; dark has room above `raised` and its page is already as
 * far from white as it goes. There is no dark equivalent to ask for.
 *
 * And it is read at the root rather than per subtree. `Theme` renders a `div`,
 * and the page is `body`, which no `div` contains — a nested one would recolour
 * its own children and leave the page it was talking about untouched. So this
 * belongs on the document, and a nested `Theme` ignores it.
 */
export const pageBackgrounds = ['base', 'raised'] as const;

export type PageBackground = (typeof pageBackgrounds)[number];

export const defaultPageBackground: PageBackground = 'base';
