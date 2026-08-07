'use client';

import { Heading } from '@minuk-hwang-design-system/components-react/heading';
import { Text } from '@minuk-hwang-design-system/components-react/text';
import {
  classes,
  headingScale,
  headingSizeForLevel,
} from '@minuk-hwang-design-system/style-tokens';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, PropsTable, Prose } from '../../../site/Preview';
import css from '../../../site/tokens.module.css';

const step = (n: number) => classes.typography[`heading${n}` as 'heading6'];
const px = (rem: string) => Math.round(parseFloat(rem) * 16);

const LEVELS = [1, 2, 3, 4, 5, 6] as const;

export default function HeadingPage() {
  return (
    <Page
      eyebrow="Primitives"
      title="Heading"
      lede="A heading at one of ten steps, numbered from its own 1. level sets both the element and the default size, so the outline cannot be left to whoever remembered to pass an element."
    >
      <Preview
        title="level — the element and a default size"
        stack
        code={`<Heading level={1}>Publish</Heading>
<Heading level={2}>Before you start</Heading>`}
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
              같은 색에 이름이 둘이면 언젠가 갈라진다
            </Heading>
          </div>
        ))}
      </Preview>

      <Callout>
        <code>level</code> is required. Radix Themes defaults it to <code>h1</code>, which means
        three headings on a page silently produce three <code>h1</code>s — the screen looks right
        and the outline is wrong, which is the failure nobody catches. A required prop costs one
        keystroke and cannot be forgotten.
      </Callout>

      <Preview
        title="size — independent of level"
        stack
        code={`{/* Still an h3 in the outline, only smaller on screen. */}
<Heading level={3} size={1}>A card title</Heading>`}
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

      <Prose>
        <p>
          An <code>h3</code> opening a page and an <code>h3</code> inside a card want different
          sizes and the same place in the outline. Overriding <code>size</code> changes only what it
          looks like — <strong>the outline stays whatever level said</strong>.
        </p>
      </Prose>

      <Preview title="the ten steps a heading can take" stack>
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

      <Prose>
        <p>
          Ten here and ten in{' '}
          <Text as="span" color="link">
            Text
          </Text>
          , out of fourteen — the six in the middle belong to both. A heading below 16px stops being
          one, and body copy above 24px is a heading that forgot to say so.
        </p>
        <p>
          Weight defaults to <code>bold</code>, because a heading no heavier than the text under it
          is doing nothing a paragraph could not.
        </p>
      </Prose>

      <section>
        <h2>Props</h2>
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
              description: 'Semantic roles only.',
            },
            { name: 'align', type: `'left' | 'center' | 'right' | 'justify'`, description: '' },
            { name: 'truncate', type: 'boolean', default: 'false', description: '' },
          ]}
        />
      </section>
    </Page>
  );
}
