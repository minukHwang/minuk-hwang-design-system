import type { Metadata } from 'next';
import * as React from 'react';

import { pageMetadata } from '../../site/page-metadata';

import Content from './content';

export const metadata: Metadata = pageMetadata('/theme', 'Theme');

export default function Page() {
  return <Content />;
}
