'use client';

import { Button } from '@minuk-hwang-design-system/components-react/button';
import { Icon } from '@minuk-hwang-design-system/components-react/icon';
import { Text } from '@minuk-hwang-design-system/components-react/text';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import css from './chrome.module.css';
import { Logo } from './Logo';
import { nav } from './nav';
import { useNav } from './nav-state';

/*
 * ============================================
 * Navigation
 * ============================================
 */

const NavList = ({ onNavigate }: { onNavigate?: () => void }) => {
  const pathname = usePathname();

  return (
    <>
      {nav.map(section => (
        <div key={section.title} className={css.section}>
          <Text as="div" size={1} color="accent" className={css.sectionTitle}>
            {section.title}
          </Text>
          {section.items.map(item => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`${css.link} ${active ? css.linkActive : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                {/*
                 * `Text` inside the link rather than as the link. It carries
                 * the step and the weight; the anchor keeps the padding, the
                 * hit area and the "you are here" background, which are
                 * navigation behavior rather than type.
                 */}
                <Text
                  as="span"
                  size={3}
                  weight={active ? 'bold' : 'regular'}
                  color={active ? 'accent' : 'assistive'}
                >
                  {item.label}
                </Text>
              </Link>
            );
          })}
        </div>
      ))}
    </>
  );
};

/** Lives in the top bar now, beside the dials, rather than above the link list. */
export const Brand = () => (
  <Link href="/" className={css.brand} aria-label="minuk-hwang design system, home">
    <Logo />
  </Link>
);

/**
 * Opens the link list on a narrow screen. Rendered in the top bar rather than
 * beside the list it opens, so a phone gets one bar instead of two.
 *
 * `ghost` rather than `secondary`: it sits in a bar that already has an edge,
 * and a second box drawn around a single icon reads as a control that is somehow
 * more pressed than the ones beside it.
 */
export const MenuButton = () => {
  const { open, setOpen } = useNav();

  return (
    <Button
      size="s"
      iconOnly
      variant="ghost"
      className={css.menuButton}
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      aria-controls="docs-nav"
      aria-label={open ? 'Close navigation' : 'Open navigation'}
    >
      <Icon name={open ? 'close' : 'menu'} />
    </Button>
  );
};

/*
 * ============================================
 * Sidebar
 * ============================================
 */

/**
 * Two presentations of one list.
 *
 * Wide: a column beside the content, holding nothing but the links. The brand
 * and the dials both sit in the top bar, which spans the window and therefore
 * has room for fourteen swatches in a row.
 *
 * Narrow: a bar with a disclosure, because twenty-eight links stacked above the
 * article means every visit starts by scrolling past the table of contents.
 *
 * The list is rendered once and shown twice by CSS rather than duplicated —
 * two copies would mean two sets of links a screen reader has to walk.
 */
export const Sidebar = () => {
  const pathname = usePathname();
  const { open, setOpen } = useNav();

  // Navigating closes it. Without this the menu stays open over the page you
  // just asked for, which reads as the tap not having worked.
  React.useEffect(() => setOpen(false), [pathname, setOpen]);

  // Escape closes it, the same as every other overlay in the system.
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, setOpen]);

  // The page behind an open menu should not scroll under it.
  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <nav className={css.sidebar} aria-label="Documentation">
      <div id="docs-nav" className={css.nav} data-open={open || undefined}>
        <NavList onNavigate={() => setOpen(false)} />
      </div>

      {/* Tapping outside dismisses it. Only ever present on narrow screens. */}
      {open && (
        <button
          type="button"
          className={css.scrim}
          onClick={() => setOpen(false)}
          aria-hidden
          tabIndex={-1}
        />
      )}
    </nav>
  );
};
