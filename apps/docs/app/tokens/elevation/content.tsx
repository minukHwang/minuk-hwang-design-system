'use client';

import { Text } from '@minuk-hwang-design-system/components-react/text';
import * as React from 'react';

import { useResolvedAppearance } from '../../../site/dials';
import { Page } from '../../../site/Page';
import { Callout, Preview } from '../../../site/Preview';
import css from '../../../site/tokens.module.css';

const LEVELS = [
  ['base', 'The page, and the only one an application is expected to change.'],
  ['raised', 'A surface on the page: card, input, panel, menu.'],
  ['overlay', 'Floating clear of it: dialog, popover, dropdown, tooltip.'],
] as const;

const FILLS = [
  ['surface', 'A quiet badge or banner, and a disabled control.'],
  ['subtle', 'A tonal button, and the well behind an avatar. One step firmer.'],
] as const;

/**
 * The two arrangements the dial picks between, each forced onto one block.
 *
 * Both, rather than only the one being described, because this site runs on the
 * white page itself — an example that only set `raised` would be setting what
 * was already set and would demonstrate nothing. Showing the pair also survives
 * the site changing its mind later.
 *
 * The values are the dial's own properties rather than `--background-base` and
 * `--background-raised`. Those agree on light and part on dark, where the dial
 * resolves to the page's own step and does nothing, and pointing at what the
 * dial points at is what stops the example drifting from the thing it shows.
 */
const TINTED_PAGE = { '--background-base': 'var(--page-background-base)' } as React.CSSProperties;
const WHITE_PAGE = {
  '--background-base': 'var(--page-background-raised)',
} as React.CSSProperties;

export default function ElevationPage() {
  /*
   * The white-page example is not shown in the dark theme.
   *
   * The dial it demonstrates resolves to the page's own step there and does
   * nothing, so the section would be a heading, a sentence about a border, and
   * two blocks that look exactly like the two above them. Showing an example of
   * a thing not happening teaches nothing; a line saying it does not happen
   * teaches the same fact in one sentence.
   */
  const theme = useResolvedAppearance();

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
        <div className={`${css.rows} ${css.levelDefault}`}>
          {LEVELS.map(([name, what]) => (
            <div key={name} className={css.levelRow}>
              <code className={css.token}>background.{name}</code>
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
        description="Not levels. Neutral is a tone like the other five, so a gray badge and a gray button are built the way a red one is."
        stack
      >
        <div className={css.rows}>
          {FILLS.map(([name, what]) => (
            <div key={name} className={css.levelRow}>
              <code className={css.token}>neutral.{name}</code>
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
        <div className={`${css.levelStage} ${css.levelDefault}`}>
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
        <div className={`${css.levelStage} ${css.levelDefault}`}>
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
        Interaction moves towards the text rather than towards white, and the text color is what
        flips between themes. That is why a hover darkens on light and lightens on dark without
        contradicting the rule above.
      </Callout>

      {theme === 'light' && (
        <>
          <Preview
            title="Where the page sits"
            description="pageBackground picks between these two. On the tinted page a flat card is enough; on the white one there is no color left to separate them, so a card takes a border."
            stack
            code={`<Theme pageBackground="base">   // tinted, the default
  <Theme pageBackground="raised"> // white`}
          >
            <div className={css.pagePair}>
              <div className={css.levelStage} style={TINTED_PAGE}>
                <Text as="span" size={2} color="assistive">
                  base
                </Text>
                <div className={css.levelCard}>
                  <Text as="span" size={3}>
                    Card, flat
                  </Text>
                </div>
              </div>
              <div className={css.levelStage} style={WHITE_PAGE}>
                <Text as="span" size={2} color="assistive">
                  raised
                </Text>
                <div
                  className={css.levelCard}
                  style={{ boxShadow: 'none', border: '1px solid var(--border-subtle)' }}
                >
                  <Text as="span" size={3}>
                    Card, outlined
                  </Text>
                </div>
              </div>
            </div>
          </Preview>
          <Callout>
            <code>pageBackground</code> is a light-theme dial. Dark has nothing above its page to
            move it to, so both settings resolve to the same page.
          </Callout>
        </>
      )}
    </Page>
  );
}
