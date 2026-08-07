'use client';

import { Text } from '@minuk-hwang-design-system/components-react/text';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Preview, PropsTable, Prose } from '../../../site/Preview';

const STEPS = [
  'display1',
  'title1',
  'title3',
  'headline',
  'body1',
  'body2',
  'body3',
  'label',
  'caption',
  'footnote',
] as const;

export default function TextPage() {
  return (
    <Page
      eyebrow="Primitives"
      title="Text"
      lede="One of the system's type steps, on the element the content actually is. The two are separate props because a heading that needs to read small is still a heading."
    >
      <Preview
        title="steps"
        stack
        code={`<Text textType="title1">Publish</Text>
<Text textType="body2" color="assistive">Uploads to the public registry.</Text>`}
      >
        {STEPS.map(step => (
          <Text key={step} textType={step}>
            {step} — 같은 색에 이름이 둘이면 언젠가 갈라진다
          </Text>
        ))}
      </Preview>

      <Prose>
        <p>
          <code>textType</code> picks the step; <code>as</code> picks the element. Collapsing them
          is how a page ends up with six <code>h1</code>s, or none — the visual weight a designer
          wants and the outline a screen reader reads are different questions.
        </p>
      </Prose>

      <Preview
        title="colour is semantic only"
        stack
        code={`<Text color="normal">Body copy</Text>
<Text color="assistive">Captions and timestamps</Text>
<Text color="error">Something went wrong</Text>`}
      >
        <Text color="strong">strong — headings and anything needing weight</Text>
        <Text color="normal">normal — body copy</Text>
        <Text color="assistive">assistive — captions, helper text, timestamps</Text>
        <Text color="link">link</Text>
        <Text color="success">success</Text>
        <Text color="warning">warning</Text>
        <Text color="error">error</Text>
      </Preview>

      <Prose>
        <p>
          There is no <code>crimson600</code> here on purpose. A prop that accepts any palette step
          lets every caller invent a new meaning for red; these eight answer a question about the
          content instead. A genuine one-off belongs in the caller&apos;s own class, where it reads
          as the exception it is.
        </p>
      </Prose>

      <section>
        <h2>Props</h2>
        <PropsTable
          rows={[
            {
              name: 'textType',
              type: 'display1 | title1–3 | heading1–2 | headline | body1–3 | label | caption | footnote',
              default: `'body1'`,
              description: 'The type step.',
            },
            {
              name: 'textMode',
              type: `'default' | 'bold' | 'reading'`,
              default: `'default'`,
              description: 'Weight, plus a looser line height on the reading variants.',
            },
            {
              name: 'as',
              type: 'ElementType',
              default: `'p'`,
              description: 'The element. Pick what the content is.',
            },
            {
              name: 'color',
              type: 'strong | normal | assistive | inverse | link | success | warning | error',
              default: `'normal'`,
              description: 'Semantic roles only.',
            },
            {
              name: 'truncate',
              type: 'boolean',
              default: 'false',
              description: 'One line with an ellipsis.',
            },
          ]}
        />
      </section>
    </Page>
  );
}
