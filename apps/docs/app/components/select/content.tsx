'use client';

import { Field } from '@minuk-hwang-design-system/components-react/field';
import { Select } from '@minuk-hwang-design-system/components-react/select';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, PartsList, Preview, PropsTable, Prose, Section } from '../../../site/Preview';

export default function SelectPage() {
  return (
    <Page
      eyebrow="Forms"
      title="Select"
      lede="One choice from many. A styled listbox rather than a native select, which is a trade rather than a free win."
    >
      <Preview
        title="open it — then type to jump"
        stack
        code={`<Select.Root defaultValue="public">
  <Select.Trigger><Select.Value /></Select.Trigger>
  <Select.Content>
    <Select.Item value="public">Public</Select.Item>
    <Select.Item value="restricted">Restricted</Select.Item>
  </Select.Content>
</Select.Root>`}
      >
        <div style={{ width: 280 }}>
          <Select.Root defaultValue="public">
            <Select.Trigger>
              <Select.Value placeholder="Choose access…" />
            </Select.Trigger>
            <Select.Content>
              <Select.Label>Registry</Select.Label>
              <Select.Item value="public">Public</Select.Item>
              <Select.Item value="restricted">Restricted</Select.Item>
              <Select.Separator />
              <Select.Label>Internal</Select.Label>
              <Select.Item value="private">Private</Select.Item>
              <Select.Item value="none" disabled>
                Unpublished
              </Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
      </Preview>

      <Callout tone="warning">
        A native <code>select</code> gets the platform&apos;s own picker on mobile, which is usually
        better than anything a web page can draw. Reach for this one when options need icons,
        descriptions or grouping the native element cannot express — not by default.
      </Callout>

      <Prose>
        <p>
          <code>Select.Content</code> folds in the viewport and both scroll buttons, because every
          select needs all three in that order and leaving them to the caller only creates
          opportunities to omit one and ship a list that cannot be scrolled.
        </p>
        <p>
          The trigger is built to match <code>Input</code> exactly — same heights, same border, same
          focus ring. Two controls in one column that differ by a pixel look like a mistake rather
          than a distinction.
        </p>
      </Prose>

      <Preview
        title="in a Field"
        stack
        code={`<Field.Root>
  <Field.Label>Access</Field.Label>
  <Field.Control>
    {props => (
      <Select.Root>
        <Select.Trigger {...props}><Select.Value /></Select.Trigger>
        …
      </Select.Root>
    )}
  </Field.Control>
</Field.Root>`}
      >
        <div style={{ width: 280 }}>
          <Field.Root required>
            <Field.Label>Access</Field.Label>
            <Field.Control>
              {props => (
                <Select.Root>
                  <Select.Trigger {...props}>
                    <Select.Value placeholder="Choose…" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="public">Public</Select.Item>
                    <Select.Item value="private">Private</Select.Item>
                  </Select.Content>
                </Select.Root>
              )}
            </Field.Control>
            <Field.Description>Public packages cannot be made private later.</Field.Description>
          </Field.Root>
        </div>
      </Preview>

      <Section title="Parts">
        <PartsList
          parts={[
            { name: 'Select.Root', description: 'Owns the value.' },
            {
              name: 'Select.Trigger',
              description: 'The control. Sized like Input, with the chevron built in.',
            },
            { name: 'Select.Value', description: 'Renders the chosen label, or the placeholder.' },
            {
              name: 'Select.Content',
              description: 'The list. Viewport and scroll buttons included.',
            },
            { name: 'Select.Item', description: 'One option, with the check-mark gutter.' },
            { name: 'Select.Label', description: 'Heading for a group. Skipped by the keyboard.' },
            { name: 'Select.Separator', description: 'Divider between groups.' },
          ]}
        />
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'value', type: 'string', description: 'Controlled selection, on Root.' },
            { name: 'defaultValue', type: 'string', description: '' },
            { name: 'onValueChange', type: '(value: string) => void', description: '' },
            {
              name: 'size',
              type: `'s' | 'm' | 'l'`,
              default: `'m'`,
              description: 'On Trigger. Matches Input and Button.',
            },
            {
              name: 'placeholder',
              type: 'string',
              description: 'On Value. Shown while nothing is chosen.',
            },
          ]}
        />
      </Section>
    </Page>
  );
}
