'use client';

import { Text } from '@minuk-hwang-design-system/components-react/text';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, Prose } from '../../../site/Preview';
import css from '../../../site/tokens.module.css';

const SPACING = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 44, 48, 56, 64];
const RADIUS = [0, 2, 4, 6, 8, 10, 12, 16, 24, 36];
const FONT_SIZE = [12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 28, 34, 40, 60];

export default function ScalesPage() {
  return (
    <Page
      eyebrow="Tokens"
      title="Spacing, radius, type"
      lede="Everything measurable is keyed by pixels. A design says 16 and the code says 16 — there is nothing to translate."
    >
      <Prose>
        <p>
          T-shirt sizes buy nothing here and cost ordering. The radius scale these replaced had a
          step named <code>s</code> at 4px sitting beside one named <code>sm</code> at 6px, and{' '}
          <code>base</code> at 8px in the middle of the ladder rather than at an end.{' '}
          <strong>Nothing about those names says which is bigger.</strong>
        </p>
      </Prose>

      <Preview title="spacing" stack>
        <div className={css.rows}>
          {SPACING.map(step => (
            <div key={step} className={css.row}>
              <span className={css.token}>spacing[{step}]</span>
              <span className={css.value}>{step}px</span>
              <span className={css.bar} style={{ width: `var(--spacing-${step})` }} />
            </div>
          ))}
        </div>
      </Preview>

      <Callout>
        <code>0</code> is a token for the same reason the rest are. Without it{' '}
        <code>padding: 0</code> has to be written as a raw value — which is exactly the escape hatch
        a scale exists to close, and it is the most common spacing value there is.
      </Callout>

      <Preview title="radius" stack>
        <div className={css.rows}>
          {RADIUS.map(step => (
            <div key={step} className={css.row}>
              <span className={css.token}>borderRadius[{step}]</span>
              <span className={css.value}>{step}px</span>
              <span
                className={css.radiusChip}
                style={{ borderRadius: `var(--border-radius-${step})` }}
              />
            </div>
          ))}
          <div className={css.row}>
            <span className={css.token}>borderRadius.full</span>
            <span className={css.value}>999px</span>
            <span
              className={css.radiusChip}
              style={{ borderRadius: 'var(--border-radius-full)' }}
            />
          </div>
        </div>
      </Preview>

      <Prose>
        <p>
          <code>full</code> is the one name left, because it is not a measurement — it asks for a
          pill whatever the element&apos;s height.
        </p>
      </Prose>

      <Preview title="type" stack>
        <div className={css.rows}>
          {FONT_SIZE.map(size => (
            <div key={size} className={css.row}>
              <span className={css.token}>fontSize[{size}]</span>
              <span className={css.value}>{size}px</span>
              <span style={{ fontSize: `var(--font-size-${size})`, lineHeight: 1.2 }}>
                디자인 시스템
              </span>
            </div>
          ))}
        </div>
      </Preview>

      <Prose>
        <p>
          Four weights — 400, 500, 600, 700 — and line heights keyed the same way in pixels. The
          steps that combine a size with a line height live on{' '}
          <Text as="span" size={5} color="link">
            Text
          </Text>{' '}
          and{' '}
          <Text as="span" size={5} color="link">
            Heading
          </Text>
          , which have a ladder each.
        </p>
        <p>
          600 is a token but not a <code>weight</code> value on those components. The interface uses
          it directly — buttons, tab triggers — where 700 is heavier than a control wants to be.
          What it is no longer is the meaning of <code>bold</code>, which is 700 everywhere.
        </p>
      </Prose>

      <Preview
        title="font family"
        stack
        code={`fontFamily.main  // 'Pretendard', 'Pretendard Variable', 'Noto Sans KR', system-ui, sans-serif
fontFamily.mono  // 'SFMono-Regular', ui-monospace, 'SF Mono', Menlo, Consolas, monospace`}
      >
        <div className={css.rows}>
          <div className={css.row}>
            <span className={css.token}>fontFamily.main</span>
            <span style={{ fontFamily: 'var(--font-family-main)', fontSize: 18 }}>
              디자인 시스템 Design System 0123
            </span>
          </div>
          <div className={css.row}>
            <span className={css.token}>fontFamily.mono</span>
            <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: 18 }}>
              디자인 시스템 Design System 0123
            </span>
          </div>
        </div>
      </Preview>

      <Callout>
        The token names the face; fetching it is the application&apos;s job — the same way Tailwind
        names <code>font-sans</code> and leaves the <code>@font-face</code> to you. Shipping the
        binary would charge every consumer for a typeface they may already self-host. This site
        loads Pretendard from a CDN in its own <code>layout.tsx</code>, which is exactly what a
        consumer has to do.
      </Callout>
    </Page>
  );
}
