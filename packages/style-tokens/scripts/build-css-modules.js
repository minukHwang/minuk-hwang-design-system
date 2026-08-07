/**
 * Emits dist/style-tokens.css — the framework-agnostic face of the token set.
 *
 * A consumer who wants nothing to do with TypeScript or vanilla-extract can load
 * this one file and get every token as a custom property, plus a reset and the
 * typography utility classes. That is the point of the tokens package: the
 * values are neutral, and how you consume them is your choice.
 *
 * Tailwind consumers want the same variables without the reset, so they get
 * their own file from build-tailwind.js rather than this one.
 */

import fs from 'fs';

import * as theme from '../dist/index.js';

import { FONT_IMPORTS, cssVariableBlocks, toKebabCase } from './css-variables.js';

/** Typography helpers, for consumers styling with plain CSS. */
const generateCssClasses = () =>
  Object.values(theme.classes)
    .map(group =>
      Object.entries(group)
        .map(([mainKey, mainValue]) =>
          Object.entries(mainValue)
            .map(([subKey, declarations]) => {
              const body = Object.entries(declarations)
                .map(([prop, value]) => `\t${toKebabCase(prop)}: ${value};`)
                .join('\n');
              return `.${toKebabCase(mainKey)}-${toKebabCase(subKey)} {\n${body}\n}`;
            })
            .join('\n\n')
        )
        .join('\n\n')
    )
    .join('\n\n');

const IMPORTS = [`@import './index.css';`, ...FONT_IMPORTS].join('\n');

fs.writeFileSync(
  'dist/style-tokens.css',
  [IMPORTS, ...cssVariableBlocks(), generateCssClasses()].join('\n\n').trim() + '\n'
);

console.log('wrote dist/style-tokens.css');
