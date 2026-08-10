'use client';

import { Badge } from '@minuk-hwang-design-system/components-react/badge';
import { Button } from '@minuk-hwang-design-system/components-react/button';
import { Card } from '@minuk-hwang-design-system/components-react/card';
import { Text } from '@minuk-hwang-design-system/components-react/text';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, PartsList, Preview, PropsTable, Section } from '../../../site/Preview';

export default function CardPage() {
  return (
    <Page
      eyebrow="Display"
      title="Card"
      lede="A sectioned container. Compound because the order, count and contents of the sections belong to the caller."
    >
      <Preview
        title="Sections"
        description="Use the parts you need, in the order you need them. All of them are optional."
        code={`<Card.Root>
  <Card.Header>
    <Card.Title>style-tokens</Card.Title>
    <Card.Description>Colour, spacing, type, shadow, motion</Card.Description>
  </Card.Header>
  <Card.Body>…</Card.Body>
  <Card.Footer align="end">
    <Button variant="ghost" size="s">Docs</Button>
    <Button size="s">Install</Button>
  </Card.Footer>
</Card.Root>`}
      >
        <Card.Root style={{ maxWidth: 340 }}>
          <Card.Header>
            <Card.Title>style-tokens</Card.Title>
            <Card.Description>Colour, spacing, type, shadow, motion</Card.Description>
          </Card.Header>
          <Card.Body>
            <Text size={4} color="assistive">
              Four consumption formats from one source, so none of them can drift.
            </Text>
          </Card.Body>
          <Card.Footer align="end">
            <Button variant="ghost" size="s">
              Docs
            </Button>
            <Button size="s">Install</Button>
          </Card.Footer>
        </Card.Root>
      </Preview>

      <Preview
        title="Elevation"
        description="Use elevation to pick a border or a shadow. They are alternatives, not a scale: doing both reads as indecision."
        code={`<Card.Root elevation="flat" />
<Card.Root elevation="outlined" />
<Card.Root elevation="elevated" />`}
      >
        {(['flat', 'outlined', 'elevated'] as const).map(elevation => (
          <Card.Root key={elevation} elevation={elevation} style={{ width: 180 }}>
            <Card.Body>
              <Text size={5} weight="bold">
                {elevation}
              </Text>
            </Card.Body>
          </Card.Root>
        ))}
      </Preview>

      <Preview
        title="Interactive"
        description="Use interactive to add hover and focus affordances to a card that is part of a control."
        code={`<Card.Root elevation="elevated" interactive>…</Card.Root>`}
      >
        <Card.Root elevation="elevated" interactive style={{ maxWidth: 300 }}>
          <Card.Header>
            <Card.Title>base-react</Card.Title>
            <Card.Description>18 headless primitives</Card.Description>
          </Card.Header>
          <Card.Body>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <Badge size="s" tone="accent">
                Radix
              </Badge>
              <Badge size="s">5.6 KB</Badge>
              <Badge size="s" tone="success">
                WAI-ARIA
              </Badge>
            </div>
          </Card.Body>
        </Card.Root>
      </Preview>

      <Callout tone="warning">
        <code>interactive</code> adds hover and focus affordances. It does not make the card
        clickable, and a div with an onClick is not reachable by keyboard. Put the handler on a real
        button or link inside, or make the whole card one.
      </Callout>

      <Section title="Parts">
        <PartsList
          parts={[
            {
              name: 'Card.Root',
              description:
                'The container. Padding lives on the sections, so media can run edge to edge between them.',
            },
            { name: 'Card.Header', description: 'Title and description.' },
            {
              name: 'Card.Title',
              description:
                'Defaults to h3, since a card is almost never the top of a document outline.',
            },
            { name: 'Card.Description', description: 'Assistive-coloured subtitle.' },
            { name: 'Card.Body', description: 'The main content.' },
            {
              name: 'Card.Footer',
              description: 'Actions. align="end" gives the usual cancel/confirm shape.',
            },
            {
              name: 'Card.Media',
              description: 'Full-bleed image, outside the padded sections so it meets the corners.',
            },
          ]}
        />
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            {
              name: 'elevation',
              type: `'flat' | 'outlined' | 'elevated'`,
              default: `'outlined'`,
              description: 'How the card separates itself from the page.',
            },
            {
              name: 'interactive',
              type: 'boolean',
              default: 'false',
              description: 'Hover and focus affordances. Does not add behaviour.',
            },
          ]}
        />
      </Section>
    </Page>
  );
}
