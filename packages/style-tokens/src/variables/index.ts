/**
 * Token entry point.
 *
 * `color`, `typography` and `motion` are namespaced because each holds several
 * distinct groups — `color.$semantic`, `typography.fontSize`, `motion.easing`.
 * The rest export exactly one thing, so a namespace would only repeat its name:
 * `vars.spacing.spacing`.
 */

export * as color from './color';
export * as typography from './typography';
export * as motion from './motion';

export * from './spacing';
export * from './shadow';

/*
 * Only the pointers. `borderRadiusValues` holds the literals the stylesheet is
 * built from, and this namespace is walked by that generator — exporting both
 * here would emit `--border-radius-8: var(--border-radius-8)`, a self-reference
 * the browser discards. It is re-exported from the package root instead.
 */
export { borderRadius } from './radius';
