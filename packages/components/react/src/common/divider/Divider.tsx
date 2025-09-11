import { vars } from '@minuk-hwang-design-system/style-tokens';
import { forwardRef } from 'react';

import { Container } from '../container/Container';
import { CommonProps } from '../types';

interface DividerProps
  extends Pick<CommonProps, 'color'>,
    Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  orientation: 'horizontal' | 'vertical';
  size?: keyof typeof vars.spacing.spacing;
  margin?: keyof typeof vars.spacing.spacing;
}

/**
 * Divider 컴포넌트
 *
 * @param {'horizontal' | 'vertical'} [props.orientation='horizontal'] - 구분선의 방향 (선택, 기본값: 'horizontal')
 * @param {PaletteColors} [props.color='gray200'] - 구분선의 색상 (선택, 기본값: 'gray200')
 * @param {keyof typeof vars.spacing.spacing} [props.size=1] - 구분선의 두께 (선택, 기본값: 1)
 * @param {keyof typeof vars.spacing.spacing} [props.margin] - 구분선의 여백 (선택)
 * @param {string} [props.className] - 추가 CSS 클래스 (선택)
 * @param {...React.HTMLAttributes<HTMLElement>} props - 기타 HTML 속성
 * @param {React.Ref<HTMLHRElement>} ref - 전달받은 ref
 */
export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  (
    { orientation = 'horizontal', color = 'gray200', size = 1, margin, className, ...props },
    ref
  ) => {
    return (
      <Container
        ref={ref}
        className={className}
        backgroundColor={color}
        width={orientation === 'horizontal' ? '100%' : size}
        height={orientation === 'horizontal' ? size : undefined}
        marginX={orientation === 'horizontal' ? margin : undefined}
        marginY={orientation === 'vertical' ? margin : undefined}
        {...props}
      />
    );
  }
);
