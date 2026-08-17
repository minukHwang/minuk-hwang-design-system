/**
 * Seven components render on the server, and the README says so by name.
 *
 * The directive is not something the source can be trusted for. esbuild drops
 * `'use client'` from anything it hoists into a shared chunk, which is how an
 * earlier attempt at the compound fix produced files whose source carried the
 * directive and whose output did not. So this reads the built entry points.
 *
 * The count matters as much as the membership. A new component that quietly
 * lands on the client side leaves the README claiming seven when there are six.
 */

import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { directories, root } from './helpers';

const pkgDir = path.join(root, 'packages/components/react');

/** The seven named in `packages/components/react/README.md`. */
const SERVER = ['badge', 'card', 'heading', 'icon', 'input', 'spinner', 'text'];

const names = directories(path.join(pkgDir, 'src')).filter(name => name !== 'shared');

/** Both formats, since a consumer can reach either one through the exports map. */
const OUTPUTS = ['index.js', 'index.cjs'];

/**
 * Every string-literal statement at the top of a file.
 *
 * Reading the first line is not enough. A directive prologue is a run of them,
 * and esbuild writes `"use strict";"use client";` in the CJS output — where a
 * first-line check reports that not one client component declares itself.
 */
const prologue = (source: string): string[] => {
  const found: string[] = [];
  const statement = /^\s*(['"])((?:(?!\1).)*)\1\s*;?/;

  let rest = source;
  let match: RegExpExecArray | null;
  while ((match = statement.exec(rest))) {
    found.push(match[2]);
    rest = rest.slice(match[0].length);
  }
  return found;
};

const directive = (dir: string, name: string, output: string) =>
  prologue(fs.readFileSync(path.join(dir, 'dist', name, output), 'utf8')).includes('use client');

describe.each(OUTPUTS)('components-react %s', output => {
  it('carries no directive in the seven documented server components', () => {
    expect(SERVER.filter(name => directive(pkgDir, name, output))).toEqual([]);
  });

  it('carries the directive in every other component', () => {
    const missing = names
      .filter(name => !SERVER.includes(name))
      .filter(name => !directive(pkgDir, name, output));
    expect(missing).toEqual([]);
  });
});

it('the README still describes seven of them', () => {
  const readme = fs.readFileSync(path.join(pkgDir, 'README.md'), 'utf8');
  expect(readme).toContain('Seven declare no');

  const listed = SERVER.map(name => name[0].toUpperCase() + name.slice(1));
  expect(listed.filter(name => !readme.includes(name))).toEqual([]);
});

/*
 * "Everything here is a client component", says the base README, and it is the
 * reason the layer above has only seven that are not. A primitive that lost its
 * directive would move the boundary without anyone deciding to.
 */
const baseDir = path.join(root, 'packages/base/react');

describe.each(OUTPUTS)('base-react %s', output => {
  it('carries the directive in every primitive', () => {
    const missing = directories(path.join(baseDir, 'src')).filter(
      name => !directive(baseDir, name, output)
    );
    expect(missing).toEqual([]);
  });
});
