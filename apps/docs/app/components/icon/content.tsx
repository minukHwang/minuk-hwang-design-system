'use client';

import { Icon } from '@minuk-hwang-design-system/components-react/icon';
import { Text } from '@minuk-hwang-design-system/components-react/text';
import * as React from 'react';

import { Page } from '../../../site/Page';
import { Callout, Preview, PropsTable, Section } from '../../../site/Preview';

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
        title="Names"
        description="Use name with any Material Symbols name."
        code={`<Icon name="search" size={24} />
<Icon name="close" size={24} />
<Icon name="check" size={24} />
<Icon name="add" size={24} />
<Icon name="delete" size={24} />
<Icon name="settings" size={24} />
<Icon name="expand_more" size={24} />
<Icon name="chevron_right" size={24} />
<Icon name="info" size={24} />
<Icon name="warning" size={24} />
<Icon name="error" size={24} />
<Icon name="more_horiz" size={24} />`}
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
            <Text as="span" size={2} color="assistive">
              {name}
            </Text>
          </span>
        ))}
      </Preview>

      <Preview
        title="Size"
        description="Use size to match the text beside it. The five sizes are type steps, so an icon next to 14px text can be told to be 14px."
        code={`<Icon name="settings" size={14} />
<Icon name="settings" size={16} />
<Icon name="settings" size={18} />
<Icon name="settings" size={20} />
<Icon name="settings" size={24} />`}
      >
        {[14, 16, 18, 20, 24].map(size => (
          <Icon key={size} name="settings" size={size as 14} />
        ))}
      </Preview>

      <Callout>
        Without <code>label</code> the icon is hidden from screen readers, which is the right
        default: most icons sit next to the words they illustrate. Pass <code>label</code> only when
        the icon is the only thing saying what something is.
      </Callout>

      <Section title="Props">
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
              default: '—',
              description:
                'Matches the type scale. Left off, the glyph takes the size its container asked for, which is 20 on a page and 16, 18 or 20 inside a small, medium or large Button.',
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
      </Section>
    </Page>
  );
}
