'use client';

import { Field } from '@minuk-hwang-design-system/components-react/field';
import { Select } from '@minuk-hwang-design-system/components-react/select';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, PartsList, Preview, PropsTable, Section } from '../../../site/Preview';

export default function SelectPage() {
  return (
    <Page
      eyebrow="Forms"
      title="Select"
      lede="One choice from many. A styled listbox rather than a native select, which is a trade rather than a free win."
    >
      <Preview
        title="Basic"
        description="Open it and type to jump to an option."
        stack
        code={`<Select.Root defaultValue="public">
  <Select.Trigger>
    <Select.Value placeholder="Choose access…" />
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
      <Select.Label>Registry</Select.Label>
      <Select.Item value="public">Public</Select.Item>
      <Select.Item value="restricted">Restricted</Select.Item>
    </Select.Group>
    <Select.Separator />
    <Select.Group>
      <Select.Label>Internal</Select.Label>
      <Select.Item value="private">Private</Select.Item>
      <Select.Item value="none" disabled>Unpublished</Select.Item>
    </Select.Group>
  </Select.Content>
</Select.Root>`}
      >
        <div style={{ width: 280 }}>
          <Select.Root defaultValue="public">
            <Select.Trigger>
              <Select.Value placeholder="Choose access…" />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.Label>Registry</Select.Label>
                <Select.Item value="public">Public</Select.Item>
                <Select.Item value="restricted">Restricted</Select.Item>
              </Select.Group>
              <Select.Separator />
              <Select.Group>
                <Select.Label>Internal</Select.Label>
                <Select.Item value="private">Private</Select.Item>
                <Select.Item value="none" disabled>
                  Unpublished
                </Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
      </Preview>

      <Callout>
        <code>Select.Label</code> only works inside <code>Select.Group</code> and throws if it is
        not. The label is the group&apos;s accessible name, so a label with no group names nothing.
      </Callout>

      <Callout>
        A value too long for the trigger truncates, and the list is free to be wider than the
        trigger it drops from. The control has a width to keep in a form column; the list only has
        to be readable, and stops at the edge of the viewport.
      </Callout>

      <Callout tone="warning">
        A native <code>select</code> gets the platform&apos;s own picker on mobile, which usually
        beats anything a web page can draw. Reach for this one when options need icons, descriptions
        or grouping the native element cannot express.
      </Callout>

      <Preview
        title="In a Field"
        description="Field.Control hands its props to the trigger."
        stack
        code={`<Field.Root required>
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
            {
              name: 'Select.Group',
              description: 'Wraps a label and the items it names. Required around Select.Label.',
            },
            {
              name: 'Select.Label',
              description:
                'Names the group it is in. Skipped by the keyboard, and throws outside a Group.',
            },
            { name: 'Select.Separator', description: 'Divider between groups.' },
          ]}
        />
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'value', type: 'string', description: 'Controlled selection, on Root.' },
            {
              name: 'defaultValue',
              type: 'string',
              description: 'On Root. The starting choice when the value is left uncontrolled.',
            },
            {
              name: 'onValueChange',
              type: '(value: string) => void',
              description: 'On Root. Fires with the value of the chosen item.',
            },
            {
              name: 'size',
              type: `'s' | 'm' | 'l'`,
              default: `'m'`,
              description: 'On Trigger. Height, inset and type, all matching Input.',
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
