'use client';

import { Badge } from '@minuk-hwang-design-system/components-react/badge';
import { Text } from '@minuk-hwang-design-system/components-react/text';
import Link from 'next/link';
import * as React from 'react';

import { componentItems } from '../site/nav';
import { Page } from '../site/Page';
import { Callout, Preview, Prose, Section } from '../site/Preview';

import css from './home.module.css';

/**
 * Four packages across three layers.
 *
 * The layer is named rather than numbered, and named once per group, so the two
 * packages sharing the behavior layer show it by sitting under one label.
 * Numbered, the list read 1, 2, 2, 3, and the repeated figure looked like a
 * mistake rather than like the point.
 */
const LAYERS = [
  {
    layer: 'Values',
    name: 'style-tokens',
    detail:
      'Color, spacing, radius, type, shadow and motion. One source, four outputs: CSS variables, TypeScript objects, utility classes, and a Tailwind v4 theme.',
  },
  {
    layer: 'Behavior',
    name: 'base-react',
    detail:
      'Eighteen headless components: seventeen wrapping a Radix package each, and Button, which is ours. Keyboard, focus and ARIA, and no styling at all.',
  },
  {
    layer: 'Behavior',
    name: 'behavior-react',
    detail:
      'Interaction Radix does not cover. usePress, so a link or a div styled as a button still answers the keyboard.',
  },
  {
    layer: 'Appearance',
    name: 'components-react',
    detail:
      'Twenty-three components plus Theme. The only layer that decides what anything looks like.',
  },
];

export default function Home() {
  return (
    <Page
      eyebrow="Overview"
      title="A design system in three layers"
      lede="Built in three layers, so a decision lives in one of them rather than in all of them. Color is settled in the tokens, behavior in the base, appearance here."
    >
      <Prose>
        <p>
          Every decision here is one of three kinds: what a value is, how a thing behaves, how it
          looks. One layer answers each, so changing a color does not mean opening the file that
          traps focus. There are four packages, because <code>base-react</code> is built on Radix
          and the behavior Radix does not cover is kept separately in <code>behavior-react</code>.
        </p>
      </Prose>

      <div className={css.layers}>
        {LAYERS.map((layer, index) => {
          /*
           * The label belongs to the group, so the second package in a layer
           * leaves the column empty and drops the rule above it. A line between
           * them would divide what the shared label is there to join.
           */
          const continues = LAYERS[index - 1]?.layer === layer.layer;

          return (
            <div
              key={layer.name}
              className={continues ? `${css.layer} ${css.layerContinued}` : css.layer}
            >
              <div className={css.layerName}>{continues ? '' : layer.layer}</div>
              <div className={css.layerBody}>
                <code className={css.layerPackage}>{layer.name}</code>
                <Text size={5} color="assistive">
                  {layer.detail}
                </Text>
              </div>
            </div>
          );
        })}
      </div>

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
        code={`// Once, at the root of the app.
import '@minuk-hwang-design-system/style-tokens/style-tokens.css';

// Per component, so you take only the CSS you use.
import { Button } from '@minuk-hwang-design-system/components-react/button';
import '@minuk-hwang-design-system/components-react/button/style';

export default function App() {
  return <Button>Publish</Button>;
}`}
      />

      <Callout>
        Light and dark need nothing set up. Without a <code>Theme</code> the system follows the
        operating system; with one, <code>appearance</code> decides.
      </Callout>

      <Preview
        title="Changing the appearance, the accent, the gray or the corners"
        description="Theme writes one attribute per dial on a wrapper. Nothing is rebuilt and no component takes a new prop."
        language="jsx"
        code={`import { Theme } from '@minuk-hwang-design-system/components-react/theme';
import '@minuk-hwang-design-system/components-react/theme/style';

<Theme appearance="dark" accentColor="purple" neutralColor="slate" radius="large">
  <App />
</Theme>`}
      />
    </Page>
  );
}
