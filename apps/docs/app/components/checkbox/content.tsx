'use client';

import { Checkbox } from '@minuk-hwang-design-system/components-react/checkbox';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, PropsTable, Section } from '../../../site/Preview';

const CHILDREN = ['Color', 'Spacing', 'Shadow'];

export default function CheckboxPage() {
  const [checked, setChecked] = React.useState<string[]>(['Color']);

  const all = checked.length === CHILDREN.length;
  const some = checked.length > 0 && !all;

  return (
    <Page
      eyebrow="Forms"
      title="Checkbox"
      lede="Any number of a set. Square, because that shape is what tells a user the choices are not exclusive. They read the shape before the label."
    >
      <Preview
        title="Indeterminate"
        description='Pass checked="indeterminate" for the mixed state. Toggle the children below to see it.'
        stack
        code={`<Checkbox
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
      onCheckedChange={value =>
        setChecked(current =>
          value ? [...current, name] : current.filter(n => n !== name)
        )
      }
    >
      {name}
    </Checkbox>
  ))}
</div>`}
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
        it as <code>aria-checked=&quot;mixed&quot;</code>, which tells a screen reader user that
        toggling it affects several things at once.
      </Callout>

      <Preview
        title="State"
        description="On, off, and either of those with disabled."
        stack
        code={`<Checkbox defaultChecked>Run tests before publishing</Checkbox>
<Checkbox>Include prerelease tags</Checkbox>
<Checkbox disabled>Sign with GPG</Checkbox>
<Checkbox disabled defaultChecked>Publish provenance</Checkbox>`}
      >
        <Checkbox defaultChecked>Run tests before publishing</Checkbox>
        <Checkbox>Include prerelease tags</Checkbox>
        <Checkbox disabled>Sign with GPG</Checkbox>
        <Checkbox disabled defaultChecked>
          Publish provenance
        </Checkbox>
      </Preview>

      <Preview
        title="Label"
        description="Children give the box a label and the association between them. Omit them for the box alone, when something else does the labelling."
        stack
        code={`<Checkbox defaultChecked>Run tests before publishing</Checkbox>
<Checkbox defaultChecked />`}
      >
        <Checkbox defaultChecked>Run tests before publishing</Checkbox>
        <Checkbox defaultChecked />
      </Preview>

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
              description: `Fires on every tick. Clicking a mixed box emits true, never 'indeterminate'.`,
            },
            {
              name: 'children',
              type: 'ReactNode',
              description: 'Label text. Omit to render the box alone.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'Blocks the tick and dims the box, in any state.',
            },
          ]}
        />
      </Section>
    </Page>
  );
}
