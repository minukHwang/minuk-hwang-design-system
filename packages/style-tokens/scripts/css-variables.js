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
  const isNamespace = node => Object.values(node).every(value => typeof value === 'object');

  const nonColour = Object.entries(theme.vars)
    .filter(([key]) => key !== 'color')
    .map(([name, group]) =>
      isNamespace(group) ? renderTheme(group) : renderSemantic(toKebabCase(name), group)
    )
    .join('\n\n');

  return {
    light: `${SELECTOR} {\n${renderTheme($static.light)}\n\n${absolute}\n\n${semantic}\n\n${nonColour}\n}`,
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

/** The four blocks in cascade order, ready to concatenate. */
export const cssVariableBlocks = () => {
  const { light, dark, darkClass, lightClass } = generateCssVariables();
  return [light, dark, darkClass, lightClass];
};

/** Webfonts the token set names. Bare specifiers, resolved by the consumer's bundler. */
export const FONT_IMPORTS = [
  `@import 'pretendard/dist/web/static/pretendard.css';`,
  `@import 'material-symbols';`,
];
