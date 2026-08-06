/**
 * Token entry point.
 *
 * `color` and `typography` are namespaced because each holds several distinct
 * groups — `color.$semantic`, `typography.fontSize`. The rest export exactly one
 * thing, so a namespace would only repeat its name: `vars.spacing.spacing`.
 */

export * as color from './color';
export * as typography from './typography';

export * from './spacing';
export * from './radius';
export * from './shadow';
