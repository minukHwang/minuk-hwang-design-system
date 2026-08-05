/**
 * Colour token entry point.
 *
 * Four groups, in the order you should reach for them:
 *
 *   $semantic  what a colour is FOR — status.error, border.focus, surface.hover
 *   $palette   what a colour IS, theme-aware — blue[500] resolves per theme
 *   $absolute  values that never flip — black, white, dim, lighten
 *   $static    the raw per-theme scales the stylesheet is built from
 *
 * Components should stay in $semantic. Reaching into $palette is fine for
 * one-off decoration; reaching into $static almost always means a semantic token
 * is missing, and adding one is the better fix.
 *
 * The `$` prefixes exist because `static` is a reserved word; the rest follow it
 * for symmetry.
 */

export * as $static from './static';
export * as $palette from './palette';
export * as $absolute from './absolute';
export * as $semantic from './semantic';
