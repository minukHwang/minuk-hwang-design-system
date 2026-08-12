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
  neutralTuning,
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
     * The ink an interaction paints over whatever it is sitting on.
     *
     * Black on light, white on dark, and that flip is the whole point: an
     * interaction moves a surface *towards the text*, which is the one direction
     * that means the same thing in both themes. Elevation moves towards white;
     * these move the other way, and holding them apart is what stops a hover
     * from reading as a raised card.
     *
     * Steps on the `dim` and `lighten` ramps rather than alphas written out
     * here: those ramps are exactly "black at N%" and "white at N%", they
     * already existed, and the step number is the alpha in thousandths. Only
     * which of the two a theme points at belongs in this file.
     *
     * An overlay rather than a step on the *neutral* ramp, because a neutral
     * step only lands correctly on the one surface it was measured against. 10%
     * moves a light page by 24/255 and a white card by 26; the neutral step it
     * replaces moved them by 12 and 25.
     *
     * This was tried once and dropped, with the reason recorded: 4% shifted a
     * dark surface by ~3/255. It was black in both themes, which on a near-black
     * ground does nothing at all — black 4% on #1f1f1f moves one part in 255.
     */
    stateInk: {
      hover: 'var(--dim-100)',
      pressed: 'var(--dim-200)',
    },
    /**
     * What `pageBackground="raised"` resolves to, per theme.
     *
     * The dial is one unconditional attribute rule, and this is what decides
     * whether it does anything: light points it at the raised step, dark points
     * it back at the page's own. Written this way because the alternative —
     * guarding the attribute rule with `:not([data-theme='dark'])` — is wrong in
     * the state most people are in. That selector matches when there is no
     * attribute at all, which is every visitor on a dark OS who has not picked a
     * theme, so the light-only dial applied in dark.
     *
     * Steps rather than the semantic names: `--background-base` is the property
     * the dial overwrites, so naming it here would be a cycle.
     */
    /**
     * Which step each level reads, which is the one thing about the ramp that
     * genuinely differs by theme.
     *
     * A page is below the surfaces on it and a surface is nearer white, in both
     * themes — and the ramp runs light to dark on one and dark to light on the
     * other, so "nearer white" is its first step here and its second there.
     * Encoding that as two pointers keeps the ramp itself monotonic, which is
     * what a ramp is for.
     */
    level: {
      base: 'var(--neutral-50)',
      raised: 'var(--neutral-10)',
    },
    pageBackground: {
      base: 'var(--neutral-50)',
      raised: 'var(--neutral-10)',
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
    /** White here, for the reason spelled out on the light theme's copy. */
    stateInk: {
      hover: 'var(--lighten-100)',
      pressed: 'var(--lighten-200)',
    },
    /** The other way round: dark's ramp starts at its darkest. */
    level: {
      base: 'var(--neutral-10)',
      raised: 'var(--neutral-50)',
    },
    /** `raised` is a no-op: dark's page is already as far from white as the ramp goes. */
    pageBackground: {
      base: 'var(--neutral-10)',
      raised: 'var(--neutral-10)',
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

/**
 * The measurements behind each `onSolid`, kept rather than discarded.
 *
 * The rule is one line — white if it clears 4.5, otherwise black — and on
 * several hues the two answers are close enough that the line is a judgement
 * rather than a calculation. Red carries white at 4.52 and black at 4.64: both
 * legible, and the rule takes white because a red button set in black reads as a
 * hazard sign rather than as a button.
 *
 * A judgement that cannot be inspected is indistinguishable from an accident, so
 * the numbers ship, and the documentation renders them beside the fill.
 */
const contrastRows = theme =>
  CHROMATIC_ORDER.map(name => {
    const fill = buildScale(HUES[name], theme, TUNING[name] ?? {})[500];
    const { white, black } = contrastReport(fill);
    // Two decimals, as a number rather than a string. `toFixed` alone emits
    // `14.20`, which is not how JavaScript prints that number — so the file the
    // generator wrote and the file the formatter leaves behind disagreed.
    const num = value => Number(value.toFixed(2));
    return (
      `    ${name}: { fill: '${fill}', white: ${num(white)}, ` +
      `black: ${num(black)}, chosen: '${onSolid(fill) === '#ffffff' ? 'white' : 'black'}' },`
    );
  }).join('\n');

/**
 * Its own file rather than a group inside the per-theme scales.
 *
 * Everything in `static/light.ts` is walked by the stylesheet generator and
 * turned into custom properties, and a group whose values are objects comes out
 * as `--contrast-red: [object Object]`. This is data about the colours, not a
 * colour.
 */
const writeContrast = () => {
  const body = ['light', 'dark']
    .map(theme => `  ${theme}: {\n${contrastRows(theme)}\n  },`)
    .join('\n');

  const file = path.join(STATIC_DIR, 'contrast.ts');
  writeFileSync(
    file,
    `/**
 * What white and black measure against each solid fill, per theme.
 *
 * GENERATED FILE. Run \`node scripts/write-scales.js\` to rebuild.
 *
 * \`onSolid\` is one line — white if it clears 4.5, otherwise black — and on
 * several hues the two answers are close enough that the line is a judgement
 * rather than a calculation. Red carries white at 4.52 and black at 4.64: both
 * legible, and the rule takes white because a red button set in black reads as a
 * hazard sign rather than as a button.
 *
 * A judgement that cannot be inspected is indistinguishable from an accident, so
 * the numbers ship. It is also the only way to notice that retuning a hue left
 * its margin at 0.02.
 */

export type ContrastMeasurement = {
  /** The 500 step, which is what a solid fill uses. */
  fill: string;
  /** Ratio against white text. AA wants 4.5 for body copy, 3 for large. */
  white: number;
  black: number;
  chosen: 'white' | 'black';
};

export const contrast: Record<'light' | 'dark', Record<string, ContrastMeasurement>> = {
${body}
};
`
  );
  console.log(`wrote ${path.relative(process.cwd(), file)}`);
};

['light', 'dark'].forEach(theme => {
  const blocks = [header(theme)];

  blocks.push('/* Chromatic scales, ordered around the colour wheel. */\n');
  CHROMATIC_ORDER.forEach(name => {
    blocks.push(renderScale(name, buildScale(HUES[name], theme, TUNING[name] ?? {})));
  });

  blocks.push('\n/* Neutrals, ordered by how much blue they carry. */\n');
  Object.entries(NEUTRALS).forEach(([name, { hue, saturation }]) => {
    blocks.push(renderScale(name, buildScale(hue, theme, neutralTuning(saturation, theme))));
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

writeContrast();
