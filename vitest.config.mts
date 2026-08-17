import { defineConfig } from 'vitest/config';

/**
 * These tests read what the build produced, not what the source says.
 *
 * Both bugs that shipped in 1.0.0 were invisible in the source and only
 * existed in `dist` — a selector whose specificity was wrong once generated,
 * and an export that stopped being readable once it crossed a boundary. So the
 * tests import from `dist` and the packages have to be built first.
 */
export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
});
