'use client';

import { Tabs } from '@minuk-hwang-design-system/components-react/tabs';
import { Text } from '@minuk-hwang-design-system/components-react/text';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, PartsList, Preview, PropsTable, Section } from '../../../site/Preview';

export default function TabsPage() {
  return (
    <Page
      eyebrow="Navigation"
      title="Tabs"
      lede="One view at a time from a small set. Radix supplies the roving tabindex and the aria-controls wiring, the parts that make a tab strip a tab strip rather than a row of buttons."
    >
      <Preview
        title="Basic"
        description="Focus a tab, then use the arrow keys. The strip is one tab stop; Tab again reaches the panel."
        stack
        code={`<Tabs.Root defaultValue="tokens">
  <Tabs.List>
    <Tabs.Trigger value="tokens">Tokens</Tabs.Trigger>
    <Tabs.Trigger value="base">Base</Tabs.Trigger>
    <Tabs.Trigger value="components">Components</Tabs.Trigger>
    <Tabs.Trigger value="archived" disabled>Archived</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Panel value="tokens">
    <Text size={5} color="assistive">
      Colour, spacing, radius, type, shadow and motion. Four consumption
      formats generated from one source.
    </Text>
  </Tabs.Panel>
  <Tabs.Panel value="base">
    <Text size={5} color="assistive">
      Eighteen headless primitives. Radix where WAI-ARIA already specifies
      the contract.
    </Text>
  </Tabs.Panel>
  <Tabs.Panel value="components">
    <Text size={5} color="assistive">
      Twenty-three styled components, replaceable by design.
    </Text>
  </Tabs.Panel>
</Tabs.Root>`}
      >
        <Tabs.Root defaultValue="tokens">
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
              Colour, spacing, radius, type, shadow and motion. Four consumption formats generated
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
              Twenty-three styled components, replaceable by design.
            </Text>
          </Tabs.Panel>
        </Tabs.Root>
      </Preview>

      <Preview
        title="Size"
        description="Two, set on the list so every tab in a strip matches. 15 labels a section, 17 labels a page."
        stack
        code={`{(['m', 'l'] as const).map(size => (
  <Tabs.Root key={size} defaultValue="tokens">
    <Tabs.List size={size}>
      <Tabs.Trigger value="tokens">Tokens</Tabs.Trigger>
      <Tabs.Trigger value="base">Base</Tabs.Trigger>
      <Tabs.Trigger value="components">Components</Tabs.Trigger>
    </Tabs.List>
  </Tabs.Root>
))}`}
      >
        {(['m', 'l'] as const).map(size => (
          <Tabs.Root key={size} defaultValue="tokens">
            <Tabs.List size={size}>
              <Tabs.Trigger value="tokens">Tokens</Tabs.Trigger>
              <Tabs.Trigger value="base">Base</Tabs.Trigger>
              <Tabs.Trigger value="components">Components</Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
        ))}
      </Preview>

      <Preview
        title="Fill"
        description="Divides the strip evenly instead of sizing each tab to its label. For a strip that is the width of the thing it belongs to."
        stack
        code={`<Tabs.Root defaultValue="tokens">
  <Tabs.List fill>
    <Tabs.Trigger value="tokens">Tokens</Tabs.Trigger>
    <Tabs.Trigger value="base">Base</Tabs.Trigger>
    <Tabs.Trigger value="components">Components</Tabs.Trigger>
  </Tabs.List>
</Tabs.Root>`}
      >
        <Tabs.Root defaultValue="tokens">
          <Tabs.List fill>
            <Tabs.Trigger value="tokens">Tokens</Tabs.Trigger>
            <Tabs.Trigger value="base">Base</Tabs.Trigger>
            <Tabs.Trigger value="components">Components</Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      </Preview>

      <Callout>
        The whole strip is one tab stop. Tab into it, then arrow between tabs and Tab again to reach
        the panel. That is what a screen reader user expects, and the part most hand-rolled tab
        strips miss.
      </Callout>

      <Section title="Parts">
        <PartsList
          parts={[
            { name: 'Tabs.Root', description: 'Owns the selected value.' },
            { name: 'Tabs.List', description: 'The strip, with the rail under it.' },
            { name: 'Tabs.Trigger', description: 'One tab. Carries the indicator.' },
            {
              name: 'Tabs.Panel',
              description:
                'Its content. Named for what it is; Radix calls this Content, which reads oddly beside Dialog.Content.',
            },
          ]}
        />
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'Root.value', type: 'string', description: 'Controlled selection.' },
            { name: 'Root.defaultValue', type: 'string', description: 'Uncontrolled initial tab.' },
            {
              name: 'Root.onValueChange',
              type: '(value: string) => void',
              description: "Fires with the chosen tab's value.",
            },
            {
              name: 'List.fill',
              type: 'boolean',
              default: 'false',
              description: 'Divides the strip evenly between the tabs.',
            },
            {
              name: 'List.size',
              type: `'m' | 'l'`,
              default: `'m'`,
              description: '15 or 17. On the list, so every tab in a strip matches.',
            },
            {
              name: 'Root.activationMode',
              type: `'automatic' | 'manual'`,
              default: `'automatic'`,
              description: 'Automatic selects on arrow; manual waits for Enter.',
            },
          ]}
        />
      </Section>
    </Page>
  );
}
