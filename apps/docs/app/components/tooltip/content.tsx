'use client';

import { Button } from '@minuk-hwang-design-system/components-react/button';
import { Icon } from '@minuk-hwang-design-system/components-react/icon';
import { Tooltip } from '@minuk-hwang-design-system/components-react/tooltip';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, PartsList, Preview, PropsTable, Section } from '../../../site/Preview';

const ACTIONS = [
  ['content_copy', 'Copy install command'],
  ['refresh', 'Regenerate scales'],
  ['delete', 'Unpublish'],
] as const;

export default function TooltipPage() {
  return (
    <Page
      eyebrow="Overlays"
      title="Tooltip"
      lede="A short label shown on hover or focus. Only ever supplementary: it is invisible on touch and gone the moment focus moves."
    >
      <Preview
        title="Basic"
        description="Hover, or tab to them. Mount Tooltip.Provider once near the app root so a row of icon buttons shares one open delay."
        code={`<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <Button variant="ghost" iconOnly aria-label="Copy">
        <Icon name="content_copy" />
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      Copy install command
      <Tooltip.Arrow />
    </Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>`}
      >
        <Tooltip.Provider>
          {ACTIONS.map(([name, label]) => (
            <Tooltip.Root key={name}>
              <Tooltip.Trigger asChild>
                <Button variant="ghost" iconOnly aria-label={label}>
                  <Icon name={name} />
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>
                {label}
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip.Root>
          ))}
        </Tooltip.Provider>
      </Preview>

      <Callout tone="warning">
        A tooltip is not a label. The buttons above carry <code>aria-label</code> as well, because a
        screen reader user on a touch device will never see the tooltip. Anything a user must read
        to proceed belongs in the interface itself.
      </Callout>

      <Section title="Parts">
        <PartsList
          namespace="Tooltip"
          parts={[
            { name: 'Tooltip.Provider', description: 'Shares delays. Mount once near the root.' },
            { name: 'Tooltip.Root', description: 'One tooltip.' },
            { name: 'Tooltip.Trigger', description: 'What is hovered or focused.' },
            { name: 'Tooltip.Content', description: 'The label.' },
            { name: 'Tooltip.Arrow', description: 'Optional pointer.' },
          ]}
        />
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            {
              name: 'delayDuration',
              type: 'number',
              default: '700',
              description: 'On Provider or Root. How long before the first one opens.',
            },
            {
              name: 'side',
              type: `'top' | 'right' | 'bottom' | 'left'`,
              default: `'top'`,
              description:
                'On Content. Preferred side. It flips to the opposite one rather than run off the viewport.',
            },
            {
              name: 'sideOffset',
              type: 'number',
              default: '6',
              description: 'On Content. Gap between the tooltip and its trigger, in pixels.',
            },
            {
              name: 'collisionPadding',
              type: 'number',
              default: '8',
              description: 'On Content. How close to the viewport edge it may sit before shifting.',
            },
          ]}
        />
      </Section>
    </Page>
  );
}
