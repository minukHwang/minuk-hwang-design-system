'use client';

import { Theme } from '@minuk-hwang-design-system/components-react/theme';
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
              <code className={css.token}>spacing[{step}]</code>
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
        description="Also pixels, plus two names that are not measurements: half is the roundest a square can be at any size, full is a pill at any height. These swatches are pinned to the medium scale, so they keep showing the values the scale defines while the radius dial moves everything else."
        stack
      >
        {/*
         * Pinned, because a specimen has to keep saying what it is a specimen
         * of. Every swatch here reads the same properties the dial rewrites, so
         * with the dial on `large` this table would claim borderRadius[8] is
         * 12px. A second Theme is how the system already scopes that, which
         * makes this the documentation using its own answer.
         */}
        <Theme radius="medium">
          <div className={css.rows}>
            {RADIUS.map(step => (
              <div key={step} className={css.row}>
                <code className={css.token}>borderRadius[{step}]</code>
                <span className={css.value}>{step}px</span>
                <span
                  className={css.radiusChip}
                  style={{ borderRadius: `var(--border-radius-${step})` }}
                />
              </div>
            ))}
            <div className={css.row}>
              <code className={css.token}>borderRadius.half</code>
              <span className={css.value}>50%</span>
              <span
                className={`${css.radiusChip} ${css.radiusChipSquare}`}
                style={{ borderRadius: 'var(--border-radius-half)' }}
              />
            </div>
            <div className={css.row}>
              <code className={css.token}>borderRadius.full</code>
              <span className={css.value}>999px</span>
              <span
                className={css.radiusChip}
                style={{ borderRadius: 'var(--border-radius-full)' }}
              />
            </div>
          </div>
        </Theme>
      </Preview>

      <Preview
        title="Type"
        description="Fourteen sizes and four weights, keyed the same way. Text and Heading pair them with line heights."
        stack
      >
        <div className={css.rows}>
          {FONT_SIZE.map(size => (
            <div key={size} className={css.row}>
              <code className={css.token}>fontSize[{size}]</code>
              <span className={css.value}>{size}px</span>
              <span style={{ fontSize: `var(--font-size-${size})`, lineHeight: 1.2 }}>
                Design system
              </span>
            </div>
          ))}
        </div>
      </Preview>

      <Preview
        title="Font family"
        description="Three faces. The token names them; loading them is the application's job."
        stack
        language="javascript"
        code={`fontFamily.main   // 'Pretendard', 'Pretendard Variable', 'Noto Sans KR', system-ui, sans-serif
fontFamily.serif  // 'Pretendard Serif', 'Nanum Myeongjo', 'Apple SD Gothic Neo', Georgia, 'Times New Roman', serif
fontFamily.mono   // 'SFMono-Regular', ui-monospace, 'SF Mono', Menlo, Consolas, monospace`}
      >
        <div className={css.rows}>
          {(['main', 'serif', 'mono'] as const).map(family => (
            <div key={family} className={css.familyRow}>
              <code className={css.token}>fontFamily.{family}</code>
              {/*
               * The same three lines for each face, broken by hand rather than
               * left to wrap. Comparing two faces means comparing the same
               * glyphs in the same order, and a wrap puts them in different
               * places for every stack.
               */}
              <span className={css.specimen} style={{ fontFamily: `var(--font-family-${family})` }}>
                Design system
                <br />
                Design System
                <br />
                0123
              </span>
            </div>
          ))}
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
