# @minuk-hwang-design-system/style-tokens

Design tokens for the system. Deliberately framework-agnostic — the values ship
in four forms so that how you consume them stays your choice:

| Form               | For                                                                         |
| ------------------ | --------------------------------------------------------------------------- |
| `style-tokens.css` | CSS custom properties and typography classes. No build step, no TypeScript. |
| `vars`             | TypeScript objects, for vanilla-extract or any CSS-in-JS.                   |
| `classes`          | Typography utility classes as data.                                         |
| `tailwind.css`     | A Tailwind v4 theme. Utilities named after the tokens.                      |

```ts
import { vars } from '@minuk-hwang-design-system/style-tokens';
import '@minuk-hwang-design-system/style-tokens/style-tokens.css';
```

All four are generated from the same source, so none of them can drift.

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

Both run eleven steps, where the number is the alpha in thousandths: `dim[500]`
is 50% black. That is the palette's thirteen steps minus its two anchors, and
the anchors are absent because they already exist — 0% alpha is `transparent`
and 100% is `black` / `white`.

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

## Shadows

Geometry and colour are separate tokens, and only the colour follows the theme.

```ts
shadow.m; // 0 8px 16px -4px var(--shadow-color-direct), 0 3px 6px -2px …
```

How far something floats above the page is a fact about the layout. How much it
darkens what is behind it depends entirely on what is behind it — 8% black is
clear on white and invisible on `#141414`. The values used to be literal
`rgba(0, 0, 0, 0.1)`, so a card that floated in the light theme went flat in the
dark one and nothing in the type system noticed.

| Theme | Ground    | ambient | direct | Ground moves by |
| ----- | --------- | ------- | ------ | --------------- |
| light | `#fcfcfc` | 0.08    | 0.14   | 20–35 / 255     |
| dark  | `#141414` | 0.48    | 0.72   | 10–14 / 255     |

The six-fold jump in alpha looks drastic and is not: it is what puts the dark
theme back at roughly the separation the light one gets for free. Shadow is not
carrying elevation alone there either — the dark surfaces already step 11 points
apart, so these reinforce a difference rather than invent one. Higher reads as a
smudge.

Every step above `xs` is two layers, which is what makes a shadow read as cast
rather than painted on: `direct` is tight and offset further down, `ambient` is
wide, soft and barely offset.

```
xs              resting card, separation only
s               raised: hovered card, small menu
m               floating: dropdown, popover, tooltip, toast
l               overlay: dialog, drawer
elevatedTop     sticky header, casting down
elevatedBottom  sticky footer or bottom sheet, casting up
```

These keep t-shirt names while the rest of the system moved to pixels, because a
shadow is four lengths and a colour. There is no single number to key it by.

## Everything measurable is keyed by pixels

```ts
vars.spacing[16]; // 1rem
vars.borderRadius[12]; // 0.75rem
vars.typography.fontSize[14]; // 0.875rem
vars.typography.lineHeight[20]; // 1.25rem
```

There is nothing to translate: a design says 16 and the code says 16. T-shirt
sizes buy nothing here and cost ordering — the radius scale these replaced had a
step named `s` (4px) next to one named `sm` (6px), and `base` (8px) sitting in
the middle of the ladder rather than at an end.

Two names survive, both because they are not measurements. `borderRadius.full`
asks for a pill whatever the element's height. `shadow` stays on `xs`/`s`/`m`/`l`
because a shadow is four numbers and a colour, so no single value could name it.

`0` is a token in both scales. Without it `padding: 0` has to be written raw,
which is the exact escape hatch a scale exists to close.

Only `color` and `typography` are namespaced, because only they hold several
groups. The rest sit directly on `vars` — `vars.spacing`, not
`vars.spacing.spacing`.

## Tailwind

Tailwind v4 dropped the JavaScript preset for CSS, so the integration is one
import:

```css
@import 'tailwindcss';
@import '@minuk-hwang-design-system/style-tokens/tailwind.css';
```

Every token becomes a utility, named after the token itself:

```html
<div class="bg-surface-default text-text-normal border-border-focus rounded-12">
  <span class="bg-status-error-normal text-status-error-on-normal">Failed</span>
  <span class="text-14 font-600 shadow-m bg-crimson-500/40">…</span>
</div>
```

No `dark:` needed for any of it. The utilities compile to `var(--surface-default)`
rather than to a copied value, and the variable is what the theme swaps — so a
single class is correct in both themes. `dark:` is still there for one-off
overrides, and it matches the same cascade the tokens use: an explicit
`data-theme` or `.dark` wins, and the OS preference applies only when neither is
set.

Alpha modifiers work on every colour (`bg-crimson-500/40`); v4 resolves them with
`color-mix`, so the channel-splitting trick v3 required is not needed here.

### Tailwind's own scales stay

The theme is added to Tailwind's defaults, not swapped for them. Where a name
collides ours wins — `bg-red-500` and `shadow-xs` resolve to our values — and
where it does not, Tailwind's survives: `bg-emerald-500`, `rounded-md`,
`font-bold`, `text-lg` all still work.

That is a deliberate trade, and it has one sharp edge worth knowing. **Tailwind's
colours do not follow the theme.** `bg-surface-default` turns dark on a dark
ground; `bg-emerald-500` stays the same bright green it was, and nothing warns
you. Shape is safe by construction — our radius steps are numbers and Tailwind's
are t-shirt sizes, so `rounded-12` and `rounded-md` cannot be confused for each
other.

A project that would rather have the token set be the only vocabulary can clear
whichever namespaces it wants to own. The clearing has to sit **between** the two
imports:

```css
@import 'tailwindcss';

/* Our tokens or nothing. bg-emerald-500 and rounded-md stop compiling;
   bg-transparent, bg-current and bg-inherit are static utilities and survive. */
@theme {
  --color-*: initial;
  --radius-*: initial;
  --shadow-*: initial;
}

@import '@minuk-hwang-design-system/style-tokens/tailwind.css';
```

Order is the whole trick, and getting it wrong fails loudly in one direction
only. Put the block after our import and it clears our tokens too — every colour
utility in the project stops compiling, ours included.

Left as opt-in because a preset that silently deletes half of Tailwind is a worse
first impression than one that adds to it.

### What is not mapped

**Spacing and line height.** Tailwind derives `p-4`, `gap-4` and `leading-6` from
one multiplier, so its numbers count quarter-rems where ours count pixels —
shipping our scale would make `p-4` silently mean 4px instead of 16px. Every
value in our spacing scale is already reachable through Tailwind's own numbering
(`p-4` is our `spacing.16`, `p-1.5` our `spacing.6`), so nothing is lost by
letting Tailwind keep the ladder it named first.

**`palette.text`, `palette.ui`, `palette.background`.** Role groups the semantic
layer already wraps. Exposing both would put two names on one value, and
`palette.text.normal` would collide with `textColor.normal` outright.

**The reset and the typography classes.** Preflight covers the reset, and
`text-16 font-600 leading-24` is how a Tailwind user expects to write what
`.title-large` bundles. Import `style-tokens.css` instead if you want ours.

Pretendard and Material Symbols are included, since `font-main` names them.

## Regenerating

The scales are generated, never hand-edited.

```bash
node scripts/generate-palette.js        # preview every scale
node scripts/generate-palette.js red 0  # preview one hue
node scripts/write-scales.js            # rewrite static/light.ts and dark.ts
node scripts/write-palette.js           # rewrite palette.ts
```

`style-tokens.css` and `tailwind.css` are generated too, by `pnpm build`. Both
read their variable blocks from `scripts/css-variables.js`, which is what stops
the two stylesheets from drifting apart.

Change a hue, its tuning, or the lightness ladder in `generate-palette.js` and
replay. That is what keeps fourteen scales consistent with each other.
