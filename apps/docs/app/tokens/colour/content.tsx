'use client';

import { Text } from '@minuk-hwang-design-system/components-react/text';
import { contrast } from '@minuk-hwang-design-system/style-tokens';
import * as React from 'react';

import { useResolvedAppearance } from '../../../site/dials';
import { Page } from '../../../site/Page';
import { Callout, Preview, Prose } from '../../../site/Preview';
import css from '../../../site/tokens.module.css';

const STEPS = [10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 990];
const ALPHA_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
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
const NEUTRALS = ['mono', 'gray', 'slate'];

const SEMANTIC = [
  ['background', ['base', 'raised', 'overlay']],
  ['neutral', ['surface', 'subtle', 'normal']],
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
 * One fill as two swatches, one per text colour, with the loser struck through.
 *
 * The rule that picks between them is a single comparison against 4.5, and on
 * four of the hues both answers clear it — there the comparison is a judgement
 * rather than a calculation. Reading the two numbers tells you which was taken;
 * seeing the two halves tells you whether you agree.
 */
const ContrastRow = ({ hue, theme }: { hue: string; theme: 'light' | 'dark' }) => {
  const measured = contrast[theme][hue];
  const bothClear = measured.white >= AA && measured.black >= AA;
  const rejected = measured.chosen === 'white' ? measured.black : measured.white;
  const nearMiss = !bothClear && rejected >= AA - 0.6;

  return (
    <div className={css.contrastRow}>
      <div className={css.contrastFill}>
        <span
          className={css.contrastHalf}
          style={{ background: `var(--${hue}-500)`, color: '#ffffff' }}
          data-rejected={measured.chosen === 'black' || undefined}
        >
          {hue} in white
        </span>
        <span
          className={css.contrastHalf}
          style={{ background: `var(--${hue}-500)`, color: '#000000' }}
          data-rejected={measured.chosen === 'white' || undefined}
        >
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
        {bothClear && <span className={css.contrastNote}>either clears, convention picked</span>}
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
      lede="Fourteen chromatic scales and three neutrals, thirteen steps each, generated rather than picked. Switch the theme in the toolbar and every swatch below moves."
    >
      <Preview
        title="Chromatic"
        description="Fourteen hues, thirteen steps each, 10 to 990 left to right."
        stack
      >
        <div className={css.ramps}>
          {HUES.map(hue => (
            <Ramp key={hue} name={hue} />
          ))}
        </div>
      </Preview>

      <Preview
        title="Neutral"
        description="Three of them, ordered by how much blue they carry."
        stack
      >
        <div className={css.ramps}>
          {NEUTRALS.map(name => (
            <Ramp key={name} name={name} />
          ))}
        </div>
      </Preview>

      <Preview
        title="Absolute"
        description="Four groups that do not follow the theme. Black and white are literals; dim and lighten are operations that work over anything."
        stack
      >
        <div className={css.rows}>
          <div className={css.row}>
            <Text as="span" size={2} className={css.token}>
              color.white
            </Text>
            <Text as="span" size={2} className={css.value}>
              #ffffff
            </Text>
            <span className={css.absoluteSwatch} style={{ background: 'var(--white)' }} />
          </div>
          <div className={css.row}>
            <Text as="span" size={2} className={css.token}>
              color.black
            </Text>
            <Text as="span" size={2} className={css.value}>
              #000000
            </Text>
            <span className={css.absoluteSwatch} style={{ background: 'var(--black)' }} />
          </div>
        </div>

        <div className={css.ramp}>
          <Text as="span" size={2} className={css.rampName}>
            dim
          </Text>
          <div className={css.alphaStrip}>
            {ALPHA_STEPS.map(step => (
              <span
                key={step}
                className={css.alphaStep}
                style={{ background: `var(--dim-${step})` }}
              />
            ))}
          </div>
        </div>
        <div className={css.ramp}>
          <Text as="span" size={2} className={css.rampName}>
            lighten
          </Text>
          <div className={css.alphaStrip}>
            {ALPHA_STEPS.map(step => (
              <span
                key={step}
                className={css.alphaStep}
                style={{ background: `var(--lighten-${step})` }}
              />
            ))}
          </div>
        </div>
      </Preview>

      <Callout>
        The step number is the alpha in thousandths, so <code>dim[100]</code> is black at 10%. Both
        ramps run 50 to 950 and stop there: 0% is <code>transparent</code> and 100% is{' '}
        <code>color.black</code> or <code>color.white</code>, which already exist above.
      </Callout>

      <Prose>
        <p>
          No two hues sit closer than 14°, the point where two ramps stop reading as separate
          families. Equal HSL lightness is not equal perceived brightness, so cyan and green are
          pulled down. Without that, <code>teal-500</code> is <code>#00ffea</code>.
        </p>
      </Prose>

      <Callout>
        Reach for the semantic tokens below, not a raw step. <code>pink500</code> says what a colour
        is; <code>status.error.normal</code> says what it is for, and only the second survives a
        decision to make errors crimson.
      </Callout>

      <Preview
        title="Semantic"
        description="What a colour is for. Background is elevation; every tone including neutral carries the same five roles."
        stack
      >
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

      <Preview
        title="Text on each fill"
        description="onNormal records the colour that clears AA on that fill, so no component has to decide."
        stack
      >
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

      <Preview
        title="White or black"
        description={`Seven and seven: red through blue carry white, the cyan-to-orange arc needs black. Both themes measure the same, because step 500 is deliberately the same lightness in each. (Reading the ${theme} theme.)`}
        stack
      >
        <div className={css.contrastList}>
          {HUES.map(hue => (
            <ContrastRow key={hue} hue={hue} theme={theme} />
          ))}
        </div>
      </Preview>
    </Page>
  );
}
