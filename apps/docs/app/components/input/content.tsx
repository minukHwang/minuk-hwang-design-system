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
        description="Height, inset and type all step together. The heights are Button's and Select's, so a field and its submit line up."
        stack
        code={`<Input size="s" placeholder="Small" />
<Input size="m" placeholder="Medium" />
<Input size="l" placeholder="Large" />`}
      >
        <Input size="s" placeholder="Small" />
        <Input size="m" placeholder="Medium" />
        <Input size="l" placeholder="Large" />
      </Preview>

      <Callout>
        <code>m</code> keeps its 16px type where <code>Button</code>&apos;s middle size runs at 15.
        Mobile Safari zooms the page when a field under 16px takes focus, and this is the default
        size.
      </Callout>

      <Preview
        title="State"
        description="Resting, invalid, disabled and read-only."
        stack
        code={`<Input placeholder="Resting" />
<Input aria-invalid defaultValue="0.0.1" />
<Input disabled defaultValue="Cannot edit" />
<Input readOnly defaultValue="Read only" />`}
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
        description="Resizes vertically only, because horizontal resize breaks whatever column the field sits in. It takes no size prop and is built to sit under an Input at m."
        stack
        code={`<Textarea defaultValue="Splits shadows into geometry and per-theme ink." />`}
      >
        <Textarea defaultValue="Splits shadows into geometry and per-theme ink." />
      </Preview>

      <Preview
        title="In a Field"
        description="Field.Control passes the id and the aria attributes down."
        stack
        code={`<Field.Root required>
  <Field.Label>Package name</Field.Label>
  <Field.Control>{props => <Input {...props} placeholder="@scope/name" />}</Field.Control>
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
