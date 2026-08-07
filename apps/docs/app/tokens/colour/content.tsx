'use client';

import { Text } from '@minuk-hwang-design-system/components-react/text';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, Prose } from '../../../site/Preview';
import css from '../../../site/tokens.module.css';

const STEPS = [10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 990];
const HUES = [
  'red',
  'crimson',
  'pink',
  'magenta',
  'purple',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'lime',
  'yellow',
  'amber',
  'orange',
];
const NEUTRALS = ['neutral', 'gray', 'slate'];

const SEMANTIC = [
  ['surface', ['canvas', 'default', 'hover', 'pressed', 'selected']],
  ['border', ['subtle', 'normal', 'strong', 'focus']],
  ['accent', ['surface', 'subtle', 'normal', 'strong']],
] as const;

const STATUS = ['success', 'warning', 'error', 'info'] as const;
const STATUS_STEPS = ['surface', 'subtle', 'normal', 'strong'] as const;

const Ramp = ({ name }: { name: string }) => (
  <div className={css.ramp}>
    <div className={css.rampName}>{name}</div>
    <div className={css.swatches}>
      {STEPS.map(step => (
        <div key={step} className={css.swatch} style={{ background: `var(--${name}-${step})` }} />
      ))}
    </div>
  </div>
);

export default function ColourPage() {
  return (
    <Page
      eyebrow="Tokens"
      title="Colour"
      lede="Fourteen chromatic scales and three neutrals, thirteen steps each, generated rather than picked. Switch the theme in the sidebar — every swatch below moves."
    >
      <Prose>
        <p>
          <strong>
            Step 10 sits closest to the background and 990 furthest from it, in both themes.
          </strong>{' '}
          That is why the light scales run light to dark and the dark scales run the other way: a
          component names a step once and it reads correctly either way.
        </p>
      </Prose>

      <Preview title="chromatic — 10 → 990, left to right" stack>
        <div className={css.ramps}>
          {HUES.map(hue => (
            <Ramp key={hue} name={hue} />
          ))}
        </div>
      </Preview>

      <Preview title="neutral — ordered by how much blue they carry" stack>
        <div className={css.ramps}>
          {NEUTRALS.map(name => (
            <Ramp key={name} name={name} />
          ))}
        </div>
      </Preview>

      <Prose>
        <p>
          Hues are spaced so no two neighbours sit closer than 14° — the point where two ramps stop
          reading as separate families. Equal HSL lightness is not equal perceived brightness, so
          cyan and green are pulled down; without that correction <code>teal-500</code> comes out as{' '}
          <code>#00ffea</code>, a highlighter no interface can use.
        </p>
      </Prose>

      <Callout>
        Components should reach for the semantic tokens below, not for a raw step.{' '}
        <code>pink500</code> says what a colour is; <code>status.error.normal</code> says what it is
        for, and only the second survives a decision to make errors crimson.
      </Callout>

      <Preview title="semantic" stack>
        <div className={css.ramps}>
          {SEMANTIC.map(([group, keys]) => (
            <div key={group} className={css.ramp}>
              <div className={css.rampName}>{group}</div>
              <div className={css.swatches}>
                {keys.map(key => (
                  <div
                    key={key}
                    className={css.swatch}
                    style={{ background: `var(--${group}-${key})` }}
                    title={`${group}.${key}`}
                  />
                ))}
              </div>
            </div>
          ))}
          {STATUS.map(status => (
            <div key={status} className={css.ramp}>
              <div className={css.rampName}>status.{status}</div>
              <div className={css.swatches}>
                {STATUS_STEPS.map(step => (
                  <div
                    key={step}
                    className={css.swatch}
                    style={{ background: `var(--status-${status}-${step})` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Preview>

      <Prose>
        <p>
          Each status ramp carries an <code>onNormal</code> alongside these — the text colour that
          clears WCAG AA on top of <code>normal</code>. Only blue, purple and indigo are dark enough
          at full chroma to carry white; everything from cyan through orange needs black. Leaving
          that judgement to each component is how a 2.29:1 green button gets shipped.
        </p>
      </Prose>

      <Preview title="text on each status fill" stack>
        {STATUS.map(status => (
          <div
            key={status}
            style={{
              padding: '12px 16px',
              borderRadius: 8,
              background: `var(--status-${status}-normal)`,
              color: `var(--status-${status}-on-normal)`,
            }}
          >
            <Text as="span" textType="body2" textMode="bold" style={{ color: 'inherit' }}>
              status.{status}.onNormal
            </Text>
          </div>
        ))}
      </Preview>
    </Page>
  );
}
