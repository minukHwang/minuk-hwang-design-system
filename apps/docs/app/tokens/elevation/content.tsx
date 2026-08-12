'use client';

import { Text } from '@minuk-hwang-design-system/components-react/text';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, Section } from '../../../site/Preview';
import css from '../../../site/tokens.module.css';

const LEVELS = [
  ['base', 'The page, and the only one an application is expected to change.'],
  ['raised', 'A surface on the page: card, input, panel, menu.'],
  ['overlay', 'Floating clear of it: dialog, popover, dropdown, tooltip.'],
] as const;

const FILLS = [
  ['surface', 'A quiet badge or banner, and a disabled control.'],
  ['subtle', 'Its border, and any fill that has to clear a hovered surface.'],
] as const;

/**
 * The white-page arrangement, driven by the real mechanism rather than a mockup.
 *
 * Setting `--background-base` to the raised value is exactly what an application
 * does, so this block is the documentation and the demonstration at once: get it
 * wrong here and the example stops working.
 */
const WHITE_PAGE = { '--background-base': 'var(--background-raised)' } as React.CSSProperties;

export default function ElevationPage() {
  return (
    <Page
      eyebrow="Tokens"
      title="Elevation"
      lede="Two axes, not one ladder. A level says how far a surface is from the page; an interaction says what a pointer is doing to it, painted over whichever level it lands on."
    >
      <Preview
        title="Levels"
        description="Five, ordered from the page outwards. Switch themes in the bar above and watch the order hold while the values invert."
        stack
      >
        <div className={css.rows}>
          {LEVELS.map(([name, what]) => (
            <div key={name} className={css.levelRow}>
              <Text as="span" size={2} className={css.token}>
                background.{name}
              </Text>
              <span className={css.levelChip} style={{ background: `var(--background-${name})` }} />
              <Text as="span" size={3} color="assistive">
                {what}
              </Text>
            </div>
          ))}
        </div>
      </Preview>

      <Preview
        title="The neutral tone"
        description="Not levels. Neutral is a tone like the other five, so a grey badge is built the same way a red one is."
        stack
      >
        <div className={css.rows}>
          {FILLS.map(([name, what]) => (
            <div key={name} className={css.levelRow}>
              <Text as="span" size={2} className={css.token}>
                neutral.{name}
              </Text>
              <span className={css.levelChip} style={{ background: `var(--neutral-${name})` }} />
              <Text as="span" size={3} color="assistive">
                {what}
              </Text>
            </div>
          ))}
        </div>
      </Preview>

      <Preview
        title="Stacked"
        description="A page, a card on it, and something floating over both."
        stack
      >
        <div className={css.levelStage}>
          <Text as="span" size={2} color="assistive">
            background.base
          </Text>
          <div className={css.levelCard}>
            <Text as="span" size={3}>
              background.raised
            </Text>
          </div>
          <div className={css.levelFloat}>
            <Text as="span" size={3}>
              background.overlay
            </Text>
          </div>
        </div>
      </Preview>

      <Callout>
        A level moves towards white in both themes. Light runs out of room at <code>raised</code>,
        so <code>overlay</code> resolves to white again there and the shadow carries the level on
        its own. Dark has most of the ramp still above it and the same token lands a step higher.
      </Callout>

      <Preview
        title="Interaction"
        description="Hover and hold each row. The ink is one value and it moves both levels by the same amount, which a step on the neutral ramp could not do."
        stack
      >
        <div className={css.levelStage}>
          <div className={css.inkRow}>
            <Text as="span" size={3}>
              A row on the page
            </Text>
            <Text as="span" size={2} color="assistive">
              background.base
            </Text>
          </div>
          <div className={css.levelCard} style={{ padding: 6 }}>
            <div className={css.inkRow}>
              <Text as="span" size={3}>
                A row on a card
              </Text>
              <Text as="span" size={2} color="assistive">
                background.raised
              </Text>
            </div>
          </div>
        </div>
      </Preview>

      <Callout>
        Interaction moves towards the text rather than towards white, and the text colour is what
        flips between themes. That is why a hover darkens on light and lightens on dark without
        contradicting the rule above.
      </Callout>

      <Preview
        title="A white page"
        description="Set pageBackground on the outermost Theme. It moves in the light theme only, and the page then has no room left above it, so a card marks itself with a border."
        stack
        code={`<div style={{ '--background-base': 'var(--background-raised)' }}>
  <Card.Root elevation="outlined">…</Card.Root>
</div>`}
      >
        <div className={css.levelStage} style={WHITE_PAGE}>
          <Text as="span" size={2} color="assistive">
            pageBackground raised
          </Text>
          <div
            className={css.levelCard}
            style={{ boxShadow: 'none', border: '1px solid var(--border-subtle)' }}
          >
            <Text as="span" size={3}>
              Card.Root elevation=&quot;outlined&quot;
            </Text>
          </div>
          <div className={css.inkRow}>
            <Text as="span" size={3}>
              A row on the page, hovered the same way
            </Text>
          </div>
        </div>
      </Preview>

      <Section title="Tokens">
        <div className={css.rows}>
          {[
            ['background.base', 'neutral 10'],
            ['background.raised', 'neutral 50'],
            ['background.overlay', 'raised, mixed 5% towards white'],
            ['background.scrim', 'dim 500, behind a modal'],
            ['neutral.surface', 'neutral 100'],
            ['neutral.subtle', 'neutral 200'],
            ['state.hover', 'dim 100 on light, lighten 100 on dark'],
            ['state.pressed', 'dim 200 on light, lighten 200 on dark'],
          ].map(([name, value]) => (
            <div key={name} className={css.row}>
              <Text as="span" size={2} className={css.token}>
                {name}
              </Text>
              <Text as="span" size={2} className={css.value}>
                {value}
              </Text>
              <span />
            </div>
          ))}
        </div>
      </Section>
    </Page>
  );
}
