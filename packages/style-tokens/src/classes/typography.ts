import { headingScale, textScale, TypographyWeight } from '../scale';
import { typography } from '../variables';

const { fontSize, fontWeight, lineHeight } = typography;

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type TypographyDeclarations = {
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
};

type Step = { [W in TypographyWeight]: TypographyDeclarations } & {
  /** A second line height at the same size. Only on the text steps that have one. */
  reading?: TypographyDeclarations;
};

/*
 * ============================================
 * Builder
 * ============================================
 */

/**
 * Three weights at every step.
 *
 * `bold` is 700 throughout. It used to be 700 on the large steps and 600 on the
 * small ones, which meant the same prop produced two different weights
 * depending on how large the text was — a difference nobody chose and nothing
 * recorded. That is what writing 126 lines of the same shape by hand costs.
 */
const WEIGHTS: Record<TypographyWeight, keyof typeof fontWeight> = {
  regular: 400,
  medium: 500,
  bold: 700,
};

type Spec = { size: number; line: number; reading?: number };

const build = (spec: Spec): Step => {
  const size = fontSize[spec.size as keyof typeof fontSize];
  const line = lineHeight[spec.line as keyof typeof lineHeight];

  const weights = Object.fromEntries(
    (Object.keys(WEIGHTS) as TypographyWeight[]).map(weight => [
      weight,
      { fontSize: size, fontWeight: fontWeight[WEIGHTS[weight]], lineHeight: line },
    ])
  ) as { [W in TypographyWeight]: TypographyDeclarations };

  if (spec.reading === undefined) return weights;

  return {
    ...weights,
    reading: {
      fontSize: size,
      fontWeight: fontWeight[400],
      lineHeight: lineHeight[spec.reading as keyof typeof lineHeight],
    },
  };
};

const built = Object.fromEntries([
  ...headingScale.map(spec => [`heading${spec.step}`, build(spec)] as const),
  ...textScale.map(spec => [`text${spec.step}`, build(spec)] as const),
]) as Record<string, Step>;

/*
 * ============================================
 * Classes
 * ============================================
 */

/*
 * Flat names — `heading8`, `text5` — because the stylesheet generator turns one
 * level of nesting into `.heading8-bold`, and a `heading[8]` shape would come
 * out as `.8-bold`.
 *
 * Listed rather than spread, because anything exported from this module is
 * emitted as a utility class: a helper or a lookup table left here would become
 * a rule matching nothing.
 */
export const heading1 = built.heading1;
export const heading2 = built.heading2;
export const heading3 = built.heading3;
export const heading4 = built.heading4;
export const heading5 = built.heading5;
export const heading6 = built.heading6;
export const heading7 = built.heading7;
export const heading8 = built.heading8;
export const heading9 = built.heading9;
export const heading10 = built.heading10;

export const text1 = built.text1;
export const text2 = built.text2;
export const text3 = built.text3;
export const text4 = built.text4;
export const text5 = built.text5;
export const text6 = built.text6;
export const text7 = built.text7;
export const text8 = built.text8;
export const text9 = built.text9;
export const text10 = built.text10;
