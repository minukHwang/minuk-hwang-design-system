'use client';

import { Accordion } from '@minuk-hwang-design-system/components-react/accordion';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, PartsList, Preview, PropsTable, Prose } from '../../../site/Preview';

const ITEMS = [
  [
    'a',
    'Why is the shadow colour a separate token?',
    'A shadow works by darkening what is behind it, so how opaque it has to be depends on how dark that already is. Eight per cent black moves a white ground by 20/255 and a near-black one by 2 — the geometry can be shared, the ink cannot.',
  ],
  [
    'b',
    'Why do overlays open at 150ms and close at 100ms?',
    'Direction sets easing and duration. Something arriving decelerates so that it lands rather than stops; something leaving accelerates and can be quicker, because nobody waits out a dismissal they already asked for.',
  ],
  [
    'c',
    'Why is spacing not mapped into Tailwind?',
    'Tailwind derives p-4 from a multiplier, so its numbers count quarter-rems where ours count pixels. Mapping our scale would make p-4 mean 4px instead of 16px, silently. Every value in our scale is already reachable through Tailwind’s own numbering.',
  ],
] as const;

export default function AccordionPage() {
  return (
    <Page
      eyebrow="Navigation"
      title="Accordion"
      lede="Collapsible sections. Each trigger sits inside a heading element, which is what lets a screen reader user jump between sections rather than tab through every one."
    >
      <Preview
        title="single — one open at a time"
        stack
        code={`<Accordion.Root type="single" collapsible defaultValue="a">
  <Accordion.Item value="a">
    <Accordion.Trigger>Why…?</Accordion.Trigger>
    <Accordion.Content>…</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>`}
      >
        <Accordion.Root type="single" collapsible defaultValue="a" style={{ width: '100%' }}>
          {ITEMS.map(([value, question, answer]) => (
            <Accordion.Item key={value} value={value}>
              <Accordion.Trigger>{question}</Accordion.Trigger>
              <Accordion.Content>{answer}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Preview>

      <Preview
        title="multiple — any number open"
        stack
        code={`<Accordion.Root type="multiple" defaultValue={['a', 'b']}>…</Accordion.Root>`}
      >
        <Accordion.Root type="multiple" defaultValue={['a']} style={{ width: '100%' }}>
          {ITEMS.slice(0, 2).map(([value, question, answer]) => (
            <Accordion.Item key={value} value={value}>
              <Accordion.Trigger>{question}</Accordion.Trigger>
              <Accordion.Content>{answer}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Preview>

      <Callout>
        The height animates without anyone knowing the height. <code>height: auto</code> cannot be
        animated, and measuring the panel in JavaScript breaks the moment its contents reflow — the
        base layer measures it and publishes the result as a custom property, which is what the
        keyframes read.
      </Callout>

      <Prose>
        <p>
          Padding lives on an inner element rather than on the animated one. Animating a box whose
          padding is part of its height makes the contents jump at the end of the transition.
        </p>
      </Prose>

      <section>
        <h2>Parts</h2>
        <PartsList
          parts={[
            {
              name: 'Accordion.Root',
              description: 'type="single" or "multiple". Owns which are open.',
            },
            { name: 'Accordion.Item', description: 'One section.' },
            {
              name: 'Accordion.Trigger',
              description: 'The heading button. Chevron included, rotated from data-state.',
            },
            { name: 'Accordion.Content', description: 'The panel. Animates its own height.' },
          ]}
        />
      </section>

      <section>
        <h2>Props</h2>
        <PropsTable
          rows={[
            { name: 'type', type: `'single' | 'multiple'`, description: 'Required, on Root.' },
            {
              name: 'collapsible',
              type: 'boolean',
              default: 'false',
              description: 'Single only. Allows closing the open one.',
            },
            { name: 'defaultValue', type: 'string | string[]', description: 'Matches the type.' },
            { name: 'onValueChange', type: '(value) => void', description: '' },
          ]}
        />
      </section>
    </Page>
  );
}
