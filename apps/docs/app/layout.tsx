import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import * as React from 'react';

import css from '../site/chrome.module.css';
import { DialsProvider } from '../site/dials';
import { NavProvider } from '../site/nav-state';
import { RepositoryLink } from '../site/RepositoryLink';
import { Brand, MenuButton, Sidebar } from '../site/Sidebar';
import { Toolbar } from '../site/Toolbar';

import './globals.css';

/*
 * Every component's stylesheet, once.
 *
 * The packages emit CSS per component so an application only ships what it
 * imports. A documentation site shows all of them, so it takes all of them —
 * and importing them here rather than per page keeps the cascade order fixed
 * instead of varying with whichever route loaded first.
 */
import '@minuk-hwang-design-system/components-react/accordion/style';
import '@minuk-hwang-design-system/components-react/alert/style';
import '@minuk-hwang-design-system/components-react/avatar/style';
import '@minuk-hwang-design-system/components-react/badge/style';
import '@minuk-hwang-design-system/components-react/button/style';
import '@minuk-hwang-design-system/components-react/card/style';
import '@minuk-hwang-design-system/components-react/checkbox/style';
import '@minuk-hwang-design-system/components-react/chip/style';
import '@minuk-hwang-design-system/components-react/dialog/style';
import '@minuk-hwang-design-system/components-react/dropdown-menu/style';
import '@minuk-hwang-design-system/components-react/field/style';
import '@minuk-hwang-design-system/components-react/heading/style';
import '@minuk-hwang-design-system/components-react/icon/style';
import '@minuk-hwang-design-system/components-react/input/style';
import '@minuk-hwang-design-system/components-react/popover/style';
import '@minuk-hwang-design-system/components-react/radio-group/style';
import '@minuk-hwang-design-system/components-react/select/style';
import '@minuk-hwang-design-system/components-react/separator/style';
import '@minuk-hwang-design-system/components-react/spinner/style';
import '@minuk-hwang-design-system/components-react/switch/style';
import '@minuk-hwang-design-system/components-react/tabs/style';
import '@minuk-hwang-design-system/components-react/theme/style';
import '@minuk-hwang-design-system/components-react/text/style';
import '@minuk-hwang-design-system/components-react/tooltip/style';

const SITE = 'https://minuk-hwang-design-system.vercel.app';

const DESCRIPTION =
  'A design system in four layers: generated tokens, a shared style layer, headless behavior, and styled React components. Every color pairing is measured against WCAG rather than chosen, and the accent, gray and corner radius are dials you can turn while reading.';

/*
 * `metadataBase` is what makes every relative image below resolve.
 *
 * Without it Next emits the paths as written and a crawler asks its own host for
 * them, so the card is silently image-less everywhere it matters. It is also the
 * only reason `alternates.canonical` can be a path rather than a full URL
 * repeated on every page.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'minuk-hwang design system',
    template: '%s · minuk-hwang design system',
  },
  description: DESCRIPTION,
  applicationName: 'minuk-hwang design system',
  authors: [{ name: 'Minuk Hwang', url: 'https://github.com/minukHwang' }],
  creator: 'Minuk Hwang',
  keywords: [
    'design system',
    'design tokens',
    'React components',
    'headless components',
    'vanilla-extract',
    'accessibility',
    'WCAG',
    'Radix UI',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'minuk-hwang design system',
    title: 'minuk-hwang design system',
    description: DESCRIPTION,
    url: SITE,
    locale: 'en',
  },
  twitter: {
    card: 'summary',
    title: 'minuk-hwang design system',
    description: DESCRIPTION,
  },
  /*
   * The portfolio's marks, and the same pair-swapped-by-scheme it uses: the
   * light one is drawn dark and the dark one light, so the tab icon stays
   * legible against whatever the browser paints behind it. A single icon has to
   * pick a background to be wrong on.
   */
  icons: {
    icon: [
      { url: '/favicons/favicon-light.png', media: '(prefers-color-scheme: light)' },
      { url: '/favicons/favicon-dark.png', media: '(prefers-color-scheme: dark)' },
    ],
  },
  robots: { index: true, follow: true },
};

/*
 * The wordmark's face, and only the wordmark's.
 *
 * The portfolio sets its headings and its logo in Plus Jakarta Sans; this site
 * is Pretendard everywhere else and stays that way. Two weights and the Latin
 * subset, because two lines of one logo is all this is for.
 *
 * `next/font` rather than a stylesheet link like Pretendard's above: it
 * self-hosts the files, so the logo does not wait on a third-party connection
 * to stop being drawn in a fallback face.
 *
 * No `weight`, which is what asks for the variable font rather than for cut
 * instances of it. The portfolio loads the axis — `wght@200..800` — and a static
 * 500 is not the same drawing as a variable one interpolated to 500: it is the
 * nearest master, and the difference is exactly the weight that looked off.
 */
const wordmark = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-family-wordmark',
  display: 'swap',
});

/**
 * `suppressHydrationWarning` on `html` because the theme toggle writes
 * `data-theme` before React hydrates. Without it every load logs a mismatch for
 * an attribute that is supposed to differ.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /*
     * The site runs on the white page rather than the tinted one, which is what
     * `<Theme pageBackground="raised">` writes. Set here rather than through the
     * component because the attribute belongs on the document and this is the
     * document — a `Theme` in the tree would have to reach out to `html` to do
     * the same thing.
     */
    <html
      lang="en"
      data-page-background="raised"
      className={wordmark.variable}
      suppressHydrationWarning
    >
      <head>
        {/*
         * Pretendard, which is what `--font-family-main` has named all along
         * without anyone loading it — so every page has quietly been rendering
         * in the next fallback, Helvetica.
         *
         * The token names the family; fetching it is the application's job, the
         * same way Tailwind names `font-sans` and leaves the `@font-face` to
         * you. A design system that shipped the binary would make every
         * consumer pay for a typeface they may already self-host.
         *
         * The dynamic subset splits the face into unicode-range slices, so a
         * page of Latin never downloads the 11,172 Hangul syllables.
         */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
      </head>
      <body>
        <DialsProvider>
          <NavProvider>
            {/*
              Three bands rather than two: the brand at one end, the repository
              at the other, and the dials centered between them regardless of how
              wide either end happens to be. The dials are absolutely positioned
              for exactly that reason — laid out in the flow they would sit
              wherever the two ends left them, and the center would move every
              time the brand or the link changed width.
            */}
            <header className={css.topbar}>
              <div className={css.topbarStart}>
                <MenuButton />
                <Brand />
              </div>
              <Toolbar />
              <div className={css.topbarEnd}>
                <RepositoryLink />
              </div>
            </header>
            <div className={css.shell}>
              <Sidebar />
              <main className={css.main}>
                <div className={css.content}>{children}</div>
              </main>
            </div>
          </NavProvider>
        </DialsProvider>
      </body>
    </html>
  );
}
