'use client';

import { Separator } from '@minuk-hwang-design-system/components-react/separator';
import { Text } from '@minuk-hwang-design-system/components-react/text';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Preview, PropsTable, Section } from '../../../site/Preview';

export default function SeparatorPage() {
  return (
    <Page
      eyebrow="Primitives"
      title="Separator"
      lede="A divider between sections. Decorative by default, which is what stops a screen reader from reading the furniture."
    >
      <Preview
        title="Horizontal"
        description="The default. Use it between stacked sections."
        stack
        code={`<Separator />`}
      >
        <Text size={5}>Tokens are generated, never hand-edited.</Text>
        <Separator />
        <Text size={5}>Change a hue in the generator and replay.</Text>
      </Preview>

      <Preview
        title="Vertical"
        description="Use orientation to turn it, inside a flex row it stretches to fit."
        code={`<Separator orientation="vertical" />`}
      >
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

      <Preview
        title="Thickness"
        description={
          <>
            <code>size</code> is the thickness in pixels. It doubles, because the difference between
            1 and 2 is the whole difference at the thin end and nobody can tell 12 from 14 at the
            other. The length comes from whatever the rule sits in.
          </>
        }
        stack
        code={`<Separator size={1} />
<Separator size={2} />
<Separator size={4} />
<Separator size={8} />
<Separator size={16} />`}
      >
        {([1, 2, 4, 8, 16] as const).map(size => (
          <React.Fragment key={size}>
            <Text size={2} color="assistive">
              {size}
            </Text>
            <Separator size={size} />
          </React.Fragment>
        ))}
      </Preview>

      <Preview
        title="Vertical, thickened"
        description="The same prop sets the width when the rule runs down."
        code={`<Separator orientation="vertical" size={2} />`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 24 }}>
          <Text as="span" size={4} color="assistive">
            Tokens
          </Text>
          <Separator orientation="vertical" size={2} />
          <Text as="span" size={4} color="assistive">
            Components
          </Text>
        </div>
      </Preview>

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
              name: 'size',
              type: '1 | 2 | 4 | 8 | 16',
              default: '1',
              description: 'Thickness in pixels. Height when horizontal, width when vertical.',
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
