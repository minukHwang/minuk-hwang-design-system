/* eslint-disable no-redeclare */
import { createRequire } from 'module';

import runBuild from '@minuk-hwang-design-system/esbuild-config';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

// Declaration output is produced by the build:type script in package.json.
// Running tsc here as well would compile twice and swallow its failures,
// making a broken build look successful.

runBuild({
  pkg,
  config: {},
  buildMode: 'separate', // 컴포넌트별 개별 빌드
});
