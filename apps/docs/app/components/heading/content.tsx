'use client';

import { Heading } from '@minuk-hwang-design-system/components-react/heading';
import {
  classes,
  headingScale,
  headingSizeForLevel,
} from '@minuk-hwang-design-system/style-tokens';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, PropsTable, Section } from '../../../site/Preview';
import css from '../../../site/tokens.module.css';

const step = (n: number) => classes.typography[`heading${n}` as 'heading6'];
const px = (rem: string) => Math.round(parseFloat(rem) * 16);

const LEVELS = [1, 2, 3, 4, 5, 6] as const;

const SAMPLE = '같은 색에 이름이 둘이면 언젠가 갈라진다';

export default function HeadingPage() {
  return (
    <Page
      eyebrow="Primitives"
      title="Heading"
      lede="A heading at one of ten steps. The level prop sets both the element and the default size, so the outline is never left to whoever remembered."
    >
      <Preview
        title="Level"
        description="Use level to set the element and, with it, a default size."
        stack
        code={`<Heading level={1} truncate>{SAMPLE}</Heading>
<Heading level={2} truncate>{SAMPLE}</Heading>
<Heading level={3} truncate>{SAMPLE}</Heading>
<Heading level={4} truncate>{SAMPLE}</Heading>
<Heading level={5} truncate>{SAMPLE}</Heading>
<Heading level={6} truncate>{SAMPLE}</Heading>`}
      >
        {LEVELS.map(level => (
          <div key={level} className={css.stepRow}>
            <span className={css.stepMeta}>
              {`<h${level}>`}
              <span className={css.stepSize}>
                size={headingSizeForLevel[level]} ·{' '}
                {px(step(headingSizeForLevel[level]).regular.fontSize)}px
              </span>
            </span>
            <Heading level={level} truncate>
              {SAMPLE}
            </Heading>
          </div>
        ))}
      </Preview>

      <Callout>
        <code>level</code> is required. A default would let three headings on a page silently
        produce three <code>h1</code>s: the screen looks right and the outline is wrong.
      </Callout>

      <Preview
        title="Size"
        description="Use size to change the appearance without touching the outline."
        stack
        code={`<Heading level={2}>기본 크기</Heading>

{/* Still an h2 in the outline, only smaller on screen. */}
<Heading level={2} size={1}>개요는 그대로, 크기만 작게</Heading>`}
      >
        <div className={css.stepRow}>
          <span className={css.stepMeta}>
            {'<h2> · size=7'}
            <span className={css.stepSize}>default</span>
          </span>
          <Heading level={2}>기본 크기</Heading>
        </div>
        <div className={css.stepRow}>
          <span className={css.stepMeta}>
            {'<h2> · size=1'}
            <span className={css.stepSize}>overridden</span>
          </span>
          <Heading level={2} size={1}>
            개요는 그대로, 크기만 작게
          </Heading>
        </div>
      </Preview>

      <Preview
        title="The ten steps"
        description="16px to 60px. Below 16 a heading stops being one; above 24 body copy is a heading that forgot to say so."
        stack
      >
        {[...headingScale].reverse().map(({ step: n }) => {
          const spec = step(n).regular;
          return (
            <div key={n} className={css.stepRow}>
              <span className={css.stepMeta}>
                size={'{'}
                {n}
                {'}'}
                <span className={css.stepSize}>
                  {px(spec.fontSize)}/{px(spec.lineHeight)}
                </span>
              </span>
              <Heading level={2} size={n} truncate>
                디자인 시스템
              </Heading>
            </div>
          );
        })}
      </Preview>

      <Section title="Props">
        <PropsTable
          rows={[
            {
              name: 'level',
              type: '1 | 2 | 3 | 4 | 5 | 6',
              description:
                'Required. Sets the element and the default size. There is no safe default, so there is none.',
            },
            {
              name: 'size',
              type: '1 – 10',
              default: 'from level',
              description: 'Changes the appearance only. The outline stays whatever level said.',
            },
            {
              name: 'weight',
              type: `'regular' | 'medium' | 'bold'`,
              default: `'bold'`,
              description: '400, 500, 700.',
            },
            {
              name: 'color',
              type: 'strong | normal | assistive | inverse | link | success | warning | error',
              default: `'strong'`,
              description: 'The same roles Text takes.',
            },
            { name: 'align', type: `'left' | 'center' | 'right' | 'justify'`, description: '' },
            { name: 'truncate', type: 'boolean', default: 'false', description: '' },
          ]}
        />
      </Section>
    </Page>
  );
}
