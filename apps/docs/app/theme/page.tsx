import type { Metadata } from 'next';
import * as React from 'react';

import Content from './content';

export const metadata: Metadata = {
  title: 'Theme',
  description:
    'One accent and one radius dial, set on an ancestor. Twenty-two components change and none of them is rebuilt.',
};

export default function Page() {
  return <Content />;
}
