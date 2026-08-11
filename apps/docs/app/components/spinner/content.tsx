'use client';

import { Button } from '@minuk-hwang-design-system/components-react/button';
import { Spinner } from '@minuk-hwang-design-system/components-react/spinner';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Preview, PropsTable, Section } from '../../../site/Preview';
import css from '../../../site/tokens.module.css';

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
        code={`<Spinner size={16} />
<Spinner size={20} />
<Spinner size={24} />
<Spinner size={32} />`}
      >
        <Spinner size={16} />
        <Spinner size={20} />
        <Spinner size={24} />
        <Spinner size={32} />
      </Preview>

      <Preview
        title="Inside a button"
        description="Button renders one for you when loading is set, in whatever colour the variant is. The label stays in the box under it, so the button is the same width busy as idle."
        stack
        code={`<Button>Publishing</Button>
<Button loading>Publishing</Button>

<Button variant="secondary">Save draft</Button>
<Button variant="secondary" loading>Save draft</Button>`}
      >
        <div className={css.controlRow}>
          <Button>Publishing</Button>
          <Button loading>Publishing</Button>
        </div>
        <div className={css.controlRow}>
          <Button variant="secondary">Save draft</Button>
          <Button variant="secondary" loading>
            Save draft
          </Button>
        </div>
      </Preview>

      <Section title="Props">
        <PropsTable
          rows={[
            {
              name: 'size',
              type: 'number',
              default: '—',
              description:
                'Pixels, and stroke width is derived from it. Left off, the ring is two under the glyph size its container asked for, which is 16 on a page and 14, 16 or 18 inside a small, medium or large Button.',
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
