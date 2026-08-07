import { style } from '@vanilla-extract/css';

/**
 * `inline-flex` rather than the font's default inline, so the glyph's box is its
 * drawn size. Left inline it carries the line box's descender space and sits a
 * couple of pixels low beside text at the same size.
 *
 * `flex: none` keeps it from being squeezed when it sits in a flex row next to a
 * long label — an icon is the one thing in a row that must not shrink.
 */
export const icon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 'none',
  lineHeight: 1,
  userSelect: 'none',
});
