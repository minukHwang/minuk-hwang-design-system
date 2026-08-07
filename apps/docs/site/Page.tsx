import { Heading } from '@minuk-hwang-design-system/components-react/heading';
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
 * being retyped twenty-two times — which is also what stops one page from
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
    {children}
  </article>
);
