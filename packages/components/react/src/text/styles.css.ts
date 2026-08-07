import { classes, vars } from '@minuk-hwang-design-system/style-tokens';
import { style, styleVariants } from '@vanilla-extract/css';

const { textColor: semantic, status } = vars.color.$semantic;

/*
 * ============================================
 * Type steps
 * ============================================
 */

/**
 * Built from `classes.typography`, which is the token package's own description
 * of every step — `body1.regular` is `{ fontSize, lineHeight, fontWeight }`.
 *
 * Generating the variants from that data rather than restating the numbers here
 * is what keeps one source: change a step in the tokens and this follows. It is
 * also why `Text` no longer reaches into the shared styles package for its
 * recipe — a component whose CSS lives in a second package cannot be styled by
 * importing its own stylesheet, which is the contract every other component in
 * here keeps.
 */
type Step = keyof typeof classes.typography;
type Mode = 'default' | 'bold' | 'reading';

const MODE_KEY: Record<Mode, 'regular' | 'bold' | 'reading'> = {
  default: 'regular',
  bold: 'bold',
  reading: 'reading',
};

const stepStyles = (mode: Mode) =>
  Object.fromEntries(
    (Object.keys(classes.typography) as Step[]).map(step => {
      const group = classes.typography[step] as Record<string, Record<string, string>>;
      // Not every step has a reading variant; fall back rather than emit nothing.
      const declarations = group[MODE_KEY[mode]] ?? group.regular;
      return [step, declarations];
    })
  ) as Record<Step, Record<string, string>>;

export const textStep = {
  default: styleVariants(stepStyles('default')),
  bold: styleVariants(stepStyles('bold')),
  reading: styleVariants(stepStyles('reading')),
};

export type TextType = Step;
export type TextMode = Mode;

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
export const textColor = styleVariants({
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

export type TextColor = keyof typeof textColor;

export const textAlign = styleVariants({
  left: { textAlign: 'left' },
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  justify: { textAlign: 'justify' },
});

export type TextAlign = keyof typeof textAlign;

export const truncate = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
