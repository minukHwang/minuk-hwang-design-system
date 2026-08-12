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
  ['subtle', 'A quiet badge or banner, and a disabled control.'],
  ['strong', 'One step firmer, where subtle would collide with a hovered surface.'],
] as const;

/**
 * Exactly what `<Theme pageBackground="raised">` writes, scoped to one block.
 *
 * The prop puts `data-page-background` on the document, because the page it
 * moves is `body`, and an example in the middle of a page about something else
 * must not repaint the whole site. So the declaration is scoped here instead.
 *
 * The value has to be the dial's own, not `--background-raised`. The two agree
 * on light and part on dark, where the dial resolves to the page's own step and
 * does nothing — which is the whole point of the example and exactly what it was
 * getting wrong. Pointing at the same property means the demo cannot drift from
 * the thing it demonstrates.
 */
const WHITE_PAGE = {
  '--background-base': 'var(--page-background-raised)',
} as React.CSSProperties;

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
        title="Fills"
        description="Not levels. A neutral element paints itself one of these, and they move towards white in dark because a badge on a dark card is only visible if it is lighter."
        stack
      >
        <div className={css.rows}>
          {FILLS.map(([name, what]) => (
            <div key={name} className={css.levelRow}>
              <Text as="span" size={2} className={css.token}>
                fill.{name}
              </Text>
              <span className={css.levelChip} style={{ background: `var(--fill-${name})` }} />
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
        description="Set pageBackground on the outermost Theme. Light only: dark has nothing above its page to move it to, so switch the theme and this example stops changing anything."
        stack
        code={`<Theme pageBackground="raised">
  <Card.Root elevation="outlined">…</Card.Root>
</Theme>`}
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
            ['fill.subtle', 'neutral 100'],
            ['fill.strong', 'neutral 200'],
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
