import type { Metadata } from 'next';
import * as React from 'react';

import css from '../site/chrome.module.css';
import { Sidebar } from '../site/Sidebar';
import { ThemePreference } from '../site/ThemePreference';

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

export const metadata: Metadata = {
  title: {
    default: 'minuk-hwang design system',
    template: '%s — minuk-hwang design system',
  },
  description:
    'A four-layer design system: tokens, a shared style layer, headless behaviour, and styled components.',
};

/**
 * `suppressHydrationWarning` on `html` because the theme toggle writes
 * `data-theme` before React hydrates. Without it every load logs a mismatch for
 * an attribute that is supposed to differ.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        <ThemePreference />
        <div className={css.shell}>
          <Sidebar />
          <main className={css.main}>{children}</main>
        </div>
      </body>
    </html>
  );
}
