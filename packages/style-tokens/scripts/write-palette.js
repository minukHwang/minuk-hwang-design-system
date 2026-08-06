/**
 * Writes src/variables/color/palette.ts.
 *
 * The palette is the theme-aware view of the scales: every entry is a reference
 * to a CSS custom property rather than a literal. Swapping the theme rewrites
 * those properties, so a component that names `palette.blue[500]` follows the
 * theme without knowing it exists.
 *
 * Usage:
 *   node scripts/write-palette.js
 */

import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { STEPS, NEUTRALS } from './generate-palette.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, '..', 'src', 'variables', 'color', 'palette.ts');

const CHROMATIC_ORDER = [
  'red',
  'crimson',
  'pink',
  'magenta',
  'purple',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'lime',
  'yellow',
  'amber',
  'orange',
];

/** camelCase reads as kebab-case in CSS, so `coolGray` would be `--cool-gray`. */
const toKebab = s => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const renderScale = name => {
  const body = STEPS.map(step => `  ${step}: 'var(--${toKebab(name)}-${step})',`).join('\n');
  return `export const ${name} = {\n${body}\n};`;
};

const blocks = [
  `/**
 * Theme-aware palette.
 *
 * GENERATED FILE. Run \`node scripts/write-palette.js\` to rebuild.
 *
 * Each entry points at a custom property that the stylesheet redefines per
 * theme. Reach for these rather than the raw scales in static/ unless you
 * specifically need a value that must not change with the theme.
 */
`,
  '/* Chromatic scales, ordered around the colour wheel. */\n',
  ...CHROMATIC_ORDER.map(renderScale),
  '\n/* Neutrals, ordered by how much blue they carry. */\n',
  ...Object.keys(NEUTRALS).map(renderScale),
  `
/* Authored per-theme groups, mirroring static/. */

export const text = {
  normal: 'var(--text-normal)',
  assistive: 'var(--text-assistive)',
  alternative: 'var(--text-alternative)',
  strong: 'var(--text-strong)',
};

export const shadowColor = {
  ambient: 'var(--shadow-color-ambient)',
  direct: 'var(--shadow-color-direct)',
};`,
];

writeFileSync(OUT, blocks.join('\n') + '\n');
console.log(`wrote ${path.relative(process.cwd(), OUT)}`);
console.log(
  `  ${CHROMATIC_ORDER.length} chromatic + ${Object.keys(NEUTRALS).length} neutral scales`
);
