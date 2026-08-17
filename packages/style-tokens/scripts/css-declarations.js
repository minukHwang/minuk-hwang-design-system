/**
 * Declarations for the two stylesheets this package writes itself.
 *
 * esbuild sweeps `dist` for `.css` when it finishes, and both `style-tokens.css`
 * and `tailwind.css` are written by the scripts that run after it. So the sweep
 * never saw them, and 1.0.0 shipped an `exports` map pointing `types` at
 * `dist/style-tokens.css.d.ts` and `dist/tailwind.css.d.ts` — neither of which
 * existed. A consumer with `noUncheckedSideEffectImports` on gets an error on
 * the import the README opens with.
 *
 * Runs last in `build`, after both stylesheets are on disk.
 */

import esbuildConfig from '@minuk-hwang-design-system/esbuild-config';

esbuildConfig.emitCssDeclarations();

console.log('wrote a declaration beside every stylesheet in dist');
