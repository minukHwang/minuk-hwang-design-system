/**
 * Renders the token set as CSS custom properties.
 *
 * Shared by the two stylesheets the package ships: `style-tokens.css` for
 * consumers writing plain CSS, and `tailwind.css` for consumers writing
 * Tailwind. Both need the same variable blocks, and a second copy of this logic
 * is how the two files quietly drift apart.
 *
 * Theme switching is layered so that automatic and manual selection can coexist:
 *   html                                   light values (the default)
 *   @media (dark) html:not([data-theme])    follows the OS unless overridden
 *   html[data-theme="dark"] / html.dark     explicit override wins
 */

import * as theme from '../dist/index.js';

const SELECTOR = 'html';

/** `elevatedPrimary` has to become `elevated-primary` to be a legal property name. */
export const toKebabCase = str =>
  str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

/** Renders one group of tokens as `--group-key: value;` lines. */
const renderGroup = (groupName, group, indent = '\t') =>
  Object.entries(group)
    .map(([key, value]) => `${indent}--${toKebabCase(groupName)}-${toKebabCase(key)}: ${value};`)
    .join('\n');

/** Renders every group in a theme's scale set. */
const renderTheme = (scales, indent = '\t') =>
  Object.entries(scales)
    // `text` is emitted as ramp pointers instead, so it follows `data-neutral`.
    .filter(([groupName]) => groupName !== 'text')
    .map(([groupName, group]) => renderGroup(groupName, group, indent))
    .join('\n\n');

/**
 * Renders the semantic layer, which nests one level deeper than the rest.
 *
 * `status` is a group of groups — `status.error.normal` — so a flat renderer
 * would emit `--status-error: [object Object]`. Recursing on plain objects
 * keeps both shapes working from one pass.
 */
const renderSemantic = (prefix, node, indent = '\t') =>
  Object.entries(node)
    .map(([key, value]) => {
      const name = `${prefix}-${toKebabCase(key)}`;
      return typeof value === 'object'
        ? renderSemantic(name, value, indent)
        : `${indent}--${name}: ${value};`;
    })
    .join('\n');

/*
 * ============================================
 * Theme dials
 * ============================================
 */

/**
 * The accent ramp, and one block per hue that can replace it.
 *
 * The default sits in the root block so it is present without any attribute;
 * the hue blocks are attribute selectors, which outrank `html` on specificity
 * rather than on source order. That matters — the two files this module feeds
 * assemble their sections differently, and a rule that depended on which came
 * last would work in one and not the other.
 *
 * Unqualified on purpose. `html[data-accent]` would allow exactly one accent per
 * document; this way a subtree can carry its own, and custom-property
 * inheritance takes it the rest of the way down.
 */
const accentRamp = (hue, indent = '\t') =>
  [
    ...theme.accentSteps.map(step => `${indent}--accent-${step}: var(--${hue}-${step});`),
    `${indent}--accent-on-solid: var(--on-solid-${hue});`,
  ].join('\n');

/**
 * Every semantic token whose value is read off the accent ramp.
 *
 * These have to be repeated in each hue's block, and that is not a nicety. A
 * custom property's `var()` references are substituted where the property is
 * declared, not where it is used — so `--accent-normal: var(--accent-500)`,
 * declared once on `html`, resolves against the accent `html` has and hands
 * every descendant that finished color. A nested block that changes
 * `--accent-500` changes nothing the components read, because they read
 * `--accent-normal`, and that was settled two elements up.
 *
 * Collected by looking for the reference rather than by listing the names, so a
 * semantic token added later cannot quietly opt out of nesting.
 */
const accentDerived = (indent = '\t') =>
  Object.entries(theme.vars.color.$semantic)
    .map(([groupName, group]) => renderSemantic(toKebabCase(groupName), group, indent))
    .join('\n')
    .split('\n')
    .filter(line => /var\(--accent-/.test(line))
    .join('\n');

const accentBlocks = () =>
  theme.accentColors
    .map(hue => `[data-accent='${hue}'] {\n${accentRamp(hue)}\n${accentDerived()}\n}`)
    .join('\n\n');

/**
 * The neutral ramp, and one block per family that can replace it.
 *
 * `--neutral-*` is a pointer, not a family — which is why the pure gray is
 * called `mono`. Written the other way the selected block would read
 * `--neutral-10: var(--neutral-10)`, a cycle the browser throws away.
 */
const neutralRamp = (family, indent = '\t') =>
  [
    ...theme.neutralSteps.map(step => `${indent}--neutral-${step}: var(--${family}-${step});`),
    // Measured against this family's solid step, exactly as the accent's is
    // against its hue's. Unlike the accent's it differs by theme, because a
    // neutral's solid step is the far end of the ramp rather than its middle.
    `${indent}--neutral-on-solid: var(--on-solid-${family});`,
  ].join('\n');

/**
 * The surfaces and borders that resolve through the neutral ramp, repeated in
 * each family's block for the reason the accent's are: a `var()` inside a custom
 * property is substituted where that property is declared, so a semantic token
 * defined once on `html` is already the gray `html` chose.
 */
const neutralDerived = (indent = '\t') =>
  Object.entries(theme.vars.color.$semantic)
    .map(([groupName, group]) => renderSemantic(toKebabCase(groupName), group, indent))
    .join('\n')
    .split('\n')
    .filter(line => /var\(--neutral-/.test(line))
    .join('\n');

const neutralBlocks = () =>
  theme.neutralColors
    .map(
      family =>
        `[data-neutral='${family}'] {\n${neutralRamp(family)}\n${textRamp()}\n${neutralDerived()}\n}`
    )
    .join('\n\n');

/**
 * The text grays, expressed as steps on the neutral ramp.
 *
 * They were authored by hand, and measuring them showed they had been picked off
 * that ramp anyway: in the dark theme all four are the mono step exactly, and in
 * the light theme two of them are. So they were steps written out as literals,
 * which is the one form that cannot follow `data-neutral` — a page on `slate`
 * had slate panels and borders around pure gray body copy.
 *
 * Two light values move by being written this way. `strong` was #000000 and
 * becomes the 990 step, and `assistive` had been nudged a shade darker than 600
 * to clear 4.5:1. Both still measure well above it, at 18.3:1 and 5.4:1 on the
 * canvas.
 *
 * `inverse` is not here. It is white on a filled surface, and white is white.
 */
const TEXT_STEPS = { normal: 950, assistive: 600, alternative: 800, strong: 990 };

const textRamp = (indent = '\t') =>
  Object.entries(TEXT_STEPS)
    .map(([role, step]) => `${indent}--text-${role}: var(--neutral-${step});`)
    .join('\n');

/**
 * The page's own level.
 *
 * One rule with no theme in it. Whether it does anything is decided by
 * `--page-background-raised`, which the theme blocks set — the raised step on
 * light, the page's own step on dark, where there is nothing above the page to
 * move it to.
 *
 * Guarding this selector by theme instead was wrong in the commonest state.
 * `:not([data-theme='dark'])` matches an element with no such attribute, which
 * is every visitor on a dark OS who has not chosen a theme, so a light-only dial
 * applied in dark to most of the people who would see it.
 *
 * Only the non-default value gets a block, and the selector is qualified to
 * `html` because that is the only element this can be about. Both values still
 * exist as properties, which is what lets a page documenting the dial paint one
 * block each way while itself sitting on one of them.
 */
const pageBlocks = () =>
  theme.pageBackgrounds
    .filter(level => level !== theme.defaultPageBackground)
    .map(
      level =>
        `${SELECTOR}[data-page-background='${level}'] {\n\t--background-base: var(--page-background-${level});\n}`
    )
    .join('\n\n');

const PILL = theme.borderRadiusValues.full;

/**
 * Radius, as a value multiplied by a factor.
 *
 * `0` and `full` are written out rather than run through the multiplication:
 * zero times anything is zero, and a pill is not a measurement the factor can
 * scale — 999px times 2 is still a pill. `full` reads a property of its own so
 * that `radius="none"` can square it, which is what asking for no radius means
 * even on a chip.
 *
 * `half` goes through the multiplication like any other step, because a
 * percentage is a measurement: 50% × 0.5 is a rounded square and 50% × 1.5 is
 * clamped back to a circle, which is the ladder a square box wants.
 *
 * Named `--border-radius-factor` rather than `--radius-factor` to stay out of
 * Tailwind's `--radius-*` namespace, where it would have generated a
 * `rounded-factor` utility.
 */
const renderRadius = (indent = '\t') =>
  Object.entries(theme.borderRadiusValues)
    .map(([step, value]) => {
      if (step === 'full') return `${indent}--border-radius-full: var(--border-radius-pill);`;
      if (value === '0rem') return `${indent}--border-radius-${step}: 0rem;`;
      return `${indent}--border-radius-${step}: calc(${value} * var(--border-radius-factor));`;
    })
    .join('\n');

/**
 * The two pill flags, which point opposite ways.
 *
 * `--border-radius-pill` is a pill on every scale but `none`; components that
 * are pill-shaped by nature read it. `--border-radius-pill-full` is zero on
 * every scale but `full`, and components that should go pill-shaped only when
 * asked read it through `max()`, so the step wins until it doesn't.
 */
const pillFlags = (scale, indent = '\t') => [
  `${indent}--border-radius-pill: ${scale === 'none' ? '0rem' : PILL};`,
  `${indent}--border-radius-pill-full: ${scale === 'full' ? PILL : '0rem'};`,
];

const radiusDefaults = indent =>
  [
    `${indent}--border-radius-factor: ${theme.radiusFactors[theme.defaultRadiusScale]};`,
    ...pillFlags(theme.defaultRadiusScale, indent),
  ].join('\n');

/**
 * A scale's block carries the whole ladder, not just the factor it multiplies.
 *
 * For the same reason the accent blocks repeat their semantic tokens. Each step
 * is `calc(0.5rem * var(--border-radius-factor))`, and that multiplication
 * happens where the step is declared — so a ladder declared only on `html` is a
 * ladder already multiplied by the factor `html` had. Descendants inherit the
 * answer, not the sum, and a nested `<Theme radius>` moved a number nothing
 * would read again.
 *
 * It cost fifty declarations to fix, which is what the whole thing weighs
 * gzipped once ten of them repeat five times over.
 */
const radiusBlocks = () =>
  theme.radiusScales
    .map(
      scale =>
        `[data-radius='${scale}'] {\n${[
          `\t--border-radius-factor: ${theme.radiusFactors[scale]};`,
          ...pillFlags(scale),
          renderRadius(),
        ].join('\n')}\n}`
    )
    .join('\n\n');

/**
 * Builds the four theme blocks.
 *
 * $palette is skipped on purpose: every entry is already `var(--red-500)` and so
 * on, so emitting it would define each property in terms of itself. $semantic
 * points at those same palette properties rather than at itself, which is what
 * makes it safe to emit — and theme-aware for free, since the properties it
 * names are the ones the theme blocks below rewrite.
 */
export const generateCssVariables = () => {
  const { $absolute, $semantic } = theme.vars.color;
  const { light: lightScales, dark: darkScales } = theme.generatedScales;

  // Absolute values sit in the light block because it doubles as the root.
  // They are not repeated per theme — that is what makes them absolute.
  const absolute = [
    Object.entries($absolute.color)
      .map(([key, value]) => `\t--${toKebabCase(key)}: ${value};`)
      .join('\n'),
    renderGroup('dim', $absolute.dim),
    renderGroup('lighten', $absolute.lighten),
  ].join('\n\n');

  // Semantic tokens resolve through the palette, so one definition covers both
  // themes. They live in the root block for the same reason the absolutes do.
  const semantic = Object.entries($semantic)
    .map(([groupName, group]) => renderSemantic(toKebabCase(groupName), group))
    .join('\n\n');

  // Non-color token groups (spacing, radius, shadow, typography) never vary by
  // theme, so they join the root block alongside the absolutes.
  //
  // `typography` and `motion` are namespaces holding several groups, so they
  // render their children and drop their own name — `--font-size-14`, not
  // `--typography-font-size-14`. The rest are one group and keep it.
  //
  // `shadow` is both: flat steps beside a nested `up`. The recursive renderer
  // handles that shape without needing to know which it is, and produces
  // `--shadow-m` and `--shadow-up-m` from the same pass.
  //
  // `borderRadius` is excluded because it is the one group whose properties are
  // not their own values: every step is `calc(value * factor)`, and the object
  // in `vars` holds `var(--border-radius-8)` so components can follow the dial.
  // Running it through here would emit each property in terms of itself.
  const isNamespace = node => Object.values(node).every(value => typeof value === 'object');

  const nonColor = Object.entries(theme.vars)
    .filter(([key]) => key !== 'color' && key !== 'borderRadius')
    .map(([name, group]) =>
      isNamespace(group) ? renderTheme(group) : renderSemantic(toKebabCase(name), group)
    )
    .join('\n\n');

  const root = [
    renderTheme(lightScales),
    absolute,
    accentRamp(theme.defaultAccentColor),
    neutralRamp(theme.defaultNeutralColor),
    textRamp(),
    radiusDefaults('\t'),
    renderRadius(),
    semantic,
    nonColor,
  ].join('\n\n');

  return {
    light: `${SELECTOR} {\n${root}\n}`,
    // Only follow the OS when the page has not asked for a specific theme.
    dark: `@media (prefers-color-scheme: dark) {\n\t${SELECTOR}:not([data-theme]) {\n${renderTheme(darkScales, '\t\t')}\n\t}\n}`,
    darkClass: [`${SELECTOR}[data-theme="dark"]`, `${SELECTOR}.dark`]
      .map(sel => `${sel} {\n${renderTheme(darkScales)}\n}`)
      .join('\n\n'),
    lightClass: [`${SELECTOR}[data-theme="light"]`, `${SELECTOR}.light`]
      .map(sel => `${sel} {\n${renderTheme(lightScales)}\n}`)
      .join('\n\n'),
  };
};

/**
 * Every block in cascade order, ready to concatenate.
 *
 * The dials come last so they read in the order they take effect, though they do
 * not depend on it: attribute selectors outrank `html` either way.
 */
export const cssVariableBlocks = () => {
  const { light, dark, darkClass, lightClass } = generateCssVariables();
  return [
    light,
    dark,
    darkClass,
    lightClass,
    accentBlocks(),
    neutralBlocks(),
    radiusBlocks(),
    pageBlocks(),
  ];
};

/**
 * Webfonts the token set names. Bare specifiers, resolved by the consumer's bundler.
 *
 * Pretendard arrives as the dynamic subset of the variable font rather than as
 * the nine static weights, which is a different quantity of font rather than a
 * different font.
 *
 * The static build is one file per weight with no `unicode-range` on any of
 * them, so a browser downloads the whole 0.75 MB of a weight the moment one
 * character asks for it. The set uses five, which is 3.7 MB before a page has
 * drawn a word of Korean it did not need.
 *
 * The variable build is one drawing with a weight axis, so the five weights stop
 * being five downloads. The dynamic subset then cuts it along `unicode-range`,
 * and the browser fetches only the ranges a page actually sets: tens of
 * kilobytes for Latin, and Korean by the block rather than all of it.
 *
 * It is also the build the documentation site had been linking from a CDN on top
 * of this import, so the two were fetching the same face twice by two different
 * routes.
 */
export const FONT_IMPORTS = [
  `@import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';`,
  `@import 'material-symbols';`,
];
