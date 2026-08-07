'use client';

import { Tabs } from '@minuk-hwang-design-system/components-react/tabs';
import { Text } from '@minuk-hwang-design-system/components-react/text';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, PartsList, Preview, PropsTable, Prose } from '../../../site/Preview';

export default function TabsPage() {
  return (
    <Page
      eyebrow="Navigation"
      title="Tabs"
      lede="One view at a time from a small set. Radix supplies the roving tabindex and the aria-controls wiring — the parts that make a tab strip a tab strip rather than a row of buttons."
    >
      <Preview
        title="focus a tab, then use the arrow keys"
        stack
        code={`<Tabs.Root defaultValue="tokens">
  <Tabs.List>
    <Tabs.Trigger value="tokens">Tokens</Tabs.Trigger>
    <Tabs.Trigger value="base">Base</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Panel value="tokens">…</Tabs.Panel>
</Tabs.Root>`}
      >
        <Tabs.Root defaultValue="tokens" style={{ width: '100%' }}>
          <Tabs.List>
            <Tabs.Trigger value="tokens">Tokens</Tabs.Trigger>
            <Tabs.Trigger value="base">Base</Tabs.Trigger>
            <Tabs.Trigger value="components">Components</Tabs.Trigger>
            <Tabs.Trigger value="archived" disabled>
              Archived
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Panel value="tokens">
            <Text size={5} color="assistive">
              Colour, spacing, radius, type, shadow and motion — four consumption formats generated
              from one source.
            </Text>
          </Tabs.Panel>
          <Tabs.Panel value="base">
            <Text size={5} color="assistive">
              Eighteen headless primitives. Radix where WAI-ARIA already specifies the contract.
            </Text>
          </Tabs.Panel>
          <Tabs.Panel value="components">
            <Text size={5} color="assistive">
              Twenty-two styled components, replaceable by design.
            </Text>
          </Tabs.Panel>
        </Tabs.Root>
      </Preview>

      <Callout>
        The whole strip is one tab stop. Tab into it, then arrow between tabs and Tab again to reach
        the panel — that is what a screen reader user expects, and it is the part most hand-rolled
        tab strips miss.
      </Callout>

      <Prose>
        <p>
          The active indicator is a pseudo-element on the tab rather than one bar that slides. A
          sliding bar has to be measured in JavaScript and re-measured on every resize and font
          load; this is CSS that cannot fall out of sync.
        </p>
        <p>
          It grows with <code>scaleX</code> from the left — the motif the previous version had,
          kept, but on <code>duration[200]</code> instead of the hard-coded 0.5s it ran at, which
          was slow enough that fast switching left the bar trailing behind.
        </p>
      </Prose>

      <section>
        <h2>Parts</h2>
        <PartsList
          parts={[
            { name: 'Tabs.Root', description: 'Owns the selected value.' },
            { name: 'Tabs.List', description: 'The strip, with the rail under it.' },
            { name: 'Tabs.Trigger', description: 'One tab. Carries the indicator.' },
            {
              name: 'Tabs.Panel',
              description:
                'Its content. Named for what it is — Radix calls this Content, which reads oddly beside Dialog.Content.',
            },
          ]}
        />
      </section>

      <section>
        <h2>Props</h2>
        <PropsTable
          rows={[
            { name: 'value', type: 'string', description: 'Controlled selection, on Root.' },
            { name: 'defaultValue', type: 'string', description: '' },
            { name: 'onValueChange', type: '(value: string) => void', description: '' },
            {
              name: 'activationMode',
              type: `'automatic' | 'manual'`,
              default: `'automatic'`,
              description: 'Automatic selects on arrow; manual waits for Enter.',
            },
          ]}
        />
      </section>
    </Page>
  );
}
