'use client';

import { Avatar } from '@minuk-hwang-design-system/components-react/avatar';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { PartsList, Preview, PropsTable, Section } from '../../../site/Preview';

const SIZES = ['xs', 's', 'm', 'l', 'xl'] as const;

/**
 * Photographs rather than colored squares.
 *
 * What this component does to an image is crop it square and clip it to a
 * circle, and neither is visible on a flat fill. These are portraits in
 * landscape frames, so `object-fit: cover` has something to do.
 *
 * Unsplash does the cropping server-side, so each avatar downloads a 128px file
 * — around 7 KB — rather than a full-size photo the browser then scales. `128`
 * rather than `64` because the largest avatar is 64px and a 2x display wants
 * twice that.
 */
const face = (id: string) => `https://images.unsplash.com/${id}?w=128&h=128&fit=crop&crop=faces`;

/** One photograph across the sizes, so the row compares the size and nothing else. */
const FACE = face('photo-1494790108377-be9c29b29330');

/** Three is enough to show the crop holding across different framings. */
const FACES = [
  'photo-1500648767791-00dcc994a43e',
  'photo-1534528741775-53994a69daeb',
  'photo-1544005313-94ddf0286df2',
].map(face);

export default function AvatarPage() {
  return (
    <Page
      eyebrow="Display"
      title="Avatar"
      lede="A user or entity image with a fallback. Compound because loading an image is a state machine, not a prop."
    >
      <Preview
        title="Size"
        description="Use size to set the avatar, from 24 to 64px."
        code={`{SIZES.map(size => (
  <Avatar.Root key={size} size={size}>
    <Avatar.Image src={face} alt="" />
    <Avatar.Fallback>MH</Avatar.Fallback>
  </Avatar.Root>
))}`}
      >
        {SIZES.map(size => (
          <Avatar.Root key={size} size={size}>
            <Avatar.Image src={FACE} alt="" />
            <Avatar.Fallback>MH</Avatar.Fallback>
          </Avatar.Root>
        ))}
      </Preview>

      <Preview
        title="Image"
        description="Avatar.Image crops the photo square and the root clips it to a circle, so any aspect ratio works."
        code={`{faces.map(src => (
  <Avatar.Root key={src} size="xl">
    <Avatar.Image src={src} alt="" />
    <Avatar.Fallback>MH</Avatar.Fallback>
  </Avatar.Root>
))}`}
      >
        {FACES.map(src => (
          <Avatar.Root key={src} size="xl">
            <Avatar.Image src={src} alt="" />
            <Avatar.Fallback>MH</Avatar.Fallback>
          </Avatar.Root>
        ))}
      </Preview>

      <Preview
        title="Fallback"
        description="Avatar.Fallback fills the gap until the image decodes, and stays if it never does."
        code={`<Avatar.Root size="l">
  <Avatar.Image src="/does-not-exist.png" alt="" />
  <Avatar.Fallback delayMs={300}>MH</Avatar.Fallback>
</Avatar.Root>

<Avatar.Root size="l">
  <Avatar.Fallback>JK</Avatar.Fallback>
</Avatar.Root>

<Avatar.Root size="l">
  <Avatar.Fallback>MH</Avatar.Fallback>
</Avatar.Root>`}
      >
        <Avatar.Root size="l">
          <Avatar.Image src="/does-not-exist.png" alt="" />
          <Avatar.Fallback delayMs={300}>MH</Avatar.Fallback>
        </Avatar.Root>
        <Avatar.Root size="l">
          <Avatar.Fallback>JK</Avatar.Fallback>
        </Avatar.Root>
        <Avatar.Root size="l">
          <Avatar.Fallback>MH</Avatar.Fallback>
        </Avatar.Root>
      </Preview>

      <Section title="Parts">
        <PartsList
          namespace="Avatar"
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
