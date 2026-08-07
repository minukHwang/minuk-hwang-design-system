'use client';

import { Chip } from '@minuk-hwang-design-system/components-react/chip';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, PropsTable, Prose, Section } from '../../../site/Preview';

const FILTERS = ['All', 'Design', 'Engineering', 'Research'];

export default function ChipPage() {
  const [selected, setSelected] = React.useState<string[]>(['Design']);
  const [tags, setTags] = React.useState(['Korean', 'Tokens', 'Radix']);

  const toggle = (name: string) =>
    setSelected(current =>
      current.includes(name) ? current.filter(n => n !== name) : [...current, name]
    );

  return (
    <Page
      eyebrow="Actions"
      title="Chip"
      lede="A pill-shaped control: filters, tags, toggles. Always focusable, which is the line between this and a Badge."
    >
      <Preview
        title="toggling — click them"
        code={`const [selected, setSelected] = useState<string[]>([]);

<Chip selected={selected.includes(name)} onClick={() => toggle(name)}>
  {name}
</Chip>`}
      >
        {FILTERS.map(name => (
          <Chip key={name} selected={selected.includes(name)} onClick={() => toggle(name)}>
            {name}
          </Chip>
        ))}
      </Preview>

      <Prose>
        <p>
          <code>selected</code> becomes <code>aria-pressed</code>, and that attribute is what the
          stylesheet reads. There is no separate visual state to fall out of sync —{' '}
          <strong>a chip cannot look selected while telling a screen reader it is not</strong>.
        </p>
      </Prose>

      <Preview
        title="removable — click the ×"
        code={`<Chip onRemove={() => remove(tag)}>{tag}</Chip>`}
      >
        {tags.length === 0 ? (
          <Chip onClick={() => setTags(['Korean', 'Tokens', 'Radix'])}>Reset</Chip>
        ) : (
          tags.map(tag => (
            <Chip key={tag} selected onRemove={() => setTags(t => t.filter(x => x !== tag))}>
              {tag}
            </Chip>
          ))
        )}
      </Preview>

      <Callout>
        With <code>onRemove</code> the chip holds a second control. Removing a filter and toggling
        it are different actions, and putting both on one element leaves a keyboard user unable to
        reach one of them. Tab to a chip and then again to reach its ×.
      </Callout>

      <Preview title="size" code={`<Chip size="s">Small</Chip>`}>
        <Chip size="s">Small</Chip>
        <Chip size="m">Medium</Chip>
        <Chip size="l">Large</Chip>
        <Chip disabled>Disabled</Chip>
      </Preview>

      <Section title="Props">
        <PropsTable
          rows={[
            {
              name: 'selected',
              type: 'boolean',
              description:
                'Becomes aria-pressed. Present makes this a toggle; absent leaves it a plain button.',
            },
            {
              name: 'onRemove',
              type: '(event) => void',
              description: 'Adds a remove control with its own focus stop.',
            },
            { name: 'size', type: `'s' | 'm' | 'l'`, default: `'m'`, description: '' },
            { name: 'disabled', type: 'boolean', default: 'false', description: '' },
          ]}
        />
      </Section>
    </Page>
  );
}
