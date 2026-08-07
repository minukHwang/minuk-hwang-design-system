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
 */
export const Page = ({ eyebrow, title, lede, children }: PageProps) => (
  <article className={css.article}>
    <header className={css.pageHead}>
      {eyebrow && <div className={css.eyebrow}>{eyebrow}</div>}
      <h1 className={css.pageTitle}>{title}</h1>
      <p className={css.lede}>{lede}</p>
    </header>
    {children}
  </article>
);
