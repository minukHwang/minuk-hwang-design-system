'use client';

import { Alert } from '@minuk-hwang-design-system/components-react/alert';
import { Button } from '@minuk-hwang-design-system/components-react/button';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, PartsList, Preview, PropsTable, Section } from '../../../site/Preview';

const TONES = [
  [
    'info',
    'Scheduled maintenance',
    'The registry will be read-only on Saturday from 02:00 to 04:00 KST.',
  ],
  ['success', 'Deploy finished', 'style-tokens@0.1.0 published to npm 40 seconds ago.'],
  [
    'warning',
    'Token nearly expired',
    'The publish token expires in 6 days. Rotate it before the next release.',
  ],
  [
    'error',
    'Build failed',
    'components-react could not resolve base-react/select. See the CI log.',
  ],
] as const;

export default function AlertPage() {
  return (
    <Page
      eyebrow="Display"
      title="Alert"
      lede="An inline message about the state of something on the page. Compound because the parts are optional and their order is the caller's."
    >
      <Preview
        title="Tone"
        description="Use tone to say what kind of message it is. Alert.Icon picks its own glyph from it, so the tone is written once."
        stack
        code={`<Alert.Root tone="warning">
  <Alert.Icon />
  <Alert.Body>
    <Alert.Title>Token nearly expired</Alert.Title>
    <Alert.Description>Rotate it before the next release.</Alert.Description>
  </Alert.Body>
</Alert.Root>`}
      >
        {TONES.map(([tone, title, description]) => (
          <Alert.Root key={tone} tone={tone}>
            <Alert.Icon />
            <Alert.Body>
              <Alert.Title>{title}</Alert.Title>
              <Alert.Description>{description}</Alert.Description>
            </Alert.Body>
          </Alert.Root>
        ))}
      </Preview>

      <Preview
        title="With an action"
        description="Anything placed after Alert.Body is pushed to the far edge and centred against the block."
        stack
        code={`<Alert.Root tone="neutral">
  <Alert.Icon name="info" />
  <Alert.Body>
    <Alert.Description>Nothing to publish: the working tree is clean.</Alert.Description>
  </Alert.Body>
</Alert.Root>`}
      >
        <Alert.Root tone="neutral">
          <Alert.Icon name="info" />
          <Alert.Body>
            <Alert.Description>Nothing to publish: the working tree is clean.</Alert.Description>
          </Alert.Body>
        </Alert.Root>
        <Alert.Root tone="error">
          <Alert.Icon />
          <Alert.Body>
            <Alert.Title>Two packages need rebuilding</Alert.Title>
            <Alert.Description>They depend on this one at workspace:^.</Alert.Description>
          </Alert.Body>
          <Button size="s" variant="secondary">
            Rebuild
          </Button>
        </Alert.Root>
      </Preview>

      <Callout tone="warning">
        <code>live</code> makes a screen reader announce the alert as it appears. Use it for
        something that arrived in response to an action. Leave it off for a banner that was on the
        page all along, or it is read out on every navigation.
      </Callout>

      <Section title="Parts">
        <PartsList
          parts={[
            {
              name: 'Alert.Root',
              description: 'Holds the tone and passes it down. Optionally a live region.',
            },
            {
              name: 'Alert.Icon',
              description: 'Defaults to the glyph matching the tone. Always decorative.',
            },
            {
              name: 'Alert.Body',
              description: 'Everything right of the icon, so text stays aligned when it wraps.',
            },
            { name: 'Alert.Title', description: 'Optional. A one-line alert does not need one.' },
            { name: 'Alert.Description', description: 'The message.' },
          ]}
        />
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            {
              name: 'tone',
              type: `'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'error'`,
              default: `'info'`,
              description: 'Sets the tint and the default icon.',
            },
            {
              name: 'live',
              type: 'boolean',
              default: 'false',
              description:
                'role="alert". For messages that arrive, not banners that were always there.',
            },
          ]}
        />
      </Section>
    </Page>
  );
}
