'use client';

import { Button } from '@minuk-hwang-design-system/components-react/button';
import { Icon } from '@minuk-hwang-design-system/components-react/icon';
import { Tooltip } from '@minuk-hwang-design-system/components-react/tooltip';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, PartsList, Preview, PropsTable, Prose } from '../../../site/Preview';

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
      lede="A short label shown on hover or focus. Only ever supplementary — it is invisible on touch and gone the moment focus moves."
    >
      <Preview
        title="hover, or tab to them"
        code={`<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <Button variant="ghost" iconOnly aria-label="Copy">
        <Icon name="content_copy" />
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>Copy install command</Tooltip.Content>
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
        screen reader user on a touch device will never see the tooltip — and anything a user must
        read to proceed belongs in the interface itself.
      </Callout>

      <Prose>
        <p>
          Mount <code>Tooltip.Provider</code> once near the app root. It shares the open and close
          delays, which is what stops a row of icon buttons from each running its own — move along
          the row above and only the first one waits.
        </p>
        <p>
          Inverted rather than panelled: a tooltip floats over content instead of sitting on it, and
          at this size a border would be most of what you see.
        </p>
      </Prose>

      <section>
        <h2>Parts</h2>
        <PartsList
          parts={[
            { name: 'Tooltip.Provider', description: 'Shares delays. Mount once near the root.' },
            { name: 'Tooltip.Root', description: 'One tooltip.' },
            { name: 'Tooltip.Trigger', description: 'What is hovered or focused.' },
            { name: 'Tooltip.Content', description: 'The label.' },
            { name: 'Tooltip.Arrow', description: 'Optional pointer.' },
          ]}
        />
      </section>

      <section>
        <h2>Props</h2>
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
              description: '',
            },
            { name: 'sideOffset', type: 'number', default: '6', description: '' },
          ]}
        />
      </section>
    </Page>
  );
}
