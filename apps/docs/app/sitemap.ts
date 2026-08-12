import type { MetadataRoute } from 'next';

import { allItems } from '../site/nav';

/**
 * The site's map, from the site's map.
 *
 * Generated from `nav.ts` rather than written out, so a new component is still
 * one entry rather than two — a sitemap kept by hand is a sitemap that is wrong
 * by the second page anyone adds.
 *
 * Which also means the pages deliberately held back from the sidebar stay out of
 * this. That is the same decision, not a second one: something unreachable from
 * the navigation should not be the first way a reader arrives.
 *
 * The home page outranks the rest and the example page comes next, because it is
 * the one that shows what the library is for. Everything else is a reference
 * page and says so.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return allItems.map(item => ({
    url: `https://minuk-hwang-design-system.vercel.app${item.href}`,
    changeFrequency: 'weekly',
    priority: item.href === '/' ? 1 : item.href === '/playground' ? 0.8 : 0.6,
  }));
}
