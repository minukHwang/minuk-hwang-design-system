/* eslint-disable no-redeclare */
import { exec } from 'child_process';
import { createRequire } from 'module';

import runBuild from '@minuk-hwang-design-system/esbuild-config';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

function runCssBuild() {
  exec('npm run build:css', (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(stdout);
    if (stderr) console.error(stderr);
  });
}

runBuild({
  pkg,
  onBuildEnd: () => {
    runCssBuild();
  },
});
