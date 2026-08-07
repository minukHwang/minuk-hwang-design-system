import { classes, typographySteps, vars } from '@minuk-hwang-design-system/style-tokens';
import { style, styleVariants } from '@vanilla-extract/css';

const { textColor: semantic, status } = vars.color.$semantic;
const scale = classes.typography;
const steps = typographySteps;

/*
 * ============================================
 * Size, weight, leading
 * ============================================
 */

/**
 * Three independent axes, three sets of classes.
 *
 * The version this replaces crossed size with weight and emitted 42 classes for
 * what is 14 sizes and 3 weights. Worse, it made them one prop — `textMode`
 * held `bold`, which is a weight, beside `reading`, which is a line height.
 * Two axes in one prop is how you end up unable to ask for bold body copy set
 * as a paragraph.
 */
export const sizeStyle = styleVariants(
  Object.fromEntries(
    steps.map(step => [
      step,
      { fontSize: scale[step].regular.fontSize, lineHeight: scale[step].regular.lineHeight },
    ])
  ) as Record<(typeof steps)[number], { fontSize: string; lineHeight: string }>
);

export type TextSize = keyof typeof sizeStyle;

export const weightStyle = styleVariants({
  regular: { fontWeight: scale.body2.regular.fontWeight },
  medium: { fontWeight: scale.body2.medium.fontWeight },
  bold: { fontWeight: scale.body2.bold.fontWeight },
});

export type TextWeight = keyof typeof weightStyle;

/**
 * A second line height at the same size, for text that will be read as a
 * paragraph rather than scanned as a label.
 *
 * Declared after `sizeStyle` on purpose: both set `line-height` at equal
 * specificity, so source order is what lets this win.
 *
 * Only the steps a paragraph is actually set in have one. Asking for it on a
 * heading is not an error — there is simply nothing to override, and silently
 * doing nothing is better than throwing over a line height.
 */
export const readingStyle = styleVariants(
  Object.fromEntries(
    steps
      .filter(step => scale[step].reading)
      .map(step => [step, { lineHeight: scale[step].reading!.lineHeight }])
  ) as Record<string, { lineHeight: string }>
);

/**
 * A plain object, not a `Set`.
 *
 * vanilla-extract serialises everything a `.css.ts` module exports so the
 * values can cross the build boundary, and a `Set` does not survive that — it
 * arrives as `{}`, and calling `.has` on it throws at render.
 */
export const hasReading: Record<string, true> = Object.fromEntries(
  Object.keys(readingStyle).map(step => [step, true])
);

/*
 * ============================================
 * Colour and alignment
 * ============================================
 */

/**
 * The colours text is allowed to be.
 *
 * Deliberately short. Every entry answers a question about the content — is this
 * body copy, a caption, a link, an error — rather than naming a hue. `crimson600`
 * as a prop value would let any caller invent a new meaning for red.
 */
export const colorStyle = styleVariants({
  normal: { color: semantic.normal },
  strong: { color: semantic.strong },
  assistive: { color: semantic.assistive },
  /** On a filled or inverted surface. */
  inverse: { color: semantic.inverse },
  link: { color: semantic.link },
  success: { color: status.success.strong },
  warning: { color: status.warning.strong },
  error: { color: status.error.strong },
});

export type TextColor = keyof typeof colorStyle;

export const alignStyle = styleVariants({
  left: { textAlign: 'left' },
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  justify: { textAlign: 'justify' },
});

export type TextAlign = keyof typeof alignStyle;

/*
 * ============================================
 * Overflow
 * ============================================
 */

export const truncateStyle = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

/**
 * Multi-line clamp.
 *
 * The line count is an inline custom property rather than a class per number,
 * because a card that wants three lines and one that wants five are the same
 * rule with a different integer — and the prefixed properties are still what
 * every engine implements.
 */
export const clampStyle = style({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 'var(--text-lines)',
  overflow: 'hidden',
});
