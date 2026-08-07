import './index.css';

export * as vars from './variables';
export * as classes from './classes';

/*
 * The two type scales, kept out of `vars` and `classes` because they are
 * neither: `vars` becomes CSS custom properties and `classes` becomes utility
 * classes, and both generators walk every member of their namespace.
 */
export { headingScale, textScale, headingSizeForLevel } from './scale';
export type { HeadingSize, HeadingLevel, TextSize, TypographyWeight } from './scale';

/* Radius literals, kept out of `vars` so the generator does not self-reference. */
export { borderRadiusValues } from './variables/radius';

/* The accent and radius dials, for the same reason the scales are out here. */
export {
  accentColors,
  accentSteps,
  defaultAccentColor,
  radiusScales,
  radiusFactors,
  defaultRadiusScale,
} from './theme';
export type { AccentColor, RadiusScale } from './theme';
