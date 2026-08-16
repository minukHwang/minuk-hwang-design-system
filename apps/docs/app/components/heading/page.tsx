import type { Metadata } from 'next';

import { pageMetadata } from '../../../site/page-metadata';

import Content from './content';

/*
 * Split from the content because every page renders compound components, and a
 * namespace object exported from a 'use client' module does not survive the
 * server boundary. Metadata may only be exported from a server component.
 */
export const metadata: Metadata = pageMetadata('/components/heading', 'Heading');

export default Content;
