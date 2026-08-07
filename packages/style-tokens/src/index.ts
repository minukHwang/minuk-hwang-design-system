import './index.css';

export * as vars from './variables';
export * as classes from './classes';

/*
 * Metadata about the type scale, kept out of `vars` and `classes` because it is
 * neither. `vars` becomes CSS custom properties and `classes` becomes utility
 * classes; an ordered list of step names would be emitted as nonsense by both.
 */
export { typographySteps, headingSteps, textSteps } from './scale';
export type { TypographyStep, HeadingStep, TextStep } from './scale';
export type { TypographyWeight } from './classes/typography';
