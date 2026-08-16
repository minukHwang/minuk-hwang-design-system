'use client';

import { Switch } from '@minuk-hwang-design-system/components-react/switch';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, PropsTable, Section } from '../../../site/Preview';

export default function SwitchPage() {
  return (
    <Page
      eyebrow="Forms"
      title="Switch"
      lede="On or off, taking effect immediately. If the change needs a Save button it is a Checkbox: the shape is a promise about when something happens."
    >
      <Preview
        title="State"
        description="On, off, and either of those with disabled."
        stack
        code={`<Switch defaultChecked>Publish provenance</Switch>
<Switch>Dry run</Switch>
<Switch disabled>Two-factor required</Switch>
<Switch disabled defaultChecked>Signed commits enforced</Switch>`}
      >
        <Switch defaultChecked>Publish provenance</Switch>
        <Switch>Dry run</Switch>
        <Switch disabled>Two-factor required</Switch>
        <Switch disabled defaultChecked>
          Signed commits enforced
        </Switch>
      </Preview>

      <Preview
        title="Label"
        description="Children put the label at the start of the row and the track at the end, filling the width. Omit them for the track alone, inline, when something else does the labelling."
        stack
        code={`<Switch defaultChecked>Publish provenance</Switch>
<Switch defaultChecked />`}
      >
        <Switch defaultChecked>Publish provenance</Switch>
        <Switch defaultChecked />
      </Preview>

      <Callout tone="warning">
        A switch in a form with a Save button is the usual misuse. The user flips it, walks away,
        and finds out later that nothing was saved, because the control told them it had already
        happened.
      </Callout>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'checked', type: 'boolean', description: 'Controlled state.' },
            { name: 'defaultChecked', type: 'boolean', description: 'Uncontrolled initial state.' },
            {
              name: 'onCheckedChange',
              type: '(checked: boolean) => void',
              description: 'Fires on every flip. This is where the change is applied.',
            },
            {
              name: 'children',
              type: 'ReactNode',
              description: 'Label text. Omit to render the track alone.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'Blocks the flip and dims the track, in either state.',
            },
          ]}
        />
      </Section>
    </Page>
  );
}
