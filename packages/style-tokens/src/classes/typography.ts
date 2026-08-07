import { typography } from '../variables';

const { fontSize, fontWeight, lineHeight } = typography;

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type TypographyWeight = 'regular' | 'medium' | 'bold';

export type TypographyDeclarations = {
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
};

/*
 * ============================================
 * The scale
 * ============================================
 */

/**
 * Every step, in order, largest first.
 *
 * The order matters and cannot be recovered from the object: exported members
 * come out alphabetically, which puts `body1` above `display1`. `Text` and
 * `Heading` each take a slice of this list, so the one place that knows which
 * step is bigger is here.
 *
 * `reading` is a second line height at the same size, not a fourth weight. It
 * exists only where a paragraph might actually be set — nothing above `body1`
 * is ever run as body copy, and `label` gets one because a form's helper text
 * sometimes runs to three lines.
 */
const SCALE = [
  { name: 'display1', size: 60, line: 72 },
  { name: 'display2', size: 40, line: 48 },
  { name: 'title1', size: 34, line: 41 },
  { name: 'title2', size: 28, line: 34 },
  { name: 'title3', size: 24, line: 30 },
  { name: 'heading1', size: 22, line: 28 },
  { name: 'heading2', size: 20, line: 25 },
  { name: 'headline', size: 18, line: 23 },
  { name: 'body1', size: 17, line: 22, reading: 28 },
  { name: 'body2', size: 16, line: 21, reading: 26 },
  { name: 'body3', size: 15, line: 20, reading: 24 },
  { name: 'label', size: 14, line: 19, reading: 22 },
  { name: 'footnote', size: 13, line: 18 },
  { name: 'caption', size: 12, line: 16 },
] as const;

export type TypographyStep = (typeof SCALE)[number]['name'];

/*
 * The ordered list of step names lives in `scale.ts`, not here.
 *
 * `classes/index.ts` re-exports everything in this module as
 * `classes.typography`, and the stylesheet generator turns each member into a
 * utility class — so an array of names came out as `.steps-0` through
 * `.steps-13`, and the generated object as `.scale-0` through `.scale-13`.
 * Rules that matched nothing and meant nothing.
 */
/*
 * ============================================
 * Classes
 * ============================================
 */

/**
 * Three weights at every step.
 *
 * `bold` is 700 throughout. It used to be 700 above `title3` and 600 below,
 * which meant the same prop produced two different weights depending on how
 * large the text was — a difference nobody chose and nothing recorded.
 */
const WEIGHTS: Record<TypographyWeight, keyof typeof fontWeight> = {
  regular: 400,
  medium: 500,
  bold: 700,
};

type Step = {
  [W in TypographyWeight]: TypographyDeclarations;
} & {
  /** Present only on the steps a paragraph is set in. */
  reading?: TypographyDeclarations;
};

const build = (spec: (typeof SCALE)[number]): Step => {
  const weights = Object.fromEntries(
    (Object.keys(WEIGHTS) as TypographyWeight[]).map(weight => [
      weight,
      {
        fontSize: fontSize[spec.size],
        fontWeight: fontWeight[WEIGHTS[weight]],
        lineHeight: lineHeight[spec.line],
      },
    ])
  ) as { [W in TypographyWeight]: TypographyDeclarations };

  if (!('reading' in spec)) return weights;

  return {
    ...weights,
    reading: {
      fontSize: fontSize[spec.size],
      fontWeight: fontWeight[400],
      lineHeight: lineHeight[spec.reading],
    },
  };
};

/**
 * Generated rather than written out.
 *
 * Fourteen steps by three weights by three declarations is 126 lines of the
 * same shape, and the version this replaces was exactly that — which is how
 * `bold` came to mean 600 in nine of them and 700 in five.
 */
const scale = Object.fromEntries(SCALE.map(spec => [spec.name, build(spec)])) as Record<
  TypographyStep,
  Step
>;

/*
 * Named exports, so `classes.typography.body2` keeps working. The object above
 * is what anything iterating the scale should read.
 */
export const display1 = scale.display1;
export const display2 = scale.display2;
export const title1 = scale.title1;
export const title2 = scale.title2;
export const title3 = scale.title3;
export const heading1 = scale.heading1;
export const heading2 = scale.heading2;
export const headline = scale.headline;
export const body1 = scale.body1;
export const body2 = scale.body2;
export const body3 = scale.body3;
export const label = scale.label;
export const footnote = scale.footnote;
export const caption = scale.caption;
