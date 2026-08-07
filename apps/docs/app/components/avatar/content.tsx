'use client';

import { Avatar } from '@minuk-hwang-design-system/components-react/avatar';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { PartsList, Preview, PropsTable, Prose, Section } from '../../../site/Preview';

const SIZES = ['xs', 's', 'm', 'l', 'xl'] as const;

export default function AvatarPage() {
  return (
    <Page
      eyebrow="Display"
      title="Avatar"
      lede="A user or entity image with a fallback. Compound because loading an image is a state machine, not a prop."
    >
      <Preview
        title="size"
        code={`<Avatar.Root size="m">\n  <Avatar.Image src={url} alt="" />\n  <Avatar.Fallback>MH</Avatar.Fallback>\n</Avatar.Root>`}
      >
        {SIZES.map(size => (
          <Avatar.Root key={size} size={size}>
            <Avatar.Fallback>MH</Avatar.Fallback>
          </Avatar.Root>
        ))}
      </Preview>

      <Prose>
        <p>
          A <code>src</code> prop with an <code>?? initials</code> default does not work here.{' '}
          <code>Avatar.Image</code> renders only once the file has actually decoded, and{' '}
          <code>Avatar.Fallback</code> fills the gap until then — collapsing that into one prop
          either flashes the initials over a perfectly good cached image, or leaves a broken-image
          glyph when the URL 404s.
        </p>
        <p>
          <code>delayMs</code> on the fallback keeps it from appearing at all for an image that
          resolves in a few milliseconds.
        </p>
      </Prose>

      <Preview
        title="fallback while an image fails"
        code={`<Avatar.Root>
  <Avatar.Image src="/does-not-exist.png" alt="" />
  <Avatar.Fallback delayMs={300}>MH</Avatar.Fallback>
</Avatar.Root>`}
      >
        <Avatar.Root size="l">
          <Avatar.Image src="/does-not-exist.png" alt="" />
          <Avatar.Fallback>MH</Avatar.Fallback>
        </Avatar.Root>
        <Avatar.Root size="l">
          <Avatar.Fallback>JK</Avatar.Fallback>
        </Avatar.Root>
        <Avatar.Root size="l">
          <Avatar.Fallback>이</Avatar.Fallback>
        </Avatar.Root>
      </Preview>

      <Section title="Parts">
        <PartsList
          parts={[
            {
              name: 'Avatar.Root',
              description:
                'The circle. Holds the size, which the fallback reads to scale its text.',
            },
            { name: 'Avatar.Image', description: 'Renders only after the image decodes.' },
            {
              name: 'Avatar.Fallback',
              description: 'Shown until then, and permanently if the image never loads.',
            },
          ]}
        />
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            {
              name: 'size',
              type: `'xs' | 's' | 'm' | 'l' | 'xl'`,
              default: `'m'`,
              description: '24 to 64px. Fallback type scales with it.',
            },
            {
              name: 'delayMs',
              type: 'number',
              description:
                'On Fallback. Waits before showing, so a cached image never flashes initials.',
            },
          ]}
        />
      </Section>
    </Page>
  );
}
