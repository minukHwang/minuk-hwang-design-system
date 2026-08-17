import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Loads a built module the way Node would rather than through Vite's transform.
 *
 * `@vite-ignore` on a dynamic import leaves the call alone, so what arrives is
 * the published file. Anything that rewrote it on the way in would defeat the
 * point of reading `dist` at all.
 */
export const load = (file: string): Promise<Record<string, unknown>> =>
  import(/* @vite-ignore */ pathToFileURL(file).href);

/** Immediate subdirectories, which is how every package names its entry points. */
export const directories = (dir: string): string[] =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();
