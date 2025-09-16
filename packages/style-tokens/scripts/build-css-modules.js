import fs from 'fs';

import * as theme from '../dist/index.js';

// 카멜케이스를 케밥케이스로 변경하는 정규식
const toKebabCase = str => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
};

// css 변수 제작을 위한 파싱
const generateCssVariables = () => {
  // 변수 문자열을 담을 배열
  const lightCssString = [];
  const lightClassCssString = [];
  const darkCssString = [];
  const darkClassCssString = [];

  Object.entries(theme.vars).forEach(([key, value]) => {
    const selector = 'html';
    // 색
    if (key === 'color') {
      Object.entries(value.$static).forEach(([colorKey, colorValue]) => {
        const cssVariables = Object.entries(colorValue)
          .map(
            ([mainKey, mainValue]) =>
              Object.entries(mainValue)
                .map(([subKey, subValue]) => {
                  if (colorKey === 'light') {
                    return `\t--${toKebabCase(mainKey)}-${toKebabCase(subKey)}: ${subValue};`;
                  } else if (colorKey === 'dark') {
                    return `\t\t--${toKebabCase(mainKey)}-${toKebabCase(subKey)}: ${subValue};`;
                  }
                })
                .join('\n') // 줄바꿈
          )
          .join('\n\n'); // 줄바꿈

        // 문자열을 배열에 추가
        if (colorKey === 'light') {
          // 기본 라이트는 루트(html)에 선언
          lightCssString.push(`${selector} {\n${cssVariables}\n}`);

          // 수동 라이트 강제: data-theme 및 .light 클래스 모두 지원
          lightClassCssString.push(`${selector}[data-theme="light"] {\n${cssVariables}\n}`);
          lightClassCssString.push(`${selector}.light {\n${cssVariables}\n}`);
        } else if (colorKey === 'dark') {
          // 시스템 다크 추적: 수동 테마(data-theme)가 없을 때만 적용
          darkCssString.push(
            `@media (prefers-color-scheme: dark) {\n\t${selector}:not([data-theme]) {\n${cssVariables}\n\t}\n}`
          );

          // 수동 다크 강제: data-theme 및 .dark 클래스 모두 지원
          darkClassCssString.push(`${selector}[data-theme="dark"] {\n${cssVariables}\n}`);
          darkClassCssString.push(`${selector}.dark {\n${cssVariables}\n}`);
        }
      });
    } else {
      // 그 외
      const cssVariables = Object.entries(value)
        .map(
          ([mainKey, mainValue]) =>
            Object.entries(mainValue)
              .map(([subKey, subValue]) => {
                return `\t--${toKebabCase(mainKey)}-${toKebabCase(subKey)}: ${subValue};`;
              })
              .join('\n') // 줄바꿈
        )
        .join('\n\n'); // 줄바꿈

      // 문자열을 배열에 추가
      lightCssString.push(`${selector} {\n${cssVariables}\n}`);
    }
  });

  return {
    light: lightCssString.join('\n\n'),
    lightClass: lightClassCssString.join('\n\n'),
    dark: darkCssString.join('\n\n'),
    darkClass: darkClassCssString.join('\n\n'),
  };
};

// css 클래스 제작을 위한 파싱
const generateCssClasses = () => {
  const cssString = [];

  Object.entries(theme.classes).forEach(([, value]) => {
    const cssClasses = Object.entries(value)
      .map(([mainKey, mainValue]) => {
        return Object.entries(mainValue)
          .map(([subKey, subValue]) => {
            const className = `.${toKebabCase(mainKey)}-${toKebabCase(subKey)}`;
            const styleProperties = Object.entries(subValue)
              .map(([styleKey, styleValue]) => {
                return `\t${toKebabCase(styleKey)}: ${styleValue};`;
              })
              .join('\n');
            return `${className} {\n${styleProperties}\n}`;
          })
          .join('\n\n');
      })
      .join('\n\n');

    cssString.push(cssClasses);
  });

  return cssString;
};

const generateCssImports = () => {
  const importString = [];

  const reset = `@import './index.css';`;
  const pretendard = `@import 'pretendard/dist/web/static/pretendard.css';`;
  const materialSymbols = `@import 'material-symbols';`;

  importString.push(reset);
  importString.push(pretendard);
  importString.push(materialSymbols);

  return importString.join('\n');
};

// 일반 css variable 파일 만들기
const generateCssFile = () => {
  const imports = generateCssImports();
  const { light, lightClass, dark, darkClass } = generateCssVariables();
  const classes = generateCssClasses();

  // 추가된 문자열 배열을 풀어서 넣어주기
  const cssContent = `${imports}

${light}

${dark}

${darkClass}

${lightClass}

${classes}
`;

  fs.writeFileSync('dist/style-tokens.css', cssContent.trim());
};

generateCssFile();
