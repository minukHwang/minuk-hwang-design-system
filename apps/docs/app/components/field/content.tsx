'use client';

import { Field } from '@minuk-hwang-design-system/components-react/field';
import { Input, Textarea } from '@minuk-hwang-design-system/components-react/input';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, PartsList, Preview, PropsTable, Prose, Section } from '../../../site/Preview';

export default function FieldPage() {
  return (
    <Page
      eyebrow="Forms"
      title="Field"
      lede="Groups a label, a control, and whatever explains it. This is the component that most repays being compound, because everything it does is invisible when it is done wrong."
    >
      <Prose>
        <p>
          A label points at its control&apos;s id, the control points back at its description and
          its error, and an invalid control has to say so where a screen reader can hear it. Four
          ids, three attributes, every one silently skippable — the field looks right either way.{' '}
          <code>Field.Root</code> holds them in context so the wiring happens once.
        </p>
      </Prose>

      <Preview
        title="the whole thing"
        stack
        code={`<Field.Root required>
  <Field.Label>Package name</Field.Label>
  <Field.Control>
    {props => <Input {...props} placeholder="@scope/name" />}
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
        title="invalid"
        stack
        code={`<Field.Root invalid={Boolean(error)}>
  <Field.Label>Version</Field.Label>
  <Field.Control>{props => <Input {...props} />}</Field.Control>
  <Field.Error>{error}</Field.Error>
</Field.Root>`}
      >
        <Field.Root invalid>
          <Field.Label>Version</Field.Label>
          <Field.Control>{props => <Input {...props} defaultValue="0.0.1" />}</Field.Control>
          <Field.Error>A caret range does nothing below 0.1.0. Bump before publishing.</Field.Error>
        </Field.Root>
      </Preview>

      <Prose>
        <p>
          <code>Field.Error</code> renders nothing while the root is valid, and carries{' '}
          <code>role=&quot;alert&quot;</code> when it appears so it is announced on arrival. The red
          border is not a prop — the control styles itself from <code>aria-invalid</code>, so an
          error state cannot be drawn on a control that still announces itself as valid.
        </p>
      </Prose>

      <Preview
        title="description and error together"
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
          <Field.Control>{props => <Textarea {...props} defaultValue="" />}</Field.Control>
          <Field.Description>Markdown. Shown on the npm page.</Field.Description>
          <Field.Error>Cannot be empty for a minor release.</Field.Error>
        </Field.Root>
      </Preview>

      <Prose>
        <p>
          The description stays when the field goes invalid: an error adds to the guidance rather
          than replacing it. <code>aria-describedby</code> lists the error first, so that is read
          first.
        </p>
      </Prose>

      <Section title="Why a render prop">
        <Prose>
          <p>
            <code>Field.Control</code> hands the props over instead of wrapping the control, because
            the control might be an <code>input</code>, a <code>textarea</code>, a{' '}
            <code>Select</code>, or something the system has never seen. Cloning an unknown child to
            inject props guesses at its API.
          </p>
        </Prose>
        <Preview
          title="what Field.Control passes"
          code={`<Field.Control>
  {({ id, 'aria-describedby': describedBy, 'aria-invalid': invalid, disabled, required }) => (
    <MyOwnControl id={id} aria-describedby={describedBy} … />
  )}
</Field.Control>`}
        >
          <Field.Root>
            <Field.Label>Anything at all</Field.Label>
            <Field.Control>
              {props => <Input {...props} placeholder="Your control, our wiring" />}
            </Field.Control>
          </Field.Root>
        </Preview>
      </Section>

      <Section title="Parts">
        <PartsList
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
              description:
                'Helper text. Registers itself so aria-describedby only lists it when it rendered.',
            },
            {
              name: 'Field.Error',
              description:
                'Validation message. Renders only while the root is invalid, with role="alert".',
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
