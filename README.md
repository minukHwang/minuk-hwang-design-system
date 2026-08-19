<div align="center">

# 🎨 Minuk Hwang Design System

<br/>

![Typing SVG](https://readme-typing-svg.demolab.com?font=Plus+Jakarta+Sans&weight=600&size=20&duration=3000&pause=1000&color=157E38&center=true&vCenter=true&width=520&lines=Tokens+%C2%B7+Behavior+%C2%B7+Appearance;Measured+against+WCAG%2C+not+chosen;Three+layers%2C+four+packages)

**A React design system in three layers: generated tokens, headless behavior, and one styled implementation**

[![Documentation](https://img.shields.io/badge/📚_Documentation-ds.minukhwang.com-157E38?style=for-the-badge)](https://ds.minukhwang.com)
[![npm](https://img.shields.io/badge/npm-@minuk--hwang--design--system-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/@minuk-hwang-design-system/components-react)

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![vanilla-extract](https://img.shields.io/badge/vanilla--extract-F8E71C?style=for-the-badge&logoColor=black)
![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radixui&logoColor=white)
![Nx](https://img.shields.io/badge/Nx-143055?style=for-the-badge&logo=nx&logoColor=white)

</div>

---

## 📖 Overview

A design system built in three layers, so a decision lives in **one** of them rather than in all of them. Color is settled in the tokens, behavior in the base, appearance in the components.

---

## 🧱 Three Layers, Four Packages

| Layer          | Package            | What is in it                                                                                                                                   |
| -------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Values**     | `style-tokens`     | Color, spacing, radius, type, shadow, motion. One source, four outputs: CSS variables, TypeScript objects, utility classes, a Tailwind v4 theme |
| **Behavior**   | `base-react`       | 18 headless components: 17 wrapping a Radix package each, and `Button`, which is ours. Keyboard, focus and ARIA, and no styling at all          |
|                | `behavior-react`   | Interaction Radix does not cover. `usePress`, so a link or a `div` styled as a button still answers the keyboard                                |
| **Appearance** | `components-react` | 23 components plus `Theme`. The only layer that decides what anything looks like                                                                |

- **Every decision here is one of three kinds: what a value is, how a thing behaves, how it looks.** One layer answers each, so changing a color does not mean opening the file that traps focus.
- Four packages because `base-react` is built on Radix, and the behavior Radix does not cover is kept separately in `behavior-react`.

---

## 🔧 Technical Challenges & Solutions

### 1. One bundle → per-component entries

**🔍 Problem**: The package shipped as one barrel bundle, so a single `'use client'` inside it made every component in the package client-only and no consumer on Next.js App Router could render any of them from a server component.

**💡 Solution**

- Split the build so every component has its own entry file, reached as `…/button`. Importing one component now pulls in one component, and a `'use client'` reaches no further than the component that declares it.
- Generated the entry list by scanning the source tree, because `esbuild` has no way of being told "keep the module structure", and left the barrel out of the build: Build it and everything is in one file again.

```javascript
// packages/esbuild-config/index.js, abridged
const scanDirectory = (dir, basePath = '') => {
  fs.readdirSync(dir).forEach(item => {
    const itemPath = path.join(dir, item);
    if (!fs.statSync(itemPath).isDirectory()) return;

    // A folder holding index.ts(x) is the component itself
    if (fs.existsSync(path.join(itemPath, 'index.tsx'))) {
      entryPoints.push(`${srcDir}/${path.join(basePath, item, 'index.tsx')}`);
    } else {
      scanDirectory(itemPath, path.join(basePath, item));
    }
  });
};

/*
 * A barrel is never an entry. Building one would put every component back in a
 * single file, and one `'use client'` in it would carry the whole package across
 * the RSC boundary. That is the thing splitting the build exists to prevent.
 */
return entryPoints.filter(entry => !entry.includes('src/index.ts'));
```

**✅ Outcome**

- **Server components can use them.** Seven of the twenty-three declare no `'use client'`: `Badge`, `Card`, `Heading`, `Icon`, `Input`, `Spinner`, `Text`.
- An application that uses only `Button`, the same source consumed three ways:

| JavaScript shipped      |         raw |     gzipped |
| ----------------------- | ----------: | ----------: |
| Barrel                  |    24,931 B |     7,710 B |
| Barrel + tree-shaking   |    22,732 B |     6,764 B |
| **Per-component entry** | **3,244 B** | **1,446 B** |

**⚠️ And the one with the CSS splitting**

`esbuild` emits one stylesheet per entry point, which applied the same split to the CSS.

- **For the consumer**: Importing them one at a time can leave one out, and an import for every component is a large cost.
- **For the bytes**: A shared style is copied into every sheet that uses it. Across the ten components below, `Text` is duplicated into five, and 43% of the bytes are duplicates.

  | Components used | Per-component sheets | One bundle |
  | --------------- | -------------------: | ---------: |
  | …               |                    … |    4,882 B |
  | **~4**          |          **5,155 B** |    4,882 B |
  | 10              |              9,888 B |    4,882 B |

  Per-component sheets are smaller only below about four components once a heavy one like `Dialog` is among them. Installing a design system to use three components was judged uncommon.

The package therefore publishes a single stylesheet: A second `esbuild` pass bundles the same entry points through a synthetic barrel and retains only the CSS. The consumer loads it once.

### 2. Color is measured, not chosen

**🔍 Problem**: A `primary` button needs a label color on it that people can actually read, and that is a number rather than a feeling: WCAG asks for 4.5:1.

**💡 Solution**

- Added a verification step to the palette generator. At step 500 (`normal`), the fill a `primary` button is painted in, it measures white text and black text against the color and keeps both numbers.
- Exposed the winner as `onSolid`, white where white clears 4.5:1 and black otherwise, so a button reads a token instead of choosing.

```javascript
// packages/style-tokens/scripts/generate-palette.js
const onSolid = fill => (contrast(fill, WHITE) >= 4.5 ? WHITE : BLACK);

// The record, shipped as data so the choice can be checked rather than trusted.
// packages/style-tokens/src/variables/color/static/contrast.ts
red:  { step: 500, fill: '#eb1414', white: 4.52, black: 4.64, chosen: 'white' },
blue: { step: 500, fill: '#0868f7', white: 4.85, black: 4.33, chosen: 'white' },
cyan: { step: 500, fill: '#07ace4', white: 2.62, black: 8.03, chosen: 'black' },
```

**✅ Outcome**

- Every `normal` fill in the system carries a label that clears 4.5:1, and the file says by how much.

---

## 🚀 Getting Started

```bash
pnpm add @minuk-hwang-design-system/components-react
```

```tsx
// Once, at the root of the app. It imports the token stylesheet in turn.
import '@minuk-hwang-design-system/components-react/styles.css';
import { Theme } from '@minuk-hwang-design-system/components-react/theme';

// Per component, and only the JavaScript is per component.
import { Button } from '@minuk-hwang-design-system/components-react/button';

export default function App() {
  return (
    <Theme>
      <Button>Publish</Button>
    </Theme>
  );
}
```

> ⚠️ `styles.css` carries a reset, so it belongs before any stylesheet of your own. Import it from the top of one, where the order cannot be rearranged.

`Theme` paints the page and is where the dials live: `appearance`, `accentColor`, `neutralColor`, `radius`. Every one of them is optional, and left alone the appearance follows the operating system.

### Local development

```bash
pnpm install
pnpm build:packages      # the four packages, in dependency order
pnpm test                # the build invariants, read off dist
pnpm dev:docs            # the documentation site
```

---

## 🛠 Tech Stack

|   Category   | Technologies                                                             |
| :----------: | :----------------------------------------------------------------------- |
| **Language** | TypeScript                                                               |
| **Styling**  | vanilla-extract (zero-runtime CSS-in-TS)                                 |
| **Headless** | Radix UI (17 packages), hand-written where no specification exists       |
|  **Build**   | `esbuild` (per-component entries, code splitting), Nx, pnpm workspace    |
|   **Docs**   | Next.js 15 App Router, deployed on Vercel                                |
|  **Tokens**  | Generated: CSS variables, TypeScript, utility classes, Tailwind v4 theme |

---

## 👤 Author

**Minuk Hwang** - Fullstack Developer

- 🌐 [Portfolio](https://www.minukhwang.com)
- 💼 [LinkedIn](https://linkedin.com/in/minuk-hwang-934999157)
- 📧 [minuk.lucas.hwang@gmail.com](mailto:minuk.lucas.hwang@gmail.com)
