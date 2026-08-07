'use client';

import { Text } from '@minuk-hwang-design-system/components-react/text';
import { classes, textScale } from '@minuk-hwang-design-system/style-tokens';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, PropsTable, Prose } from '../../../site/Preview';
import css from '../../../site/tokens.module.css';

const step = (n: number) => classes.typography[`text${n}` as 'text5'];

const px = (rem: string) => Math.round(parseFloat(rem) * 16);

const WEIGHTS = ['regular', 'medium', 'bold'] as const;

const SAMPLE =
  '디자인 시스템은 결정을 한 번만 내리게 하는 장치다. 색은 토큰에서 한 번, 포커스 트랩은 base 레이어에서 한 번, 버튼의 생김새는 여기서 한 번.';

export default function TextPage() {
  return (
    <Page
      eyebrow="Primitives"
      title="Text"
      lede="Body copy at one of ten steps, numbered from its own 1. Anything that is a heading belongs in Heading, which takes a level rather than an element so the document outline is not left to whoever remembered."
    >
      <Preview
        title="size — 1 is the smallest"
        stack
        code={`<Text size={5}>Interface copy.</Text>
<Text size={2} color="assistive">A timestamp.</Text>`}
      >
        {[...textScale].reverse().map(({ step: n }) => {
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
              <Text size={n} truncate>
                {SAMPLE}
              </Text>
            </div>
          );
        })}
      </Preview>

      <Callout>
        This is its own ladder, not a slice of a shared one. <code>Heading</code> has ten steps of
        its own, and six pixel values appear in both — two design decisions that agree today at
        18px, rather than one written down twice. Retuning the smallest heading should not move a
        body step nobody was thinking about.
      </Callout>

      <Preview
        title="weight"
        stack
        code={`<Text weight="regular">Running text.</Text>
<Text weight="medium">A little emphasis.</Text>
<Text weight="bold">A label that has to be found.</Text>`}
      >
        {WEIGHTS.map(weight => (
          <div key={weight} className={css.stepRow}>
            <span className={css.stepMeta}>
              {weight}
              <span className={css.stepSize}>{step(5)[weight].fontWeight}</span>
            </span>
            <Text weight={weight}>{SAMPLE}</Text>
          </div>
        ))}
      </Preview>

      <Prose>
        <p>
          <code>bold</code> is 700 at every step. It used to be 700 on the large steps and 600 on
          the small ones, so the same prop produced two different weights depending on how large the
          text was — a difference nobody chose and nothing recorded.
        </p>
      </Prose>

      <Preview
        title="leading — same size, different job"
        stack
        code={`<Text>Two lines of interface copy.</Text>
<Text leading="reading">A paragraph someone will actually read.</Text>`}
      >
        {(['normal', 'reading'] as const).map(leading => (
          <div key={leading} className={css.stepRow}>
            <span className={css.stepMeta}>
              {leading}
              <span className={css.stepSize}>
                16/{leading === 'reading' ? px(step(5).reading!.lineHeight) : 21}
              </span>
            </span>
            <Text leading={leading}>
              {SAMPLE} 셋 중 무엇을 바꿔도 나머지 둘은 서 있다. 그것이 이 구조가 통과해야 하는
              시험이고, 스타일이 입혀진 컴포넌트가 패키지일 뿐 요점이 아닌 이유다.
            </Text>
          </div>
        ))}
      </Preview>

      <Prose>
        <p>
          Interface copy is read in two-line bursts and wants to be compact; a paragraph wants room
          between lines or the eye loses its place returning to the left margin.{' '}
          <strong>Those are different requirements at the same size</strong>, which is why leading
          is its own prop rather than a value hidden inside the weight.
        </p>
        <p>
          It has an effect on steps 3 to 6 — the sizes a paragraph is actually run at. 1 and 2 are
          captions, and 8 upwards is a lede that wants its leading chosen deliberately. Asking for
          it elsewhere is not an error: there is nothing to override, and silently doing nothing
          beats throwing over a line height.
        </p>
      </Prose>

      <Preview
        title="colour is semantic only"
        stack
        code={`<Text color="assistive">Captions and timestamps</Text>
<Text color="error">Something went wrong</Text>`}
      >
        {(['strong', 'normal', 'assistive', 'link', 'success', 'warning', 'error'] as const).map(
          color => (
            <Text key={color} color={color}>
              {color}
            </Text>
          )
        )}
      </Preview>

      <Prose>
        <p>
          There is no <code>crimson600</code> here on purpose. A prop that accepts any palette step
          lets every caller invent a new meaning for red; these answer a question about the content
          instead. A genuine one-off belongs in the caller&apos;s own class, where it reads as the
          exception it is.
        </p>
      </Prose>

      <Preview
        title="overflow"
        stack
        code={`<Text truncate>One line, then an ellipsis.</Text>
<Text lines={2}>Two lines, then an ellipsis.</Text>`}
      >
        <div style={{ maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Text truncate>{SAMPLE}</Text>
          <Text lines={2}>{SAMPLE}</Text>
          <Text lines={3}>{SAMPLE}</Text>
        </div>
      </Preview>

      <section>
        <h2>Props</h2>
        <PropsTable
          rows={[
            {
              name: 'size',
              type: '1 – 10',
              default: '5',
              description: '1 is 12px, 10 is 24px. Above that, it is a heading.',
            },
            {
              name: 'weight',
              type: `'regular' | 'medium' | 'bold'`,
              default: `'regular'`,
              description: '400, 500, 700.',
            },
            {
              name: 'leading',
              type: `'normal' | 'reading'`,
              default: `'normal'`,
              description:
                'reading keeps the size and opens the line height. Affects steps 3 to 6.',
            },
            {
              name: 'color',
              type: 'strong | normal | assistive | inverse | link | success | warning | error',
              default: `'normal'`,
              description: 'Semantic roles only.',
            },
            { name: 'align', type: `'left' | 'center' | 'right' | 'justify'`, description: '' },
            {
              name: 'as',
              type: 'ElementType',
              default: `'p'`,
              description: 'The element. Pick what the content is.',
            },
            {
              name: 'truncate',
              type: 'boolean',
              default: 'false',
              description: 'One line, then an ellipsis.',
            },
            {
              name: 'lines',
              type: 'number',
              description: 'Clamp to this many lines. Ignored when truncate is set.',
            },
          ]}
        />
      </section>
    </Page>
  );
}
