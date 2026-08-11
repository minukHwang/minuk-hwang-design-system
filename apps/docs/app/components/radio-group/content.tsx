'use client';

import { RadioGroup } from '@minuk-hwang-design-system/components-react/radio-group';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { PartsList, Preview, PropsTable, Section } from '../../../site/Preview';

export default function RadioGroupPage() {
  return (
    <Page
      eyebrow="Forms"
      title="Radio group"
      lede="Exactly one choice from a small set. Round, because that shape is what says the options are exclusive."
    >
      <Preview
        title="One tab stop"
        description="Tab into the group, then use the arrow keys. Radix gives it a roving tabindex, so the group is one stop and the arrows move between options."
        stack
        code={`<RadioGroup.Root defaultValue="minor">
  <RadioGroup.Item value="patch">Patch: bug fixes only</RadioGroup.Item>
  <RadioGroup.Item value="minor">Minor: new tokens, nothing removed</RadioGroup.Item>
  <RadioGroup.Item value="major">Major: a token was renamed</RadioGroup.Item>
</RadioGroup.Root>`}
      >
        <RadioGroup.Root defaultValue="minor">
          <RadioGroup.Item value="patch">Patch: bug fixes only</RadioGroup.Item>
          <RadioGroup.Item value="minor">Minor: new tokens, nothing removed</RadioGroup.Item>
          <RadioGroup.Item value="major">Major: a token was renamed</RadioGroup.Item>
        </RadioGroup.Root>
      </Preview>

      <Preview
        title="Disabled"
        description="Disable the root for the whole group, or one item on its own."
        stack
        code={`<RadioGroup.Root defaultValue="patch">
  <RadioGroup.Item value="patch">Patch</RadioGroup.Item>
  <RadioGroup.Item value="minor">Minor</RadioGroup.Item>
  <RadioGroup.Item value="major" disabled>Major: needs a maintainer</RadioGroup.Item>
</RadioGroup.Root>

<RadioGroup.Root defaultValue="minor" disabled>
  <RadioGroup.Item value="minor">Minor</RadioGroup.Item>
  <RadioGroup.Item value="major">Major</RadioGroup.Item>
</RadioGroup.Root>`}
      >
        <RadioGroup.Root defaultValue="patch">
          <RadioGroup.Item value="patch">Patch</RadioGroup.Item>
          <RadioGroup.Item value="minor">Minor</RadioGroup.Item>
          <RadioGroup.Item value="major" disabled>
            Major: needs a maintainer
          </RadioGroup.Item>
        </RadioGroup.Root>
        <RadioGroup.Root defaultValue="minor" disabled>
          <RadioGroup.Item value="minor">Minor</RadioGroup.Item>
          <RadioGroup.Item value="major">Major</RadioGroup.Item>
        </RadioGroup.Root>
      </Preview>

      <Section title="Parts">
        <PartsList
          parts={[
            { name: 'RadioGroup.Root', description: 'Owns the value and the roving focus.' },
            {
              name: 'RadioGroup.Item',
              description:
                'One option. With children it renders the row and the label association.',
            },
          ]}
        />
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'Root.value', type: 'string', description: 'Controlled selection.' },
            {
              name: 'Root.defaultValue',
              type: 'string',
              description: 'Uncontrolled initial selection.',
            },
            {
              name: 'Root.onValueChange',
              type: '(value: string) => void',
              description: "Fires with the chosen item's value.",
            },
            {
              name: 'Root.disabled',
              type: 'boolean',
              default: 'false',
              description: 'Disables every option in the group.',
            },
            { name: 'Item.value', type: 'string', description: 'What this option is worth.' },
            {
              name: 'Item.disabled',
              type: 'boolean',
              default: 'false',
              description: 'Disables one option. The arrow keys skip it.',
            },
          ]}
        />
      </Section>
    </Page>
  );
}
