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
    '@minuk-hwang-design-system/styles',
  ],
};

export default nextConfig;
