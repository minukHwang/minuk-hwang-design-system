'use client';

import { Chip } from '@minuk-hwang-design-system/components-react/chip';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, PropsTable, Section } from '../../../site/Preview';

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
        title="Toggling"
        description="Use selected with onSelectedChange. It becomes aria-pressed, and the stylesheet reads that attribute, so a chip cannot look selected while telling a screen reader it is not."
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

      <Preview
        title="Removable"
        description="Use onRemove to add a dismiss control inside the chip."
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
        it are different actions, so they are different controls. Tab to a chip, then again to reach
        its dismiss button.
      </Callout>

      <Preview
        title="Size"
        description="Two heights, to sit beside small or medium controls."
        code={`<Chip size="s">Small</Chip>`}
      >
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
