import { classes, textScale, vars } from '@minuk-hwang-design-system/style-tokens';
import { style, styleVariants } from '@vanilla-extract/css';

const { textColor: semantic, status, accent } = vars.color.$semantic;

/*
 * ============================================
 * Size, weight, leading
 * ============================================
 */

/**
 * Three independent axes, three sets of classes.
 *
 * The version this replaces crossed size with weight and emitted 42 classes for
 * what is a handful of sizes and three weights. Worse, it made them one prop —
 * `textMode` held `bold`, which is a weight, beside `reading`, which is a line
 * height. Two axes in one prop is how you end up unable to ask for bold body
 * copy set as a paragraph.
 */
export const sizeStyle = styleVariants(
  Object.fromEntries(
    textScale.map(({ step }) => {
      const spec = classes.typography[`text${step}` as 'text5'].regular;
      return [step, { fontSize: spec.fontSize, lineHeight: spec.lineHeight }];
    })
  ) as Record<number, { fontSize: string; lineHeight: string }>
);

export const weightStyle = styleVariants({
  regular: { fontWeight: classes.typography.text5.regular.fontWeight },
  medium: { fontWeight: classes.typography.text5.medium.fontWeight },
  bold: { fontWeight: classes.typography.text5.bold.fontWeight },
});

export type TextWeight = keyof typeof weightStyle;

/**
 * A second line height at the same size, for text that will be read as a
 * paragraph rather than scanned as a label.
 *
 * Declared after `sizeStyle` on purpose: both set `line-height` at equal
 * specificity, so source order is what lets this win.
 *
 * Only the steps a paragraph is actually run at have one. Asking for it
 * elsewhere is not an error — there is nothing to override, and silently doing
 * nothing beats throwing over a line height.
 */
export const readingStyle = styleVariants(
  Object.fromEntries(
    textScale
      .filter(spec => 'reading' in spec)
      .map(({ step }) => [
        step,
        { lineHeight: classes.typography[`text${step}` as 'text5'].reading!.lineHeight },
      ])
  ) as Record<number, { lineHeight: string }>
);

/**
 * A plain object, not a `Set`.
 *
 * vanilla-extract serialises everything a `.css.ts` module exports so the
 * values can cross the build boundary, and a `Set` does not survive that — it
 * arrives as `{}`, and calling `.has` on it throws at render.
 */
export const hasReading: Record<number, true> = Object.fromEntries(
  textScale.filter(spec => 'reading' in spec).map(({ step }) => [step, true])
);

/*
 * ============================================
 * Color and alignment
 * ============================================
 */

/**
 * The colors text is allowed to be.
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
  /** The brand color, for text that is selected or active rather than linked. */
  accent: { color: accent.strong },
  success: { color: status.success.strong },
  warning: { color: status.warning.strong },
  error: { color: status.error.strong },
  /**
   * Take the color of whatever this sits in.
   *
   * For text inside something that has already picked a color — an alert with
   * a tone, a filled banner, a selected row. Without it, every `Text` re-asserts
   * a color at higher specificity than its container and the container's choice
   * never lands.
   */
  inherit: { color: 'inherit' },
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
