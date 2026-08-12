import './index.css';

export * as vars from './variables';

/*
 * The generated per-theme scales, for the stylesheet generator and nothing else.
 *
 * Out of `vars.color`, where it sat as `$static` beside the three groups a
 * component is meant to read. Its own note said reaching for it "almost always
 * means a semantic token is missing", which is an odd thing to say about
 * something shelved at eye level. It has to stay exported — the generator reads
 * the built bundle, and esbuild emits one file — so it is moved rather than
 * hidden: still reachable, no longer sitting in the token API.
 */
export * as generatedScales from './variables/color/static';
export * as classes from './classes';

/*
 * The two type scales, kept out of `vars` and `classes` because they are
 * neither: `vars` becomes CSS custom properties and `classes` becomes utility
 * classes, and both generators walk every member of their namespace.
 */
export { headingScale, textScale, headingSizeForLevel, textMetrics } from './scale';
export type {
  HeadingSize,
  HeadingLevel,
  TextSize,
  TextPixels,
  ReadingPixels,
  TextMetrics,
  TypographyWeight,
} from './scale';

/*
 * Radius literals, kept out of `vars` so the generator does not self-reference,
 * and the pill helper beside them because it is a function — anything left in
 * `vars` is walked and emitted as a custom property.
 */
export { borderRadiusValues, pillWhenFull } from './variables/radius';

/*
 * What white and black measure against each solid fill. Data about the colours
 * rather than a colour, so it stays out of `vars` — the stylesheet generator
 * walks that namespace and would emit `--contrast-red: [object Object]`.
 */
export { contrast } from './variables/color/static/contrast';
export type { ContrastMeasurement } from './variables/color/static/contrast';

/* The accent and radius dials, for the same reason the scales are out here. */
export {
  accentColors,
  accentSteps,
  defaultAccentColor,
  neutralColors,
  defaultNeutralColor,
  neutralSteps,
  radiusScales,
  radiusFactors,
  defaultRadiusScale,
  pageBackgrounds,
  defaultPageBackground,
} from './theme';
export type { AccentColor, NeutralColor, RadiusScale, PageBackground } from './theme';
