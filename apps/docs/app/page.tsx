import type { Metadata } from 'next';

import { pageMetadata } from '../site/page-metadata';

import Content from './content';

/*
 * The home page's title is the site's, not a page's, so the template that puts
 * "· minuk-hwang design system" after every other title would say it twice here.
 * `absolute` is the opt-out.
 */
export const metadata: Metadata = {
  ...pageMetadata('/', 'minuk-hwang design system'),
  title: { absolute: 'minuk-hwang design system' },
};

/* See any sibling page: compound namespaces need a client boundary. */
export default Content;
