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

const accentBlocks = () =>
  theme.accentColors.map(hue => `[data-accent='${hue}'] {\n${accentRamp(hue)}\n}`).join('\n\n');

/**
 * Radius, as a value multiplied by a factor.
 *
 * `0` and `full` are written out rather than run through the multiplication:
 * zero times anything is zero, and a pill is not a measurement the factor can
 * scale — 999px times 2 is still a pill. `full` reads a property of its own so
 * that `radius="none"` can square it, which is what asking for no radius means
 * even on an avatar.
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

const radiusDefaults = indent =>
  [
    `${indent}--border-radius-factor: ${theme.radiusFactors[theme.defaultRadiusScale]};`,
    `${indent}--border-radius-pill: ${theme.borderRadiusValues.full};`,
  ].join('\n');

const radiusBlocks = () =>
  theme.radiusScales
    .map(scale => {
      const lines = [`\t--border-radius-factor: ${theme.radiusFactors[scale]};`];
      // A pill is the one corner the factor cannot flatten, so `none` says so.
      if (scale === 'none') lines.push('\t--border-radius-pill: 0rem;');
      else lines.push(`\t--border-radius-pill: ${theme.borderRadiusValues.full};`);
      return `[data-radius='${scale}'] {\n${lines.join('\n')}\n}`;
    })
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
  const { $static, $absolute, $semantic } = theme.vars.color;

  // Absolute values sit in the light block because it doubles as the root.
  // They are not repeated per theme — that is what makes them absolute.
  const absolute = [
    Object.entries($absolute.color)
      .map(([key, value]) => `\t--${toKebabCase(key)}: ${value};`)
      .join('\n'),
    renderGroup('dim', $absolute.dim),
    renderGroup('lighten', $absolute.lighten),
    renderGroup('opacity', $absolute.opacity),
  ].join('\n\n');

  // Semantic tokens resolve through the palette, so one definition covers both
  // themes. They live in the root block for the same reason the absolutes do.
  const semantic = Object.entries($semantic)
    .map(([groupName, group]) => renderSemantic(toKebabCase(groupName), group))
    .join('\n\n');

  // Non-colour token groups (spacing, radius, shadow, typography) never vary by
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

  const nonColour = Object.entries(theme.vars)
    .filter(([key]) => key !== 'color' && key !== 'borderRadius')
    .map(([name, group]) =>
      isNamespace(group) ? renderTheme(group) : renderSemantic(toKebabCase(name), group)
    )
    .join('\n\n');

  const root = [
    renderTheme($static.light),
    absolute,
    accentRamp(theme.defaultAccentColor),
    radiusDefaults('\t'),
    renderRadius(),
    semantic,
    nonColour,
  ].join('\n\n');

  return {
    light: `${SELECTOR} {\n${root}\n}`,
    // Only follow the OS when the page has not asked for a specific theme.
    dark: `@media (prefers-color-scheme: dark) {\n\t${SELECTOR}:not([data-theme]) {\n${renderTheme($static.dark, '\t\t')}\n\t}\n}`,
    darkClass: [`${SELECTOR}[data-theme="dark"]`, `${SELECTOR}.dark`]
      .map(sel => `${sel} {\n${renderTheme($static.dark)}\n}`)
      .join('\n\n'),
    lightClass: [`${SELECTOR}[data-theme="light"]`, `${SELECTOR}.light`]
      .map(sel => `${sel} {\n${renderTheme($static.light)}\n}`)
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
  return [light, dark, darkClass, lightClass, accentBlocks(), radiusBlocks()];
};

/** Webfonts the token set names. Bare specifiers, resolved by the consumer's bundler. */
export const FONT_IMPORTS = [
  `@import 'pretendard/dist/web/static/pretendard.css';`,
  `@import 'material-symbols';`,
];
