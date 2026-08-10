'use client';

import { Field } from '@minuk-hwang-design-system/components-react/field';
import { Input, Textarea } from '@minuk-hwang-design-system/components-react/input';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, PropsTable, Section } from '../../../site/Preview';

export default function InputPage() {
  return (
    <Page
      eyebrow="Forms"
      title="Input"
      lede="A text control and nothing else. The label, the description and the error belong to Field, which also wires the ids between them."
    >
      <Preview
        title="Size"
        description="Three heights, the same three Button and Select use, so a field and its submit line up."
        stack
        code={`<Input size="s" />\n<Input size="m" />\n<Input size="l" />`}
      >
        <Input size="s" placeholder="Small, 40px" />
        <Input size="m" placeholder="Medium, 48px" />
        <Input size="l" placeholder="Large, 56px" />
      </Preview>

      <Preview
        title="State"
        description="The error appearance comes from aria-invalid, which Field.Root sets from its own state."
        stack
        code={`<Input aria-invalid />
<Input disabled />
<Input readOnly />`}
      >
        <Input placeholder="Resting" />
        <Input aria-invalid defaultValue="0.0.1" />
        <Input disabled defaultValue="Cannot edit" />
        <Input readOnly defaultValue="Read only" />
      </Preview>

      <Callout>
        The error appearance comes from <code>aria-invalid</code>, not from a variant prop.{' '}
        <code>Field.Root</code> sets that attribute from its own state, so there is no way to draw a
        red border on a control that still announces itself as valid.
      </Callout>

      <Preview
        title="Textarea"
        description="Resizes vertically only, because horizontal resize breaks whatever column the field sits in."
        stack
        code={`<Textarea rows={4} />`}
      >
        <Textarea defaultValue="Splits shadows into geometry and per-theme ink." />
      </Preview>

      <Preview
        title="In a Field"
        description="Field.Control passes the id and the aria attributes down."
        stack
        code={`<Field.Root required>
  <Field.Label>Package name</Field.Label>
  <Field.Control>{props => <Input {...props} />}</Field.Control>
  <Field.Description>Lowercase, no spaces.</Field.Description>
</Field.Root>`}
      >
        <Field.Root required>
          <Field.Label>Package name</Field.Label>
          <Field.Control>{props => <Input {...props} placeholder="@scope/name" />}</Field.Control>
          <Field.Description>Lowercase, no spaces.</Field.Description>
        </Field.Root>
      </Preview>

      <Section title="Props">
        <PropsTable
          rows={[
            {
              name: 'size',
              type: `'s' | 'm' | 'l'`,
              default: `'m'`,
              description: 'Input only. Matches Button and Select.',
            },
            {
              name: 'aria-invalid',
              type: 'boolean',
              description: 'Drives the error appearance. Usually set by Field.',
            },
            {
              name: '…',
              type: 'InputHTMLAttributes',
              description: 'Everything else passes through to the element.',
            },
          ]}
        />
      </Section>
    </Page>
  );
}
