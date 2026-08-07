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
          How far something floats above the page is a fact about the layout. How much it darkens
          what is behind it depends entirely on what is behind it —{' '}
          <strong>
            eight per cent black moves a white ground by 20/255 and a near-black one by 2
          </strong>
          . The values used to be literal <code>rgba(0, 0, 0, 0.1)</code>, so a card that floated in
          the light theme went flat in the dark one and nothing in the type system noticed.
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
          rather than painted on: <code>direct</code> is tight and offset further down — the key
          light — over an <code>ambient</code> that is wide, soft and barely offset.
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
          Light comes from above, so everything casts down and that is the default. Anything pinned
          to the bottom edge of the screen — a bottom sheet, a tab bar, a sticky footer — has
          content passing <strong>above</strong> it rather than below, and a downward shadow there
          lands on nothing.
        </p>
        <p>
          Direction is a modifier on elevation, not a value beside it. An earlier version had{' '}
          <code>elevatedTop</code> and <code>elevatedBottom</code> sitting in the same flat list as{' '}
          <code>xs</code> through <code>l</code>, which mixed two axes — you could not ask for a
          subtle bottom bar or an emphatic one, only for the single weight someone had baked in.
        </p>
      </Prose>

      <Callout>
        The alphas are 0.08 / 0.14 on light and 0.48 / 0.72 on dark. The six-fold jump looks drastic
        and is not — it is what puts the dark theme back at roughly the separation the light one
        gets for free. Shadow is not carrying elevation alone there either: the dark surfaces
        already step 11 points apart, so these reinforce a difference rather than invent one.
      </Callout>

      <Prose>
        <p>
          These keep t-shirt names while the rest of the system moved to pixels, because a shadow is
          four lengths and a colour. There is no single number to key it by, and{' '}
          <code>shadow[16]</code> would be naming one of five values arbitrarily.
        </p>
      </Prose>
    </Page>
  );
}
