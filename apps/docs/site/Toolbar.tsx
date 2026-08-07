'use client';

import { Button } from '@minuk-hwang-design-system/components-react/button';
import { Icon } from '@minuk-hwang-design-system/components-react/icon';
import { Select } from '@minuk-hwang-design-system/components-react/select';
import { Text } from '@minuk-hwang-design-system/components-react/text';
import {
  accentColors,
  radiusScales,
  type AccentColor,
  type RadiusScale,
} from '@minuk-hwang-design-system/style-tokens';
import * as React from 'react';

import css from './chrome.module.css';
import { useDials, type Appearance } from './dials';

const APPEARANCE_ICON: Record<Appearance, string> = {
  light: 'light_mode',
  dark: 'dark_mode',
  system: 'contrast',
};

/**
 * The three dials, above the content on every page.
 *
 * They were on the Theme page to begin with, which is the wrong place for them:
 * a brand colour judged against one sample block is a colour that works on one
 * sample block. Here they are in reach while reading any page, which is the only
 * way to find out that yellow is unreadable on a badge.
 *
 * Built from `Button`, `Select` and `Text` — the same components the pages below
 * document. A toolbar with its own controls would be a second answer to a
 * question the system has already answered.
 */
export const Toolbar = () => {
  const { appearance, accent, radius, setAppearance, setAccent, setRadius } = useDials();

  return (
    <div className={css.toolbar}>
      {/* Selected is `secondary` against `ghost` — a box rather than a tint the
          system has no name for. */}
      <div className={css.toolGroup} role="group" aria-label="Appearance">
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

      <div className={css.toolDivider} aria-hidden />

      {/* Each swatch carries its own `data-accent`, so it paints itself from the
          ramp it selects. Fourteen hex values written out beside the generated
          palette is a list that goes stale the first time a hue is retuned. */}
      <div className={css.toolGroup} role="group" aria-label="Accent colour">
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

      <div className={css.toolDivider} aria-hidden />

      <div className={css.toolGroup}>
        {/*
         * `aria-labelledby` rather than a `label` with `htmlFor`. The trigger is
         * a button, not a form control, so a label would not be associated with
         * it in the first place — pointing at the text by id is the association
         * that actually holds.
         */}
        <Text as="span" id="radius-dial-label" size={1} color="assistive" className={css.toolLabel}>
          radius
        </Text>
        <Select.Root
          value={radius}
          onValueChange={(value: string) => setRadius(value as RadiusScale)}
        >
          <Select.Trigger
            aria-labelledby="radius-dial-label"
            size="s"
            className={css.radiusTrigger}
          >
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
  );
};
