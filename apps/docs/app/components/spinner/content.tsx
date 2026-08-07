'use client';

import { Button } from '@minuk-hwang-design-system/components-react/button';
import { Spinner } from '@minuk-hwang-design-system/components-react/spinner';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Preview, PropsTable, Prose } from '../../../site/Preview';

export default function SpinnerPage() {
  return (
    <Page
      eyebrow="Primitives"
      title="Spinner"
      lede="Indeterminate progress. Takes its colour from whatever it sits in, so it needs no variant per surface."
    >
      <Preview
        title="size"
        code={`<Spinner size={16} />\n<Spinner size={24} />\n<Spinner size={32} />`}
      >
        <Spinner size={16} />
        <Spinner size={20} />
        <Spinner size={24} />
        <Spinner size={32} />
      </Preview>

      <Prose>
        <p>
          The ring is drawn entirely in <code>border</code>, with one side transparent — a complete
          ring spinning looks static. Stroke width scales with size, because a 32px ring with a
          1.5px stroke reads as a hairline and a 16px one with 3px reads as a smudge.
        </p>
        <p>
          Colour is <code>currentColor</code>, which is why the same component works on a filled
          button and on the page without being told which.
        </p>
      </Prose>

      <Preview title="inside a button" code={`<Button loading>Publishing</Button>`}>
        <Button loading>Publishing</Button>
        <Button variant="secondary" loading>
          Saving
        </Button>
        <Button variant="danger" loading>
          Deleting
        </Button>
      </Preview>

      <Prose>
        <p>
          <code>Button</code> already sets <code>aria-busy</code>, so the spinner inside it stays
          hidden from screen readers. Standing alone it takes a <code>label</code> and becomes a{' '}
          <code>role=&quot;status&quot;</code> live region.
        </p>
        <p>
          Under <code>prefers-reduced-motion</code> the token stylesheet collapses the duration to
          0.01ms rather than removing the animation, so the ring stops instead of disappearing.
        </p>
      </Prose>

      <section>
        <h2>Props</h2>
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
      </section>
    </Page>
  );
}
