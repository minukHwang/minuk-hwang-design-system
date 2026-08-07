'use client';

import { Alert } from '@minuk-hwang-design-system/components-react/alert';
import { Badge } from '@minuk-hwang-design-system/components-react/badge';
import { Button } from '@minuk-hwang-design-system/components-react/button';
import { Card } from '@minuk-hwang-design-system/components-react/card';
import { Checkbox } from '@minuk-hwang-design-system/components-react/checkbox';
import { Icon } from '@minuk-hwang-design-system/components-react/icon';
import { Input } from '@minuk-hwang-design-system/components-react/input';
import { Switch } from '@minuk-hwang-design-system/components-react/switch';
import { Text } from '@minuk-hwang-design-system/components-react/text';
import { Theme } from '@minuk-hwang-design-system/components-react/theme';
import {
  accentColors,
  radiusScales,
  type AccentColor,
  type RadiusScale,
} from '@minuk-hwang-design-system/style-tokens';
import * as React from 'react';

import { Page } from '../../site/Page';
import { Callout, PropsTable, Preview, Prose, Section } from '../../site/Preview';
import css from '../../site/theme.module.css';

/**
 * The picker writes to `<html>` rather than to a local `Theme`, so the rest of
 * the site changes with it. Choosing a brand colour by looking at one sample
 * block is how you pick a hue that works on exactly one sample block.
 */
const useSiteTheme = () => {
  const [accent, setAccent] = React.useState<AccentColor>('blue');
  const [radius, setRadius] = React.useState<RadiusScale>('medium');

  React.useEffect(() => {
    const storedAccent = window.localStorage.getItem('accent') as AccentColor | null;
    const storedRadius = window.localStorage.getItem('radius') as RadiusScale | null;
    if (storedAccent) setAccent(storedAccent);
    if (storedRadius) setRadius(storedRadius);
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
    window.localStorage.setItem('accent', accent);
  }, [accent]);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-radius', radius);
    window.localStorage.setItem('radius', radius);
  }, [radius]);

  return { accent, setAccent, radius, setRadius };
};

/** A sample wide enough to judge a hue on: fills, tints, borders, focus, text. */
const Sample = () => (
  <div className={css.sample}>
    <div className={css.sampleRow}>
      <Button>
        <Icon name="rocket_launch" size={18} />
        Publish
      </Button>
      <Button variant="secondary">Preview</Button>
      <Button variant="ghost">Discard</Button>
      <Badge tone="accent">v0.1.0</Badge>
    </div>

    <div className={css.sampleRow}>
      <Input placeholder="Focus me — the ring is the accent" />
    </div>

    <div className={css.sampleRow}>
      <Checkbox defaultChecked>Ship a changelog</Checkbox>
      <Switch defaultChecked aria-label="Notify watchers" />
      <Text size={4} color="accent">
        Selected
      </Text>
      <Text size={4} color="link">
        A link
      </Text>
    </div>

    <Alert.Root tone="accent">
      <Alert.Icon />
      <Alert.Body>
        <Alert.Description>
          Tinted surfaces, borders and text all come off the same ramp.
        </Alert.Description>
      </Alert.Body>
    </Alert.Root>

    <Card.Root elevation="outlined">
      <Card.Header>
        <Card.Title>components-react</Card.Title>
        <Card.Description>Twenty-two components, one stylesheet each.</Card.Description>
      </Card.Header>
    </Card.Root>
  </div>
);

export default function ThemePage() {
  const { accent, setAccent, radius, setRadius } = useSiteTheme();

  return (
    <Page
      eyebrow="Tokens"
      title="Theme"
      lede="Two dials — an accent and a radius — set on an ancestor. Twenty-two components change appearance and not one of them is rebuilt, because every stylesheet already reads the properties the dials rewrite."
    >
      <Preview title="try it — this one changes the whole site" stack>
        <div className={css.picker}>
          <div className={css.control}>
            <Text as="div" size={1} color="assistive" className={css.controlLabel}>
              accentColor
            </Text>
            <div className={css.swatches}>
              {accentColors.map(hue => (
                <button
                  key={hue}
                  type="button"
                  title={hue}
                  aria-label={hue}
                  aria-pressed={accent === hue}
                  onClick={() => setAccent(hue)}
                  data-accent={hue}
                  className={`${css.swatch} ${accent === hue ? css.swatchActive : ''}`}
                />
              ))}
            </div>
            <Text size={2} color="assistive">
              {accent}
            </Text>
          </div>

          <div className={css.control}>
            <Text as="div" size={1} color="assistive" className={css.controlLabel}>
              radius
            </Text>
            <div className={css.segments}>
              {radiusScales.map(scale => (
                <Button
                  key={scale}
                  size="s"
                  variant={radius === scale ? 'secondary' : 'ghost'}
                  aria-pressed={radius === scale}
                  onClick={() => setRadius(scale)}
                >
                  {scale}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Sample />
      </Preview>

      <Prose>
        <p>
          Nothing above takes a colour prop. <code>Button</code> asks for{' '}
          <code>variant=&quot;primary&quot;</code> and gets whatever the brand currently is, which
          is the point of a semantic layer — <strong>the call site says what it means</strong> and
          the theme says what that looks like.
        </p>
      </Prose>

      <Preview
        title="nesting — a region with its own accent"
        stack
        code={`<Theme accentColor="teal" radius="full">
  <Pricing />
</Theme>`}
      >
        <div className={css.nested}>
          <Theme accentColor="teal" radius="full">
            <div className={css.nestedPane}>
              <Text as="div" size={1} color="assistive" className={css.controlLabel}>
                teal · full
              </Text>
              <div className={css.sampleRow}>
                <Button size="s">Upgrade</Button>
                <Badge tone="accent">Popular</Badge>
              </div>
            </div>
          </Theme>
          <Theme accentColor="crimson" radius="none">
            <div className={css.nestedPane}>
              <Text as="div" size={1} color="assistive" className={css.controlLabel}>
                crimson · none
              </Text>
              <div className={css.sampleRow}>
                <Button size="s">Cancel plan</Button>
                <Badge tone="accent">Legacy</Badge>
              </div>
            </div>
          </Theme>
        </div>
      </Preview>

      <Prose>
        <p>
          The attribute selectors are unqualified — <code>[data-accent=&apos;teal&apos;]</code>, not{' '}
          <code>html[data-accent=&apos;teal&apos;]</code> — so the nearest ancestor wins and custom
          property inheritance carries it down. Omitting a prop inherits rather than resets, which
          is what lets a nested <code>Theme</code> change only the radius.
        </p>
      </Prose>

      <Section title="How it works">
        <Prose>
          <p>Two indirections in the token stylesheet, and nothing else anywhere.</p>
        </Prose>

        <Preview
          title="the whole mechanism"
          stack
          code={`/* the ramp every accent token points at */
html                   { --accent-500: var(--blue-500);   … }
[data-accent='violet'] { --accent-500: var(--violet-500); … }

/* radius as a multiplier, so the steps keep their relationship */
html                 { --border-radius-factor: 1; }
[data-radius='large'] { --border-radius-factor: 1.5; }

--border-radius-8: calc(0.5rem * var(--border-radius-factor));`}
        >
          <Text size={4} color="assistive">
            A component compiled against <code>var(--accent-500)</code> and{' '}
            <code>var(--border-radius-8)</code> follows a rebrand it was built years before.
          </Text>
        </Preview>

        <Callout>
          Radius used to compile to <code>border-radius: 0.5rem</code> in all seventeen stylesheets
          that use it — a literal baked in at build time, with nothing left for a theme to change.
          The tokens now ship the value and the name separately, which is the same split the colour
          tokens have always had between <code>$static</code> and <code>$palette</code>.
        </Callout>

        <Prose>
          <p>
            <code>full</code> is a factor of 3, not a huge number, and that is enough because{' '}
            <strong>a browser clamps a radius to half the box</strong>. A 48px button asks for 24px
            and is a pill; a card asks for 36px and keeps it, because the card is taller than 72px.
            The clamp is what tells controls apart from containers, which is how one number means
            &quot;pill&quot; for one and &quot;generously round&quot; for the other. Turning it up
            further only rounds the containers — the controls are already at their maximum.
          </p>
        </Prose>
      </Section>

      <Section title="Why there is no color prop on Button">
        <Prose>
          <p>
            <code>variant</code> carries meaning: <code>primary</code> is the one action a screen is
            about, <code>danger</code> is deleting and nothing else. A{' '}
            <code>color=&quot;teal&quot;</code> beside it would let each call site invent a fifth
            meaning, and the two props would disagree about which one the button is.
          </p>
          <p>
            The flexibility belongs one level up, where it is a decision made once.{' '}
            <strong>An application picks a brand; a button says what it does.</strong>
          </p>
        </Prose>
      </Section>

      <Section title="What is not here">
        <Prose>
          <p>
            Light and dark are still chosen on the <code>html</code> element rather than through{' '}
            <code>Theme</code>, because the rule that follows the operating system has to be able to
            ask whether the document as a whole has overridden it. A dark region inside a light page
            is a change to that cascade, not a third prop.
          </p>
          <p>
            <code>textColor.link</code> is a fixed blue and does not follow the accent. Whether a
            link should be the brand colour or the colour people already recognise as a link is a
            real question, and it has not been answered here.
          </p>
        </Prose>
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            {
              name: 'accentColor',
              type: '14 hues — red · crimson · pink · magenta · purple · indigo · blue · cyan · teal · green · lime · yellow · amber · orange',
              default: 'inherited',
              description:
                'The text colour that clears AA on each fill is measured per theme, so this cannot put white on yellow.',
            },
            {
              name: 'radius',
              type: `'none' | 'small' | 'medium' | 'large' | 'full'`,
              default: 'inherited',
              description:
                'A multiplier over the radius scale. none squares pills too, which is what asking for no radius means.',
            },
          ]}
        />
      </Section>
    </Page>
  );
}
