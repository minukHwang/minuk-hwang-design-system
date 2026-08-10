'use client';

import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview } from '../../../site/Preview';
import css from '../../../site/tokens.module.css';

const SPACING = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 44, 48, 56, 64];
const RADIUS = [0, 2, 4, 6, 8, 10, 12, 16, 24, 36];
const FONT_SIZE = [12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 28, 34, 40, 60];

export default function ScalesPage() {
  return (
    <Page
      eyebrow="Tokens"
      title="Spacing, radius, type"
      lede="Everything measurable is keyed by pixels. A design says 16 and the code says 16, with nothing to translate."
    >
      <Preview
        title="Spacing"
        description="Keyed by pixels. A design says 16 and the code says 16."
        stack
      >
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
        <code>padding: 0</code> has to be a raw value, which is exactly the escape hatch a scale
        exists to close.
      </Callout>

      <Preview
        title="Radius"
        description="Also pixels. full is the one name left, because a pill is not a measurement."
        stack
      >
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

      <Preview
        title="Type"
        description="Fourteen sizes and four weights, keyed the same way. Text and Heading pair them with line heights."
        stack
      >
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

      <Preview
        title="Font family"
        description="Two faces. The token names them; loading them is the application's job."
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
        The token names the face; fetching it is the application&apos;s job, the same way Tailwind
        names <code>font-sans</code> and leaves the <code>@font-face</code> to you. This site loads
        Pretendard from a CDN in its own <code>layout.tsx</code>.
      </Callout>
    </Page>
  );
}
