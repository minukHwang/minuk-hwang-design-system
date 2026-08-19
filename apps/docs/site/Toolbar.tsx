'use client';

import { Button } from '@minuk-hwang-design-system/components-react/button';
import { Icon } from '@minuk-hwang-design-system/components-react/icon';
import { Select } from '@minuk-hwang-design-system/components-react/select';
import { Text } from '@minuk-hwang-design-system/components-react/text';
import {
  accentColors,
  neutralColors,
  radiusScales,
  type AccentColor,
  type NeutralColor,
  type RadiusScale,
} from '@minuk-hwang-design-system/style-tokens';
import * as React from 'react';

import css from './chrome.module.css';
import { useDials, useResolvedAppearance, type Appearance } from './dials';

const APPEARANCE_ICON: Record<Appearance, string> = {
  light: 'light_mode',
  dark: 'dark_mode',
  system: 'contrast',
};

/**
 * The three dials, above the content on every page.
 *
 * They were on the Theme page to begin with, which is the wrong place for them:
 * a brand color judged against one sample block is a color that works on one
 * sample block. Here they are in reach while reading any page, which is the only
 * way to find out that yellow is unreadable on a badge.
 *
 * Built from `Button`, `Select` and `Text` — the same components the pages below
 * document. A toolbar with its own controls would be a second answer to a
 * question the system has already answered.
 */
export const Toolbar = () => {
  const { appearance, accent, neutral, radius, setAppearance, setAccent, setNeutral, setRadius } =
    useDials();
  const resolved = useResolvedAppearance();

  return (
    <div className={css.toolbar}>
      <div className={css.toolbarRow}>
        {/*
         * One button on a phone, three at a desk. `system` is a preference you
         * set once and forget; what a phone needs is to flip the thing you are
         * looking at, so this toggles between the two the page is actually in.
         */}
        <Button
          size="s"
          iconOnly
          variant="ghost"
          className={css.narrowOnly}
          onClick={() => setAppearance(resolved === 'dark' ? 'light' : 'dark')}
          aria-label={resolved === 'dark' ? 'Switch to light' : 'Switch to dark'}
          title={resolved === 'dark' ? 'Switch to light' : 'Switch to dark'}
        >
          <Icon name={resolved === 'dark' ? 'light_mode' : 'dark_mode'} />
        </Button>

        {/* Selected is `secondary` against `ghost` — a box rather than a tint the
          system has no name for. */}
        <div className={`${css.toolGroup} ${css.wideOnly}`} role="group" aria-label="Appearance">
          {(['light', 'dark', 'system'] as const).map(option => (
            <Button
              key={option}
              size="s"
              iconOnly
              variant={appearance === option ? 'secondary' : 'ghost'}
              onClick={() => setAppearance(option)}
              aria-pressed={appearance === option}
              aria-label={option}
              title={option}
            >
              <Icon name={APPEARANCE_ICON[option]} size={18} />
            </Button>
          ))}
        </div>

        <div className={`${css.toolDivider} ${css.wideOnly}`} aria-hidden />

        {/* Each swatch carries its own `data-accent`, so it paints itself from the
          ramp it selects. Fourteen hex values written out beside the generated
          palette is a list that goes stale the first time a hue is retuned. */}
        <div className={`${css.toolGroup} ${css.wideOnly}`} role="group" aria-label="Accent color">
          {accentColors.map(hue => (
            <button
              key={hue}
              type="button"
              data-accent={hue}
              onClick={() => setAccent(hue as AccentColor)}
              aria-pressed={accent === hue}
              aria-label={hue}
              title={hue}
              className={`${css.swatch} ${accent === hue ? css.swatchActive : ''}`}
            />
          ))}
        </div>

        <div className={`${css.toolDivider} ${css.wideOnly}`} aria-hidden />

        <div className={`${css.toolGroup} ${css.wideOnly}`}>
          {/*
           * `aria-labelledby` rather than a `label` with `htmlFor`. The trigger is
           * a button, not a form control, so a label would not be associated with
           * it in the first place — pointing at the text by id is the association
           * that actually holds.
           */}
          <Text
            as="span"
            id="neutral-dial-label"
            size={1}
            color="assistive"
            className={css.toolLabel}
          >
            gray
          </Text>
          <div className={css.dialSelect}>
            <Select.Root
              value={neutral}
              onValueChange={(value: string) => setNeutral(value as NeutralColor)}
            >
              <Select.Trigger aria-labelledby="neutral-dial-label" size="s">
                <Select.Value />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {neutralColors.map(family => (
                    <Select.Item key={family} value={family}>
                      {family}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </div>
        </div>

        {/*
          A sibling of the row, like the other two.

          This one and the group after it used to live inside the group above, so
          the row's gap did not apply to them: the rule between gray and radius
          sat in 4px of group gap where the others sit in 10px of row gap, and the
          two labels were spaced differently from their selects for the same
          reason. One dial is one group, and every rule is between two of them.
        */}
        <div className={`${css.toolDivider} ${css.wideOnly}`} aria-hidden />

        <div className={`${css.toolGroup} ${css.wideOnly}`}>
          <Text
            as="span"
            id="radius-dial-label"
            size={1}
            color="assistive"
            className={css.toolLabel}
          >
            radius
          </Text>
          <div className={css.dialSelect}>
            <Select.Root
              value={radius}
              onValueChange={(value: string) => setRadius(value as RadiusScale)}
            >
              <Select.Trigger aria-labelledby="radius-dial-label" size="s">
                <Select.Value />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {radiusScales.map(scale => (
                    <Select.Item key={scale} value={scale}>
                      {scale}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </div>
        </div>
      </div>
    </div>
  );
};
