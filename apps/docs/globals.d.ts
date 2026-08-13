/**
 * Plain stylesheets, for editors that check side-effect imports.
 *
 * `next-env.d.ts` declares `*.module.css` because those imports have a value to
 * describe: a map of class names. A plain `.css` file has nothing to export and
 * Next does not declare it, so `import './globals.css'` resolves to a file
 * TypeScript can say nothing about.
 *
 * That is silent by default and an error under `noUncheckedSideEffectImports`,
 * which is off in this repository's `tsconfig.json` and on in at least one
 * editor. The published packages carry their own declaration for the same
 * reason; this one covers the app's own stylesheet.
 */
declare module '*.css';
