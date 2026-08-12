'use client';

import { Button } from '@minuk-hwang-design-system/components-react/button';
import { Icon } from '@minuk-hwang-design-system/components-react/icon';
import { Highlight, Prism, type PrismTheme } from 'prism-react-renderer';
import * as React from 'react';

import css from './preview.module.css';

/*
 * A shell grammar, because the bundled set does not carry one.
 *
 * `prism-react-renderer` ships markup, the JavaScript family, CSS and a dozen
 * others — not bash. An install command was therefore the one snippet on the
 * site rendered as flat text, which read as a paragraph that had wandered into a
 * code block.
 *
 * Four rules rather than a real grammar: this site's shell samples are one
 * package manager, one subcommand and a package name. Anything more would be
 * grammar written for cases that do not exist here.
 */
Prism.languages.shell = {
  comment: /#.*/,
  string: /(["'])(?:\\.|(?!\1)[^\\\n])*\1/,
  function: /^\s*(?:pnpm|npm|yarn|bun|npx|git|node)\b/m,
  keyword: /\b(?:add|install|run|dev|build|create)\b/,
  /*
   * A flag only where one can start. Unanchored it also matched the hyphens
   * inside a package name, so `@scope/design-system` came out with three of its
   * words colored as options.
   */
  operator: { pattern: /(^|\s)--?[\w-]+/, lookbehind: true },
};

/**
 * A Prism theme built from the design system's own palette.
 *
 * Every color is a custom property rather than a hex, so the block follows the
 * light and dark themes with the rest of the page — a highlighter that ships its
 * own two palettes would be a third color system on a site whose whole subject
 * is having one.
 *
 * The hues are chosen for what the token means, not for variety: strings green
 * because they are literal content, tags and keywords accent because they are
 * structure, comments assistive because they are the part you skim past.
 */
const theme: PrismTheme = {
  plain: { color: 'var(--text-color-normal)' },
  /*
   * Ordered broad to specific, and the order is load-bearing.
   *
   * A JSX token carries every type that matched, `tag` first — `<Select.Root>`
   * arrives as `tag+class-name` and its angle brackets as `tag+punctuation` —
   * and the last matching entry here wins. With `punctuation` written above the
   * tag rule, every bracket and slash in a sample took the accent along with the
   * component names, which put roughly two thirds of a block in one color. That
   * is the "it all looks the same" you see rather than a missing rule.
   */
  styles: [
    /*
     * Component names are tags here, whatever Prism calls them.
     *
     * `<div>` tokenises as `tag` and `<Button>` as `maybe-class-name`, so the
     * two halves of the same idea came out in two colors — and since almost
     * every sample on this site is JSX made of components, the accent was
     * reserved for the one kind of tag these pages hardly ever show.
     */
    {
      types: ['tag', 'class-name', 'maybe-class-name', 'selector'],
      style: { color: 'var(--accent-strong)' },
    },
    /*
     * Keywords are not tags, and putting them together was most of why a block
     * came out in one color. `export default function … return <Button>` is
     * four keywords and a component; with both in the accent there was nothing
     * left to distinguish the thing being named from the words naming it.
     */
    { types: ['keyword', 'boolean', 'constant'], style: { color: 'var(--purple-700)' } },
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: 'var(--text-color-assistive)' },
    },
    /*
     * After the tag rule, so brackets stay quiet inside a tag as well as outside
     * one. Operators are here too: in a JavaScript sample `<` and `/` tokenise
     * as operators rather than as tag punctuation, so leaving them in the accent
     * colored every angle bracket in the file.
     */
    { types: ['punctuation', 'operator'], style: { color: 'var(--text-color-assistive)' } },
    { types: ['function'], style: { color: 'var(--cyan-700)' } },
    { types: ['attr-name', 'property'], style: { color: 'var(--amber-800)' } },
    { types: ['string', 'attr-value', 'char', 'inserted'], style: { color: 'var(--green-800)' } },
    { types: ['number', 'symbol'], style: { color: 'var(--crimson-700)' } },
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
export const CodeBlock = ({ code, language = 'jsx' }: { code: string; language?: string }) => {
  const [copied, setCopied] = React.useState(false);

  /*
   * The label goes back to "Copy" after a moment rather than staying on
   * "Copied", so the button says what it will do next time rather than what it
   * did last time. Cleared on unmount because a page can be navigated away from
   * inside the two seconds.
   */
  React.useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
  };

  return (
    <div className={css.codeWrap}>
      {/*
        Icon only, and `outline` — it sits on top of the sample it copies, so it
        needs an edge of its own to be found against a block of code. `ghost` read
        as a stray glyph in the corner, and on a phone, where it is always shown
        rather than revealed on hover, it looked like part of the source.

        The tick is the whole feedback: with no label to change there is nothing
        else to say.

        `aria-label` carries the state instead, and the live region announces the
        change to a screen reader user who cannot see the glyph swap.
      */}
      <Button
        size="s"
        variant="outline"
        iconOnly
        className={css.copyButton}
        onClick={copy}
        aria-label={copied ? 'Copied to clipboard' : 'Copy code'}
      >
        <Icon name={copied ? 'check' : 'content_copy'} size={16} />
      </Button>
      <span className={css.visuallyHidden} aria-live="polite">
        {copied ? 'Copied to clipboard' : ''}
      </span>

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
    </div>
  );
};
