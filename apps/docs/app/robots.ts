import type { MetadataRoute } from 'next';

/**
 * Everything is public, and the sitemap says where everything is.
 *
 * Worth shipping even though it allows all: without a `robots.txt` a crawler has
 * no pointer to the sitemap, so it finds the pages by following links from the
 * home page and finds the ones nothing links to not at all.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://minuk-hwang-design-system.vercel.app/sitemap.xml',
  };
}
