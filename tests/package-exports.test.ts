/**
 * An `exports` map is a promise about files, and nothing checks it.
 *
 * A subpath that points at a file the build never wrote fails in the consumer's
 * project rather than in ours: `pnpm build:packages` is happy, the docs site is
 * happy because it resolves through workspace symlinks, and the error only
 * appears once someone installs the tarball. That is how `style-tokens` shipped
 * 1.0.0 advertising two declaration files it did not build.
 */

import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { directories, root } from './helpers';

/** The published packages. `esbuild-config` is private and has no exports map. */
const PACKAGES = ['packages/style-tokens', 'packages/base/react', 'packages/components/react'];

/** Every path a subpath points at, flattened out of its condition object. */
const targets = (node: unknown): string[] => {
  if (typeof node === 'string') return [node];
  if (node === null || typeof node !== 'object') return [];
  return Object.values(node).flatMap(targets);
};

describe.each(PACKAGES)('%s', dir => {
  const pkgDir = path.join(root, dir);
  const pkg = JSON.parse(fs.readFileSync(path.join(pkgDir, 'package.json'), 'utf8'));
  const entries: [string, unknown][] = Object.entries(pkg.exports);

  const literal = entries.filter(([subpath]) => !subpath.includes('*'));
  const wildcard = entries.filter(([subpath]) => subpath.includes('*'));

  it('every fixed subpath points at a file that exists', () => {
    const missing = literal
      .flatMap(([subpath, node]) => targets(node).map(file => `${subpath} -> ${file}`))
      .filter(pair => !fs.existsSync(path.join(pkgDir, pair.split(' -> ')[1])));

    expect(missing).toEqual([]);
  });

  /*
   * The wildcard subpaths are the ones a consumer actually writes — `./button`,
   * `./button/style`. Driving the check from `src` rather than from `dist` is
   * deliberate: a component whose build silently produced nothing would leave
   * both sides of a dist-to-dist comparison empty and pass.
   */
  it.runIf(wildcard.length)('every source directory resolves through the wildcards', () => {
    const excluded = new Set(
      entries.filter(([, node]) => node === null).map(([subpath]) => subpath)
    );
    const names = directories(path.join(pkgDir, 'src')).filter(name => !excluded.has(`./${name}`));

    expect(names.length).toBeGreaterThan(0);

    const missing = wildcard.flatMap(([subpath, node]) =>
      names.flatMap(name =>
        targets(node)
          .map(file => file.replaceAll('*', name))
          .filter(file => !fs.existsSync(path.join(pkgDir, file)))
          .map(file => `${subpath.replaceAll('*', name)} -> ${file}`)
      )
    );

    expect(missing).toEqual([]);
  });
});
