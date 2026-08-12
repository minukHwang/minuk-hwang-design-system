import type { Metadata } from 'next';

import { pageMetadata } from '../../../site/page-metadata';

import Content from './content';

/*
 * Split from the content because every page renders compound components, and a
 * namespace object exported from a 'use client' module does not survive the
 * server boundary — React receives the module proxy and `Chip` reads as
 * undefined. Metadata may only be exported from a server component, so the two
 * halves live in separate files.
 */
export const metadata: Metadata = pageMetadata('/components/chip', 'Chip');

export default Content;
