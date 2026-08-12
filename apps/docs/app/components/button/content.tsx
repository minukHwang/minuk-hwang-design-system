'use client';

import { Button } from '@minuk-hwang-design-system/components-react/button';
import { Icon } from '@minuk-hwang-design-system/components-react/icon';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, PropsTable, Section } from '../../../site/Preview';
import css from '../../../site/tokens.module.css';

export default function ButtonPage() {
  return (
    <Page
      eyebrow="Actions"
      title="Button"
      lede="Runs an action such as submitting a form or opening a dialog. Press handling and the keyboard contract come from base-react, so this layer is only appearance."
    >
      <Preview
        code={`<Button>
  <Icon name="add" />
  Create
</Button>`}
      >
        <Button>
          <Icon name="add" />
          Create
        </Button>
      </Preview>

      <Preview
        title="Variant"
        description={
          <>
            Use <code>variant</code> to say what the button is for. At most one <code>primary</code>{' '}
            per view.
          </>
        }
        code={`<Button variant="primary">Publish</Button>
<Button variant="secondary">Save draft</Button>
<Button variant="outline">Export</Button>
<Button variant="ghost">Preview</Button>
<Button variant="danger">Delete</Button>`}
      >
        <Button variant="primary">Publish</Button>
        <Button variant="secondary">Save draft</Button>
        <Button variant="outline">Export</Button>
        <Button variant="ghost">Preview</Button>
        <Button variant="danger">Delete</Button>
      </Preview>

      <Preview
        title="Size"
        description={
          <>
            Use <code>size</code> to set the height: 32, 40 or 48px. <code>Input</code> and{' '}
            <code>Select</code> use the same three, so a field and its submit line up.
          </>
        }
        code={`<Button size="s">Small</Button>
<Button size="m">Medium</Button>
<Button size="l">Large</Button>`}
      >
        <Button size="s">Small</Button>
        <Button size="m">Medium</Button>
        <Button size="l">Large</Button>
      </Preview>

      <Preview
        title="Full width"
        description={
          <>
            <code>fullWidth</code> fills the container. Use it where the container is already the
            decision — a form, a sheet, a card — and leave it off in a row, where a button as wide
            as its label is what tells you how much it does.
          </>
        }
        stack
        code={`<Button fullWidth>Continue</Button>
<Button fullWidth variant="secondary">
  <Icon name="download" />
  Export
</Button>`}
      >
        <Button fullWidth>Continue</Button>
        <Button fullWidth variant="secondary">
          <Icon name="download" />
          Export
        </Button>
      </Preview>

      <Preview
        title="With icons"
        description="Nest icons directly inside the button, before or after the label. The size sets the glyph and the gap, and gives the icon's side a few pixels of padding back so it does not read as looser than the other."
        stack
        code={`<Button size="l"><Icon name="add" />Create</Button>
<Button size="l" variant="secondary">Export<Icon name="download" /></Button>
<Button size="l" variant="secondary">No icon</Button>

<Button size="m"><Icon name="add" />Create</Button>
<Button size="m" variant="secondary">Export<Icon name="download" /></Button>
<Button size="m" variant="secondary">No icon</Button>

<Button size="s"><Icon name="add" />Create</Button>
<Button size="s" variant="secondary">Export<Icon name="download" /></Button>
<Button size="s" variant="secondary">No icon</Button>`}
      >
        {(['l', 'm', 's'] as const).map(size => (
          <div key={size} className={css.controlRow}>
            <span className={css.controlRowLabel}>{size}</span>
            <Button size={size}>
              <Icon name="add" />
              Create
            </Button>
            <Button size={size} variant="secondary">
              Export
              <Icon name="download" />
            </Button>
            <Button size={size} variant="secondary">
              No icon
            </Button>
          </div>
        ))}
      </Preview>

      <Preview
        title="Icon only"
        description={
          <>
            Use <code>iconOnly</code> for a square button whose whole content is one icon.
          </>
        }
        code={`<Button variant="ghost" iconOnly aria-label="More">
  <Icon name="more_horiz" />
</Button>
<Button iconOnly aria-label="Add">
  <Icon name="add" />
</Button>
<Button variant="secondary" iconOnly aria-label="Settings">
  <Icon name="settings" />
</Button>`}
      >
        <Button variant="ghost" iconOnly aria-label="More">
          <Icon name="more_horiz" />
        </Button>
        <Button iconOnly aria-label="Add">
          <Icon name="add" />
        </Button>
        <Button variant="secondary" iconOnly aria-label="Settings">
          <Icon name="settings" />
        </Button>
      </Preview>

      <Callout tone="warning">
        <code>iconOnly</code> squares the button but does not name it. Pass <code>aria-label</code>,
        or a screen reader has nothing to read.
      </Callout>

      <Preview
        title="Loading and disabled"
        description={
          <>
            <code>loading</code> swaps the label for a spinner and blocks interaction;{' '}
            <code>disabled</code> means not available. One says wait, the other says no.
          </>
        }
        code={`<Button loading>Publishing</Button>
<Button disabled>Publish</Button>
<Button variant="secondary" disabled>Save draft</Button>`}
      >
        <Button loading>Publishing</Button>
        <Button disabled>Publish</Button>
        <Button variant="secondary" disabled>
          Save draft
        </Button>
      </Preview>

      <Preview
        title="As a link"
        description={
          <>
            Use <code>as=&quot;a&quot;</code> when it navigates. It keeps the tab order, the
            modified click, and the fact that a link ignores the space bar.
          </>
        }
        code={`<Button as="a" href="/tokens/colour" variant="secondary">
  Read the colour tokens
</Button>`}
      >
        <Button as="a" href="/tokens/colour" variant="secondary">
          Read the colour tokens
        </Button>
      </Preview>

      <Section title="Props">
        <PropsTable
          rows={[
            {
              name: 'variant',
              type: `'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'`,
              default: `'primary'`,
              description: 'What the button is for, not what colour it is.',
            },
            {
              name: 'size',
              type: `'s' | 'm' | 'l'`,
              default: `'m'`,
              description: '32, 40 or 48px tall. Shared with Input and Select.',
            },
            {
              name: 'fullWidth',
              type: 'boolean',
              default: 'false',
              description:
                'Fills the container. Off by default, since a button is as wide as its label. Cannot be combined with iconOnly.',
            },
            {
              name: 'iconOnly',
              type: 'boolean',
              default: 'false',
              description:
                'Square. Needs an aria-label, since there is no text to read. Cannot be combined with fullWidth.',
            },
            {
              name: 'loading',
              type: 'boolean',
              default: 'false',
              description: 'Shows a spinner, blocks interaction, sets aria-busy.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'Not available. Distinct from loading, which means not yet.',
            },
            {
              name: 'as',
              type: `'button' | 'a' | 'div'`,
              default: `'button'`,
              description: 'Element to render. Non-button elements get button semantics applied.',
            },
          ]}
        />
      </Section>
    </Page>
  );
}
