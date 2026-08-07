'use client';

import { Button } from '@minuk-hwang-design-system/components-react/button';
import { Text } from '@minuk-hwang-design-system/components-react/text';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, Prose } from '../../../site/Preview';
import css from '../../../site/tokens.module.css';

const DURATIONS = [
  [70, 'Hover and press colour changes'],
  [100, 'Checkbox, switch, icon rotation'],
  [150, 'Tooltip, badge, inline expand'],
  [200, 'The default — popover, dropdown, toast'],
  [300, 'Dialog, drawer'],
  [400, 'Bottom sheet, page transition'],
] as const;

const EASINGS = [
  ['standard', 'cubic-bezier(0.2, 0, 0, 1)', 'Moves and resizes — anything staying on screen'],
  ['entrance', 'cubic-bezier(0.05, 0.7, 0.1, 1)', 'Appearing. Decelerates so it lands'],
  ['exit', 'cubic-bezier(0.3, 0, 0.8, 0.15)', 'Leaving. Accelerates, and can be quicker'],
  ['linear', 'linear', 'Spinners and progress'],
] as const;

export default function MotionPage() {
  const [run, setRun] = React.useState(0);

  return (
    <Page
      eyebrow="Tokens"
      title="Motion"
      lede="The base layer animates by setting data-state and leaving the transition to CSS. Without these tokens every component picks its own number."
    >
      <Prose>
        <p>
          <strong>Distance sets duration.</strong> A tooltip travels almost nowhere and is done in
          150ms; a sheet crossing the screen needs 400ms or it reads as a jump cut. One duration for
          both makes the small thing sluggish and the large thing violent.
        </p>
      </Prose>

      <Preview
        title="press play — all six start together"
        stack
        code={`transitionDuration: vars.motion.duration[200];
transitionTimingFunction: vars.motion.easing.standard;`}
      >
        <Button size="s" variant="secondary" onClick={() => setRun(n => n + 1)}>
          {run === 0 ? 'Play' : 'Play again'}
        </Button>
        <div style={{ width: '100%' }}>
          {DURATIONS.map(([ms, use]) => (
            <div key={ms} className={css.durationRow}>
              <span className={css.token}>duration[{ms}]</span>
              <span className={css.value}>{ms}ms</span>
              <span className={css.track}>
                {/* Remounting on every run is what restarts the animation. */}
                <span
                  key={run}
                  className={`${css.runner} ${run > 0 ? css.running : ''}`}
                  style={{ animationDuration: `var(--duration-${ms})` }}
                />
              </span>
              <Text as="span" size={2} color="assistive">
                {use}
              </Text>
            </div>
          ))}
        </div>
      </Preview>

      <Prose>
        <p>
          <strong>Direction sets easing.</strong> Something arriving decelerates so that it lands
          rather than stops; something leaving accelerates and can be quicker than its entrance,
          because nobody waits out a dismissal they already asked for. The curves are Material
          3&apos;s emphasized pair.
        </p>
      </Prose>

      <Preview title="easing" stack>
        <div className={css.rows}>
          {EASINGS.map(([name, curve, use]) => (
            <div key={name} className={css.row}>
              <span className={css.token}>easing.{name}</span>
              <span className={css.value}>{curve}</span>
              <span>{use}</span>
            </div>
          ))}
        </div>
      </Preview>

      <Callout>
        Durations are numbers because they are measurable; easings are names because a curve is four
        numbers — the same argument that keeps shadows on t-shirt sizes.
      </Callout>

      <Prose>
        <p>
          Under <code>prefers-reduced-motion: reduce</code> every duration collapses to{' '}
          <code>0.01ms</code>, in both stylesheets. Not zero — <code>transitionend</code> still has
          to fire, or a component waiting on it never finishes. It is a floor rather than a
          preference: interface animation makes some people motion sick, and the OS setting is how
          they say so.
        </p>
      </Prose>
    </Page>
  );
}
