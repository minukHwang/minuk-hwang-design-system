'use client';

import { Highlight, type PrismTheme } from 'prism-react-renderer';
import * as React from 'react';

import css from './preview.module.css';

/**
 * A Prism theme built from the design system's own palette.
 *
 * Every colour is a custom property rather than a hex, so the block follows the
 * light and dark themes with the rest of the page — a highlighter that ships its
 * own two palettes would be a third colour system on a site whose whole subject
 * is having one.
 *
 * The hues are chosen for what the token means, not for variety: strings green
 * because they are literal content, tags and keywords accent because they are
 * structure, comments assistive because they are the part you skim past.
 */
const theme: PrismTheme = {
  plain: { color: 'var(--text-color-normal)' },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: 'var(--text-color-assistive)' },
    },
    { types: ['punctuation'], style: { color: 'var(--text-color-assistive)' } },
    { types: ['tag', 'keyword', 'selector', 'operator'], style: { color: 'var(--accent-strong)' } },
    {
      types: ['class-name', 'function', 'maybe-class-name'],
      style: { color: 'var(--purple-700)' },
    },
    { types: ['attr-name', 'property'], style: { color: 'var(--amber-800)' } },
    { types: ['string', 'attr-value', 'char', 'inserted'], style: { color: 'var(--green-800)' } },
    { types: ['number', 'boolean', 'constant', 'symbol'], style: { color: 'var(--crimson-700)' } },
    { types: ['deleted'], style: { color: 'var(--status-error-strong)' } },
  ],
};

/**
 * Source under an example.
 *
 * The samples are hand-written rather than extracted from the rendered tree, so
 * they stay copy-pasteable — a serialiser would produce something that runs and
 * nobody would write.
 */
export const CodeBlock = ({ code, language = 'jsx' }: { code: string; language?: string }) => (
  <Highlight theme={theme} code={code.trim()} language={language}>
    {({ tokens, getLineProps, getTokenProps }) => (
      <pre className={css.code}>
        <code>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </code>
      </pre>
    )}
  </Highlight>
);
