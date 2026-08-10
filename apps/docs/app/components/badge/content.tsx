'use client';

import { Badge } from '@minuk-hwang-design-system/components-react/badge';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, PropsTable, Section } from '../../../site/Preview';

const TONES = ['neutral', 'accent', 'info', 'success', 'warning', 'error'] as const;

export default function BadgePage() {
  return (
    <Page
      eyebrow="Display"
      title="Badge"
      lede="A small label reporting state the user cannot change. Not interactive and not focusable: if it can be clicked or dismissed, it is a Chip."
    >
      <Preview
        title="Tone"
        description="Use tone to say what the state is. Text and background come from the same status scale, so the pair clears AA by construction."
        code={`<Badge tone="success">Live</Badge>\n<Badge tone="error">Failed</Badge>`}
      >
        {TONES.map(tone => (
          <Badge key={tone} tone={tone}>
            {tone}
          </Badge>
        ))}
      </Preview>

      <Preview
        title="Solid"
        description="Use solid when the badge has to carry across a busy row. The text colour is the one measured to pass on that fill."
        code={`<Badge tone="error" solid>Blocked</Badge>`}
      >
        {TONES.map(tone => (
          <Badge key={tone} tone={tone} solid>
            {tone}
          </Badge>
        ))}
      </Preview>

      <Callout tone="warning">
        A tone carries meaning only to people who can see it. If the meaning matters, put it in the
        words: &ldquo;Failed&rdquo; beside a red badge, not a red badge alone.
      </Callout>

      <Preview
        title="Size"
        description="Two sizes, matching the two chip heights."
        code={`<Badge size="s">3</Badge>`}
      >
        <Badge size="s" tone="accent">
          small
        </Badge>
        <Badge size="m" tone="accent">
          medium
        </Badge>
      </Preview>

      <Section title="Props">
        <PropsTable
          rows={[
            {
              name: 'tone',
              type: `'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'error'`,
              default: `'neutral'`,
              description: 'What the state is, not what colour it is.',
            },
            {
              name: 'solid',
              type: 'boolean',
              default: 'false',
              description: 'Filled rather than tinted, for the one badge that has to be seen.',
            },
            {
              name: 'size',
              type: `'s' | 'm'`,
              default: `'m'`,
              description: 'Small for counts and inline markers.',
            },
          ]}
        />
      </Section>
    </Page>
  );
}
