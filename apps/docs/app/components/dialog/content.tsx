'use client';

import { Alert } from '@minuk-hwang-design-system/components-react/alert';
import { Button } from '@minuk-hwang-design-system/components-react/button';
import { Dialog } from '@minuk-hwang-design-system/components-react/dialog';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, PartsList, Preview, PropsTable, Section } from '../../../site/Preview';

export default function DialogPage() {
  return (
    <Page
      eyebrow="Overlays"
      title="Dialog"
      lede="A modal panel. Focus trapping, scroll locking, Escape and the backdrop click all come from base-react, so this layer only adds the shape."
    >
      <Preview
        title="Basic"
        description="Open it, then press Tab and Escape."
        code={`<Dialog.Root>
  <Dialog.Trigger asChild><Button>Publish</Button></Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Publish style-tokens?</Dialog.Title>
      <Dialog.Description>
        This uploads 0.1.0 to the public npm registry. Published versions cannot be replaced.
      </Dialog.Description>
    </Dialog.Header>
    <Dialog.Body>
      <Alert.Root tone="warning">
        <Alert.Icon />
        <Alert.Body>
          <Alert.Description>
            Two packages depend on this one at workspace:^ and will need rebuilding.
          </Alert.Description>
        </Alert.Body>
      </Alert.Root>
    </Dialog.Body>
    <Dialog.Footer>
      <Dialog.Close asChild><Button variant="secondary">Cancel</Button></Dialog.Close>
      <Dialog.Close asChild><Button>Publish</Button></Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>`}
      >
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button>Publish</Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Publish style-tokens?</Dialog.Title>
              <Dialog.Description>
                This uploads 0.1.0 to the public npm registry. Published versions cannot be
                replaced.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>
              <Alert.Root tone="warning">
                <Alert.Icon />
                <Alert.Body>
                  <Alert.Description>
                    Two packages depend on this one at workspace:^ and will need rebuilding.
                  </Alert.Description>
                </Alert.Body>
              </Alert.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Close asChild>
                <Button variant="secondary">Cancel</Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button>Publish</Button>
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      </Preview>

      <Callout>
        Tab through it. Focus never leaves the dialog and returns to the trigger on close, and the
        page behind does not scroll. None of that is written here; it is why the base layer exists.
      </Callout>

      <Preview
        title="Size"
        description="Use size to set the width. The body scrolls, not the page, so the actions never leave the screen."
        code={`{(['s', 'm', 'l'] as const).map(size => (
  <Dialog.Root key={size}>
    <Dialog.Trigger asChild>
      <Button variant="secondary">size {size}</Button>
    </Dialog.Trigger>
    <Dialog.Content size={size}>
      <Dialog.Header>
        <Dialog.Title>Size {size}</Dialog.Title>
        <Dialog.Description>400, 520 and 720px at most.</Dialog.Description>
      </Dialog.Header>
      <Dialog.Footer>
        <Dialog.Close asChild><Button variant="secondary">Close</Button></Dialog.Close>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
))}`}
      >
        {(['s', 'm', 'l'] as const).map(size => (
          <Dialog.Root key={size}>
            <Dialog.Trigger asChild>
              <Button variant="secondary">size {size}</Button>
            </Dialog.Trigger>
            <Dialog.Content size={size}>
              <Dialog.Header>
                <Dialog.Title>Size {size}</Dialog.Title>
                <Dialog.Description>400, 520 and 720px at most.</Dialog.Description>
              </Dialog.Header>
              <Dialog.Footer>
                <Dialog.Close asChild>
                  <Button variant="secondary">Close</Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Root>
        ))}
      </Preview>

      <Callout tone="warning">
        <code>Dialog.Title</code> is not really optional. Without it the dialog has nothing to
        announce itself as, and Radix warns. If the design has no visible heading, wrap the title in{' '}
        <code>VisuallyHidden</code> rather than dropping it.
      </Callout>

      <Section title="Parts">
        <PartsList
          parts={[
            { name: 'Dialog.Root', description: 'Owns the open state.' },
            {
              name: 'Dialog.Trigger',
              description: 'Opens it. Use asChild to keep your own button.',
            },
            {
              name: 'Dialog.Content',
              description: 'The panel, with the scrim and the close button.',
            },
            {
              name: 'Dialog.Header',
              description: 'Title and description. Padded to clear the close button.',
            },
            {
              name: 'Dialog.Title',
              description: (
                <>
                  The accessible name and the visible heading, same node. A <code>Heading</code>, so
                  it takes every prop of one.
                </>
              ),
            },
            {
              name: 'Dialog.Description',
              description: (
                <>
                  Announced with the title on open. A <code>Text</code>, so it takes every prop of
                  one, including <code>leading=&quot;reading&quot;</code>.
                </>
              ),
            },
            { name: 'Dialog.Body', description: 'The scrolling region.' },
            { name: 'Dialog.Footer', description: 'Actions, aligned right.' },
            { name: 'Dialog.Close', description: 'Closes it from anywhere inside.' },
          ]}
        />
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'open', type: 'boolean', description: 'Controlled state, on Root.' },
            {
              name: 'onOpenChange',
              type: '(open: boolean) => void',
              description: 'On Root. Fires for every way out, including Escape and the scrim.',
            },
            {
              name: 'size',
              type: `'s' | 'm' | 'l'`,
              default: `'m'`,
              description: 'On Content. 400, 520 or 720px.',
            },
            {
              name: 'hideClose',
              type: 'boolean',
              default: 'false',
              description: 'Only if a footer action closes the dialog.',
            },
          ]}
        />
      </Section>
    </Page>
  );
}
