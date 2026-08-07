'use client';

import { Text } from '@minuk-hwang-design-system/components-react/text';
import { contrast } from '@minuk-hwang-design-system/style-tokens';
import * as React from 'react';

import { useResolvedAppearance } from '../../../site/dials';
import { Page } from '../../../site/Page';
import { Callout, Preview, Prose, Section } from '../../../site/Preview';
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

const AA = 4.5;

/**
 * One fill, set in both text colours at once.
 *
 * The rule that picks between them is a single comparison against 4.5, and on
 * several hues the two answers are close enough that the comparison is a
 * judgement rather than a calculation. Reading the two numbers tells you which;
 * seeing the two halves tells you whether you agree.
 */
const ContrastRow = ({ hue, theme }: { hue: string; theme: 'light' | 'dark' }) => {
  const measured = contrast[theme][hue];
  const bothClear = measured.white >= AA && measured.black >= AA;
  const rejected = measured.chosen === 'white' ? measured.black : measured.white;
  const nearMiss = !bothClear && rejected >= AA - 0.6;

  return (
    <div className={css.contrastRow}>
      <div className={css.contrastFill} style={{ background: `var(--${hue}-500)` }}>
        <span className={css.contrastHalf} style={{ color: '#ffffff' }}>
          {hue} in white
        </span>
        <span className={css.contrastHalf} style={{ color: '#000000' }}>
          {hue} in black
        </span>
      </div>

      <div className={css.contrastMeta}>
        <span className={css.contrastName}>{hue}</span>
        <span className={css.contrastHex}>{measured.fill}</span>
        <span
          className={css.contrastFigure}
          data-pass={measured.white >= AA || undefined}
          data-used={measured.chosen === 'white' || undefined}
        >
          white {measured.white.toFixed(2)}
        </span>
        <span
          className={css.contrastFigure}
          data-pass={measured.black >= AA || undefined}
          data-used={measured.chosen === 'black' || undefined}
        >
          black {measured.black.toFixed(2)}
        </span>
        {bothClear && <span className={css.contrastNote}>either clears — convention picked</span>}
        {nearMiss && (
          <span className={css.contrastNote}>
            {measured.chosen === 'white' ? 'black' : 'white'} misses by {(AA - rejected).toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};

export default function ColourPage() {
  const theme = useResolvedAppearance();

  return (
    <Page
      eyebrow="Tokens"
      title="Colour"
      lede="Fourteen chromatic scales and three neutrals, thirteen steps each, generated rather than picked. Switch the theme in the toolbar — every swatch below moves."
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
          clears WCAG AA on top of <code>normal</code>. Four of the fourteen hues are dark enough at
          full chroma to carry white; the rest need black. Leaving that judgement to each component
          is how a 2.29:1 green button gets shipped.
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
            <Text as="span" size={5} weight="bold" style={{ color: 'inherit' }}>
              status.{status}.onNormal
            </Text>
          </div>
        ))}
      </Preview>

      <Section title="White or black on each fill">
        <Prose>
          <p>
            The rule is one comparison: <strong>white if it clears 4.5, otherwise black</strong>.
            Not &quot;whichever number is larger&quot; — that put black on red, which passes at 4.64
            and reads as a hazard sign rather than as a button. Contrast decides what is legible;
            convention decides between two legible answers.
          </p>
          <p>
            Below is every hue in both text colours at once, with what each measures. The close
            calls are marked, because a margin of 0.09 is a decision someone should look at rather
            than a fact.
          </p>
        </Prose>

        <Preview title={`measured against the ${theme} theme`} stack>
          <div className={css.contrastList}>
            {HUES.map(hue => (
              <ContrastRow key={hue} hue={hue} theme={theme} />
            ))}
          </div>
        </Preview>

        <Callout tone="warning">
          <code>crimson</code>, <code>pink</code> and <code>magenta</code> are the awkward ones.
          White misses by 0.09, 0.54 and 0.47, so all three take black — on saturated hues where
          white is what the eye expects. They are legible and they look wrong, which is the
          difference between passing an audit and being right. Dropping their saturation a few
          points would let white clear, the same way red, orange, amber, yellow and blue were
          already tuned.
        </Callout>

        <Prose>
          <p>
            Both themes measure the same today, because step 500 is deliberately the same lightness
            in each — a solid fill should not change identity when the theme flips. The measurement
            is still taken per theme, since that is a decision that could be revisited and the table
            should notice when it is.
          </p>
        </Prose>
      </Section>
    </Page>
  );
}
