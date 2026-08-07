'use client';

import { Switch } from '@minuk-hwang-design-system/components-react/switch';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, PropsTable, Prose, Section } from '../../../site/Preview';

export default function SwitchPage() {
  return (
    <Page
      eyebrow="Forms"
      title="Switch"
      lede="On or off, taking effect immediately. If the change needs a Save button it is a Checkbox — the shape is a promise about when something happens."
    >
      <Preview title="state" stack code={`<Switch defaultChecked>Publish provenance</Switch>`}>
        <Switch defaultChecked>Publish provenance</Switch>
        <Switch>Dry run</Switch>
        <Switch disabled>Two-factor required</Switch>
        <Switch disabled defaultChecked>
          Signed commits enforced
        </Switch>
      </Preview>

      <Callout tone="warning">
        A switch in a form with a Save button is the usual misuse. The user flips it, walks away,
        and finds out later that nothing was saved — the control told them it had already happened.
      </Callout>

      <Prose>
        <p>
          The knob moves with <code>translateX</code> rather than a changing offset, so the browser
          can animate it on the compositor. Animating <code>left</code> would lay the whole track
          out on every frame for a control that is 44px wide.
        </p>
      </Prose>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'checked', type: 'boolean', description: 'Controlled state.' },
            { name: 'defaultChecked', type: 'boolean', description: 'Uncontrolled initial state.' },
            { name: 'onCheckedChange', type: '(checked: boolean) => void', description: '' },
            {
              name: 'children',
              type: 'ReactNode',
              description: 'Label text. Omit to render the track alone.',
            },
            { name: 'disabled', type: 'boolean', default: 'false', description: '' },
          ]}
        />
      </Section>
    </Page>
  );
}
