/**
 * Semantic colour tokens.
 *
 * Components should reach for these, never for a raw step. `pink500` says what a
 * colour is; `status.error.normal` says what it is for — and only the second
 * survives a decision to make errors crimson instead.
 *
 * Every value below points into the palette, which is theme-aware. That is why a
 * token names one step and works in both themes: step 200 is a pale tint on a
 * light ground and a deep one on a dark ground, and both are "the subtle
 * variant" of their surface.
 */

import { accentSteps, neutralSteps } from '../../theme';

import { color, dim } from './absolute';
import * as palette from './palette';

/**
 * The neutral ramp, on the same indirection as the accent.
 *
 * `--neutral-*` is not a family. It is whichever of `mono`, `gray` and `slate`
 * the document is currently using, and `data-neutral` on an ancestor is what
 * chooses. Surfaces and borders read this rather than a family directly, so a
 * product that wants its greys to lean blue says so once.
 *
 * Text is deliberately not here. Those values are picked for contrast against
 * the surfaces rather than sampled off the same ramp, and a neutral that shifted
 * the body copy with the panels would be trading legibility for a tint.
 */
const neutralScale = Object.fromEntries(
  neutralSteps.map(step => [step, `var(--neutral-${step})`])
) as typeof palette.mono;

/*
 * ============================================
 * Background
 * ============================================
 */

/**
 * Levels, ordered from the page outwards. Elevation and nothing else.
 *
 * `background` rather than `surface`, because the ramps below already use
 * `surface` for something else: `status.error.surface` is the fill a red badge
 * paints itself, not a level. One word for a level and a fill made a badge and a
 * dialog look like the same kind of thing. Apple calls this `systemBackground`
 * and its two neighbours, which is the same distinction in the same order.
 *
 * These used to hold interaction states too — `hover` and `pressed` sat on the
 * same ladder as the page and the card, one rung apart. That made "one step up"
 * mean two different things, and the two disagreed the moment the light page
 * stopped being the lightest thing on screen: raising a card made it lighter
 * while hovering one made it darker, off the same ramp, in the same theme.
 *
 * So the ladder is levels, and interaction is `state` below, painted over
 * whichever level it lands on.
 */
export const background = {
  /**
   * The page itself, and the one level an application is expected to change.
   *
   * Everything else is defined against it, so moving it moves the set. A product
   * that wants a white page rather than a grey one sets this to `raised` and
   * gives its cards a border, which is what `Card`'s `outlined` already is.
   */
  base: neutralScale[10],
  /** A surface on the page: a card, an input, a panel, a menu. */
  raised: neutralScale[50],
  /**
   * Floating clear of the page: a dialog, a popover, a dropdown, a tooltip.
   *
   * A step further in the direction elevation travels, which is towards white in
   * both themes — and written as that sentence rather than as a step number,
   * because the two themes have different amounts of room. Light reaches white
   * at `raised` and has none left, so this resolves to white again and the
   * shadow carries the level alone. Dark has most of the ramp still above it, so
   * the same declaration lands a visible step higher.
   *
   * `color-mix` is what makes one line do both: mixing white into white is
   * white. The alternative was a per-theme step, which needs the value repeated
   * for every neutral family in every theme to survive a nested `Theme`.
   */
  overlay: `color-mix(in srgb, ${color.white} 5%, ${neutralScale[50]})`,
  /** Dims the page behind a modal. A new layer, so a colour rather than an opacity. */
  scrim: dim[500],
};

/*
 * ============================================
 * Fills
 * ============================================
 */

/**
 * A neutral element painted *on* a background rather than a background of its
 * own: a quiet badge, a neutral banner, a disabled control, the well behind an
 * avatar's initials.
 *
 * Its own group rather than a sixth entry beside `accent` and the four statuses,
 * because it does not fit that shape and pretending otherwise cost more than it
 * bought. Those ramps run `surface` 50, `normal` 500, `strong` 700 — a pale
 * tint, a saturated fill, and a text colour. A neutral has no saturated step:
 * mid-grey carries neither black nor white above 4:1, so a solid grey badge is
 * near-black, which puts `normal` and `strong` on the same value and leaves
 * `surface` at 100 because 50 is already the card. Three of the five entries
 * only lined up by name.
 *
 * Two steps, named for weight rather than depth. `strong` is firmer, not deeper:
 * the avatar's well has to carry initials, not look sunk into the page.
 *
 * They move towards white in the dark theme, which would be wrong for a level
 * and is right here — a badge on a dark card is only visible if it is lighter.
 * That is the whole reason these are not `background`.
 */
export const fill = {
  /** A quiet element on a background. */
  subtle: neutralScale[100],
  /** The same, one step firmer, where `subtle` would collide with a hover. */
  strong: neutralScale[200],
};

/*
 * ============================================
 * Interaction
 * ============================================
 */

/**
 * What a pointer does to a surface, as ink painted over it rather than as a
 * different surface.
 *
 * These are the second axis. Elevation moves towards white; interaction moves
 * towards the text, and the text colour is the thing that flips between themes —
 * so one declaration darkens on light and lightens on dark, which is what makes
 * "hover goes darker" stop contradicting "raised goes lighter". They were never
 * the same direction; they were the same ladder.
 *
 * Being an overlay is what lets one value serve every level. The step it
 * replaces was measured against one surface and wrong on the others: it moved a
 * light page 12/255 and a white card 25. These move both by 19 and 20, and a
 * dark page and card by 19 and 18.
 *
 * Paint them with `background-image` rather than `background-color`, so the
 * surface underneath keeps saying which level it is:
 *
 * ```ts
 * selectors: { '&:hover': { backgroundImage: layer(state.hover) } }
 * ```
 */
export const state = {
  hover: palette.stateInk.hover,
  pressed: palette.stateInk.pressed,
};

/*
 * ============================================
 * Ramps
 * ============================================
 */

/**
 * Builds the five entries a coloured role needs, from one scale.
 *
 * `onNormal` is not passed in. It comes from `palette.onSolid`, which the
 * generator measures against each theme's actual fill — and the two themes
 * genuinely disagree: blue-500 carries white at 4.85:1 on light and only
 * 4.43:1 on dark, where black clears at 4.75:1 instead.
 *
 * A literal `color.white` here looked right and was wrong half the time, in the
 * half nobody checks.
 */
const buildRamp = (scale: typeof palette.green, onNormal: string, strongStep: 700 | 800) => ({
  /** Filled background for banners and badges. */
  surface: scale[50],
  /** Border of that banner, or a subtle fill. */
  subtle: scale[200],
  /** Icons and solid fills. */
  normal: scale[500],
  /** Text sitting on `surface`. */
  strong: scale[strongStep],
  /** Text sitting on `normal`. */
  onNormal,
});

/*
 * ============================================
 * Accent
 * ============================================
 */

/**
 * The brand colour: primary buttons, focus rings, selected states.
 *
 * Points at `--accent-*` rather than at a hue directly. Those properties are
 * defined once as whichever scale the accent currently is, and `data-accent`
 * redefines them for a subtree — so a component compiled against
 * `var(--accent-500)` follows a rebrand it was built years before.
 *
 * This is why it is a separate name from `status.info`, which is the same blue
 * today. They answer different questions, and a decision to make the brand
 * purple should not turn every informational banner purple with it. With the
 * indirection in place that is no longer only an argument — the two genuinely
 * move apart the moment anyone turns the dial.
 */
const accentScale = Object.fromEntries(
  accentSteps.map(step => [step, `var(--accent-${step})`])
) as typeof palette.blue;

export const accent = buildRamp(accentScale, 'var(--accent-on-solid)', 700);
/*
 * ============================================
 * Borders
 * ============================================
 */

export const border = {
  /** Dividers and other separators between non-interactive content. */
  subtle: neutralScale[100],
  /** Default outline for inputs, cards and similar containers. */
  normal: neutralScale[200],
  /** Hovered or selected containers. */
  strong: neutralScale[400],
  /**
   * Keyboard focus ring. Kept separate because it carries an accessibility
   * requirement the others do not: 3:1 against whatever sits next to it.
   * Measured at 4.83:1 on light and 4.00:1 on dark.
   */
  focus: accent.normal,
};

/*
 * ============================================
 * Text
 * ============================================
 */

export const textColor = {
  /** Body copy. 17.4:1 on light, 13.8:1 on dark. */
  normal: palette.text.normal,
  /** Headings and anything needing more weight than body copy. */
  strong: palette.text.strong,
  /**
   * Captions, helper text, timestamps.
   * Sits at step 600 rather than 500 — 500 measured 3.95:1 on white, under the
   * 4.5:1 floor that applies to small text regardless of its role.
   */
  assistive: palette.text.assistive,
  /**
   * Between `normal` and `assistive`, at step 800.
   *
   * For text that is the point of the element it sits in but should not carry
   * the weight of body copy — an avatar's initials being the case that wanted
   * it. `assistive` is picked to recede against a pale surface and measures
   * 3.42:1 on a step-200 fill; `normal` clears by so much it reads as a label
   * shouting. This sits at 6.98:1 on light and 6.58:1 on dark.
   *
   * The value was already in the stylesheet and in `$palette` — the ramp emits
   * `--text-alternative` for every neutral family — and only this pointer was
   * missing, so nothing could reach it without leaving the semantic layer.
   */
  alternative: palette.text.alternative,
  /**
   * Text on an inverted surface — one painted `textColor.normal`, which a
   * tooltip and a solid neutral badge both are.
   *
   * A theme surface rather than white. `inverse` was `color.white`, which
   * inverts nothing: the surface under it follows the theme and white does not,
   * so in dark it was #ffffff on #e3e3e3 and measured 1.28:1.
   *
   * `raised` rather than the page, which it used to be — the two were the same
   * decision while the light page was the lightest step, and they parted when
   * the page became the grey one. Text on a near-black tooltip wants the white,
   * not the page it is floating over.
   *
   * Not for text on a coloured fill. Those read `onNormal`, which is measured
   * per hue per theme.
   */
  inverse: background.raised,
  link: palette.blue[600],
};

/*
 * ============================================
 * Status
 * ============================================
 */

/**
 * The four states a component can report.
 *
 * `warning` maps to amber rather than yellow: yellow-500 measures 1.35:1 against
 * white, which no amount of surrounding design rescues.
 *
 * Which text colour clears AA on each fill is measured per theme rather than
 * assumed — see `buildRamp`.
 */
export const status = {
  success: buildRamp(palette.green, palette.onSolid.green, 700),
  /**
   * Amber's step 700 measured 4.35:1 on its own surface, just under the floor,
   * so warning reads its strong value one step darker than the others.
   */
  warning: buildRamp(palette.amber, palette.onSolid.amber, 800),
  error: buildRamp(palette.red, palette.onSolid.red, 700),
  info: buildRamp(palette.blue, palette.onSolid.blue, 700),
};
