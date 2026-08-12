import { Button } from '@minuk-hwang-design-system/components-react/button';

import css from './chrome.module.css';

const REPOSITORY = 'https://github.com/minukHwang/minuk-hwang-design-system';

/*
 * ============================================
 * Component
 * ============================================
 */

/**
 * The repository, at the far end of the bar.
 *
 * A `Button` rendered `as="a"` rather than a styled anchor of the chrome's own,
 * so the thing that looks like the icon buttons beside it is the same component
 * they are — one focus ring, one hover ink, one size. The base layer applies
 * button semantics to whatever element it renders, so this stays a link: it
 * opens in a new tab, its address can be copied, and a screen reader announces a
 * destination rather than an action.
 *
 * The mark is inline SVG rather than the icon font. GitHub's logo is not in the
 * Material set, and the alternative is a wordmark that says "github" in a bar
 * where everything else is a glyph.
 */
export const RepositoryLink = () => (
  <Button
    as="a"
    href={REPOSITORY}
    target="_blank"
    rel="noreferrer noopener"
    aria-label="Repository on GitHub"
    size="s"
    iconOnly
    variant="ghost"
  >
    <svg
      width={18}
      height={18}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className={css.repositoryMark}
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  </Button>
);
