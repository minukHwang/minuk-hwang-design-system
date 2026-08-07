/**
 * Metadata about the type scale.
 *
 * Separate from `variables` and `classes` because it is neither: `vars` becomes
 * CSS custom properties and `classes` becomes utility classes, and both
 * generators walk every member of their namespace. An ordered list of step
 * names put in either one comes out as nonsense — `--steps-0`, `.scale-3`.
 */

/** Every step, largest first. */
export const typographySteps = [
  'display1',
  'display2',
  'title1',
  'title2',
  'title3',
  'heading1',
  'heading2',
  'headline',
  'body1',
  'body2',
  'body3',
  'label',
  'footnote',
  'caption',
] as const;

export type TypographyStep = (typeof typographySteps)[number];

/*
 * ============================================
 * Component slices
 * ============================================
 */

/**
 * The ten steps `Heading` accepts, and the ten `Text` accepts.
 *
 * Written out rather than sliced from the list above. `typographySteps.slice(0, 10)`
 * returns the right values and the wrong type — TypeScript widens a sliced
 * tuple back to the full union, so `size` accepted all fourteen while claiming
 * to accept ten. A restriction that only exists in a comment is not one.
 *
 * The six in the middle appear in both on purpose. A card title set at 16px is
 * a real thing and so is a lead paragraph at 24px; below `body2` a heading
 * stops being one, and above `title3` body copy is a heading that forgot to say
 * so. The assertions underneath fail the build if either list drifts out of the
 * scale or stops overlapping where it should.
 */
export const headingSteps = [
  'display1',
  'display2',
  'title1',
  'title2',
  'title3',
  'heading1',
  'heading2',
  'headline',
  'body1',
  'body2',
] as const;

export const textSteps = [
  'title3',
  'heading1',
  'heading2',
  'headline',
  'body1',
  'body2',
  'body3',
  'label',
  'footnote',
  'caption',
] as const;

export type HeadingStep = (typeof headingSteps)[number];
export type TextStep = (typeof textSteps)[number];

/*
 * Compile-time checks. Each slice has to be part of the scale, and between them
 * they have to cover it — otherwise a step exists that no component can render.
 */
type Assert<T extends true> = T;

/**
 * Exported so `noUnusedLocals` does not strip the checks it cannot see the
 * point of. They have no runtime shape — reading them is how the build fails.
 */
export type ScaleInvariants = [
  Assert<HeadingStep extends TypographyStep ? true : false>,
  Assert<TextStep extends TypographyStep ? true : false>,
  Assert<TypographyStep extends HeadingStep | TextStep ? true : false>,
];
