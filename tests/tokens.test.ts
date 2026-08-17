/**
 * The token README makes claims with numbers in them, and the scales are
 * generated, so a change to a generator can quietly make the prose wrong.
 *
 * Only the checkable ones are here: counts, named steps, and the literal values
 * the README quotes in a code sample. Nothing about whether a color is the
 * right color — that is a judgement, and a test that encoded it would just be
 * the palette written twice.
 */

import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { load, root } from './helpers';

const pkgDir = path.join(root, 'packages/style-tokens');

const tokens = await load(path.join(pkgDir, 'dist', 'index.js'));
const vars = tokens.vars as any;

const css = fs.readFileSync(path.join(pkgDir, 'dist', 'style-tokens.css'), 'utf8');

/** "Fourteen chromatic scales", in the order the README lists them by hue. */
const CHROMATIC = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'teal',
  'cyan',
  'blue',
  'indigo',
  'purple',
  'magenta',
  'pink',
  'crimson',
];

/** "Three neutrals, ordered by how much blue they carry." */
const NEUTRAL = ['mono', 'gray', 'slate'];

/** "Every scale runs 13 steps." */
const STEPS = [
  '10',
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
  '990',
];

describe('the palette', () => {
  it('holds fourteen chromatic scales and three neutrals', () => {
    const palette = vars.color.$palette;
    const scales = Object.keys(palette).filter(name =>
      Object.keys(palette[name]).every(key => /^\d+$/.test(key))
    );

    expect(scales.sort()).toEqual([...CHROMATIC, ...NEUTRAL].sort());
  });

  it('gives every scale the same thirteen steps', () => {
    const wrong = [...CHROMATIC, ...NEUTRAL].filter(
      name => Object.keys(vars.color.$palette[name]).sort().join() !== [...STEPS].sort().join()
    );

    expect(wrong).toEqual([]);
  });

  /*
   * The groups the Tailwind theme skips. They are keyed by role rather than by
   * step, which is what `build-tailwind.js` filters on, so adding a role group
   * keyed by number would silently start emitting utilities for it.
   */
  it('keys its role groups by name rather than by step', () => {
    const palette = vars.color.$palette;
    const roles = Object.keys(palette).filter(name =>
      Object.keys(palette[name]).some(key => !/^\d+$/.test(key))
    );

    expect(roles.sort()).toEqual(['level', 'onSolid', 'shadowColor', 'stateInk', 'text']);
  });

  it('offers the fourteen chromatic scales as accents and the three neutrals as neutrals', () => {
    expect([...(tokens.accentColors as string[])].sort()).toEqual([...CHROMATIC].sort());
    expect(tokens.neutralColors).toEqual(NEUTRAL);
  });
});

describe('transparency', () => {
  it('runs both alpha ramps eleven steps', () => {
    expect(Object.keys(vars.color.$absolute.dim)).toHaveLength(11);
    expect(Object.keys(vars.color.$absolute.lighten)).toHaveLength(11);
  });

  it('modulates with one number', () => {
    expect(vars.opacity).toEqual({ disabled: 0.38 });
  });
});

describe('contrast', () => {
  /**
   * "Seven of the fourteen are dark enough at full chroma to carry white text."
   * The value is generated from a measured ratio, so a hue tuned a shade
   * lighter moves a family across the line without anyone deciding to.
   */
  it('carries white text on seven of the fourteen solid fills', () => {
    const white = CHROMATIC.filter(name => {
      const match = css.match(new RegExp(`--on-solid-${name}:\\s*(#[0-9a-f]{6})`, 'i'));
      return match?.[1] === '#ffffff';
    });

    expect(white.sort()).toEqual(
      ['red', 'crimson', 'pink', 'magenta', 'purple', 'indigo', 'blue'].sort()
    );
  });

  it('points warning at amber, one step further along than the rest', () => {
    const status = vars.color.$semantic.status;

    expect(status.warning.normal).toBe('var(--amber-500)');
    expect(status.warning.strong).toBe('var(--amber-800)');
    expect([status.success.strong, status.error.strong, status.info.strong]).toEqual([
      'var(--green-700)',
      'var(--red-700)',
      'var(--blue-700)',
    ]);
  });
});

describe('the measurable scales', () => {
  it('keys spacing, radius and type by pixels', () => {
    expect(vars.spacing[16]).toBe('1rem');
    expect((tokens.borderRadiusValues as Record<string, string>)[12]).toBe('0.75rem');
    expect(vars.typography.fontSize[14]).toBe('0.875rem');
    expect(vars.typography.lineHeight[20]).toBe('1.25rem');
  });

  it('includes zero, so `padding: 0` never has to be written raw', () => {
    expect(vars.spacing[0]).toBeDefined();
    expect((tokens.borderRadiusValues as Record<string, string>)[0]).toBeDefined();
  });

  it('keeps the two names that are not measurements', () => {
    expect((tokens.borderRadiusValues as Record<string, string>).full).toBeDefined();
    expect(Object.keys(vars.shadow)).toEqual(['xs', 's', 'm', 'l', 'up']);
    expect(Object.keys(vars.shadow.up)).toEqual(['xs', 's', 'm', 'l']);
  });
});

describe('motion', () => {
  it('ships the six durations the README tabulates', () => {
    const missing = ['70', '100', '150', '200', '300', '400'].filter(
      step => vars.motion.duration[step] === undefined
    );

    expect(missing).toEqual([]);
    expect(vars.motion.duration[200]).toBe('200ms');
  });

  it('names its curves by direction', () => {
    expect(Object.keys(vars.motion.easing)).toEqual(['standard', 'entrance', 'exit', 'linear']);
    expect(vars.motion.easing.entrance).toBe('cubic-bezier(0.05, 0.7, 0.1, 1)');
  });

  /**
   * "In both stylesheets." `style-tokens.css` gets it through the reset it
   * imports rather than writing it out, so the import has to be followed —
   * grepping the file alone would report it missing.
   */
  it.each(['style-tokens.css', 'tailwind.css'])('floors %s at 0.01ms', file => {
    const read = (name: string): string => {
      const source = fs.readFileSync(path.join(pkgDir, 'dist', name), 'utf8');
      return source.replace(/@import\s+'\.\/([^']+)';/g, (_, imported) => read(imported));
    };

    expect(read(file)).toMatch(/prefers-reduced-motion:\s*reduce/);
    expect(read(file)).toMatch(/transition-duration:\s*0?\.01ms\s*!important/);
  });
});
