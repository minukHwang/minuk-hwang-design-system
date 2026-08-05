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

import * as palette from './palette';
import { color, dim } from './absolute';

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
  /** Resting state of an interactive surface. */
  default: palette.neutral[50],
  hover: palette.neutral[100],
  pressed: palette.neutral[200],
  /** Selected or otherwise held-active, distinct from a transient press. */
  selected: palette.neutral[200],
  /** Dims the page behind a modal. A new layer, so a colour rather than an opacity. */
  scrim: dim[500],
};

/*
 * ============================================
 * Borders
 * ============================================
 */

export const border = {
  /** Dividers and other separators between non-interactive content. */
  subtle: palette.neutral[100],
  /** Default outline for inputs, cards and similar containers. */
  normal: palette.neutral[200],
  /** Hovered or selected containers. */
  strong: palette.neutral[400],
  /**
   * Keyboard focus ring. Kept separate because it carries an accessibility
   * requirement the others do not: 3:1 against whatever sits next to it.
   * Measured at 4.83:1 on light and 4.00:1 on dark.
   */
  focus: palette.ui.primaryNormal,
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
  /** Text on a filled or inverted surface. */
  inverse: color.white,
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
 * `onNormal` records which text colour clears AA on top of `normal`. Only blue,
 * purple and indigo are dark enough at full chroma to carry white; the rest need
 * black. Leaving that judgement to each component is how a 2.29:1 green button
 * gets shipped.
 */
const buildStatus = (scale: typeof palette.green, onNormal: string, strongStep: 700 | 800) => ({
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

export const status = {
  success: buildStatus(palette.green, color.black, 700),
  /**
   * Amber's step 700 measured 4.35:1 on its own surface, just under the floor,
   * so warning reads its strong value one step darker than the others.
   */
  warning: buildStatus(palette.amber, color.black, 800),
  error: buildStatus(palette.red, color.black, 700),
  info: buildStatus(palette.blue, color.white, 700),
};
