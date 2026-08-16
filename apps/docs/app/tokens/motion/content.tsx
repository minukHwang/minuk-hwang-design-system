'use client';

import { Button } from '@minuk-hwang-design-system/components-react/button';
import { Text } from '@minuk-hwang-design-system/components-react/text';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview } from '../../../site/Preview';
import css from '../../../site/tokens.module.css';

const DURATIONS = [
  [70, 'Hover and press color changes'],
  [100, 'Checkbox, switch, icon rotation'],
  [150, 'Tooltip, badge, inline expand'],
  [200, 'The default: popover, dropdown, toast'],
  [300, 'Dialog, drawer'],
  [400, 'Bottom sheet, page transition'],
] as const;

const EASINGS = [
  ['standard', 'cubic-bezier(0.2, 0, 0, 1)', 'Moves and resizes: anything staying on screen'],
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
      <Preview
        title="Duration"
        description="Distance sets duration. A tooltip travels almost nowhere and is done in 150ms; a sheet crossing the screen needs 400ms or it reads as a jump cut."
        stack
      >
        <Button size="s" variant="secondary" onClick={() => setRun(n => n + 1)}>
          {run === 0 ? 'Play' : 'Play again'}
        </Button>
        <div style={{ width: '100%' }}>
          {DURATIONS.map(([ms, use]) => (
            <div key={ms} className={css.durationRow}>
              <code className={css.token}>duration[{ms}]</code>
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

      <Preview
        title="Easing"
        description="Direction sets easing. Something arriving decelerates so it lands; something leaving accelerates, because nobody waits out a dismissal they asked for."
        stack
      >
        <div className={css.rows}>
          {EASINGS.map(([name, curve, use]) => (
            /*
             * `rowStacked` because a cubic-bezier is thirty characters of
             * monospace. Beside its name it has about half a phone's width and
             * wraps mid-argument, which puts the chip level with the middle of a
             * two-line value; on its own line the longest of them still fits.
             */
            <div key={name} className={`${css.row} ${css.rowStacked}`}>
              <code className={css.token}>easing.{name}</code>
              <span className={css.value}>{curve}</span>
              <span>{use}</span>
            </div>
          ))}
        </div>
      </Preview>

      <Callout>
        Durations are numbers because they are measurable; easings are names because a curve is four
        numbers, the same argument that keeps shadows on t-shirt sizes.
      </Callout>
    </Page>
  );
}
