'use client';

import { Button } from '@minuk-hwang-design-system/components-react/button';
import { DropdownMenu } from '@minuk-hwang-design-system/components-react/dropdown-menu';
import { Icon } from '@minuk-hwang-design-system/components-react/icon';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, PartsList, Preview, PropsTable, Section } from '../../../site/Preview';

export default function DropdownMenuPage() {
  const [tag, setTag] = React.useState('latest');
  const [dryRun, setDryRun] = React.useState(true);

  return (
    <Page
      eyebrow="Overlays"
      title="Dropdown menu"
      lede="Actions from a trigger. A menu is not a styled list: it has roving focus, typeahead, and a role a screen reader recognises."
    >
      <Preview
        title="Basic"
        description="Open it and start typing. Focus jumps to the matching item."
        code={`<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild>
    <Button variant="secondary">
      Actions
      <Icon name="expand_more" />
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
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
</DropdownMenu.Root>`}
      >
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="secondary">
              Actions
              <Icon name="expand_more" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
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
      </Preview>

      <Callout>
        Typeahead, arrow keys, Escape and outside-click dismissal all come from the base layer. All
        of them are things a hand-rolled menu ships without.
      </Callout>

      <Preview
        title="Checkbox and radio items"
        description="These keep a gutter for the indicator, so the list does not shift sideways when one becomes selected."
        code={`<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild>
    <Button variant="secondary">
      Publish options
      <Icon name="expand_more" />
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.CheckboxItem checked={dryRun} onCheckedChange={setDryRun}>
      Dry run
    </DropdownMenu.CheckboxItem>
    <DropdownMenu.Separator />
    <DropdownMenu.Label>Tag</DropdownMenu.Label>
    <DropdownMenu.RadioGroup value={tag} onValueChange={setTag}>
      <DropdownMenu.RadioItem value="latest">latest</DropdownMenu.RadioItem>
      <DropdownMenu.RadioItem value="next">next</DropdownMenu.RadioItem>
      <DropdownMenu.RadioItem value="canary">canary</DropdownMenu.RadioItem>
    </DropdownMenu.RadioGroup>
  </DropdownMenu.Content>
</DropdownMenu.Root>`}
      >
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="secondary">
              Publish options
              <Icon name="expand_more" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.CheckboxItem checked={dryRun} onCheckedChange={setDryRun}>
              Dry run
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.Separator />
            <DropdownMenu.Label>Tag</DropdownMenu.Label>
            <DropdownMenu.RadioGroup value={tag} onValueChange={setTag}>
              <DropdownMenu.RadioItem value="latest">latest</DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem value="next">next</DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem value="canary">canary</DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Preview>

      <Callout tone="warning">
        <code>destructive</code> gives a row a red label, and fills it red once it is highlighted.
        Color alone does not carry that meaning, so the label still has to say
        &ldquo;Unpublish&rdquo;.
      </Callout>

      <Section title="Parts">
        <PartsList
          parts={[
            { name: 'DropdownMenu.Root', description: 'Owns the open state.' },
            { name: 'DropdownMenu.Trigger', description: 'Gets role and aria-expanded.' },
            {
              name: 'DropdownMenu.Content',
              description: 'The menu. Portalled, flips near an edge.',
            },
            { name: 'DropdownMenu.Item', description: 'An action.' },
            {
              name: 'DropdownMenu.CheckboxItem',
              description: 'Toggles, with an indicator gutter.',
            },
            { name: 'DropdownMenu.RadioGroup / RadioItem', description: 'One of a set.' },
            { name: 'DropdownMenu.Label', description: 'Group heading. Skipped by the keyboard.' },
            { name: 'DropdownMenu.Separator', description: 'Divider.' },
            { name: 'DropdownMenu.Sub / SubTrigger / SubContent', description: 'Nested menu.' },
          ]}
        />
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            {
              name: 'destructive',
              type: 'boolean',
              default: 'false',
              description:
                'On Item. Red label, filled red when highlighted; the label still carries the meaning.',
            },
            {
              name: 'onSelect',
              type: '(event) => void',
              description: 'On Item. Fires for click and Enter alike.',
            },
            {
              name: 'side / align',
              type: 'string',
              description: 'On Content. Preferred placement.',
            },
          ]}
        />
      </Section>
    </Page>
  );
}
