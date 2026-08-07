'use client';

import { Icon } from '@minuk-hwang-design-system/components-react/icon';
import { Text } from '@minuk-hwang-design-system/components-react/text';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, PropsTable, Prose } from '../../../site/Preview';

const NAMES = [
  'search',
  'close',
  'check',
  'add',
  'delete',
  'settings',
  'expand_more',
  'chevron_right',
  'info',
  'warning',
  'error',
  'more_horiz',
];

export default function IconPage() {
  return (
    <Page
      eyebrow="Primitives"
      title="Icon"
      lede="A Material Symbols glyph. The font arrives with the token stylesheet, so there is nothing to install and no sprite sheet to keep in sync."
    >
      <Preview
        title="names"
        code={`<Icon name="search" />
<Icon name="chevron_right" size={16} />`}
      >
        {NAMES.map(name => (
          <span
            key={name}
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              width: 92,
            }}
          >
            <Icon name={name} size={24} />
            <Text as="span" size="footnote" color="assistive">
              {name}
            </Text>
          </span>
        ))}
      </Preview>

      <Preview
        title="size follows the type scale"
        code={`<Icon name="settings" size={14} />
<Icon name="settings" size={20} />
<Icon name="settings" size={24} />`}
      >
        {[14, 16, 18, 20, 24].map(size => (
          <Icon key={size} name="settings" size={size as 14} />
        ))}
      </Preview>

      <Prose>
        <p>
          Sizes match the type steps so an icon beside 14px text can be told to be 14px. The glyph
          is laid out as <code>inline-flex</code> rather than inline text, which is what keeps it on
          the same baseline instead of a couple of pixels low.
        </p>
      </Prose>

      <Callout>
        Without <code>label</code> the icon is hidden from screen readers, and that is the right
        default — most icons sit next to the words they illustrate, and announcing both makes the
        interface read like it stutters. Pass <code>label</code> only when the icon is the only
        thing saying what something is.
      </Callout>

      <section>
        <h2>Props</h2>
        <PropsTable
          rows={[
            {
              name: 'name',
              type: 'string',
              description: 'Material Symbols name, e.g. chevron_right.',
            },
            {
              name: 'size',
              type: '14 | 16 | 18 | 20 | 24',
              default: '20',
              description: 'Matches the type scale.',
            },
            {
              name: 'color',
              type: 'TextColor',
              default: `'normal'`,
              description: 'Same semantic roles as Text.',
            },
            {
              name: 'label',
              type: 'string',
              description: 'Description for assistive tech. Omit when decorative.',
            },
          ]}
        />
      </section>
    </Page>
  );
}
