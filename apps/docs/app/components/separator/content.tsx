'use client';

import { Separator } from '@minuk-hwang-design-system/components-react/separator';
import { Text } from '@minuk-hwang-design-system/components-react/text';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Preview, PropsTable, Prose, Section } from '../../../site/Preview';

export default function SeparatorPage() {
  return (
    <Page
      eyebrow="Primitives"
      title="Separator"
      lede="A divider between sections. Decorative by default, which is what stops a screen reader from reading the furniture."
    >
      <Preview title="horizontal" stack code={`<Separator />`}>
        <Text size={5}>Tokens are generated, never hand-edited.</Text>
        <Separator />
        <Text size={5}>Change a hue in the generator and replay.</Text>
      </Preview>

      <Preview title="vertical" code={`<Separator orientation="vertical" />`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 24 }}>
          <Text as="span" size={4} color="assistive">
            Draft
          </Text>
          <Separator orientation="vertical" />
          <Text as="span" size={4} color="assistive">
            2 minutes ago
          </Text>
          <Separator orientation="vertical" />
          <Text as="span" size={4} color="assistive">
            minuk
          </Text>
        </div>
      </Preview>

      <Prose>
        <p>
          A line drawn between two lists is usually a visual convenience, and announcing
          &ldquo;separator&rdquo; between every pair of items is noise. Pass{' '}
          <code>decorative={'{false}'}</code> only when the line is the one thing saying two regions
          are unrelated.
        </p>
      </Prose>

      <Section title="Props">
        <PropsTable
          rows={[
            {
              name: 'orientation',
              type: `'horizontal' | 'vertical'`,
              default: `'horizontal'`,
              description: 'Vertical stretches to its flex parent.',
            },
            {
              name: 'decorative',
              type: 'boolean',
              default: 'true',
              description: 'False exposes it as a real separator to assistive tech.',
            },
          ]}
        />
      </Section>
    </Page>
  );
}
