import { fallbackVar, style } from '@vanilla-extract/css';

import { defaultIconSize, iconSize } from '../shared/icon-size.css';

/**
 * `inline-flex` rather than the font's default inline, so the glyph's box is its
 * drawn size. Left inline it carries the line box's descender space and sits a
 * couple of pixels low beside text at the same size.
 *
 * `flex: none` keeps it from being squeezed when it sits in a flex row next to a
 * long label — an icon is the one thing in a row that must not shrink.
 *
 * ---
 *
 * The size is read from a property rather than written on the element, so a
 * container can say how large its glyphs are and every icon inside follows.
 * Material Symbols scales by `font-size`, which is why that is the property
 * carrying it. Passing `size` still wins: the prop writes the property inline,
 * and an inline declaration outranks anything a container set.
 */
export const icon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 'none',
  fontSize: fallbackVar(iconSize, defaultIconSize),
  lineHeight: 1,
  userSelect: 'none',
});
