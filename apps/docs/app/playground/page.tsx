import type { Metadata } from 'next';

import { pageMetadata } from '../../site/page-metadata';

import Content from './content';

/*
 * Split from the content for the reason every other page is: compound namespaces
 * come from a 'use client' module and do not survive the server boundary, while
 * metadata may only be exported from a server component.
 */
export const metadata: Metadata = pageMetadata('/playground', 'Example');

export default Content;
