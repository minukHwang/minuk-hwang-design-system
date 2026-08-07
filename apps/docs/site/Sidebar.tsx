'use client';

import { Button } from '@minuk-hwang-design-system/components-react/button';
import { Icon } from '@minuk-hwang-design-system/components-react/icon';
import { Text } from '@minuk-hwang-design-system/components-react/text';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import css from './chrome.module.css';
import { nav } from './nav';

/*
 * ============================================
 * Theme toggle
 * ============================================
 */

type Theme = 'light' | 'dark' | 'system';

const THEME_ICON: Record<Theme, string> = {
  light: 'light_mode',
  dark: 'dark_mode',
  system: 'contrast',
};

/**
 * Writes `data-theme` on the root, which is exactly what the token stylesheet
 * watches. Removing the attribute hands control back to the OS rather than
 * pinning a guess at what the OS currently says.
 *
 * Selection is shown by giving the chosen option a box — `secondary` against
 * `ghost` — rather than by a tint the system does not have a name for. Both are
 * variants that already exist, so the toggle cannot drift from the buttons it
 * sits next to.
 */
const ThemeToggle = () => {
  const [theme, setTheme] = React.useState<Theme>('system');

  React.useEffect(() => {
    const stored = window.localStorage.getItem('theme') as Theme | null;
    if (stored) setTheme(stored);
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') {
      root.removeAttribute('data-theme');
      window.localStorage.removeItem('theme');
    } else {
      root.setAttribute('data-theme', theme);
      window.localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return (
    <div className={css.themeBar} role="group" aria-label="Theme">
      {(['light', 'dark', 'system'] as const).map(option => (
        <Button
          key={option}
          size="s"
          iconOnly
          variant={theme === option ? 'secondary' : 'ghost'}
          onClick={() => setTheme(option)}
          aria-pressed={theme === option}
          aria-label={option}
          title={option}
        >
          <Icon name={THEME_ICON[option]} size={18} />
        </Button>
      ))}
    </div>
  );
};

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
          <Text as="div" size={1} color="assistive" className={css.sectionTitle}>
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
                 * navigation behaviour rather than type.
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

const Brand = () => (
  <Link href="/" className={css.brand}>
    <Text as="span" size={7} weight="bold" color="strong">
      minuk-hwang
    </Text>
    <Text as="span" size={1} color="assistive" className={css.brandNote}>
      design system
    </Text>
  </Link>
);

/*
 * ============================================
 * Sidebar
 * ============================================
 */

/**
 * Two presentations of one list.
 *
 * Wide: a column beside the content, where the brand and the theme toggle stay
 * put and only the links scroll.
 *
 * Narrow: a bar with a disclosure, because twenty-eight links stacked above the
 * article means every visit starts by scrolling past the table of contents.
 *
 * The list is rendered once and shown twice by CSS rather than duplicated —
 * two copies would mean two sets of links a screen reader has to walk.
 */
export const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  // Navigating closes it. Without this the menu stays open over the page you
  // just asked for, which reads as the tap not having worked.
  React.useEffect(() => setOpen(false), [pathname]);

  // Escape closes it, the same as every other overlay in the system.
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

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
      <div className={css.head}>
        <Brand />
        <div className={css.headActions}>
          <ThemeToggle />
          <Button
            size="s"
            iconOnly
            variant="secondary"
            className={css.menuButton}
            onClick={() => setOpen(value => !value)}
            aria-expanded={open}
            aria-controls="docs-nav"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
          >
            <Icon name={open ? 'close' : 'menu'} size={20} />
          </Button>
        </div>
      </div>

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
