'use client';

import { Field } from '@minuk-hwang-design-system/components-react/field';
import { Input, Textarea } from '@minuk-hwang-design-system/components-react/input';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, PartsList, Preview, PropsTable, Section } from '../../../site/Preview';

export default function FieldPage() {
  return (
    <Page
      eyebrow="Forms"
      title="Field"
      lede="Groups a label, a control, and whatever explains it. This is the component that most repays being compound, because everything it does is invisible when it is done wrong."
    >
      <Preview
        title="Everything wired"
        description="Field.Root holds the ids in context, so the label points at the control and the control points back at its description and error."
        stack
        code={`<Field.Root required>
  <Field.Label>Package name</Field.Label>
  <Field.Control>
    {props => (
      <Input
        {...props}
        placeholder="@scope/name"
        defaultValue="@minuk-hwang-design-system/components-react"
      />
    )}
  </Field.Control>
  <Field.Description>
    Lowercase, no spaces. This becomes the npm install target.
  </Field.Description>
</Field.Root>`}
      >
        <Field.Root required>
          <Field.Label>Package name</Field.Label>
          <Field.Control>
            {props => (
              <Input
                {...props}
                placeholder="@scope/name"
                defaultValue="@minuk-hwang-design-system/components-react"
              />
            )}
          </Field.Control>
          <Field.Description>
            Lowercase, no spaces. This becomes the npm install target.
          </Field.Description>
        </Field.Root>
      </Preview>

      <Callout>
        Click the label above. Focus lands in the input, because <code>htmlFor</code> was filled in
        from context rather than left to whoever wrote the page.
      </Callout>

      <Preview
        title="From a server component"
        description="Pass a single element instead, and the props are cloned onto it. A function cannot cross the server boundary, so this is the form to reach for there."
        stack
        code={`<Field.Root required>
  <Field.Label>Package name</Field.Label>
  <Field.Control>
    <Input placeholder="@scope/name" />
  </Field.Control>
</Field.Root>`}
      >
        <Field.Root required>
          <Field.Label>Package name</Field.Label>
          <Field.Control>
            <Input placeholder="@scope/name" />
          </Field.Control>
        </Field.Root>
      </Preview>

      <Callout tone="warning">
        The render function stays the better form for anything the system has not seen. Cloning
        guesses at a child&apos;s API; handing the props over does not.
      </Callout>

      <Preview
        title="Invalid"
        description='Field.Error renders nothing while the root is valid, and carries role="alert" when it appears.'
        stack
        code={`<Field.Root invalid>
  <Field.Label>Version</Field.Label>
  <Field.Control>{props => <Input {...props} defaultValue="0.0.1" />}</Field.Control>
  <Field.Error>A caret range does nothing below 0.1.0. Bump before publishing.</Field.Error>
</Field.Root>`}
      >
        <Field.Root invalid>
          <Field.Label>Version</Field.Label>
          <Field.Control>{props => <Input {...props} defaultValue="0.0.1" />}</Field.Control>
          <Field.Error>A caret range does nothing below 0.1.0. Bump before publishing.</Field.Error>
        </Field.Root>
      </Preview>

      <Preview
        title="Description and error"
        description="The description stays when the field goes invalid, because an error adds to the guidance rather than replacing it."
        stack
        code={`<Field.Root invalid>
  <Field.Label>Release notes</Field.Label>
  <Field.Control>{props => <Textarea {...props} />}</Field.Control>
  <Field.Description>Markdown. Shown on the npm page.</Field.Description>
  <Field.Error>Cannot be empty for a minor release.</Field.Error>
</Field.Root>`}
      >
        <Field.Root invalid>
          <Field.Label>Release notes</Field.Label>
          <Field.Control>{props => <Textarea {...props} />}</Field.Control>
          <Field.Description>Markdown. Shown on the npm page.</Field.Description>
          <Field.Error>Cannot be empty for a minor release.</Field.Error>
        </Field.Root>
      </Preview>

      <Preview
        title="What Field.Control passes"
        description="It hands the props over instead of wrapping the control, so the control can be an input, a textarea, a Select, or something the system has never seen."
        code={`<Field.Root>
  <Field.Label>Anything at all</Field.Label>
  <Field.Control>
    {({ id, 'aria-describedby': describedBy, 'aria-invalid': invalid, disabled, required }) => (
      <Input
        id={id}
        aria-describedby={describedBy}
        aria-invalid={invalid}
        disabled={disabled}
        required={required}
        placeholder="Your control, our wiring"
      />
    )}
  </Field.Control>
</Field.Root>`}
      >
        <Field.Root>
          <Field.Label>Anything at all</Field.Label>
          <Field.Control>
            {({
              id,
              'aria-describedby': describedBy,
              'aria-invalid': invalid,
              disabled,
              required,
            }) => (
              <Input
                id={id}
                aria-describedby={describedBy}
                aria-invalid={invalid}
                disabled={disabled}
                required={required}
                placeholder="Your control, our wiring"
              />
            )}
          </Field.Control>
        </Field.Root>
      </Preview>

      <Section title="Parts">
        <PartsList
          namespace="Field"
          parts={[
            {
              name: 'Field.Root',
              description:
                'Generates the ids and holds the state. Everything else reads from it, and a part rendered outside one throws rather than pointing at nothing.',
            },
            {
              name: 'Field.Label',
              description:
                'Points at the control. Adds the required marker when the root is required.',
            },
            {
              name: 'Field.Control',
              description:
                'Render prop. Receives id, aria-describedby, aria-invalid, disabled and required.',
            },
            {
              name: 'Field.Description',
              description: (
                <>
                  Helper text. Registers itself so aria-describedby only lists it when it rendered.
                  A <code>Text</code>, so it takes every prop of one.
                </>
              ),
            },
            {
              name: 'Field.Error',
              description: (
                <>
                  Validation message. Renders only while the root is invalid, with
                  role=&quot;alert&quot;. A <code>Text</code>, so it takes every prop of one.
                </>
              ),
            },
          ]}
        />
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            {
              name: 'invalid',
              type: 'boolean',
              default: 'false',
              description:
                'Sets aria-invalid on the control and lets Field.Error render. Drives the appearance too, so the two cannot disagree.',
            },
            {
              name: 'required',
              type: 'boolean',
              default: 'false',
              description:
                'Sets required on the control and adds the marker beside the label. The marker is aria-hidden, since the attribute already says it.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'Passed to the control and dims the label.',
            },
            {
              name: 'id',
              type: 'string',
              default: 'generated',
              description:
                'Only needed when something outside the field has to point at the control.',
            },
          ]}
        />
      </Section>
    </Page>
  );
}
