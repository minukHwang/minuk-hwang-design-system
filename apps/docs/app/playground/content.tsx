'use client';

import { Accordion } from '@minuk-hwang-design-system/components-react/accordion';
import { Alert } from '@minuk-hwang-design-system/components-react/alert';
import { Avatar } from '@minuk-hwang-design-system/components-react/avatar';
import { Badge } from '@minuk-hwang-design-system/components-react/badge';
import { Button } from '@minuk-hwang-design-system/components-react/button';
import { Card } from '@minuk-hwang-design-system/components-react/card';
import { Checkbox } from '@minuk-hwang-design-system/components-react/checkbox';
import { Chip } from '@minuk-hwang-design-system/components-react/chip';
import { Dialog } from '@minuk-hwang-design-system/components-react/dialog';
import { DropdownMenu } from '@minuk-hwang-design-system/components-react/dropdown-menu';
import { Field } from '@minuk-hwang-design-system/components-react/field';
import { Heading } from '@minuk-hwang-design-system/components-react/heading';
import { Icon } from '@minuk-hwang-design-system/components-react/icon';
import { Input, Textarea } from '@minuk-hwang-design-system/components-react/input';
import { Popover } from '@minuk-hwang-design-system/components-react/popover';
import { RadioGroup } from '@minuk-hwang-design-system/components-react/radio-group';
import { Select } from '@minuk-hwang-design-system/components-react/select';
import { Separator } from '@minuk-hwang-design-system/components-react/separator';
import { Spinner } from '@minuk-hwang-design-system/components-react/spinner';
import { Switch } from '@minuk-hwang-design-system/components-react/switch';
import { Tabs } from '@minuk-hwang-design-system/components-react/tabs';
import { Text } from '@minuk-hwang-design-system/components-react/text';
import { Tooltip } from '@minuk-hwang-design-system/components-react/tooltip';
import * as React from 'react';

import { Page } from '../../site/Page';
import css from '../../site/playground.module.css';

/*
 * ============================================
 * Data
 * ============================================
 */

const MAINTAINER =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=faces';

const TAGS = ['tokens', 'a11y', 'breaking', 'internal'] as const;

const FILES = [
  ['dist/index.css', '18.4 KB', 'changed'],
  ['dist/index.js', '42.1 KB', 'changed'],
  ['dist/index.d.ts', '9.8 KB', null],
  ['dist/tailwind.css', '21.0 KB', 'new'],
  ['package.json', '1.2 KB', null],
] as const;

const CHANGELOG = [
  [
    'breaking',
    'surface is now background',
    'The group that names a level was called surface, which is also what a card is. Every reference moves to background, and fill keeps the panels that are not levels.',
  ],
  [
    'added',
    'A neutral tone, built like the other five',
    'A gray badge and a gray button now read neutral.surface and neutral.onNormal the way a red one reads its own. The label on a solid fill is measured, not chosen.',
  ],
  [
    'fixed',
    'Disabled controls were at 12% opacity',
    'Six components set their own value, which put disabled text at 1.27:1. There is one token now, at 38%.',
  ],
] as const;

/*
 * ============================================
 * Masthead
 * ============================================
 */

/**
 * The bar a product page opens with: who owns the thing, what state it is in, and
 * the one action the page is for.
 *
 * Everything on the right is an overlay of some kind — two tooltips, a menu and a
 * dialog — because that is the row where a design system usually starts
 * disagreeing with itself about where a floating surface sits and how dark it is.
 */
const Masthead = () => (
  <div className={css.masthead}>
    <Avatar.Root size="l">
      <Avatar.Image src={MAINTAINER} alt="" />
      <Avatar.Fallback>MH</Avatar.Fallback>
    </Avatar.Root>

    <div className={css.mastheadText}>
      <div className={css.row}>
        <Heading level={2} size={5}>
          style-tokens
        </Heading>
        <Badge tone="success">Passing</Badge>
        <Badge variant="outline">v1.0.0</Badge>
      </div>
      <Text size={4} leading="reading" color="assistive">
        Color, spacing, type, shadow and motion, in four consumption formats from one source.
      </Text>
    </div>

    <div className={css.mastheadActions}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button variant="ghost" iconOnly aria-label="Copy install command">
            <Icon name="content_copy" />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          Copy install command
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Root>

      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button variant="ghost" iconOnly aria-label="Open repository">
            <Icon name="open_in_new" />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          Open repository
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Root>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline" iconOnly aria-label="More actions">
            <Icon name="more_horiz" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Label>Package</DropdownMenu.Label>
          <DropdownMenu.Item>Rename</DropdownMenu.Item>
          <DropdownMenu.Item>Deprecate</DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>Transfer to…</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item>Another user</DropdownMenu.Item>
              <DropdownMenu.Item>An organisation</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
          <DropdownMenu.Separator />
          <DropdownMenu.Item destructive>Unpublish</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <PublishDialog />
    </div>
  </div>
);

/** The page's one primary action, and the only thing on it that is modal. */
const PublishDialog = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <Button>
        <Icon name="publish" />
        Publish
      </Button>
    </Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Publish style-tokens?</Dialog.Title>
        <Dialog.Description>
          This uploads 0.1.0 to the public npm registry. Published versions cannot be replaced.
        </Dialog.Description>
      </Dialog.Header>
      <Dialog.Body>
        <Alert.Root tone="warning">
          <Alert.Icon />
          <Alert.Body>
            <Alert.Description>
              Two packages depend on this one at workspace:^ and will need rebuilding.
            </Alert.Description>
          </Alert.Body>
        </Alert.Root>
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close asChild>
          <Button variant="secondary">Cancel</Button>
        </Dialog.Close>
        <Dialog.Close asChild>
          <Button>Publish</Button>
        </Dialog.Close>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
);

/*
 * ============================================
 * Overview
 * ============================================
 */

const STATS = [
  ['Bundle', '18.4 KB', 'gzipped, all four formats'],
  ['Components', '23', 'one stylesheet each'],
  ['Contrast', 'AA', 'measured, not chosen'],
] as const;

/**
 * Three cards of the same shape, which is where a corner or a border that looked
 * fine on one card stops looking fine.
 *
 * Outlined, like every other card here. `elevated` is a real variant and the Card
 * page demonstrates it; three shadows in a row read as clutter rather than as
 * height, and this page is meant to look like a screen someone shipped.
 */
const Overview = () => (
  <div className={css.stack}>
    <div className={css.stats}>
      {STATS.map(([label, value, note]) => (
        <Card.Root key={label} elevation="outlined">
          <Card.Body>
            <Text size={2} color="assistive">
              {label}
            </Text>
            <Heading level={3} size={4}>
              {value}
            </Heading>
            <Text size={3} color="assistive">
              {note}
            </Text>
          </Card.Body>
        </Card.Root>
      ))}
    </div>

    <Card.Root elevation="outlined">
      <Card.Header>
        <Card.Title>What changed</Card.Title>
        <Card.Description>Three entries since 1.0.0.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Accordion.Root type="single" collapsible defaultValue="0" className={css.full}>
          {CHANGELOG.map(([kind, title, body], index) => (
            <Accordion.Item key={title} value={String(index)}>
              <Accordion.Trigger>
                <span className={css.entry}>
                  <Badge size="s" tone={kind === 'breaking' ? 'error' : 'neutral'}>
                    {kind}
                  </Badge>
                  {/* Its own element so the badge stays beside the block of text
                      rather than sitting on its first line. */}
                  <span className={css.entryTitle}>{title}</span>
                </span>
              </Accordion.Trigger>
              <Accordion.Content>{body}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Card.Body>
    </Card.Root>
  </div>
);

/*
 * ============================================
 * Files
 * ============================================
 */

/**
 * The row of controls, and then a list of things those controls act on.
 *
 * Button, Input and Select share one height scale, and any drift between them
 * shows on this line before it shows anywhere else.
 */
const Files = () => {
  const [tags, setTags] = React.useState<string[]>(['tokens']);

  const toggle = (tag: string) =>
    setTags(list => (list.includes(tag) ? list.filter(x => x !== tag) : [...list, tag]));

  return (
    <div className={css.stack}>
      <div className={css.row}>
        <Input size="m" placeholder="Filter files" className={css.grow} />
        <Select.Root defaultValue="size">
          <Select.Trigger size="m" className={css.select} aria-label="Sort by">
            <Select.Value />
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              <Select.Label>Sort by</Select.Label>
              <Select.Item value="size">Bundle size</Select.Item>
              <Select.Item value="name">Name</Select.Item>
              <Select.Item value="updated">Recently updated</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>

        <Popover.Root>
          <Popover.Trigger asChild>
            <Button size="m" variant="outline">
              <Icon name="filter_list" />
              Filter
            </Button>
          </Popover.Trigger>
          <Popover.Content>
            <div className={css.popoverBody}>
              <Text size={2} color="assistive">
                Show only
              </Text>
              <Checkbox defaultChecked>Changed in this release</Checkbox>
              <Checkbox>Generated files</Checkbox>
              <Separator />
              <Popover.Close asChild>
                <Button size="s" variant="secondary" fullWidth>
                  Done
                </Button>
              </Popover.Close>
            </div>
            <Popover.Arrow />
          </Popover.Content>
        </Popover.Root>
      </div>

      <div className={css.row}>
        {TAGS.map(tag => (
          <Chip
            key={tag}
            selected={tags.includes(tag)}
            onClick={() => toggle(tag)}
            onRemove={tags.includes(tag) ? () => toggle(tag) : undefined}
          >
            {tag}
          </Chip>
        ))}
      </div>

      <Card.Root elevation="outlined">
        <Card.Body className={css.fileList}>
          {FILES.map(([name, size, state], index) => (
            <React.Fragment key={name}>
              {index > 0 && <Separator />}
              <div className={css.fileRow}>
                <Checkbox defaultChecked={state !== null}>{name}</Checkbox>
                <div className={css.row}>
                  {state && (
                    <Badge size="s" tone={state === 'new' ? 'success' : 'accent'}>
                      {state}
                    </Badge>
                  )}
                  <Text size={2} color="assistive">
                    {size}
                  </Text>
                </div>
              </div>
            </React.Fragment>
          ))}
        </Card.Body>
        <Card.Footer align="end">
          <span className={css.loading}>
            <Spinner size={14} />
            <Text size={2} color="assistive">
              Checking 12 more
            </Text>
          </span>
        </Card.Footer>
      </Card.Root>
    </div>
  );
};

/*
 * ============================================
 * Settings
 * ============================================
 */

/** A form, which is where labels, controls and their submit line up or do not. */
const Settings = () => (
  <Card.Root elevation="outlined">
    <Card.Body>
      <div className={css.form}>
        <Field.Root required>
          <Field.Label>Package name</Field.Label>
          <Field.Control>
            {props => <Input {...props} defaultValue="@minuk-hwang-design-system/style-tokens" />}
          </Field.Control>
          <Field.Description>Lowercase, no spaces.</Field.Description>
        </Field.Root>

        <Field.Root invalid>
          <Field.Label>Version</Field.Label>
          <Field.Control>{props => <Input {...props} defaultValue="0.0" />}</Field.Control>
          <Field.Error>Needs three parts, like 0.1.0.</Field.Error>
        </Field.Root>

        <Field.Root>
          <Field.Label>Access</Field.Label>
          <Field.Control>
            {props => (
              <Select.Root defaultValue="public">
                <Select.Trigger {...props}>
                  <Select.Value />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="public">Public</Select.Item>
                  <Select.Item value="restricted">Restricted</Select.Item>
                </Select.Content>
              </Select.Root>
            )}
          </Field.Control>
          <Field.Description>Public packages cannot be made private later.</Field.Description>
        </Field.Root>

        {/*
          Not a Field. Field.Label points at a single control by id, and a radio
          group is not one — the id would dangle and the label would name
          nothing. A group names itself, which is what aria-labelledby is for.
        */}
        <div className={css.group}>
          <Text as="span" id="release-type" size={4} weight="medium">
            Release type
          </Text>
          <RadioGroup.Root defaultValue="minor" aria-labelledby="release-type">
            <RadioGroup.Item value="patch">Patch: bug fixes only</RadioGroup.Item>
            <RadioGroup.Item value="minor">Minor: new tokens, nothing removed</RadioGroup.Item>
            <RadioGroup.Item value="major">Major: a token was renamed</RadioGroup.Item>
          </RadioGroup.Root>
        </div>

        <Field.Root>
          <Field.Label>Release notes</Field.Label>
          <Field.Control>
            {props => (
              <Textarea {...props} defaultValue="Splits shadows into geometry and per-theme ink." />
            )}
          </Field.Control>
          <Field.Description>Markdown. Shown on the npm page.</Field.Description>
        </Field.Root>

        <Separator />

        <div className={css.checks}>
          <Switch defaultChecked>Notify watchers</Switch>
          <Switch>Tag as latest</Switch>
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

/*
 * ============================================
 * Page
 * ============================================
 */

/**
 * One screen, rather than a gallery of one of everything.
 *
 * The component pages answer "what does this do"; none of them answers "do these
 * agree with each other", which is the question a radius or an accent is actually
 * settled by. A masthead whose overlays all have to sit at the same height, three
 * cards of one shape, a toolbar whose controls share a height scale, a form with
 * its submit — these are where a value that looked fine alone stops looking fine.
 *
 * Every component in the library appears once, and each one is doing the job it
 * would be doing in a real screen rather than standing in a row of its own
 * variants.
 *
 * One `Tooltip.Provider` around the lot, which is where it belongs: it shares the
 * open delay, so a row of icon buttons does not each run its own.
 */
export default function PlaygroundContent() {
  return (
    <Page
      eyebrow="Overview"
      title="Example"
      lede="One screen built out of the whole library. Turn a dial in the bar above and judge the result here, where things sit next to each other, rather than on a page that shows one component at a time."
    >
      <Tooltip.Provider>
        <section className={css.board}>
          <Masthead />

          <Alert.Root tone="accent">
            <Alert.Icon />
            <Alert.Body>
              <Alert.Title>Every surface here reads the tokens the dials rewrite</Alert.Title>
              {/*
                `leading` reaches through the part, which is the thing worth
                showing here: this page is a consumer of the system rather than
                a specimen of it, and a two-line alert body is a paragraph.
              */}
              <Alert.Description leading="reading">
                Nothing on this page paints itself. Change the accent, the gray, the radius or the
                theme and everything below follows.
              </Alert.Description>
            </Alert.Body>
            <Alert.Action>
              <Button size="s" variant="outline">
                Tokens
              </Button>
            </Alert.Action>
          </Alert.Root>

          <Tabs.Root defaultValue="overview">
            <Tabs.List>
              <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
              <Tabs.Trigger value="files">Files</Tabs.Trigger>
              <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
              <Tabs.Trigger value="audit" disabled>
                Audit
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Panel value="overview">
              <Overview />
            </Tabs.Panel>
            <Tabs.Panel value="files">
              <Files />
            </Tabs.Panel>
            <Tabs.Panel value="settings">
              <Settings />
            </Tabs.Panel>
          </Tabs.Root>
        </section>
      </Tooltip.Provider>
    </Page>
  );
}
