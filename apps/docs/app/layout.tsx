import type { Metadata } from 'next';
import * as React from 'react';

import css from '../site/chrome.module.css';
import { Sidebar } from '../site/Sidebar';

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
      <body>
        <div className={css.shell}>
          <Sidebar />
          <main className={css.main}>{children}</main>
        </div>
      </body>
    </html>
  );
}
