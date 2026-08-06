import { vars } from '@minuk-hwang-design-system/style-tokens';
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

/**
 * Key types have to be rebuilt by hand here.
 *
 * `Object.fromEntries` is typed as returning an index signature, which would
 * collapse the whole palette to `Record<string, string>` and take every prop
 * type down with it. Mapping the source keys through a template literal keeps
 * `blue500` a known key, so a typo is still a compile error.
 */
type Prefixed<P extends string, S> = {
  [K in keyof S as `${P}${K & (string | number)}`]: string;
};

type PrefixedNamed<P extends string, G> = {
  [K in keyof G as `${P}${Capitalize<K & string>}`]: string;
};

/** Flattens a scale into `<name><step>` keys — `blue` + `500` becomes `blue500`. */
const flatten = <P extends string, S extends Record<string | number, string>>(
  prefix: P,
  scale: S
): Prefixed<P, S> =>
  Object.fromEntries(
    Object.entries(scale).map(([step, value]) => [`${prefix}${step}`, value])
  ) as Prefixed<P, S>;

/** Same idea for the named groups, where the key is a word rather than a step. */
const flattenNamed = <P extends string, G extends Record<string, string>>(
  prefix: P,
  group: G
): PrefixedNamed<P, G> =>
  Object.fromEntries(
    Object.entries(group).map(([key, value]) => [
      `${prefix}${key.charAt(0).toUpperCase()}${key.slice(1)}`,
      value,
    ])
  ) as PrefixedNamed<P, G>;

/** Flattens `status.error.surface` into `statusErrorSurface`. */
type PrefixedGroup<P extends string, G> = {
  [K in keyof G as `${P}${Capitalize<K & string>}`]: string;
};

const flattenGroup = <P extends string, G extends Record<string, string>>(
  prefix: P,
  group: G
): PrefixedGroup<P, G> => flattenNamed(prefix, group) as PrefixedGroup<P, G>;

const { $palette, $absolute, $semantic } = vars.color;

/**
 * Every colour a sprinkles prop can take.
 *
 * Note what is absent: there is no alpha variant per hue. Sprinkles pre-generates
 * a class for every value × property pair, so each palette entry costs several
 * classes rather than one declaration. Adding translucent versions of fourteen
 * scales would roughly double the stylesheet to buy a case that barely comes up —
 * blending onto an unknown background, which `dim` and `lighten` already cover.
 */
export const palette = {
  // Chromatic, ordered around the colour wheel.
  ...flatten('red', $palette.red),
  ...flatten('crimson', $palette.crimson),
  ...flatten('pink', $palette.pink),
  ...flatten('magenta', $palette.magenta),
  ...flatten('purple', $palette.purple),
  ...flatten('indigo', $palette.indigo),
  ...flatten('blue', $palette.blue),
  ...flatten('cyan', $palette.cyan),
  ...flatten('teal', $palette.teal),
  ...flatten('green', $palette.green),
  ...flatten('lime', $palette.lime),
  ...flatten('yellow', $palette.yellow),
  ...flatten('amber', $palette.amber),
  ...flatten('orange', $palette.orange),

  // Neutrals, ordered by how much blue they carry.
  ...flatten('neutral', $palette.neutral),
  ...flatten('gray', $palette.gray),
  ...flatten('slate', $palette.slate),

  // The authored per-theme text ramp.
  ...flattenNamed('text', $palette.text),

  // Absolute values, which do not flip with the theme.
  ...$absolute.color,
  ...flatten('dim', $absolute.dim),
  ...flatten('lighten', $absolute.lighten),
  transparent: 'transparent',

  /*
   * Semantic entries. These duplicate values already present above — that is the
   * point. `statusErrorSurface` and `red50` resolve to the same colour today, but
   * only the first survives a decision to make errors crimson.
   *
   * Reach for these first; the raw steps are for one-off decoration.
   */
  ...flattenGroup('surface', $semantic.surface),
  ...flattenGroup('border', $semantic.border),
  ...flattenGroup('accent', $semantic.accent),
  ...flattenGroup('statusSuccess', $semantic.status.success),
  ...flattenGroup('statusWarning', $semantic.status.warning),
  ...flattenGroup('statusError', $semantic.status.error),
  ...flattenGroup('statusInfo', $semantic.status.info),
  textInverse: $semantic.textColor.inverse,
  textLink: $semantic.textColor.link,
} as const;

export const colorProperties = defineProperties({
  properties: {
    color: palette,
    backgroundColor: palette,
  },
});

export const colorSprinkles = createSprinkles(colorProperties);

export type Palette = keyof typeof palette;

export interface ColorSprinkles {
  backgroundColor?: Palette;
  color?: Palette;
}
