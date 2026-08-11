'use client';

import { Alert } from '@minuk-hwang-design-system/components-react/alert';
import { Avatar } from '@minuk-hwang-design-system/components-react/avatar';
import { Badge } from '@minuk-hwang-design-system/components-react/badge';
import { Button } from '@minuk-hwang-design-system/components-react/button';
import { Card } from '@minuk-hwang-design-system/components-react/card';
import { Checkbox } from '@minuk-hwang-design-system/components-react/checkbox';
import { Chip } from '@minuk-hwang-design-system/components-react/chip';
import { Field } from '@minuk-hwang-design-system/components-react/field';
import { Heading } from '@minuk-hwang-design-system/components-react/heading';
import { Icon } from '@minuk-hwang-design-system/components-react/icon';
import { Input } from '@minuk-hwang-design-system/components-react/input';
import { Select } from '@minuk-hwang-design-system/components-react/select';
import { Separator } from '@minuk-hwang-design-system/components-react/separator';
import { Switch } from '@minuk-hwang-design-system/components-react/switch';
import { Text } from '@minuk-hwang-design-system/components-react/text';
import * as React from 'react';

import { Page } from '../../site/Page';
import css from '../../site/playground.module.css';

const FILTERS = ['Components', 'Tokens', 'Behaviour', 'Docs'] as const;

/*
 * ============================================
 * Panels
 * ============================================
 */

/**
 * Controls that sit on one line together.
 *
 * The row exists because heights are the thing that goes wrong first: Button,
 * Input and Select share one scale, and any drift between them shows here before
 * it shows anywhere else.
 */
const Toolbar = () => (
  <div className={css.row}>
    <Input size="m" placeholder="Search components" className={css.grow} />
    <Select.Root defaultValue="updated">
      <Select.Trigger size="m" className={css.select} aria-label="Sort by">
        <Select.Value />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Item value="updated">Recently updated</Select.Item>
          <Select.Item value="name">Name</Select.Item>
          <Select.Item value="size">Bundle size</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
    <Button size="m" variant="secondary">
      <Icon name="filter_list" />
      Filter
    </Button>
    <Button size="m">
      <Icon name="add" />
      New
    </Button>
  </div>
);

/** Selection, as a row of chips beside the badges that are not selectable. */
const Filters = () => {
  const [on, setOn] = React.useState<string[]>(['Components']);

  return (
    <div className={css.row}>
      {FILTERS.map(name => (
        <Chip
          key={name}
          selected={on.includes(name)}
          onClick={() =>
            setOn(list => (list.includes(name) ? list.filter(x => x !== name) : [...list, name]))
          }
          onRemove={
            on.includes(name) ? () => setOn(list => list.filter(x => x !== name)) : undefined
          }
        >
          {name}
        </Chip>
      ))}
      <Separator orientation="vertical" />
      <Badge tone="success">Passing</Badge>
      <Badge tone="warning">2 warnings</Badge>
      <Badge>v0.0.1</Badge>
    </div>
  );
};

/** A card holding the things a card usually holds, at the sizes it holds them. */
const Panel = () => (
  <Card.Root elevation="outlined">
    <Card.Header>
      <div className={css.row}>
        <Avatar.Root size="m">
          <Avatar.Fallback>MH</Avatar.Fallback>
        </Avatar.Root>
        <div className={css.stack}>
          <Card.Title>components-react</Card.Title>
          <Card.Description>Twenty-three components, one stylesheet each.</Card.Description>
        </div>
      </div>
    </Card.Header>
    <Card.Body>
      <Alert.Root tone="accent">
        <Alert.Icon />
        <Alert.Body>
          <Alert.Description>
            Every surface, border and glyph on this page reads the same tokens the dials rewrite.
          </Alert.Description>
        </Alert.Body>
      </Alert.Root>
    </Card.Body>
    <Card.Footer>
      <Button size="s" variant="ghost">
        Discard
      </Button>
      <Button size="s">Publish</Button>
    </Card.Footer>
  </Card.Root>
);

/** A form, which is where labels, controls and their submit line up or do not. */
const Form = () => (
  <Card.Root elevation="outlined">
    <Card.Body>
      <div className={css.form}>
        <Field.Root required>
          <Field.Label>Package name</Field.Label>
          <Field.Control>{props => <Input {...props} placeholder="@scope/name" />}</Field.Control>
          <Field.Description>Lowercase, no spaces.</Field.Description>
        </Field.Root>

        <Field.Root invalid>
          <Field.Label>Version</Field.Label>
          <Field.Control>{props => <Input {...props} defaultValue="0.0" />}</Field.Control>
          <Field.Error>Needs three parts, like 0.1.0.</Field.Error>
        </Field.Root>

        <div className={css.checks}>
          <Checkbox defaultChecked>Ship a changelog</Checkbox>
          <div className={css.row}>
            <Switch defaultChecked aria-labelledby="notify" />
            <Text as="span" id="notify" size={4}>
              Notify watchers
            </Text>
          </div>
        </div>

        <Separator />

        <div className={css.actions}>
          <Button variant="ghost">Cancel</Button>
          <Button loading>Publishing</Button>
        </div>
      </div>
    </Card.Body>
  </Card.Root>
);

/** Every button, so four variants and three sizes can be judged against each other. */
const Buttons = () => (
  <div className={css.stack}>
    {(['l', 'm', 's'] as const).map(size => (
      <div key={size} className={css.row}>
        <Button size={size}>Publish</Button>
        <Button size={size} variant="secondary">
          <Icon name="download" />
          Export
        </Button>
        <Button size={size} variant="ghost">
          Preview
        </Button>
        <Button size={size} variant="danger">
          Delete
        </Button>
        <Button size={size} variant="secondary" iconOnly aria-label="More">
          <Icon name="more_horiz" />
        </Button>
      </div>
    ))}
  </div>
);

/*
 * ============================================
 * Page
 * ============================================
 */

/**
 * Everything at once, so the dials can be judged on a screen rather than on a swatch.
 *
 * The component pages answer "what does this do"; none of them answers "do these
 * agree with each other", which is the question a radius or an accent is actually
 * settled by. A row of controls that share a height scale, a card holding a card's
 * worth of content, a form with its submit — these are where a value that looked
 * fine alone stops looking fine.
 *
 * Deliberately not a list of every component. A gallery of one of everything is
 * another index, and the point here is composition.
 */
export default function PlaygroundContent() {
  return (
    <Page
      eyebrow="Overview"
      title="Playground"
      lede="The components in the arrangements they are used in. Turn a dial in the bar above and judge the result here, where things sit next to each other, rather than on a page that shows one component at a time."
    >
      <section className={css.board}>
        <Heading level={2} size={4}>
          A row of controls
        </Heading>
        <Toolbar />
        <Filters />

        <Heading level={2} size={4}>
          Panels
        </Heading>
        <div className={css.grid}>
          <Panel />
          <Form />
        </div>

        <Heading level={2} size={4}>
          Every button
        </Heading>
        <Buttons />
      </section>
    </Page>
  );
}
