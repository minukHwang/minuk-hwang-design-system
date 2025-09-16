import type { Preview } from '@storybook/react';

// 디자인 토큰 CSS 임포트
import '@minuk-hwang-design-system/style-tokens/style-tokens.css';

// 컴포넌트 CSS 임포트
import '@minuk-hwang-design-system/components-react/badge/style';
import '@minuk-hwang-design-system/components-react/button/style';
import '@minuk-hwang-design-system/components-react/input/style';
import '@minuk-hwang-design-system/components-react/text/style';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#18181b',
        },
      ],
    },
    layout: 'centered',
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';

      if (typeof document !== 'undefined') {
        const html = document.documentElement;
        // 시스템 추적: 'system' 모드가 아니라면 data-theme로 강제
        if (theme === 'light' || theme === 'dark') {
          html.setAttribute('data-theme', theme);
        } else {
          html.removeAttribute('data-theme');
        }
      }

      // 스토리북 미리보기 영역 배경색 강제 설정
      const previewElement = document.querySelector('.sb-show-main') as HTMLElement;
      if (previewElement) {
        previewElement.style.setProperty(
          'background-color',
          theme === 'dark' ? '#18181b' : '#ffffff',
          'important'
        );
      }

      // Docs 페이지의 스토리 컨테이너
      const docsStoryElement = document.querySelectorAll('.docs-story');
      if (docsStoryElement) {
        docsStoryElement.forEach(element => {
          (element as HTMLElement).style.setProperty(
            'background-color',
            theme === 'dark' ? '#18181b' : '#ffffff',
            'important'
          );
        });
      }

      return Story();
    },
  ],
};

export default preview;
