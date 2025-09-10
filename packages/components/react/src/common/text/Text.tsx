import { forwardRef } from 'react';
import { colorSprinkles } from '../../style/color/sprinkles.css';
import { typographyRecipe } from '../../style/typography/recipes.css';
import { CommonProps } from '../types';
import clsx from 'clsx';
import { ellipsisTextStyle } from './style.css';

interface TextProps extends CommonProps {
  ellipsis?: boolean;
}

/**
 * Text 컴포넌트
 *
 * @param {React.ReactNode} props.children - 텍스트 내용 (필수)
 * @param {React.ElementType} [props.as='p'] - 렌더링할 HTML 요소 (선택, 기본값: 'p')
 * @param {TypographyVariants['textType']} [props.textType='body1'] - 텍스트 타입 (선택, 기본값: 'body1')
 * @param {TypographyVariants['textMode']} [props.textMode='default'] - 텍스트 모드 (선택, 기본값: 'default')
 * @param {TypographyVariants['textAlign']} [props.textAlign] - 텍스트 정렬 (선택)
 * @param {PaletteColors} [props.color] - 텍스트 색상 (선택)
 * @param {boolean} [props.ellipsis] - 말줄임표 적용 여부 (선택)
 * @param {string} [props.className] - 추가 CSS 클래스 (선택)
 * @param {...CommonProps} props - 기타 HTML 속성
 * @param {React.Ref<HTMLElement>} ref - 전달받은 ref
 */
export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      children,
      as: Component = 'p',
      textType = 'body1',
      textMode = 'default',
      textAlign,
      color,
      ellipsis,
      className,
      ...props
    },
    ref,
  ) => {
    const textClass = typographyRecipe({ textType, textMode, textAlign });
    const colorClass = colorSprinkles({ color });
    const ellipsisClass = ellipsis ? ellipsisTextStyle : '';

    const combinedClass = clsx([textClass, colorClass, ellipsisClass, className]);

    return (
      <Component ref={ref} className={combinedClass} style={{ ...props.style }} {...props}>
        {children}
      </Component>
    );
  },
);
