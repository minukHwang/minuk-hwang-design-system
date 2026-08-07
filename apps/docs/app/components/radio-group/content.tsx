'use client';

import { RadioGroup } from '@minuk-hwang-design-system/components-react/radio-group';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, PartsList, Preview, PropsTable, Prose, Section } from '../../../site/Preview';

export default function RadioGroupPage() {
  return (
    <Page
      eyebrow="Forms"
      title="Radio group"
      lede="Exactly one choice from a small set. Round, because that shape is what says the options are exclusive."
    >
      <Preview
        title="the whole group is one tab stop"
        stack
        code={`<RadioGroup.Root defaultValue="minor">
  <RadioGroup.Item value="patch">Patch — bug fixes only</RadioGroup.Item>
  <RadioGroup.Item value="minor">Minor — new tokens</RadioGroup.Item>
  <RadioGroup.Item value="major">Major — a token was renamed</RadioGroup.Item>
</RadioGroup.Root>`}
      >
        <RadioGroup.Root defaultValue="minor">
          <RadioGroup.Item value="patch">Patch — bug fixes only</RadioGroup.Item>
          <RadioGroup.Item value="minor">Minor — new tokens, nothing removed</RadioGroup.Item>
          <RadioGroup.Item value="major">Major — a token was renamed</RadioGroup.Item>
        </RadioGroup.Root>
      </Preview>

      <Callout>
        Tab into the group and then use the arrow keys. Radix gives it a roving tabindex, so the
        whole group is one stop and the arrows move between options — the behaviour a screen reader
        user expects, and the part hand-rolled radio groups almost always miss.
      </Callout>

      <Prose>
        <p>
          Above five or so options this becomes a wall of text. Use <code>Select</code> there — the
          trade is that a radio group shows every choice at once and a select does not.
        </p>
      </Prose>

      <Preview
        title="disabled"
        stack
        code={`<RadioGroup.Item value="major" disabled>…</RadioGroup.Item>`}
      >
        <RadioGroup.Root defaultValue="patch">
          <RadioGroup.Item value="patch">Patch</RadioGroup.Item>
          <RadioGroup.Item value="minor">Minor</RadioGroup.Item>
          <RadioGroup.Item value="major" disabled>
            Major — needs a maintainer
          </RadioGroup.Item>
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
            { name: 'Root.onValueChange', type: '(value: string) => void', description: '' },
            { name: 'Item.value', type: 'string', description: 'What this option is worth.' },
          ]}
        />
      </Section>
    </Page>
  );
}
