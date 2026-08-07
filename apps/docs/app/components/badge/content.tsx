'use client';

import { Badge } from '@minuk-hwang-design-system/components-react/badge';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, PropsTable, Prose } from '../../../site/Preview';

const TONES = ['neutral', 'accent', 'info', 'success', 'warning', 'error'] as const;

export default function BadgePage() {
  return (
    <Page
      eyebrow="Display"
      title="Badge"
      lede="A small label reporting state the user cannot change. Not interactive and not focusable — if it can be clicked or dismissed, it is a Chip."
    >
      <Preview
        title="tone"
        code={`<Badge tone="success">Live</Badge>\n<Badge tone="error">Failed</Badge>`}
      >
        {TONES.map(tone => (
          <Badge key={tone} tone={tone}>
            {tone}
          </Badge>
        ))}
      </Preview>

      <Preview title="solid" code={`<Badge tone="error" solid>Blocked</Badge>`}>
        {TONES.map(tone => (
          <Badge key={tone} tone={tone} solid>
            {tone}
          </Badge>
        ))}
      </Preview>

      <Prose>
        <p>
          Tinted by default and filled on request. The tinted set uses each status scale&apos;s{' '}
          <code>surface</code> with text at <code>strong</code>, which clears WCAG AA by
          construction; the filled set uses <code>normal</code> with <code>onNormal</code>, which
          records the text colour that passes on that fill. Neither combination needs checking by
          hand.
        </p>
      </Prose>

      <Callout tone="warning">
        A tone carries meaning only to people who can see it. If the meaning matters, put it in the
        words — &ldquo;Failed&rdquo; beside a red badge, not a red badge alone.
      </Callout>

      <Preview title="size" code={`<Badge size="s">3</Badge>`}>
        <Badge size="s" tone="accent">
          small
        </Badge>
        <Badge size="m" tone="accent">
          medium
        </Badge>
      </Preview>

      <section>
        <h2>Props</h2>
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
      </section>
    </Page>
  );
}
