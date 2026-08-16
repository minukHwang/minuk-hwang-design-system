import { Heading } from '@minuk-hwang-design-system/components-react/heading';
import { Separator } from '@minuk-hwang-design-system/components-react/separator';
import { Text } from '@minuk-hwang-design-system/components-react/text';
import * as React from 'react';

import css from './chrome.module.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type PageProps = {
  eyebrow?: string;
  title: string;
  /** One paragraph saying what this is and when to reach for it. */
  lede: string;
  children: React.ReactNode;
};

/*
 * ============================================
 * Component
 * ============================================
 */

/**
 * Every documentation page has the same head, so it lives here rather than
 * being retyped on thirty pages, which is also what stops one page from
 * quietly acquiring an `h2` where the rest have an `h1`.
 *
 * The head is built from `Heading` and `Text` rather than from element
 * selectors in a site stylesheet. A documentation site that styles its own type
 * cannot claim the type scale works; this one breaks when the scale does.
 */
export const Page = ({ eyebrow, title, lede, children }: PageProps) => (
  <article className={css.article}>
    <header className={css.pageHead}>
      {eyebrow && (
        <Text as="div" size={1} color="assistive" className={css.eyebrow}>
          {eyebrow}
        </Text>
      )}
      <Heading level={1} size={9} className={css.pageTitle}>
        {title}
      </Heading>
      <Text size={6} leading="reading" color="assistive">
        {lede}
      </Text>
    </header>
    {/*
      A rule under the head, so the sentence that introduces the page stops
      belonging to the first example under it. The gap alone could not say that:
      48 between the lede and an example is the same 48 that separates two
      examples, so the head read as the first section rather than as the page's.

      `Separator` rather than a border on the header, because the system has a
      component for a rule and this is a page built out of the system.
    */}
    <Separator className={css.pageRule} />
    {children}
  </article>
);
