'use client';

import { Button } from '@minuk-hwang-design-system/components-react/button';
import { DropdownMenu } from '@minuk-hwang-design-system/components-react/dropdown-menu';
import { Icon } from '@minuk-hwang-design-system/components-react/icon';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, PartsList, Preview, PropsTable, Prose } from '../../../site/Preview';

export default function DropdownMenuPage() {
  const [tag, setTag] = React.useState('latest');
  const [dryRun, setDryRun] = React.useState(true);

  return (
    <Page
      eyebrow="Overlays"
      title="Dropdown menu"
      lede="Actions from a trigger. A menu is not a styled list — it has roving focus, typeahead, and a role a screen reader recognises."
    >
      <Preview
        title="open it, then type 'un'"
        code={`<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild>
    <Button variant="secondary">Actions</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item>Rename</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item destructive>Unpublish</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>`}
      >
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="secondary">
              Actions
              <Icon name="expand_more" size={18} />
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
        Open the menu and start typing — focus jumps to the matching item. Typeahead, arrow keys,
        Escape and outside-click dismissal all come from the base layer, and all of them are things
        a hand-rolled menu ships without.
      </Callout>

      <Preview
        title="checkbox and radio items"
        code={`<DropdownMenu.CheckboxItem checked={dryRun} onCheckedChange={setDryRun}>
  Dry run
</DropdownMenu.CheckboxItem>

<DropdownMenu.RadioGroup value={tag} onValueChange={setTag}>
  <DropdownMenu.RadioItem value="latest">latest</DropdownMenu.RadioItem>
</DropdownMenu.RadioGroup>`}
      >
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="secondary">
              Publish options
              <Icon name="expand_more" size={18} />
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

      <Prose>
        <p>
          Plain items sit flush; checkbox and radio items keep a gutter for the indicator, so a list
          of options does not shift sideways when one becomes selected.
        </p>
        <p>
          Highlighting is driven by <code>data-highlighted</code>, which the base layer sets for
          both pointer and keyboard. Styling <code>:hover</code> instead is the bug where arrowing
          through a menu highlights nothing until you touch the mouse.
        </p>
      </Prose>

      <Callout tone="warning">
        <code>destructive</code> tints a row red. Colour alone does not carry that meaning — the
        label still has to say &ldquo;Unpublish&rdquo;.
      </Callout>

      <section>
        <h2>Parts</h2>
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
      </section>

      <section>
        <h2>Props</h2>
        <PropsTable
          rows={[
            {
              name: 'destructive',
              type: 'boolean',
              default: 'false',
              description: 'On Item. Tints the row; the label still carries the meaning.',
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
      </section>
    </Page>
  );
}
