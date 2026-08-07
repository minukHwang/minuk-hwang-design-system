'use client';

import { Checkbox } from '@minuk-hwang-design-system/components-react/checkbox';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, PropsTable, Prose, Section } from '../../../site/Preview';

const CHILDREN = ['Colour', 'Spacing', 'Shadow'];

export default function CheckboxPage() {
  const [checked, setChecked] = React.useState<string[]>(['Colour']);

  const all = checked.length === CHILDREN.length;
  const some = checked.length > 0 && !all;

  return (
    <Page
      eyebrow="Forms"
      title="Checkbox"
      lede="Any number of a set. Square, because that shape is what tells a user the choices are not exclusive — they read it before they read the label."
    >
      <Preview
        title="indeterminate — toggle the children"
        stack
        code={`<Checkbox
  checked={all ? true : some ? 'indeterminate' : false}
  onCheckedChange={…}
>
  Regenerate all scales
</Checkbox>`}
      >
        <Checkbox
          checked={all ? true : some ? 'indeterminate' : false}
          onCheckedChange={() => setChecked(all ? [] : CHILDREN)}
        >
          Regenerate all scales
        </Checkbox>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 28 }}>
          {CHILDREN.map(name => (
            <Checkbox
              key={name}
              checked={checked.includes(name)}
              onCheckedChange={(value: boolean | 'indeterminate') =>
                setChecked(current =>
                  value ? [...current, name] : current.filter(n => n !== name)
                )
              }
            >
              {name}
            </Checkbox>
          ))}
        </div>
      </Preview>

      <Callout>
        <code>indeterminate</code> is a real third state, not a visual trick. The base layer reports
        it as <code>aria-checked=&quot;mixed&quot;</code>, which is what tells a screen reader user
        that toggling it will affect several things at once.
      </Callout>

      <Preview title="state" stack code={`<Checkbox disabled>Sign with GPG</Checkbox>`}>
        <Checkbox defaultChecked>Run tests before publishing</Checkbox>
        <Checkbox>Include prerelease tags</Checkbox>
        <Checkbox disabled>Sign with GPG</Checkbox>
        <Checkbox disabled defaultChecked>
          Publish provenance
        </Checkbox>
      </Preview>

      <Prose>
        <p>
          Given <code>children</code> the component renders the row and the label association;
          without them it renders the box alone, for a table cell or a list row that has its own
          label. Either way clicking the label toggles the box.
        </p>
      </Prose>

      <Section title="Props">
        <PropsTable
          rows={[
            {
              name: 'checked',
              type: `boolean | 'indeterminate'`,
              description: 'Controlled state. Indeterminate announces as mixed.',
            },
            { name: 'defaultChecked', type: 'boolean', description: 'Uncontrolled initial state.' },
            {
              name: 'onCheckedChange',
              type: `(checked: boolean | 'indeterminate') => void`,
              description: '',
            },
            {
              name: 'children',
              type: 'ReactNode',
              description: 'Label text. Omit to render the box alone.',
            },
            { name: 'disabled', type: 'boolean', default: 'false', description: '' },
          ]}
        />
      </Section>
    </Page>
  );
}
