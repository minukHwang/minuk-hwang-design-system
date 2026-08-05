import { vars } from '@minuk-hwang-design-system/style-tokens';
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

export const palette = {
  ...Object.fromEntries(
    Object.entries(vars.color.$static.light.color).map(([key, value]) => [`${key}`, value])
  ),
  ...Object.fromEntries(
    Object.entries(vars.color.$static.light.opacityBlack).map(([key, value]) => [
      `opacityBlack${key}`,
      value,
    ])
  ),
  ...Object.fromEntries(
    Object.entries(vars.color.$static.light.opacityWhite).map(([key, value]) => [
      `opacityWhite${key}`,
      value,
    ])
  ),
  ...Object.fromEntries(
    Object.entries(vars.color.$palette.blue).map(([key, value]) => [`blue${key}`, value])
  ),
  ...Object.fromEntries(
    Object.entries(vars.color.$palette.green).map(([key, value]) => [`green${key}`, value])
  ),
  ...Object.fromEntries(
    Object.entries(vars.color.$palette.pink).map(([key, value]) => [`pink${key}`, value])
  ),
  ...Object.fromEntries(
    Object.entries(vars.color.$palette.orange).map(([key, value]) => [`orange${key}`, value])
  ),
  ...Object.fromEntries(
    Object.entries(vars.color.$palette.gray).map(([key, value]) => [`gray${key}`, value])
  ),
  ...Object.fromEntries(
    Object.entries(vars.color.$palette.coolGray).map(([key, value]) => [`coolGray${key}`, value])
  ),
  ...Object.fromEntries(
    Object.entries(vars.color.$palette.blueGray).map(([key, value]) => [`blueGray${key}`, value])
  ),
  ...Object.fromEntries(
    Object.entries(vars.color.$palette.background).map(([key, value]) => [
      `background${key.charAt(0).toUpperCase() + key.slice(1)}`,
      value,
    ])
  ),
  ...Object.fromEntries(
    Object.entries(vars.color.$palette.text).map(([key, value]) => [
      `text${key.charAt(0).toUpperCase() + key.slice(1)}`,
      value,
    ])
  ),
  ...Object.fromEntries(
    Object.entries(vars.color.$palette.ui).map(([key, value]) => [
      `ui${key.charAt(0).toUpperCase() + key.slice(1)}`,
      value,
    ])
  ),
} as const;

export const colorProperties = defineProperties({
  properties: {
    color: palette,
    backgroundColor: palette,
  },
});

export const colorSprinkles = createSprinkles(colorProperties);

export type Palette =
  | keyof typeof vars.color.$static.light.color
  | `opacityBlack${keyof typeof vars.color.$static.light.opacityBlack}`
  | `opacityWhite${keyof typeof vars.color.$static.light.opacityWhite}`
  | `blue${keyof typeof vars.color.$palette.blue}`
  | `green${keyof typeof vars.color.$palette.green}`
  | `pink${keyof typeof vars.color.$palette.pink}`
  | `orange${keyof typeof vars.color.$palette.orange}`
  | `gray${keyof typeof vars.color.$palette.gray}`
  | `coolGray${keyof typeof vars.color.$palette.coolGray}`
  | `blueGray${keyof typeof vars.color.$palette.blueGray}`
  | `background${Capitalize<keyof typeof vars.color.$palette.background>}`
  | `text${Capitalize<keyof typeof vars.color.$palette.text>}`
  | `ui${Capitalize<keyof typeof vars.color.$palette.ui>}`;

export interface ColorSprinkles {
  backgroundColor?: Palette;
  color?: Palette;
}
