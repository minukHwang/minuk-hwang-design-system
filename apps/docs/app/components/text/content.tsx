'use client';

import { Text } from '@minuk-hwang-design-system/components-react/text';
import { classes, textScale } from '@minuk-hwang-design-system/style-tokens';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Preview, PropsTable, Section } from '../../../site/Preview';
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
      lede="Body copy at one of ten steps. Anything that is a heading belongs in Heading, which takes a level rather than an element."
    >
      <Preview
        title="Size"
        description="Use size to pick one of ten steps. 1 is 12px, 10 is 24px."
        stack
        code={`<Text size={10} truncate>{SAMPLE}</Text>
<Text size={9} truncate>{SAMPLE}</Text>
<Text size={8} truncate>{SAMPLE}</Text>
<Text size={7} truncate>{SAMPLE}</Text>
<Text size={6} truncate>{SAMPLE}</Text>
<Text size={5} truncate>{SAMPLE}</Text>
<Text size={4} truncate>{SAMPLE}</Text>
<Text size={3} truncate>{SAMPLE}</Text>
<Text size={2} truncate>{SAMPLE}</Text>
<Text size={1} truncate>{SAMPLE}</Text>`}
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

      <Preview
        title="Weight"
        description="Use weight for emphasis: 400, 500 or 700."
        stack
        code={`<Text weight="regular">{SAMPLE}</Text>
<Text weight="medium">{SAMPLE}</Text>
<Text weight="bold">{SAMPLE}</Text>`}
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

      <Preview
        title="Leading"
        description={
          <>
            Use <code>leading=&quot;reading&quot;</code> to open the line height for a paragraph. It
            affects steps 3 to 6, the sizes a paragraph is run at.
          </>
        }
        stack
        code={`<Text leading="normal">{PARAGRAPH}</Text>
<Text leading="reading">{PARAGRAPH}</Text>`}
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

      <Preview
        title="Color"
        description="Use color to name a role. There is no palette step here, on purpose."
        stack
        code={`<Text color="strong">strong</Text>
<Text color="normal">normal</Text>
<Text color="assistive">assistive</Text>
<Text color="link">link</Text>
<Text color="accent">accent</Text>
<Text color="success">success</Text>
<Text color="warning">warning</Text>
<Text color="error">error</Text>`}
      >
        {(
          [
            'strong',
            'normal',
            'assistive',
            'link',
            'accent',
            'success',
            'warning',
            'error',
          ] as const
        ).map(color => (
          <Text key={color} color={color}>
            {color}
          </Text>
        ))}
      </Preview>

      <Preview
        title="Overflow"
        description="Use truncate for one line, or lines to clamp to a number of them."
        stack
        code={`<Text truncate>{SAMPLE}</Text>
<Text lines={2}>{SAMPLE}</Text>
<Text lines={3}>{SAMPLE}</Text>`}
      >
        <div style={{ maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Text truncate>{SAMPLE}</Text>
          <Text lines={2}>{SAMPLE}</Text>
          <Text lines={3}>{SAMPLE}</Text>
        </div>
      </Preview>

      <Section title="Props">
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
              type: 'strong | normal | assistive | inverse | link | accent | success | warning | error | inherit',
              default: `'normal'`,
              description:
                'Semantic roles only. inherit takes the colour of whatever it sits in, for text inside something that has already picked one.',
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
      </Section>
    </Page>
  );
}
