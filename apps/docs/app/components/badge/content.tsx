'use client';

import { Badge } from '@minuk-hwang-design-system/components-react/badge';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, PropsTable, Section } from '../../../site/Preview';
import css from '../../../site/tokens.module.css';

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
        title="Variant"
        description="Soft is the tint and the default. Solid is for the badge that has to carry across a busy row, on the text colour measured to pass on that fill. Outline puts no fill on the page, which is what a dense list of them wants."
        stack
        code={`<Badge tone="error">Blocked</Badge>
<Badge tone="error" variant="solid">Blocked</Badge>
<Badge tone="error" variant="outline">Blocked</Badge>`}
      >
        {(['soft', 'solid', 'outline'] as const).map(variant => (
          <div key={variant} className={css.controlRow}>
            <span className={`${css.controlRowLabel} ${css.controlRowLabelWide}`}>{variant}</span>
            {TONES.map(tone => (
              <Badge key={tone} tone={tone} variant={variant}>
                {tone}
              </Badge>
            ))}
          </div>
        ))}
      </Preview>

      <Callout tone="warning">
        A tone carries meaning only to people who can see it. If the meaning matters, put it in the
        words: &ldquo;Failed&rdquo; beside a red badge, not a red badge alone.
      </Callout>

      <Preview
        title="Size"
        description="Two sizes, and the difference is the type: 12px in a 20px box, or 13px in a 22px one."
        code={`<Badge size="s" tone="accent">small</Badge>
<Badge size="m" tone="accent">medium</Badge>`}
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
              name: 'variant',
              type: `'soft' | 'solid' | 'outline'`,
              default: `'soft'`,
              description:
                'Tinted, filled, or an outline with no fill. The outline border is the tone’s subtle step, the same weight as every other hairline in the system.',
            },
            {
              name: 'size',
              type: `'s' | 'm'`,
              default: `'m'`,
              description: 'Small is 12px type for a count or an inline marker; medium is 13px.',
            },
          ]}
        />
      </Section>
    </Page>
  );
}
