# @minuk-hwang-design-system/styles

Shared vanilla-extract style layer for the design system: sprinkles and recipes
built on top of the design tokens.

This package exists so the atomic style layer ships **once**. When these
definitions lived inside the component package, every component bundle inlined
the full set — the same 1,296 class rules were emitted into 26 of 32 CSS files.

## Usage

Import the group you need:

```ts
import { colorSprinkles } from '@minuk-hwang-design-system/styles/color';
import { spacingSprinkles } from '@minuk-hwang-design-system/styles/spacing';
```

Each group ships its stylesheet on a `/style` subpath:

```ts
import '@minuk-hwang-design-system/styles/color/style';
```

## Groups

| Subpath        | Exports                                                   |
| -------------- | --------------------------------------------------------- |
| `./color`      | `colorSprinkles`, `colorProperties`, `palette`, `Palette` |
| `./layout`     | `layoutSprinkles`                                         |
| `./spacing`    | `spacingSprinkles`                                        |
| `./border`     | `borderSprinkles`, `borderRecipe`                         |
| `./shadow`     | `shadowSprinkles`                                         |
| `./typography` | `typographyRecipe`                                        |

## Layer position

```
style-tokens   tool agnostic — CSS variables, TS objects, utility classes
styles         this package — the vanilla-extract implementation
behavior       hooks, no styling
base           headless components, no styling
components     styled components built on the layers above
```
