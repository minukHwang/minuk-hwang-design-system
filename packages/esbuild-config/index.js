/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Shared esbuild runner
 * Builds every publishable package in the design system.
 */
const fs = require('fs');
const path = require('path');

const esbuild = require('esbuild');

/**
 * Decides whether a file should become its own entry point.
 *
 * - Only `.ts` / `.tsx` qualify, so plain modules (utils, helpers) are built too.
 * - `.css.ts` belongs to vanilla-extract and is pulled into the bundle that uses it.
 * - `.d.ts` is a declaration file and never an entry.
 *
 * @param fileName - File name to test
 * @returns True when the file should be an entry point
 */
const isEntryFile = fileName =>
  /\.tsx?$/.test(fileName) && !fileName.includes('.css.') && !fileName.endsWith('.d.ts');

/**
 * Walks `srcDir` and collects one entry point per component.
 *
 * A directory containing `index.ts(x)` is treated as a single component and is
 * not traversed any further. Otherwise the walk recurses and every qualifying
 * file becomes its own entry.
 *
 * @param srcDir - Source directory to scan
 * @returns Entry point paths relative to the package root
 */
const scanComponentEntryPoints = (srcDir = 'src') => {
  const entryPoints = [];

  if (!fs.existsSync(srcDir)) {
    return ['src/index.ts']; // Fall back to the barrel file
  }

  const scanDirectory = (dir, basePath = '') => {
    const items = fs.readdirSync(dir);

    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        // A folder holding index.ts(x) is the component itself
        const indexTs = path.join(itemPath, 'index.ts');
        const indexTsx = path.join(itemPath, 'index.tsx');

        if (fs.existsSync(indexTs)) {
          const relativePath = path.join(basePath, item, 'index.ts').replace(/\\/g, '/');
          entryPoints.push(`${srcDir}/${relativePath}`);
        } else if (fs.existsSync(indexTsx)) {
          const relativePath = path.join(basePath, item, 'index.tsx').replace(/\\/g, '/');
          entryPoints.push(`${srcDir}/${relativePath}`);
        } else {
          scanDirectory(itemPath, path.join(basePath, item));
        }
      } else if (isEntryFile(item)) {
        const relativePath = path.join(basePath, item).replace(/\\/g, '/');
        entryPoints.push(`${srcDir}/${relativePath}`);
      }
    });
  };

  scanDirectory(srcDir);

  /*
   * A barrel is never an entry. Building one would put every component back in
   * a single file, and one `'use client'` in it would carry the whole package
   * across the RSC boundary — which is the thing splitting the build exists to
   * prevent. Packages that genuinely have one root module, like style-tokens,
   * use `buildMode: 'bundle'` instead.
   */
  return entryPoints.filter(entry => !entry.includes('src/index.ts'));
};

/**
 * Builds a package into ESM and CJS outputs.
 *
 * @param options - Build options
 * @param options.entryPoints - Entry points used when buildMode is 'bundle'
 * @param options.pkg - The package's parsed package.json
 * @param options.config - Extra esbuild options merged into the base config
 * @param options.onBuildEnd - Called after each rebuild in watch mode
 * @param options.buildMode - 'bundle' for a single entry, 'separate' to scan per component
 */
const runBuild = ({
  entryPoints = ['src/index.ts'],
  pkg,
  config = {},
  onBuildEnd = () => void 0,
  buildMode = 'bundle',
}) => {
  const dev = process.argv.includes('--dev');
  const minify = !dev;
  const watch = process.argv.includes('--watch');

  const finalEntryPoints = buildMode === 'separate' ? scanComponentEntryPoints() : entryPoints;

  /**
   * Modules kept out of the bundle.
   *
   * The list is derived from dependencies + peerDependencies:
   * - dependencies are installed alongside the package, so bundling them only duplicates code
   * - peerDependencies are supplied by the consumer and must never be bundled
   * - devDependencies are build tooling and are never imported by source
   *
   * Each name is paired with a `${dep}/*` pattern so subpath imports
   * (react/jsx-runtime, @vanilla-extract/sprinkles/createRuntimeSprinkles) stay external too.
   */
  const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ].flatMap(dep => [dep, `${dep}/*`]);

  const baseConfig = {
    entryPoints: finalEntryPoints,
    bundle: true,
    minify,
    sourcemap: true,
    outdir: 'dist',
    /**
     * Without an explicit outbase, esbuild derives it from the lowest common
     * ancestor of all entry points. A package with a single entry would collapse
     * to `src/<component>`, flattening the output and desyncing it from the
     * `.d.ts` paths tsc emits. Pin it so both always agree.
     */
    outbase: 'src',
    target: 'es2019',
    external,
    ...config,
  };

  /** Emits ESM and CJS in parallel. */
  async function executeBuild() {
    /**
     * Code shared by two entry points is hoisted into a chunk both import,
     * rather than copied into each.
     *
     * Without it, building per component means building each one as if it were
     * alone: Button pulls in Spinner, Spinner is also its own entry, and a page
     * using both ships that code twice. It showed up first in the stylesheets —
     * the spinner's `@keyframes` was in three of them.
     *
     * ESM only. `splitting` needs static `import`, and CJS has no equivalent to
     * hoist into, so esbuild rejects it outright.
     *
     * The trade is that a component's entry is no longer one self-contained
     * file. That is fine for a package consumed through a bundler, which is what
     * `exports` already assumes.
     */
    const esmConfig = {
      ...baseConfig,
      format: 'esm',
      splitting: buildMode === 'separate',
    };

    const cjsConfig = {
      ...baseConfig,
      format: 'cjs',
      // Rename to .cjs so CJS output never collides with ESM
      outExtension: { '.js': '.cjs' },
    };

    if (watch) {
      const plugins = [
        ...(config.plugins || []),
        {
          name: 'watch-plugin',
          setup(build) {
            build.onEnd(() => {
              onBuildEnd();
            });
          },
        },
      ];

      // The watch callback only needs to fire once, so it rides on the ESM build
      const ctxESM = await esbuild.context({ ...esmConfig, plugins });
      const ctxCJS = await esbuild.context(cjsConfig);

      await Promise.all([ctxESM.watch(), ctxCJS.watch()]);
      console.log('Watching for update');
    } else {
      await Promise.all([esbuild.build(esmConfig), esbuild.build(cjsConfig)]);
    }
  }

  executeBuild().catch(error => {
    console.error('Build failed with error:', error);
    process.exit(1);
  });
};

module.exports = runBuild;
