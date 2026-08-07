'use client';

import { Alert } from '@minuk-hwang-design-system/components-react/alert';
import { Button } from '@minuk-hwang-design-system/components-react/button';
import { Dialog } from '@minuk-hwang-design-system/components-react/dialog';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, PartsList, Preview, PropsTable, Prose } from '../../../site/Preview';

export default function DialogPage() {
  return (
    <Page
      eyebrow="Overlays"
      title="Dialog"
      lede="A modal panel. Focus trapping, scroll locking, Escape and the backdrop click all come from base-react — what this layer adds is the shape."
    >
      <Preview
        title="open it, then press Tab and Escape"
        code={`<Dialog.Root>
  <Dialog.Trigger asChild><Button>Publish</Button></Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Publish style-tokens?</Dialog.Title>
      <Dialog.Description>Published versions cannot be replaced.</Dialog.Description>
    </Dialog.Header>
    <Dialog.Body>…</Dialog.Body>
    <Dialog.Footer>
      <Dialog.Close asChild><Button variant="secondary">Cancel</Button></Dialog.Close>
      <Button>Publish</Button>
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
        Tab through it — focus never leaves the dialog, and it returns to the trigger on close. The
        page behind it does not scroll. None of that is written here; it is the reason the base
        layer exists.
      </Callout>

      <Preview title="size" code={`<Dialog.Content size="s">…</Dialog.Content>`}>
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

      <Prose>
        <p>
          The body scrolls, not the page. A dialog whose actions have scrolled off screen has no way
          out, so the header and footer stay put and only the middle moves.
        </p>
        <p>
          It rises 8px as it opens rather than scaling from the centre. A popover scales because it
          belongs to the trigger it grew from; a dialog does not belong to anything on the page, and
          scaling makes it look inflated.
        </p>
      </Prose>

      <Callout tone="warning">
        <code>Dialog.Title</code> is not really optional — without it the dialog has nothing to
        announce itself as, and Radix warns. If the design has no visible heading, wrap the title in{' '}
        <code>VisuallyHidden</code> rather than dropping it.
      </Callout>

      <section>
        <h2>Parts</h2>
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
              description: 'The accessible name and the visible heading, same node.',
            },
            { name: 'Dialog.Description', description: 'Announced with the title on open.' },
            { name: 'Dialog.Body', description: 'The scrolling region.' },
            { name: 'Dialog.Footer', description: 'Actions, aligned right.' },
            { name: 'Dialog.Close', description: 'Closes it from anywhere inside.' },
          ]}
        />
      </section>

      <section>
        <h2>Props</h2>
        <PropsTable
          rows={[
            { name: 'open', type: 'boolean', description: 'Controlled state, on Root.' },
            { name: 'onOpenChange', type: '(open: boolean) => void', description: '' },
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
      </section>
    </Page>
  );
}
