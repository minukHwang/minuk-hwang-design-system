import { forwardRef, ReactNode } from 'react';
import { colorSprinkles, Palette } from '../../style/color/sprinkles.css';
import clsx from 'clsx';

interface IconProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  children: ReactNode;
  size?: number;
  color?: Palette;
  className?: string;
}

/**
 * Icon 컴포넌트
 *
 * @param {ReactNode} props.children - 아이콘 내용 (필수)
 * @param {Palette} [props.color='textNormal'] - 아이콘 색상 (선택, 기본값: 'textNormal')
 * @param {number} [props.size] - 아이콘 크기 (선택)
 * @param {string} [props.className] - 추가 CSS 클래스 (선택)
 * @param {...any} props - 기타 HTML 속성
 * @param {React.Ref<HTMLElement>} ref - 전달받은 ref
 */
export const Icon = forwardRef<HTMLElement, IconProps>(
  ({ children, size, color = 'textNormal', className, ...props }, ref) => {
    const colorClass = colorSprinkles({ color });

    const iconStyle = {
      display: 'inline-block',
      ...(size && { fontSize: `${size}px` }),
    };

    return (
      <span
        ref={ref}
        className={clsx('material-symbols-outlined', colorClass, className)}
        style={{ ...iconStyle, ...props.style }}
        {...props}
      >
        {children}
      </span>
    );
  },
);
