/**
 * Writes the raw colour scales into src/variables/color/static.
 *
 * These two files are generated, never edited by hand. Every value comes out of
 * generate-palette.js, so a change to a hue, its tuning, or the lightness ladder
 * is made there and replayed here — that is what keeps fourteen scales
 * consistent with each other.
 *
 * Usage:
 *   node scripts/write-scales.js
 */

import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  STEPS,
  HUES,
  NEUTRALS,
  TUNING,
  buildScale,
  onSolid,
  contrastReport,
} from './generate-palette.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const STATIC_DIR = path.join(HERE, '..', 'src', 'variables', 'color', 'static');

/** Chromatic scales, ordered around the colour wheel rather than alphabetically. */
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

/** Renders one scale as a TypeScript const, darkest step first. */
const renderScale = (name, scale) => {
  const body = [...STEPS]
    .reverse()
    .map(step => `  ${step}: '${scale[step]}',`)
    .join('\n');
  return `export const ${name} = {\n${body}\n};`;
};

/**
 * Groups that carry authored values per theme rather than generated ones.
 *
 * Only two survive. `text` is the ramp every other text token is measured
 * against, and `shadowColor` is the one part of a shadow that varies by theme.
 *
 * The old `background` and `ui` groups are gone. `background` was a second,
 * hand-authored surface model whose values sat in no scale, and `ui` held a
 * brand blue that measured identical to `blue[500]` — both now go through the
 * semantic layer, which is where a role belongs.
 */
const THEME_SEMANTICS = {
  light: {
    text: {
      normal: '#1a1a1a',
      assistive: '#636363',
      alternative: '#3b3b3b',
      strong: '#000000',
    },
    /**
     * Shadow ink. Only the colour of a shadow varies by theme; its geometry does
     * not, which is why the two live apart — see variables/shadow.ts.
     *
     * A shadow works by darkening what is behind it, so how opaque it has to be
     * depends entirely on how dark that already is. On white, 8% reads clearly.
     */
    shadowColor: {
      ambient: 'rgb(0 0 0 / 0.08)',
      direct: 'rgb(0 0 0 / 0.14)',
    },
  },
  dark: {
    text: {
      normal: '#e3e3e3',
      assistive: '#a1a1a1',
      alternative: '#d1d1d1',
      strong: '#ededed',
    },
    /**
     * The same 8% over a dark canvas moves it by 2/255 — invisible. These are
     * the alphas that put a dark shadow back at roughly the same 10–15/255
     * separation the light theme gets, measured against neutral-10 (#141414).
     *
     * Shadow is not carrying elevation alone here: the dark surfaces already
     * step 11 points apart, so this reinforces a difference rather than
     * inventing one. Pushing the alpha higher to compensate reads as a smudge.
     */
    shadowColor: {
      ambient: 'rgb(0 0 0 / 0.48)',
      direct: 'rgb(0 0 0 / 0.72)',
    },
  },
};

const renderRecord = (name, record) => {
  const body = Object.entries(record)
    .map(([key, value]) => `  ${key}: '${value}',`)
    .join('\n');
  return `export const ${name} = {\n${body}\n};`;
};

const header = theme => `/**
 * Raw colour scales — ${theme} theme
 *
 * GENERATED FILE. Run \`node scripts/write-scales.js\` to rebuild.
 * Edit scripts/generate-palette.js instead; hand edits here are overwritten.
 *
 * Step 10 sits closest to the background and 990 furthest from it, which is why
 * the ${theme} scales run ${theme === 'light' ? 'light to dark' : 'dark to light'}.
 * A component can therefore name a step once and have it read correctly in both
 * themes without knowing which one is active.
 */
`;

/**
 * The text colour that clears WCAG AA on each scale's solid fill.
 *
 * Measured per theme rather than listed once, because the answer genuinely
 * differs: blue-500 carries white at 4.85:1 on light and fails at 4.43:1 on
 * dark, where black clears instead. A single value for both themes is a coin
 * flip on which one it fails, and the failure is invisible until someone
 * measures it.
 */
const buildOnSolid = theme =>
  Object.fromEntries(
    CHROMATIC_ORDER.map(name => {
      const fill = buildScale(HUES[name], theme, TUNING[name] ?? {})[500];
      const report = contrastReport(fill);
      if (!report.passes) {
        console.warn(
          `  ! ${theme} ${name}-500 (${fill}) clears neither: white ${report.white.toFixed(2)}, black ${report.black.toFixed(2)}`
        );
      }
      return [name, onSolid(fill)];
    })
  );

['light', 'dark'].forEach(theme => {
  const blocks = [header(theme)];

  blocks.push('/* Chromatic scales, ordered around the colour wheel. */\n');
  CHROMATIC_ORDER.forEach(name => {
    blocks.push(renderScale(name, buildScale(HUES[name], theme, TUNING[name] ?? {})));
  });

  blocks.push('\n/* Neutrals, ordered by how much blue they carry. */\n');
  Object.entries(NEUTRALS).forEach(([name, { hue, saturation }]) => {
    blocks.push(renderScale(name, buildScale(hue, theme, { saturation })));
  });

  blocks.push('\n/* Text colour that clears AA on each solid fill. Measured, not chosen. */\n');
  blocks.push(renderRecord('onSolid', buildOnSolid(theme)));

  blocks.push('\n/* Theme surfaces and text. Authored, not generated. */\n');
  Object.entries(THEME_SEMANTICS[theme]).forEach(([name, record]) => {
    blocks.push(renderRecord(name, record));
  });

  const file = path.join(STATIC_DIR, `${theme}.ts`);
  writeFileSync(file, blocks.join('\n') + '\n');
  console.log(`wrote ${path.relative(process.cwd(), file)}`);
});
