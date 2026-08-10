'use client';

import { Text } from '@minuk-hwang-design-system/components-react/text';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, Prose } from '../../../site/Preview';
import css from '../../../site/tokens.module.css';

const STEPS = [
  ['xs', 'Resting card — separation only'],
  ['s', 'Raised: a hovered card, a small menu'],
  ['m', 'Floating: dropdown, popover, tooltip, toast'],
  ['l', 'Overlay: dialog, drawer'],
] as const;

export default function ShadowPage() {
  return (
    <Page
      eyebrow="Tokens"
      title="Shadow"
      lede="Geometry and colour are separate tokens, and only the colour follows the theme. Switch themes in the sidebar and watch these hold their weight."
    >
      <Prose>
        <p>
          How far something floats is a fact about the layout; how much it darkens what is behind it
          depends on what is behind it. Eight per cent black moves a white ground by 20/255 and a
          near-black one by 2, so the ink is a token and the geometry is not.
        </p>
      </Prose>

      <Preview title="the ladder" stack>
        <div className={css.shadowStage}>
          {STEPS.map(([name]) => (
            <div key={name} className={css.shadowItem}>
              <div className={css.shadowChip} style={{ boxShadow: `var(--shadow-${name})` }} />
              <Text as="span" size={2} color="assistive">
                {name}
              </Text>
            </div>
          ))}
        </div>
      </Preview>

      <Preview title="what each is for" stack>
        <div className={css.rows}>
          {STEPS.map(([name, use]) => (
            <div key={name} className={css.row}>
              <span className={css.token}>shadow.{name}</span>
              <span className={css.value} />
              <span>{use}</span>
            </div>
          ))}
        </div>
      </Preview>

      <Prose>
        <p>
          Every step above <code>xs</code> is two layers, which is what makes a shadow read as cast
          rather than painted on: a tight <em>direct</em> offset further down, over a wide, soft{' '}
          <em>ambient</em> barely offset at all.
        </p>
      </Prose>

      <Preview title="up — the same ladder, mirrored" stack>
        <div className={css.shadowStage}>
          {STEPS.map(([name]) => (
            <div key={name} className={css.shadowItem}>
              <div className={css.shadowChip} style={{ boxShadow: `var(--shadow-up-${name})` }} />
              <Text as="span" size={2} color="assistive">
                up.{name}
              </Text>
            </div>
          ))}
        </div>
      </Preview>

      <Prose>
        <p>
          Light comes from above, so shadows fall downward by default. Anything pinned to the bottom
          of the screen — a sheet, a tab bar, a sticky footer — has content passing above it, and a
          downward shadow lands on nothing. Direction is a modifier on elevation rather than a value
          beside it, so <code>shadow.up.m</code> is the same weight cast the other way.
        </p>
      </Prose>

      <Callout>
        <p>
          The ink is <code>0.08 / 0.14</code> on light and <code>0.48 / 0.72</code> on dark. The
          six-fold jump is what puts the dark theme back at roughly the separation the light one
          gets for free.
        </p>
      </Callout>

      <Prose>
        <p>
          These keep t-shirt names while the rest of the system moved to pixels, because a shadow is
          four lengths and a colour. <code>shadow[16]</code> would be naming one of five values
          arbitrarily.
        </p>
      </Prose>
    </Page>
  );
}
