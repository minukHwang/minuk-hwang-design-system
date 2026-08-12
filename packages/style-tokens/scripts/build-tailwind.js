/**
 * Emits dist/tailwind.css — the token set as a Tailwind v4 theme.
 *
 * Tailwind v4 dropped the JavaScript preset in favour of CSS: `@theme` declares
 * design tokens and Tailwind generates utilities from their names. So the
 * "preset" is a stylesheet, and one `@import` is the whole integration.
 *
 * Two details carry the weight:
 *
 * `@theme inline` makes `bg-surface-hover` compile to
 * `background-color: var(--surface-hover)` rather than to a copy of the value.
 * Without `inline` the value is snapshotted at build time and the theme stops
 * flipping — the utility would hold light-mode gray forever. The variables it
 * points at are redefined by the theme blocks below, so the flip is free.
 *
 * `@custom-variant dark` replaces Tailwind's default, which only checks
 * `prefers-color-scheme`. Ours has to match the same three-layer cascade the
 * variables use, or `dark:` and the tokens would disagree about which theme is
 * active the moment a page sets `data-theme` explicitly.
 */

import fs from 'fs';

import * as theme from '../dist/index.js';

import { FONT_IMPORTS, cssVariableBlocks, toKebabCase } from './css-variables.js';

/**
 * `textColor.normal` would otherwise become `--color-text-color-normal`.
 * Tailwind already says "color" by putting the token in the color namespace.
 */
const SEMANTIC_ALIASES = { textColor: 'text' };

/** `--color-red-500: var(--red-500);` — the shape every mapping below produces. */
const mapping = (namespace, name, source) => `\t--${namespace}-${name}: var(--${source});`;

/** Flattens `status.error.normal` to `status-error-normal`, leaving flat groups alone. */
const flatten = (prefix, node) =>
  Object.entries(node).flatMap(([key, value]) => {
    const name = `${prefix}-${toKebabCase(key)}`;
    return typeof value === 'object' ? flatten(name, value) : [name];
  });

/*
 * ============================================
 * Colors
 * ============================================
 */

/**
 * Semantic tokens first, because they are what a consumer should reach for.
 * `bg-surface-hover` survives a decision to restyle surfaces; `bg-neutral-100`
 * does not.
 */
const semanticColors = () =>
  Object.entries(theme.vars.color.$semantic).flatMap(([groupName, group]) => {
    const cssPrefix = toKebabCase(groupName);
    const twPrefix = SEMANTIC_ALIASES[groupName] ?? cssPrefix;
    return flatten(cssPrefix, group).map(name =>
      mapping('color', name.replace(cssPrefix, twPrefix), name)
    );
  });

/**
 * Then the raw ramps, for decoration the semantic layer has no name for.
 *
 * Only groups keyed by step number are exposed. `palette.text`, `palette.ui` and
 * `palette.background` are role groups that the semantic layer already wraps —
 * emitting both would put two names on one value, and `palette.text.normal`
 * would collide with `textColor.normal` outright.
 */
const isScale = group => Object.keys(group).every(key => /^\d+$/.test(key));

const paletteColors = () =>
  Object.entries(theme.vars.color.$palette)
    .filter(([, group]) => isScale(group))
    .flatMap(([groupName, group]) =>
      Object.keys(group).map(step =>
        mapping('color', `${groupName}-${step}`, `${groupName}-${step}`)
      )
    );

/** Black, white, and the two overlay ramps — the values that never flip. */
const absoluteColors = () => {
  const { color, dim, lighten } = theme.vars.color.$absolute;
  return [
    ...Object.keys(color).map(key => mapping('color', key, key)),
    ...Object.entries({ dim, lighten }).flatMap(([groupName, group]) =>
      Object.keys(group).map(step =>
        mapping('color', `${groupName}-${step}`, `${groupName}-${step}`)
      )
    ),
  ];
};

/*
 * ============================================
 * Everything else
 * ============================================
 */

/**
 * Non-color namespaces, mapped from our token values to Tailwind's names.
 *
 * These carry literal values rather than `var()` references, unlike the colors
 * above. Two of the namespaces Tailwind reserves — `--shadow-*` and
 * `--font-weight-*` — are the names we already use ourselves, so a reference
 * would read `--shadow-xs: var(--shadow-xs)`. Tailwind emits its theme into
 * `:root`, which outranks the `html` block ours lives in, and the property would
 * resolve to a cycle and drop out entirely. Nothing here varies by theme, so
 * inlining the value costs nothing and removes the hazard for the whole group.
 *
 * Spacing and line height are deliberately absent. Tailwind derives `p-4`,
 * `gap-4` and `leading-6` from a single multiplier, so its numbers count
 * quarter-rems where ours count pixels — `p-4` would silently mean 4px instead
 * of 16px. Every value in our spacing scale is already reachable through
 * Tailwind's own numbering (`p-4` is our spacing.16, `p-1.5` our spacing.6), so
 * nothing is lost by letting Tailwind keep the ladder it named first.
 *
 * Duration is absent for the same reason: `duration-200` already means 200ms in
 * Tailwind, which is exactly what our scale says. Easing does need mapping,
 * since `entrance` and `exit` are ours.
 */
const NON_COLOR = [
  { namespace: 'radius', group: theme.vars.borderRadius },
  { namespace: 'shadow', group: theme.vars.shadow },
  { namespace: 'font', group: theme.vars.typography.fontFamily },
  { namespace: 'text', group: theme.vars.typography.fontSize },
  { namespace: 'font-weight', group: theme.vars.typography.fontWeight },
  { namespace: 'ease', group: theme.vars.motion.easing },
];

/** Flattens `shadow.up.m` to `shadow-up-m`, leaving flat groups untouched. */
const flattenValues = (prefix, node) =>
  Object.entries(node).flatMap(([key, value]) => {
    const name = `${prefix}-${toKebabCase(key)}`;
    return typeof value === 'object' ? flattenValues(name, value) : [[name, value]];
  });

const nonColorTokens = () =>
  NON_COLOR.flatMap(({ namespace, group }) =>
    flattenValues(namespace, group).map(([name, value]) => `\t--${name}: ${value};`)
  );

/*
 * ============================================
 * Assembly
 * ============================================
 */

const section = (title, lines) => `\t/* ${title} */\n${lines.join('\n')}`;

const THEME_BLOCK = `@theme inline {
${[
  section('Semantic — reach for these first', semanticColors()),
  section('Palette ramps', paletteColors()),
  section('Absolute', absoluteColors()),
  section('Radius, shadow, type, easing', nonColorTokens()),
].join('\n\n')}
}`;

/**
 * Mirrors the variable cascade exactly: an explicit `data-theme` or `.dark`
 * always wins, and the OS preference applies only when neither is set.
 */
const DARK_VARIANT = `@custom-variant dark {
\t@media (prefers-color-scheme: dark) {
\t\t&:where(html:not([data-theme]), html:not([data-theme]) *) {
\t\t\t@slot;
\t\t}
\t}

\t&:where(html[data-theme='dark'], html[data-theme='dark'] *, html.dark, html.dark *) {
\t\t@slot;
\t}
}`;

/**
 * Preflight resets a great deal and does not do this one. Someone who gets
 * motion sickness from interface animation has told the OS so, and a token set
 * that ships animation curves owes them the floor that honours it.
 */
const REDUCED_MOTION = `@media (prefers-reduced-motion: reduce) {
\t*,
\t*::before,
\t*::after {
\t\tanimation-duration: 0.01ms !important;
\t\tanimation-iteration-count: 1 !important;
\t\ttransition-duration: 0.01ms !important;
\t\tscroll-behavior: auto !important;
\t}
}`;

const HEADER = `/*
 * @minuk-hwang-design-system/style-tokens — Tailwind v4 theme.
 *
 * Usage:
 *   @import 'tailwindcss';
 *   @import '@minuk-hwang-design-system/style-tokens/tailwind.css';
 *
 * No reset is included beyond a prefers-reduced-motion floor, which Preflight
 * does not provide. Consumers who want our full reset should import
 * style-tokens.css and skip this file.
 *
 * GENERATED FILE. Run 'pnpm build:tailwind' to rebuild.
 */`;

fs.writeFileSync(
  'dist/tailwind.css',
  [HEADER, ...FONT_IMPORTS, ...cssVariableBlocks(), REDUCED_MOTION, DARK_VARIANT, THEME_BLOCK]
    .join('\n\n')
    .trim() + '\n'
);

console.log('wrote dist/tailwind.css');
