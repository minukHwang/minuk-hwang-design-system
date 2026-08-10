'use client';

import { Text } from '@minuk-hwang-design-system/components-react/text';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview } from '../../../site/Preview';
import css from '../../../site/tokens.module.css';

const STEPS = [
  ['xs', 'Resting card, separation only'],
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
      <Preview
        title="The ladder"
        description="Four steps. Every one above xs is two layers: a tight direct shadow over a wide, soft ambient one, which is what makes it read as cast rather than painted on."
        stack
      >
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

      <Preview
        title="What each is for"
        description="Pick by how far the thing is meant to float, not by how dark you want it."
        stack
      >
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

      <Preview
        title="Cast upward"
        description="Use shadow.up for anything pinned to the bottom of the screen, where content passes above it and a downward shadow lands on nothing."
        stack
      >
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

      <Callout>
        <p>
          The ink is <code>0.08 / 0.14</code> on light and <code>0.48 / 0.72</code> on dark. The
          six-fold jump is what puts the dark theme back at roughly the separation the light one
          gets for free.
        </p>
      </Callout>
    </Page>
  );
}
