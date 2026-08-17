/**
 * A compound component ships its parts three times over, and all three have to
 * agree.
 *
 * `Alert` is the object, `Alert.Root` reads off it. `Root` is the short name a
 * namespace import assembles into `Alert.Root` at the call site, which is the
 * only one of the three that survives the server boundary. `AlertRoot` is the
 * flat name for anyone who would rather not have a namespace.
 *
 * Adding a part means touching three places, and nothing in the type system
 * connects them. Miss one and the component works everywhere the author
 * happened to test it.
 */

import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { directories, load, root } from './helpers';

const pkgDir = path.join(root, 'packages/components/react');

const names = directories(path.join(pkgDir, 'src')).filter(name => name !== 'shared');

const modules = await Promise.all(
  names.map(async name => ({
    name,
    exports: await load(path.join(pkgDir, 'dist', name, 'index.js')),
  }))
);

/**
 * A bag of parts, told apart from the parts themselves.
 *
 * `React.forwardRef` returns an object rather than a function, so "is it an
 * object" does not separate the two. `$$typeof` does: React stamps it on
 * anything renderable and a plain object literal has none.
 */
const isPartBag = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !('$$typeof' in value);

const compounds = modules
  .map(({ name, exports }) => ({
    name,
    exports,
    bags: Object.entries(exports).filter(([, value]) => isPartBag(value)),
  }))
  .filter(({ bags }) => bags.length > 0);

it('every compound component exports exactly one bag of parts', () => {
  expect(compounds.filter(({ bags }) => bags.length > 1).map(({ name }) => name)).toEqual([]);
});

it('twelve components are compound', () => {
  expect(compounds.map(({ name }) => name)).toHaveLength(12);
});

describe.each(compounds.map(c => [c.bags[0][0], c] as const))('%s', (bagName, compound) => {
  const parts = compound.bags[0][1] as Record<string, unknown>;
  const partNames = Object.keys(parts);

  it('every part is exported under its short name', () => {
    const wrong = partNames.filter(part => compound.exports[part] !== parts[part]);
    expect(wrong).toEqual([]);
  });

  it('every part is exported under its prefixed name', () => {
    const wrong = partNames.filter(part => compound.exports[`${bagName}${part}`] !== parts[part]);
    expect(wrong).toEqual([]);
  });

  /*
   * The reverse direction. Without it, a part added as a short export but left
   * out of the object passes both checks above by never being looked at.
   */
  it('exports nothing beyond the bag, the short names and the prefixed names', () => {
    const expected = new Set([
      bagName,
      ...partNames,
      ...partNames.map(part => `${bagName}${part}`),
    ]);
    const extra = Object.keys(compound.exports).filter(name => !expected.has(name));
    expect(extra).toEqual([]);
  });
});
