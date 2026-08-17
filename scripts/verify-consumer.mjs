/**
 * Builds an application that installs the packages the way a stranger would.
 *
 * The documentation site proves a great deal, and it cannot prove this. It
 * resolves the packages through workspace links rather than through tarballs, so
 * it never exercises the export maps as npm publishes them; and every one of its
 * pages is a client component, so it cannot notice that a compound component
 * reached through its namespace is `undefined` in a server one.
 *
 * Both of those shipped in 1.0.0. This is the shape of test that would have
 * caught them: pack, install the tarballs into an empty Next.js app, render from
 * a server component, and build.
 *
 * The page below uses both compound forms on purpose. `Card` declares no
 * `'use client'`, so its namespace crosses the boundary as a value and
 * `Card.Root` resolves; `Alert` does declare one, so only its named exports
 * work. Eleven of the twelve compound components are in Alert's position.
 *
 * Run with `node scripts/verify-consumer.mjs`. Takes a few minutes, because it
 * installs Next.js from the registry.
 */
import { execFileSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const REPO = path.dirname(new URL(import.meta.url).pathname.replace(/\/scripts$/, ''));
const ROOT = path.resolve(REPO, '..');

const PACKAGES = [
  'packages/behavior/react',
  'packages/style-tokens',
  'packages/base/react',
  'packages/components/react',
];

const run = (cmd, args, cwd) =>
  execFileSync(cmd, args, { cwd, stdio: 'pipe', encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

const work = fs.mkdtempSync(path.join(os.tmpdir(), 'ds-consumer-'));
console.log(`Working in ${work}`);

try {
  /*
   * Tarballs rather than workspace links. `pnpm pack` resolves `workspace:^` to a
   * real range on the way out, which is the substitution that has to work for
   * anyone installing from the registry.
   */
  console.log('Packing…');
  const tarballs = PACKAGES.map(rel => {
    const dir = path.join(ROOT, rel);
    const out = run('pnpm', ['pack', '--pack-destination', work], dir).trim().split('\n').pop();
    return out.trim();
  });

  console.log('Creating an application…');
  fs.writeFileSync(
    path.join(work, 'package.json'),
    JSON.stringify({ name: 'consumer', private: true, version: '0.0.0' }, null, 2)
  );
  /*
   * The TypeScript toolchain is not optional here. `next build` runs a type
   * check only when it can resolve `typescript`, and skips it with a warning
   * otherwise — which is what happened for as long as these were missing. The
   * whole reason the consumer carries a `tsconfig.json` is the flag in it, so a
   * run without them proved less than it appeared to.
   */
  run(
    'npm',
    [
      'install',
      'next',
      'react',
      'react-dom',
      'typescript',
      '@types/react',
      '@types/node',
      '--silent',
    ],
    work
  );
  run('npm', ['install', ...tarballs, '--silent'], work);

  const app = path.join(work, 'app');
  fs.mkdirSync(app, { recursive: true });

  fs.writeFileSync(
    path.join(work, 'globals.css'),
    `@import '@minuk-hwang-design-system/components-react/styles.css';\n`
  );

  fs.writeFileSync(
    path.join(app, 'layout.tsx'),
    `import '../globals.css';\n` +
      `export const metadata = { title: 'consumer' };\n` +
      `export default function RootLayout({ children }: { children: React.ReactNode }) {\n` +
      `  return (<html lang="en"><body>{children}</body></html>);\n` +
      `}\n`
  );

  /*
   * No `'use client'`. Compound components come in through their named exports,
   * which is the only form that works here, and `Theme` and `Button` come in
   * through theirs to prove a client component still renders as a child.
   */
  fs.writeFileSync(
    path.join(app, 'page.tsx'),
    `import * as Alert from '@minuk-hwang-design-system/components-react/alert';\n` +
      `import { Badge } from '@minuk-hwang-design-system/components-react/badge';\n` +
      `import { Button } from '@minuk-hwang-design-system/components-react/button';\n` +
      `import { Card } from '@minuk-hwang-design-system/components-react/card';\n` +
      `import { Heading } from '@minuk-hwang-design-system/components-react/heading';\n` +
      `import { Text } from '@minuk-hwang-design-system/components-react/text';\n` +
      `import { Theme } from '@minuk-hwang-design-system/components-react/theme';\n\n` +
      `export default function Home() {\n` +
      `  return (\n` +
      `    <Theme accentColor="purple" neutralColor="slate" radius="large">\n` +
      `      <Heading level={1}>Consumer</Heading>\n` +
      `      <Text leading="reading">Rendered from a server component.</Text>\n` +
      `      <Badge tone="success">ok</Badge>\n` +
      `      <Button>Publish</Button>\n` +
      `      <Card.Root elevation="outlined">\n` +
      `        <Card.Header><Card.Title>Namespace, no client boundary</Card.Title></Card.Header>\n` +
      `      </Card.Root>\n` +
      `      <Alert.Root tone="accent">\n` +
      `        <Alert.Body><Alert.Description>Namespace import, from a server component</Alert.Description></Alert.Body>\n` +
      `      </Alert.Root>\n` +
      `    </Theme>\n` +
      `  );\n` +
      `}\n`
  );

  fs.writeFileSync(
    path.join(work, 'tsconfig.json'),
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2020',
          lib: ['dom', 'dom.iterable', 'esnext'],
          jsx: 'preserve',
          module: 'esnext',
          moduleResolution: 'bundler',
          strict: true,
          noEmit: true,
          esModuleInterop: true,
          skipLibCheck: true,
          incremental: true,
          // The flag that turns an untyped stylesheet import into an error.
          noUncheckedSideEffectImports: true,
          plugins: [{ name: 'next' }],
        },
        include: ['**/*.ts', '**/*.tsx', 'next-env.d.ts'],
        exclude: ['node_modules'],
      },
      null,
      2
    )
  );

  fs.writeFileSync(path.join(work, 'next.config.mjs'), 'export default {};\n');

  console.log('Building…');
  run('npx', ['next', 'build'], work);

  /*
   * A build that succeeds is not the whole claim. `Alert.Root` resolving to
   * `undefined` is what shipped in 1.0.0, and React renders nothing for it
   * rather than throwing, so the page has to be read back. This used to print
   * the answer and exit zero either way.
   */
  const html = fs.readFileSync(path.join(work, '.next/server/app/index.html'), 'utf8');
  const marker = 'Namespace import, from a server component';
  if (!html.includes(marker)) {
    throw new Error(`The build succeeded and "${marker}" is not in the HTML.`);
  }

  console.log('\nAlert rendered into the HTML: true');
  console.log('Consumer build succeeded.');
} catch (error) {
  console.error('\nConsumer build failed.\n');
  console.error(error.stdout || '');
  console.error(error.stderr || error.message);
  process.exitCode = 1;
} finally {
  fs.rmSync(work, { recursive: true, force: true });
}
