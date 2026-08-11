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
import { accentColors, radiusScales } from '@minuk-hwang-design-system/style-tokens';
import * as React from 'react';

import { useDials } from '../../site/dials';
import { Page } from '../../site/Page';
import { PropsTable, Preview, Prose, Section } from '../../site/Preview';
import css from '../../site/theme.module.css';

/** A sample wide enough to judge a hue on: fills, tints, borders, focus, text. */
const Sample = () => (
  <div className={css.sample}>
    <div className={css.sampleRow}>
      <Button>
        <Icon name="rocket_launch" />
        Publish
      </Button>
      <Button variant="secondary">Preview</Button>
      <Button variant="ghost">Discard</Button>
      <Badge tone="accent">v0.1.0</Badge>
    </div>

    <div className={css.sampleRow}>
      <Input placeholder="Focus me, the ring is the accent" />
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
        <Card.Description>Twenty-three components, one stylesheet each.</Card.Description>
      </Card.Header>
    </Card.Root>
  </div>
);

export default function ThemePage() {
  const { accent, setAccent, radius, setRadius } = useDials();

  return (
    <Page
      eyebrow="Tokens"
      title="Theme"
      lede="Three dials, an accent, a grey and a radius, set on an ancestor. Twenty-three components change appearance and not one of them is rebuilt, because every stylesheet already reads the properties the dials rewrite."
    >
      <Preview
        title="Try it"
        description="The same dials as the toolbar above. Changing one here changes the whole site."
        stack
      >
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

      <Preview
        title="Nesting"
        description="Wrap a region in a second Theme to give it its own accent. Omitting a prop inherits rather than resets."
        stack
        code={`<Theme accentColor="teal" radius="full">
  <Button size="s">Upgrade</Button>
  <Badge tone="accent">Popular</Badge>
</Theme>

<Theme accentColor="crimson" radius="none">
  <Button size="s">Cancel plan</Button>
  <Badge tone="accent">Legacy</Badge>
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

      <Preview
        title="How it works"
        description="Two indirections in the token stylesheet, and nothing else anywhere."
        stack
        language="css"
        code={`/* one ramp, and a block per hue that replaces it */
html {
  --accent-500: var(--blue-500);
}

[data-accent='purple'] {
  --accent-500: var(--purple-500);
}

/* radius is a multiplier, plus a flag for the shape it cannot describe */
html {
  --border-radius-factor: 1;
  --border-radius-pill-full: 0;
}

[data-radius='large'] {
  --border-radius-factor: 1.5;
}

[data-radius='full'] {
  --border-radius-pill-full: 999px;
}

/* the steps are restated wherever the factor is, so a nested Theme recomputes them */
html,
[data-radius] {
  --border-radius-8: calc(0.5rem * var(--border-radius-factor));
}

/* and this is what a component was compiled against, years earlier */
.button {
  background-color: var(--accent-500);
  border-radius: max(var(--border-radius-8), var(--border-radius-pill-full));
}`}
      >
        <Text size={4} color="assistive">
          A component compiled against <code>var(--accent-500)</code> and{' '}
          <code>var(--border-radius-8)</code> follows a rebrand it was built years before.
        </Text>
      </Preview>

      <Section title="Why there is no color prop on Button">
        <Prose>
          <p>
            <code>variant</code> carries meaning: <code>primary</code> is the one action a screen is
            about, <code>danger</code> is deleting. A <code>color</code> beside it would let each
            call site invent a fifth meaning. An application picks a brand; a button says what it
            does.
          </p>
        </Prose>
      </Section>

      <Section title="What is not here">
        <Prose>
          <p>
            Light and dark are still chosen on the <code>html</code> element, because the rule that
            follows the operating system has to ask whether the document as a whole has overridden
            it. And <code>textColor.link</code> stays a fixed blue: whether a link should be the
            brand colour or the colour people recognise as a link is not answered here.
          </p>
        </Prose>
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            {
              name: 'accentColor',
              type: '14 hues: red · crimson · pink · magenta · purple · indigo · blue · cyan · teal · green · lime · yellow · amber · orange',
              default: 'inherited',
              description:
                'The text colour that clears AA on each fill is measured per theme, so this cannot put white on yellow.',
            },
            {
              name: 'neutralColor',
              type: `'mono' | 'gray' | 'slate'`,
              default: 'inherited',
              description:
                'Which grey the surfaces and borders are drawn from. mono has no hue in it; gray and slate lean toward blue. Text does not move with it.',
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
