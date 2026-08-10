'use client';

import { Button } from '@minuk-hwang-design-system/components-react/button';
import { Icon } from '@minuk-hwang-design-system/components-react/icon';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, PropsTable, Prose, Section } from '../../../site/Preview';

export default function ButtonPage() {
  return (
    <Page
      eyebrow="Actions"
      title="Button"
      lede="Four variants and three sizes, on top of the headless button in base-react. Press handling and the keyboard contract come from that layer, so this one is only appearance."
    >
      <Preview
        title="variant"
        code={`<Button variant="primary">Publish</Button>
<Button variant="secondary">Save draft</Button>
<Button variant="ghost">Preview</Button>
<Button variant="danger">Delete</Button>`}
      >
        <Button variant="primary">Publish</Button>
        <Button variant="secondary">Save draft</Button>
        <Button variant="ghost">Preview</Button>
        <Button variant="danger">Delete</Button>
      </Preview>

      <Prose>
        <p>
          <code>primary</code> is the one action a screen is about — at most one per view.{' '}
          <code>secondary</code> is every other real action, <code>ghost</code> is for toolbars and
          card corners, <code>danger</code> is for deleting.
        </p>
      </Prose>

      <Preview
        title="size"
        code={`<Button size="s">Small</Button>
<Button size="m">Medium</Button>
<Button size="l">Large</Button>`}
      >
        <Button size="s">Small</Button>
        <Button size="m">Medium</Button>
        <Button size="l">Large</Button>
      </Preview>

      <Prose>
        <p>
          Heights are fixed at 40, 48 and 56px, and <code>Input</code> and <code>Select</code> use
          the same three — a text field and its submit sit on one line without either being nudged.
        </p>
      </Prose>

      <Preview
        title="icons are children"
        code={`<Button>
  <Icon name="add" size={18} />
  Create
</Button>

<Button variant="secondary">
  Export
  <Icon name="download" size={18} />
</Button>

<Button variant="ghost" iconOnly aria-label="More">
  <Icon name="more_horiz" />
</Button>`}
      >
        <Button>
          <Icon name="add" size={18} />
          Create
        </Button>
        <Button variant="secondary">
          Export
          <Icon name="download" size={18} />
        </Button>
        <Button variant="ghost" iconOnly aria-label="More">
          <Icon name="more_horiz" />
        </Button>
      </Preview>

      <Callout tone="warning">
        <p>
          <code>iconOnly</code> squares the button but does not name it. Pass{' '}
          <code>aria-label</code>, or a screen reader has nothing to read.
        </p>
      </Callout>

      <Preview
        title="state"
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

      <Prose>
        <p>
          <code>loading</code> swaps the label for a spinner, blocks interaction and sets{' '}
          <code>aria-busy</code>. Separate from <code>disabled</code>: one means &ldquo;wait&rdquo;,
          the other &ldquo;not available&rdquo;.
        </p>
      </Prose>

      <Preview
        title="rendering as something else"
        code={`// Same appearance, same keyboard contract, different element.
<Button as="a" href="/tokens/colour" variant="secondary">
  Read the colour tokens
</Button>`}
      >
        <Button as="a" href="/tokens/colour" variant="secondary">
          Read the colour tokens
        </Button>
      </Preview>

      <Prose>
        <p>
          A link that looks like a button is still a link — it belongs in the tab order, opens in a
          new tab on a modified click, and should not answer the space bar. The base layer keeps
          that true.
        </p>
      </Prose>

      <Section title="Props">
        <PropsTable
          rows={[
            {
              name: 'variant',
              type: `'primary' | 'secondary' | 'ghost' | 'danger'`,
              default: `'primary'`,
              description: 'What the button is for, not what colour it is.',
            },
            {
              name: 'size',
              type: `'s' | 'm' | 'l'`,
              default: `'m'`,
              description: '40, 48 or 56px tall. Shared with Input and Select.',
            },
            {
              name: 'block',
              type: 'boolean',
              default: 'false',
              description:
                'Fills the container. Off by default — a button is as wide as its label.',
            },
            {
              name: 'iconOnly',
              type: 'boolean',
              default: 'false',
              description: 'Square. Needs an aria-label, since there is no text to read.',
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
