/**
 * The design system packages ship built JavaScript with their CSS in separate
 * files, so nothing here has to compile vanilla-extract. `transpilePackages`
 * exists for the `'use client'` directives: the packages are ESM, and Next has
 * to walk them itself to see which modules are client components.
 *
 * That is also the point of documenting from the built output rather than from
 * source — if the published artifact is broken, this site breaks with it.
 */
const nextConfig = {
  /**
   * A production build writes somewhere else when asked to.
   *
   * `next build` empties `.next` and rewrites it, and `next dev` is reading that
   * same directory — so a build run while the site is open deletes the manifests
   * the dev server is holding, and it dies with ENOENT on
   * `routes-manifest.json`. Verifying a change should not take down the window
   * the change is being looked at in.
   *
   * `NEXT_DIST_DIR=.next-verify pnpm --filter docs build` gives that build its
   * own directory and leaves the running server alone. Unset, everything behaves
   * exactly as before.
   */
  distDir: process.env.NEXT_DIST_DIR || '.next',

  /*
   * The repo lints everything with one ESLint config, and CI runs it as its own
   * step. Letting `next build` lint again would run a second, differently
   * configured pass over the same files and report on rules the rest of the
   * repo does not use.
   */
  eslint: { ignoreDuringBuilds: true },

  transpilePackages: [
    '@minuk-hwang-design-system/components-react',
    '@minuk-hwang-design-system/base-react',
    '@minuk-hwang-design-system/behavior-react',
    '@minuk-hwang-design-system/style-tokens',
  ],

  /**
   * Let webpack notice when our own packages change, and no one else's.
   *
   * webpack treats everything under `node_modules` as immutable and snapshots it
   * once — sound for a dependency, wrong for these, which are workspace symlinks
   * with a watcher rebuilding them while the site is open.
   *
   * The failure is not subtle but it is misleading: a build that had cached the
   * minified `dist` reported `'mergeHandlers' is not exported from
   * behavior-react/utils` after the dev watcher rewrote the same file
   * unminified. The export was there both times; webpack was reading a snapshot
   * of a file that no longer existed in that shape, so the error pointed at the
   * package rather than at the cache.
   *
   * The pattern is webpack's default with our scope carved out of it, so every
   * other dependency keeps the cheap treatment.
   */
  webpack: config => {
    config.snapshot = {
      ...config.snapshot,
      managedPaths: [/^(.+?[\\/]node_modules[\\/])(?!@minuk-hwang-design-system)/],
    };
    return config;
  },
};

export default nextConfig;
