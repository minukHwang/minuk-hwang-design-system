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
  ['sunken', 'Below the page: a disabled control, a neutral tint.'],
  ['deep', 'Deeper again, where sunken would collide with a hovered surface.'],
] as const;

/**
 * The white-page arrangement, driven by the real mechanism rather than a mockup.
 *
 * Setting `--surface-base` to the raised value is exactly what an application
 * does, so this block is the documentation and the demonstration at once: get it
 * wrong here and the example stops working.
 */
const WHITE_PAGE = { '--surface-base': 'var(--surface-raised)' } as React.CSSProperties;

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
                surface.{name}
              </Text>
              <span className={css.levelChip} style={{ background: `var(--surface-${name})` }} />
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
            surface.base
          </Text>
          <div className={css.levelCard}>
            <Text as="span" size={3}>
              surface.raised
            </Text>
          </div>
          <div className={css.levelFloat}>
            <Text as="span" size={3}>
              surface.overlay
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
        description="Hover and hold each row. The ink is one value and it moves both levels by the same amount, which a step on the ramp could not do."
        stack
      >
        <div className={css.levelStage}>
          <div className={css.inkRow}>
            <Text as="span" size={3}>
              A row on the page
            </Text>
            <Text as="span" size={2} color="assistive">
              surface.base
            </Text>
          </div>
          <div className={css.levelCard} style={{ padding: 6 }}>
            <div className={css.inkRow}>
              <Text as="span" size={3}>
                A row on a card
              </Text>
              <Text as="span" size={2} color="assistive">
                surface.raised
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
        description="Point base at raised. The page has no room left above it, so a card marks itself with a border instead of a colour."
        stack
        code={`<div style={{ '--surface-base': 'var(--surface-raised)' }}>
  <Card.Root elevation="outlined">…</Card.Root>
</div>`}
      >
        <div className={css.levelStage} style={WHITE_PAGE}>
          <Text as="span" size={2} color="assistive">
            surface.base, pointed at raised
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
            ['surface.base', 'neutral 10'],
            ['surface.raised', 'neutral 50'],
            ['surface.overlay', 'raised, mixed 5% towards white'],
            ['surface.sunken', 'neutral 100'],
            ['surface.deep', 'neutral 200'],
            ['surface.scrim', 'black at 50%, behind a modal'],
            ['state.hover', 'ink at 8%'],
            ['state.pressed', 'ink at 16%'],
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
