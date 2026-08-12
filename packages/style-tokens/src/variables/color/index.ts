/**
 * Colour token entry point.
 *
 * Four groups, in the order you should reach for them:
 *
 *   $semantic  what a colour is FOR — status.error, border.focus, surface.hover
 *   $palette   what a colour IS, theme-aware — blue[500] resolves per theme
 *   $absolute  values that never flip — black, white, dim, lighten
 *
 * Components should stay in $semantic. Reaching into $palette is fine for a
 * one-off piece of decoration.
 *
 * The `$` prefixes exist because `static` is a reserved word; the rest follow it
 * for symmetry.
 */

export * as $palette from './palette';
export * as $absolute from './absolute';
export * as $semantic from './semantic';
