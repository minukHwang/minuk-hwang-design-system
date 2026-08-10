'use client';

import { Button } from '@minuk-hwang-design-system/components-react/button';
import { Spinner } from '@minuk-hwang-design-system/components-react/spinner';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Preview, PropsTable, Section } from '../../../site/Preview';

export default function SpinnerPage() {
  return (
    <Page
      eyebrow="Primitives"
      title="Spinner"
      lede="Indeterminate progress. Takes its colour from whatever it sits in, so it needs no variant per surface."
    >
      <Preview
        title="Size"
        description="Use size in pixels. Stroke width is derived from it, so a small ring does not read as a smudge."
        code={`<Spinner size={16} />\n<Spinner size={24} />\n<Spinner size={32} />`}
      >
        <Spinner size={16} />
        <Spinner size={20} />
        <Spinner size={24} />
        <Spinner size={32} />
      </Preview>

      <Preview
        title="Inside a button"
        description="Button renders one for you when loading is set, in whatever colour the variant is."
        code={`<Button loading>Publishing</Button>`}
      >
        <Button loading>Publishing</Button>
        <Button variant="secondary" loading>
          Saving
        </Button>
        <Button variant="danger" loading>
          Deleting
        </Button>
      </Preview>

      <Section title="Props">
        <PropsTable
          rows={[
            {
              name: 'size',
              type: 'number',
              default: '16',
              description: 'Pixels. Stroke width is derived from it.',
            },
            {
              name: 'label',
              type: 'string',
              description:
                'Announced as a live region. Omit inside a control that already reports busy.',
            },
          ]}
        />
      </Section>
    </Page>
  );
}
