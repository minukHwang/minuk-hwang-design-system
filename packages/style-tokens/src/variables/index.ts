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
export * from './radius';
export * from './shadow';
