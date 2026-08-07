/**
 * The two type scales.
 *
 * Separate from `variables` and `classes` because it is neither: `vars` becomes
 * CSS custom properties and `classes` becomes utility classes, and both
 * generators walk every member of their namespace.
 *
 * ---
 *
 * There are two ladders, not one shared by two components.
 *
 * A single scale with role names — `display1`, `title2`, `body3` — made the
 * name carry two things at once: what the step is for, and where it sits. Once
 * `Heading` and `Text` existed, the component said the role too, so
 * `<Text size="title3">` read as a contradiction and `<Heading size="title2">`
 * said the same thing twice.
 *
 * Numbering each ladder from its own 1 removes that. The component says what
 * the text is; the number says how big. Nothing says it twice.
 *
 * Six pixel values appear in both ladders, and that is not the duplication it
 * looks like. `heading[3]` and `text[7]` are two design decisions that agree
 * today at 18px — not one decision written down twice. Under the old shared
 * scale they could not disagree, which is the actual defect: retuning the
 * smallest heading also moved a body step nobody was thinking about.
 */

/*
 * ============================================
 * Heading
 * ============================================
 */

/**
 * Ten steps, smallest first.
 *
 * Stops at 16px because below that a heading stops being one, and reaches 60
 * because a landing page occasionally needs it. Steps 9 and 10 are not the
 * default for any level — they are asked for by name.
 */
export const headingScale = [
  { step: 1, size: 16, line: 21 },
  { step: 2, size: 17, line: 22 },
  { step: 3, size: 18, line: 23 },
  { step: 4, size: 20, line: 25 },
  { step: 5, size: 22, line: 28 },
  { step: 6, size: 24, line: 30 },
  { step: 7, size: 28, line: 34 },
  { step: 8, size: 34, line: 41 },
  { step: 9, size: 40, line: 48 },
  { step: 10, size: 60, line: 72 },
] as const;

export type HeadingSize = (typeof headingScale)[number]['step'];

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * What each level looks like when nothing says otherwise.
 *
 * A default rather than a rule. An `h3` opening a page and an `h3` inside a
 * card want different sizes and the same place in the outline, so `size`
 * overrides the look while `level` keeps the meaning.
 */
export const headingSizeForLevel: Record<HeadingLevel, HeadingSize> = {
  1: 8,
  2: 7,
  3: 6,
  4: 5,
  5: 4,
  6: 3,
};

/*
 * ============================================
 * Text
 * ============================================
 */

/**
 * Ten steps, smallest first.
 *
 * `reading` is a second line height at the same size, for text set as a
 * paragraph rather than scanned as a label — 1.31 against 1.63 at step 5. It
 * exists on the middle four, which are the sizes a paragraph is actually run
 * at; 12 and 13 are captions, and 20 upwards is a lede that wants its leading
 * chosen deliberately.
 */
export const textScale = [
  { step: 1, size: 12, line: 16 },
  { step: 2, size: 13, line: 18 },
  { step: 3, size: 14, line: 19, reading: 22 },
  { step: 4, size: 15, line: 20, reading: 24 },
  { step: 5, size: 16, line: 21, reading: 26 },
  { step: 6, size: 17, line: 22, reading: 28 },
  { step: 7, size: 18, line: 23 },
  { step: 8, size: 20, line: 25 },
  { step: 9, size: 22, line: 28 },
  { step: 10, size: 24, line: 30 },
] as const;

export type TextSize = (typeof textScale)[number]['step'];

export type TypographyWeight = 'regular' | 'medium' | 'bold';
