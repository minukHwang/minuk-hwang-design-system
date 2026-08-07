import { vars } from '@minuk-hwang-design-system/style-tokens';
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

const { up, ...down } = vars.shadow;

/**
 * Sprinkles takes a flat record, and the shadow ladder is cast in two
 * directions — so the upward set is flattened into prefixed keys rather than
 * nested ones: `upS`, `upM`, and so on.
 *
 * The nesting stays in the token package because that is where it says
 * something: direction modifies elevation. Here it is only a key, and a prop
 * value cannot be an object.
 */
const upward = Object.fromEntries(
  Object.entries(up).map(([step, value]) => [`up${step[0].toUpperCase()}${step.slice(1)}`, value])
) as { [K in keyof typeof up as `up${Capitalize<K & string>}`]: string };

const shadowProperties = defineProperties({
  properties: {
    boxShadow: { ...down, ...upward },
  },
});

export const shadowSprinkles = createSprinkles(shadowProperties);

export type ShadowSprinkles = Parameters<typeof shadowSprinkles>[0];
