import { createVar } from '@vanilla-extract/css';

/**
 * How large a glyph should be here.
 *
 * A component that puts an icon next to its own type knows what size that icon
 * wants — a 32px button with a 14px label wants 16px, a 48px button with 17px
 * wants 20px. But the icon is a child the caller writes, so the component cannot
 * set the size on it without cloning the element, and cloning breaks the moment
 * the icon is wrapped in anything.
 *
 * A custom property goes the other way: the container declares the size, the
 * glyph inherits it, and nothing has to be passed down or reached into. It is
 * the same move the accent and radius dials make, one scope smaller.
 *
 * Lives in `shared` rather than in `icon` so that `button` can set it without
 * importing the icon's stylesheet, which would pull that CSS into every bundle
 * that has a button in it.
 */
export const iconSize = createVar();

/**
 * The same property as a name you can write, for inline styles.
 *
 * `createVar()` hands back a reference — the string `var(--hash)` — which is
 * what a stylesheet wants and what an inline style cannot use. Written as a key
 * it produces `style="var(--hash): 20px"`, which is not a declaration, so the
 * browser drops it and the size prop silently stops working. This is what
 * `assignInlineVars` does, without the extra dependency for one property.
 */
export const iconSizeProperty = iconSize.slice('var('.length, -1);

/** What a glyph is when nothing around it has an opinion. */
export const defaultIconSize = '20px';
