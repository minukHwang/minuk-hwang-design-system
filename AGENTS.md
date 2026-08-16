# Repository Guidelines

## Project Structure & Module Organization

This Nx monorepo groups shared code under `packages/` and runnable apps under `apps/`. UI primitives live in `packages/components/react/src`, design tokens in `packages/style-tokens/src`, and shared build tooling in `packages/esbuild-config`. The documentation site lives in `apps/docs`, a Next.js app that renders the built packages. Generated bundles land in each package’s `dist/` directory and should never be edited manually.

## Build, Test, and Development Commands

Use PNPM scripts from the workspace root:

- `pnpm install` — bootstrap all workspace dependencies.
- `pnpm dev` — run Nx in watch mode for active projects.
- `pnpm dev:docs` — rebuild the packages, then serve the documentation site on localhost.
- `pnpm build:packages` — compile publishable packages for release validation.
- `pnpm lint` / `pnpm format:check` — enforce ESLint + Prettier before submitting changes.
- `pnpm clean:all` — clear build artifacts across every project.

## Coding Style & Naming Conventions

TypeScript and React are mandatory; keep components and hooks in `.tsx`. Components should use PascalCase filenames (e.g., `InfoBox.tsx`), hooks use `useCamelCase.ts`. Prefer named exports for primitives; avoid default exports. Styling is handled with Vanilla Extract—co-locate `.css.ts` files beside components. Formatting is managed by Prettier (2-space indentation, 100 character lines) and linting by ESLint with enforced import ordering; run `pnpm lint:fix` if unsure.

## Testing Guidelines

Automated tests are not yet wired; place future unit tests beside source files as `*.test.tsx`. The documentation site is the current integration check — it imports each package's `dist/`, so a broken build surfaces as a broken page. When introducing tests, expose a matching Nx target so teammates can run `pnpm nx run <project>:test`. Document manual QA steps in PR descriptions until the automated suite stabilizes.

## Commit & Pull Request Guidelines

Commits must pass Husky + Commitlint with a leading gitmoji and conventional type, e.g., `:sparkles: feat: add badge component`. Group logical changes and avoid stack commits without descriptive bodies. Pull requests should summarize the motivation, link any GitHub issue, list verification steps (build, lint, docs site), and add updated screenshots or a preview URL when UI changes occur. Tag reviewers familiar with the affected package and wait for at least one approval before merging.

## Release & Publishing Notes

Package releases happen via `pnpm publish:tokens` and `pnpm publish:react`; run `pnpm build:packages` first to ensure fresh `dist/` outputs. Update package versions using workspace tooling and record any manual release steps in the PR so future agents can reproduce them.
