'use client';

import { Field } from '@minuk-hwang-design-system/components-react/field';
import { Input, Textarea } from '@minuk-hwang-design-system/components-react/input';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, PropsTable, Prose, Section } from '../../../site/Preview';

export default function InputPage() {
  return (
    <Page
      eyebrow="Forms"
      title="Input"
      lede="A text control and nothing else. The label, the description and the error belong to Field, which also wires the ids between them."
    >
      <Preview
        title="size"
        stack
        code={`<Input size="s" />\n<Input size="m" />\n<Input size="l" />`}
      >
        <Input size="s" placeholder="Small — 40px" />
        <Input size="m" placeholder="Medium — 48px" />
        <Input size="l" placeholder="Large — 56px" />
      </Preview>

      <Prose>
        <p>
          The three heights are the same three <code>Button</code> and <code>Select</code> use, so a
          field and its submit line up without either being nudged.
        </p>
      </Prose>

      <Preview
        title="state"
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

      <Preview title="textarea" stack code={`<Textarea rows={4} />`}>
        <Textarea defaultValue="Splits shadows into geometry and per-theme ink." />
      </Preview>

      <Prose>
        <p>
          Resizes vertically only. Horizontal resize breaks whatever column the field sits in, and
          nobody has ever wanted it.
        </p>
      </Prose>

      <Preview
        title="in a Field"
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
