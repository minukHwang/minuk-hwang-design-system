'use client';

import { Button } from '@minuk-hwang-design-system/components-react/button';
import { Field } from '@minuk-hwang-design-system/components-react/field';
import { Input } from '@minuk-hwang-design-system/components-react/input';
import { Popover } from '@minuk-hwang-design-system/components-react/popover';
import { Text } from '@minuk-hwang-design-system/components-react/text';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, PartsList, Preview, PropsTable } from '../../../site/Preview';

export default function PopoverPage() {
  return (
    <Page
      eyebrow="Overlays"
      title="Popover"
      lede="An anchored panel holding interactive content. The distinction from Tooltip is not size — it is whether anything inside can be focused."
    >
      <Preview
        title="open it — the input is reachable"
        code={`<Popover.Root>
  <Popover.Trigger asChild><Button variant="secondary">Rename</Button></Popover.Trigger>
  <Popover.Content>
    <Field.Root>…</Field.Root>
  </Popover.Content>
</Popover.Root>`}
      >
        <Popover.Root>
          <Popover.Trigger asChild>
            <Button variant="secondary">Rename package</Button>
          </Popover.Trigger>
          <Popover.Content>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Field.Root>
                <Field.Label>New name</Field.Label>
                <Field.Control>
                  {props => <Input {...props} size="s" defaultValue="style-tokens" />}
                </Field.Control>
              </Field.Root>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <Popover.Close asChild>
                  <Button size="s" variant="ghost">
                    Cancel
                  </Button>
                </Popover.Close>
                <Popover.Close asChild>
                  <Button size="s">Rename</Button>
                </Popover.Close>
              </div>
            </div>
          </Popover.Content>
        </Popover.Root>
      </Preview>

      <Callout tone="warning">
        A link or a button inside a <code>Tooltip</code> is unreachable: tooltips close on blur, so
        tabbing towards the link dismisses it. Anything focusable goes here instead.
      </Callout>

      <Preview
        title="with an arrow"
        code={`<Popover.Content>
  …
  <Popover.Arrow />
</Popover.Content>`}
      >
        <Popover.Root>
          <Popover.Trigger asChild>
            <Button variant="ghost">Why 0.48?</Button>
          </Popover.Trigger>
          <Popover.Content>
            <Text size="body3" color="assistive">
              Eight per cent black moves a white ground by 20/255 and a near-black one by 2. The
              dark theme needs a heavier ink to land at the same separation.
            </Text>
            <Popover.Arrow />
          </Popover.Content>
        </Popover.Root>
      </Preview>

      <section>
        <h2>Parts</h2>
        <PartsList
          parts={[
            { name: 'Popover.Root', description: 'Owns the open state.' },
            { name: 'Popover.Trigger', description: 'Opens it and anchors it.' },
            { name: 'Popover.Anchor', description: 'Anchors to something other than the trigger.' },
            {
              name: 'Popover.Content',
              description: 'The panel. Portalled, with collision padding already set.',
            },
            { name: 'Popover.Arrow', description: 'Optional pointer.' },
            { name: 'Popover.Close', description: 'Closes it from inside.' },
          ]}
        />
      </section>

      <section>
        <h2>Props</h2>
        <PropsTable
          rows={[
            {
              name: 'side',
              type: `'top' | 'right' | 'bottom' | 'left'`,
              default: `'bottom'`,
              description: 'Preferred side. Flips near a viewport edge.',
            },
            {
              name: 'align',
              type: `'start' | 'center' | 'end'`,
              default: `'center'`,
              description: '',
            },
            {
              name: 'sideOffset',
              type: 'number',
              default: '8',
              description: 'Gap from the trigger.',
            },
          ]}
        />
      </section>
    </Page>
  );
}
