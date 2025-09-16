/* eslint-disable no-redeclare */
import { execSync } from 'child_process';
import { createRequire } from 'module';

import runBuild from '@minuk-hwang-design-system/esbuild-config';
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const config = {
  plugins: [
    vanillaExtractPlugin({
      identifiers: 'short',
    }),
  ],
};

// TypeScript 선언 파일 생성
console.log('🔧 TypeScript 선언 파일 생성 중...');
try {
  execSync('npx tsc', { stdio: 'inherit' });
  console.log('✅ TypeScript 선언 파일 생성 완료');
} catch (error) {
  console.error('❌ TypeScript 선언 파일 생성 실패:', error.message);
}

runBuild({
  pkg,
  config,
  buildMode: 'separate', // 컴포넌트별 개별 빌드
});
