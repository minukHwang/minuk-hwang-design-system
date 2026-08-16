import type { Metadata } from 'next';

import { pageMetadata } from '../../../site/page-metadata';

import Content from './content';

/*
 * Split from the content like every other page: metadata may only be exported
 * from a server component, and the content is a client one.
 */
export const metadata: Metadata = pageMetadata('/tokens/motion', 'Motion');

export default Content;
