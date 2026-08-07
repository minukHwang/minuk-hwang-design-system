'use client';

import { Badge } from '@minuk-hwang-design-system/components-react/badge';
import { Card } from '@minuk-hwang-design-system/components-react/card';
import { Text } from '@minuk-hwang-design-system/components-react/text';
import Link from 'next/link';
import * as React from 'react';

import { componentItems } from '../site/nav';
import { Page } from '../site/Page';
import { Callout, Preview, Prose } from '../site/Preview';

import css from './home.module.css';

const LAYERS = [
  {
    name: 'style-tokens',
    role: 'Values, and nothing else',
    detail:
      'Colour, spacing, radius, type, shadow and motion. Ships in four forms — CSS variables, TypeScript objects, utility classes, and a Tailwind v4 theme — all generated from one source.',
  },
  {
    name: 'styles',
    role: 'Shared style layer',
    detail:
      'Sprinkles and recipes built on the tokens. Extracted into its own package because compiling it inside every consumer duplicated the same stylesheet 25 times over.',
  },
  {
    name: 'base-react',
    role: 'Behaviour, no appearance',
    detail:
      'Eighteen headless primitives. Radix where WAI-ARIA already specifies the contract, hand-written where the behaviour is ours. 5.6 KB of our own code.',
  },
  {
    name: 'components-react',
    role: 'One styled implementation',
    detail:
      'Twenty-two components on top of the base layer. Replaceable by design — anyone wanting a different look takes the layer below and brings their own CSS.',
  },
];

export default function Home() {
  return (
    <Page
      eyebrow="Overview"
      title="A design system in four layers"
      lede="Each layer is useful without the one above it. That is the test the structure has to pass, and it is why the styled components are a package rather than the point."
    >
      <Prose>
        <p>
          The layers exist so that a decision made in one of them does not have to be remade in the
          others. A colour is chosen once, in <code>style-tokens</code>; a focus trap is implemented
          once, in <code>base-react</code>; a button&apos;s appearance is decided once here — and
          swapping any of the three leaves the other two standing.
        </p>
      </Prose>

      <div className={css.layers}>
        {LAYERS.map((layer, index) => (
          <div key={layer.name} className={css.layer}>
            <div className={css.layerIndex}>{index + 1}</div>
            <div className={css.layerBody}>
              <div className={css.layerHead}>
                <code>{layer.name}</code>
                <Text as="span" textType="body3" color="assistive">
                  {layer.role}
                </Text>
              </div>
              <Text textType="body2" color="assistive">
                {layer.detail}
              </Text>
            </div>
          </div>
        ))}
      </div>

      <Callout>
        Every example on this site is the built package, rendered by this page. A dialog here traps
        focus and a tab strip answers arrow keys, because they are the same files an install
        produces — so a broken build shows up as broken documentation rather than as a screenshot
        that stayed correct.
      </Callout>

      <section className={css.section}>
        <h2 className={css.sectionTitle}>Components</h2>
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
                <Text as="span" textType="body2" textMode="bold">
                  {item.label}
                </Text>
                {item.compound && (
                  <Badge size="s" tone="accent">
                    compound
                  </Badge>
                )}
              </div>
              <Text textType="body3" color="assistive">
                {item.summary}
              </Text>
            </Link>
          ))}
        </div>
      </section>

      <section className={css.section}>
        <h2 className={css.sectionTitle}>Install</h2>
        <Preview
          code={`pnpm add @minuk-hwang-design-system/components-react

// Tokens carry the CSS variables every component reads.
import '@minuk-hwang-design-system/style-tokens/style-tokens.css';

// Components ship their CSS separately, so you take only what you import.
import { Button } from '@minuk-hwang-design-system/components-react/button';
import '@minuk-hwang-design-system/components-react/button/style';`}
        >
          <Card.Root elevation="outlined" className={css.installCard}>
            <Card.Header>
              <Card.Title>Using Tailwind instead?</Card.Title>
              <Card.Description>The tokens ship as a Tailwind v4 theme.</Card.Description>
            </Card.Header>
            <Card.Body>
              <Text textType="body3" color="assistive">
                One import gives you <code>bg-surface-default</code>,{' '}
                <code>text-status-error-strong</code> and the rest — with no <code>dark:</code>{' '}
                anywhere, because the utilities compile to the variables the theme swaps.
              </Text>
            </Card.Body>
          </Card.Root>
        </Preview>
      </section>
    </Page>
  );
}
