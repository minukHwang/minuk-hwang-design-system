import { classes, headingScale } from '@minuk-hwang-design-system/style-tokens';
import { styleVariants } from '@vanilla-extract/css';

/**
 * The heading ladder, numbered from its own 1.
 *
 * A separate scale from `Text` rather than a slice of a shared one. Six pixel
 * values appear in both, and that is two design decisions agreeing today rather
 * than one written twice — retuning the smallest heading should not move a body
 * step nobody was thinking about.
 */
export const sizeStyle = styleVariants(
  Object.fromEntries(
    headingScale.map(({ step }) => {
      const spec = classes.typography[`heading${step}` as 'heading6'].regular;
      return [step, { fontSize: spec.fontSize, lineHeight: spec.lineHeight }];
    })
  ) as Record<number, { fontSize: string; lineHeight: string }>
);
