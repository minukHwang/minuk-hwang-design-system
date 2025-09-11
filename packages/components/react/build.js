/* eslint-disable no-redeclare */
import { createRequire } from 'module';
import runBuild from '@minuk-hwang-design-system/esbuild-config';
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const config = {
  plugins: [
    vanillaExtractPlugin({
      identifiers: 'short',
      outputCss: true,
    }),
  ],
};

runBuild({
  pkg,
  config,
  buildMode: 'separate', // 컴포넌트별 개별 빌드
});
