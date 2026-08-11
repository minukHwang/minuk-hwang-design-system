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

import { dim } from './absolute';
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
 * Surfaces
 * ============================================
 */

/**
 * Backgrounds a component paints for itself.
 *
 * Interaction states move along the scale rather than layering a translucent
 * veil. A 4% overlay shifts a light surface by ~10/255 and a dark one by ~3,
 * so it fails exactly where feedback matters most; stepping 50 → 100 → 200
 * moves ~20–50 either way.
 */
export const surface = {
  /**
   * The page itself. Step 10 in both themes, which is the one step defined as
   * sitting closest to the background rather than as a tint of the hue.
   *
   * Everything below is a surface a component paints *on top of* this one.
   */
  canvas: neutralScale[10],
  /** Resting state of an interactive surface. */
  default: neutralScale[50],
  hover: neutralScale[100],
  pressed: neutralScale[200],
  /** Selected or otherwise held-active, distinct from a transient press. */
  selected: neutralScale[200],
  /** Dims the page behind a modal. A new layer, so a colour rather than an opacity. */
  scrim: dim[500],
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
   * The page's own background rather than white. `inverse` was `color.white`,
   * which inverts nothing: the surface under it follows the theme and white does
   * not, so in dark it was #ffffff on #e3e3e3 and measured 1.28:1. Taking the
   * canvas makes the pair actually opposite, at 16.96:1 on light and 14.35:1 on
   * dark.
   *
   * Not for text on a coloured fill. Those read `onNormal`, which is measured
   * per hue per theme.
   */
  inverse: surface.canvas,
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
