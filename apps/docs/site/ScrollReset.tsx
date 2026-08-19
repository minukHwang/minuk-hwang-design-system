'use client';

/*
 * Back to the top on every navigation.
 *
 * Next resets the window's scroll between routes, and the window is not what
 * scrolls here: `.main` is the scroll container, so the article kept whatever
 * offset the last page left it at. Landing halfway down a page you have never
 * read is the kind of thing that reads as a broken link.
 *
 * It finds the container by walking up from its own node rather than by id, so
 * the day the layout changes which element scrolls, this follows.
 *
 * `useLayoutEffect` because the reset has to happen before the browser paints —
 * in an effect the new page is shown at the old offset for a frame first.
 */
import { usePathname } from 'next/navigation';
import * as React from 'react';

const scrollParent = (node: HTMLElement | null) => {
  for (let el = node?.parentElement; el; el = el.parentElement) {
    const { overflowY } = getComputedStyle(el);
    if (overflowY === 'auto' || overflowY === 'scroll') return el;
  }
  return null;
};

export const ScrollReset = () => {
  const pathname = usePathname();
  const marker = React.useRef<HTMLSpanElement>(null);

  React.useLayoutEffect(() => {
    scrollParent(marker.current)?.scrollTo({ top: 0 });
    // The window too, for the widths where the article is not its own scroller.
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return <span ref={marker} aria-hidden="true" />;
};
