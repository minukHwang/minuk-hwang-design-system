import { vars } from '@minuk-hwang-design-system/style-tokens';

const { state } = vars.color.$semantic;

/**
 * An interaction, painted over whatever surface the element already has.
 *
 * `background-image` rather than `background-color`, and that is the whole
 * trick: the color underneath keeps saying which level the element is on, and
 * the ink says what the pointer is doing to it. A hover written as a background
 * color has to know both, which is why the old one was wrong on every surface
 * but the one it was picked against.
 *
 * A gradient with one stop is how CSS spells "a solid color as an image".
 * There is no `background-overlay` property, and the alternatives are worse: a
 * pseudo-element needs positioning and a stacking context on every control, and
 * an inset `box-shadow` is painted above the border rather than under it.
 *
 * Nothing has to opt in. An element with no background of its own — a ghost
 * button — shows the ink against the page, which is exactly what it should look
 * like.
 */
const layer = (ink: string) => `linear-gradient(${ink}, ${ink})`;

export const hoverLayer = layer(state.hover);
export const pressedLayer = layer(state.pressed);

/**
 * The same layer at rest, so the ink has something to fade from.
 *
 * `background-image` interpolates between two gradients of the same shape and
 * does not interpolate from `none` to anything — leave it off and a control
 * that declares a 70ms transition snaps instead, which is the sort of thing
 * that reads as a bug in one component rather than as a missing declaration.
 *
 * Pair it with `stateTransition` on the same element.
 */
export const restLayer = layer('transparent');

/** Both halves of the contract in one spread. */
export const stateTransition = {
  transitionProperty: 'background-image',
  transitionDuration: vars.motion.duration[70],
  transitionTimingFunction: vars.motion.easing.standard,
} as const;
