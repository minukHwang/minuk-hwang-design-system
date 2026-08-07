'use client';

import { Button } from '@minuk-hwang-design-system/components-react/button';
import { Icon } from '@minuk-hwang-design-system/components-react/icon';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, PropsTable, Prose } from '../../../site/Preview';

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
          <strong>Primary</strong> is the one action a screen is about, so at most one per view —
          two primaries is the interface failing to say which matters. <strong>Secondary</strong> is
          every other real action, <strong>ghost</strong> is for toolbars and card corners where a
          box would be noise, and <strong>danger</strong> is for deleting and nothing else.
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
          Heights are fixed at 40, 48 and 56px so a row of buttons lines up whether or not each one
          holds an icon. The same three heights drive <code>Input</code> and <code>Select</code>,
          which is what lets a text field and its submit sit on one line without either being
          nudged.
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

      <Prose>
        <p>
          The version this replaced took <code>icon</code>, <code>leftSubText</code> and{' '}
          <code>rightSubText</code> as props, which meant a fifth slot needed a sixth prop and the
          order of the slots belonged to the component rather than to the caller. As children, an
          icon goes wherever it is written.
        </p>
      </Prose>

      <Callout tone="warning">
        <code>iconOnly</code> makes the button square but does not give it a name. An icon is not
        text, so a screen reader has nothing to read — pass <code>aria-label</code>.
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
          <code>loading</code> swaps the label for a spinner and blocks interaction, and the base
          layer sets <code>aria-busy</code> so the state is announced rather than only drawn. It is
          separate from <code>disabled</code> on purpose: one means &ldquo;wait&rdquo;, the other
          means &ldquo;not available&rdquo;, and the cursor says which.
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
          A link that looks like a button is still a link — it belongs in the tab order, it opens in
          a new tab on the modified click, and it should not answer the space bar. The base layer
          keeps all of that true for <code>a</code> and <code>div</code> without the styling
          changing.
        </p>
      </Prose>

      <section>
        <h2>Props</h2>
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
      </section>
    </Page>
  );
}
