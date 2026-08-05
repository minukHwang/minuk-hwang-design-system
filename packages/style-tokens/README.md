# @minuk-hwang-design-system/style-tokens

Design tokens for the system. Deliberately framework-agnostic — the values ship
in three forms so that how you consume them stays your choice:

| Form               | For                                                                         |
| ------------------ | --------------------------------------------------------------------------- |
| `style-tokens.css` | CSS custom properties and typography classes. No build step, no TypeScript. |
| `vars`             | TypeScript objects, for vanilla-extract or any CSS-in-JS.                   |
| `classes`          | Typography utility classes as data.                                         |

```ts
import { vars } from '@minuk-hwang-design-system/style-tokens';
import '@minuk-hwang-design-system/style-tokens/style-tokens.css';
```

## Four layers of colour

Reach for them in this order. Dropping a layer is usually a sign that a token is
missing, and adding one is the better fix.

```
$semantic   what a colour is FOR      status.error.normal, border.focus
$palette    what it IS, theme-aware   blue[500] → var(--blue-500)
$absolute   what never flips          black, white, dim, lighten
$static     the raw per-theme scales  the stylesheet is built from these
```

`pink500` says what a colour is. `status.error.normal` says what it is for, and
only the second survives a decision to make errors crimson.

## The step scale

Every scale runs 13 steps. **Step 10 sits closest to the background and 990
furthest from it**, in both themes — which is why the light scales run light to
dark and the dark scales run the other way. A component names a step once and it
reads correctly either way.

| Step  | Role                                                                      |
| ----- | ------------------------------------------------------------------------- |
| `10`  | App background, canvas. Within ~5/255 of the page — a ground, not a tint. |
| `50`  | Subtle background: banners, badge fills.                                  |
| `100` | Hovered subtle background. Subtle borders and dividers.                   |
| `200` | Pressed or selected background. Default container borders.                |
| `300` | —                                                                         |
| `400` | Stronger borders: hover, selected containers.                             |
| `500` | Solid fill. Icons. The most saturated step.                               |
| `600` | Hovered solid fill. Links. Assistive text.                                |
| `700` | Text sitting on a step-50 surface.                                        |
| `800` | —                                                                         |
| `900` | High-contrast text.                                                       |
| `950` | Body text.                                                                |
| `990` | Maximum-contrast anchor. Not a text colour — see below.                   |

Two of the thirteen are anchors rather than working steps, the same way Material
ships tone 0 and tone 100.

**`10` is a canvas.** All fourteen hues land within ~5/255 of white here, so it
carries no visible tint. Reaching for it as "a pale version of this colour" gives
you nothing — that is step `50`.

**`990` is not a text colour.** Pure white on a dark ground visually vibrates and
gets harder to read; Material caps `onSurface` at tone 90 and the brightest step
Radix ships in a dark scale is `#c2e6ff`. The dark ladder here stops at lightness
93 for the same reason. Point text at `950` or `900`.

## Colour families

Fourteen chromatic scales, spaced so no two neighbours sit closer than 14° — the
point where two ramps stop reading as separate families.

```
red 0°   orange 22°   amber 38°   yellow 52°   lime 85°   green 140°
teal 175°   cyan 195°   blue 216°   indigo 245°   purple 272°
magenta 302°   pink 330°   crimson 348°
```

Three neutrals, ordered by how much blue they carry. They sit where Tailwind's
`neutral` / `gray` / `slate` sit, and `gray` lands within 3 points of the CSS
keyword `slategray`.

```
neutral  saturation  0%
gray     saturation 10%
slate    saturation 19%
```

### Why some scales are tuned

Equal HSL lightness does not mean equal perceived brightness. Cyan and green read
far lighter than blue at the same value, so their scales are pulled down —
without it, `teal-500` comes out as `#00ffea`, a highlighter no interface can
use. The corrections live in `scripts/generate-palette.js`.

## Transparency

Two mechanisms, because CSS has two.

**Painting a new layer** uses a colour. `dim` and `lighten` are operations rather
than hues — "make this darker" works over a photo, a coloured card or a grey
panel, which is why no other family gets an alpha scale.

```ts
vars.color.$semantic.surface.scrim; // dim[500], behind a modal
vars.color.$absolute.lighten[200]; // a badge on an image
```

**Modulating what is already drawn** uses a number.

```ts
vars.color.$absolute.opacity.disabledContent; // 0.38
vars.color.$absolute.opacity.disabledContainer; // 0.12
```

Hover, press and selected are _not_ here. A 4% veil shifts a light surface by
~10/255 and a dark one by ~3, so it fails exactly where feedback matters most.
Those states step along the scale instead — `50 → 100 → 200` moves 20–50 either
way, and works on any ground.

## Contrast

`status.*.onNormal` records which text colour clears WCAG AA on top of that
status's `normal` step. Only blue, purple and indigo are dark enough at full
chroma to carry white text; everything from cyan through orange needs black.

```ts
status.info.onNormal; // white — blue-500 at 4.83:1
status.success.onNormal; // black — green-500 would be 2.29:1 with white
```

`warning` maps to amber rather than yellow: yellow-500 measures 1.35:1 against
white. Its `strong` step is 800 rather than 700, because 700 measured 4.35:1 on
its own surface — just under the floor.

## Regenerating

The scales are generated, never hand-edited.

```bash
node scripts/generate-palette.js        # preview every scale
node scripts/generate-palette.js red 0  # preview one hue
node scripts/write-scales.js            # rewrite static/light.ts and dark.ts
node scripts/write-palette.js           # rewrite palette.ts
```

Change a hue, its tuning, or the lightness ladder in `generate-palette.js` and
replay. That is what keeps fourteen scales consistent with each other.
