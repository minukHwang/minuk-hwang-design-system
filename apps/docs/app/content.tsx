'use client';

import { Badge } from '@minuk-hwang-design-system/components-react/badge';
import { Text } from '@minuk-hwang-design-system/components-react/text';
import Link from 'next/link';
import * as React from 'react';

import { componentItems } from '../site/nav';
import { Page } from '../site/Page';
import { Callout, Preview, Prose, Section } from '../site/Preview';

import css from './home.module.css';

const LAYERS = [
  {
    name: 'style-tokens',
    role: 'Values, and nothing else',
    detail:
      'Color, spacing, radius, type, shadow and motion. Ships in four forms: CSS variables, TypeScript objects, utility classes, and a Tailwind v4 theme, all generated from one source.',
  },
  {
    name: 'behavior-react',
    role: 'What Radix does not cover',
    detail:
      'Press handling for button-like elements, so a link or a div styled as a button still answers the keyboard. 137 lines; the rest of the behavior is Radix.',
  },
  {
    name: 'base-react',
    role: 'Behavior, no appearance',
    detail:
      'Eighteen headless primitives. Radix where WAI-ARIA already specifies the contract, hand-written where the behavior is ours. 5.8 KB of our own code.',
  },
  {
    name: 'components-react',
    role: 'One styled implementation',
    detail:
      'Twenty-three components on top of the base layer, plus Theme. This is the layer with opinions in it, and the only one that decides what anything looks like.',
  },
];

export default function Home() {
  return (
    <Page
      eyebrow="Overview"
      title="A design system in four layers"
      lede="Built in four layers, so a decision lives in one of them rather than in all of them. Color is settled in the tokens, behavior in the base, appearance here."
    >
      <Prose>
        <p>
          The layers exist so a decision made in one does not have to be remade in the others. A
          color is chosen once in <code>style-tokens</code>, a focus trap implemented once in{' '}
          <code>base-react</code>, a button&apos;s appearance decided once here. They are published
          separately because that boundary is easier to hold when it is a package boundary, not
          because you are expected to assemble them yourself.
        </p>
      </Prose>

      <div className={css.layers}>
        {LAYERS.map((layer, index) => (
          <div key={layer.name} className={css.layer}>
            <div className={css.layerIndex}>{index + 1}</div>
            <div className={css.layerBody}>
              <div className={css.layerHead}>
                <code>{layer.name}</code>
                <Text as="span" size={4} color="assistive">
                  {layer.role}
                </Text>
              </div>
              <Text size={5} color="assistive">
                {layer.detail}
              </Text>
            </div>
          </div>
        ))}
      </div>

      <Callout>
        Every example on this site is the built package, rendered by this page. A dialog here traps
        focus and a tab strip answers arrow keys, because they are the same files an install
        produces.
      </Callout>

      <Section title="Components">
        <Prose>
          <p>
            Compound where the parts need shared state or layout, flat where they do not. The ones
            marked <strong>compound</strong> expose their parts; the rest take props, because a{' '}
            <code>Button.Label</code> would be ceremony.
          </p>
        </Prose>
        <div className={css.grid}>
          {componentItems.map(item => (
            <Link key={item.href} href={item.href} className={css.tile}>
              <div className={css.tileHead}>
                <Text as="span" size={5} weight="bold">
                  {item.label}
                </Text>
                {item.compound && (
                  <Badge size="s" tone="accent">
                    compound
                  </Badge>
                )}
              </div>
              <Text size={4} color="assistive">
                {item.summary}
              </Text>
            </Link>
          ))}
        </div>
      </Section>

      <Preview
        title="Getting started"
        description="One package. It brings the layers below it, so there is nothing else to install."
        language="shell"
        code={`pnpm add @minuk-hwang-design-system/components-react`}
      />

      <Preview
        title="A file that runs"
        description="The token stylesheet once at the root, then a component and its own stylesheet wherever you use it."
        language="jsx"
        code={`// Once, at the root of the app. Every component reads these variables,
// so a component imported without this renders unstyled.
import '@minuk-hwang-design-system/style-tokens/style-tokens.css';

// Per component. They ship their CSS separately so you take only what you use.
import { Button } from '@minuk-hwang-design-system/components-react/button';
import '@minuk-hwang-design-system/components-react/button/style';

export default function App() {
  return <Button>Publish</Button>;
}`}
      />

      <Callout>
        Two things are the application&apos;s job rather than the library&apos;s, and both look like
        bugs when they are missed. <strong>Light and dark</strong> are chosen with{' '}
        <code>data-theme</code> on <code>&lt;html&gt;</code>; with the attribute absent the system
        follows the operating system, which is usually what you want but is not what you see if you
        were expecting to control it. And the token stylesheet <em>names</em> Pretendard without
        fetching it, the same way Tailwind names <code>font-sans</code> — a page that has not loaded
        the face renders in the next fallback.
      </Callout>

      <Preview
        title="Changing the accent, the gray or the corners"
        description="Theme writes two attributes on a wrapper. Nothing is rebuilt and no component takes a new prop."
        language="jsx"
        code={`import { Theme } from '@minuk-hwang-design-system/components-react/theme';
import '@minuk-hwang-design-system/components-react/theme/style';

<Theme accentColor="purple" radius="large">
  <App />
</Theme>`}
      />
    </Page>
  );
}
