/**
 * Emits dist/style-tokens.css — the framework-agnostic face of the token set.
 *
 * A consumer who wants nothing to do with TypeScript or vanilla-extract can load
 * this one file and get every token as a custom property, plus the typography
 * utility classes. That is the point of the tokens package: the values are
 * neutral, and how you consume them is your choice.
 *
 * Theme switching is layered so that automatic and manual selection can coexist:
 *   html                                  light values (the default)
 *   @media (dark) html:not([data-theme])   follows the OS unless overridden
 *   html[data-theme="dark"] / html.dark    explicit override wins
 */

import fs from 'fs';

import * as theme from '../dist/index.js';

const SELECTOR = 'html';

/** `elevatedPrimary` has to become `elevated-primary` to be a legal property name. */
const toKebabCase = str => str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

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
 * Builds the four theme blocks.
 *
 * $palette and $semantic are skipped on purpose: their values are already
 * `var(--…)` references, so emitting them would define a property in terms of
 * itself.
 */
const generateCssVariables = () => {
  const { $static, $absolute } = theme.vars.color;

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

  // Non-colour token groups (spacing, radius, shadow, typography) never vary by
  // theme, so they join the root block alongside the absolutes.
  const nonColour = Object.entries(theme.vars)
    .filter(([key]) => key !== 'color')
    .map(([, group]) => renderTheme(group))
    .join('\n\n');

  return {
    light: `${SELECTOR} {\n${renderTheme($static.light)}\n\n${absolute}\n\n${nonColour}\n}`,
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

/** Typography helpers, for consumers styling with plain CSS. */
const generateCssClasses = () =>
  Object.values(theme.classes)
    .map(group =>
      Object.entries(group)
        .map(([mainKey, mainValue]) =>
          Object.entries(mainValue)
            .map(([subKey, declarations]) => {
              const body = Object.entries(declarations)
                .map(([prop, value]) => `\t${toKebabCase(prop)}: ${value};`)
                .join('\n');
              return `.${toKebabCase(mainKey)}-${toKebabCase(subKey)} {\n${body}\n}`;
            })
            .join('\n\n')
        )
        .join('\n\n')
    )
    .join('\n\n');

const IMPORTS = [
  `@import './index.css';`,
  `@import 'pretendard/dist/web/static/pretendard.css';`,
  `@import 'material-symbols';`,
].join('\n');

const { light, lightClass, dark, darkClass } = generateCssVariables();

fs.writeFileSync(
  'dist/style-tokens.css',
  [IMPORTS, light, dark, darkClass, lightClass, generateCssClasses()].join('\n\n').trim() + '\n'
);

console.log('wrote dist/style-tokens.css');
