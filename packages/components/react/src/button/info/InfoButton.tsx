import { forwardRef } from 'react';
import { CommonProps } from '../../common/types';
import { Badge } from '../../badge/Badge';
import { Text } from '../../common/text/Text';
import { infoButtonRecipe, InfoButtonVariants } from './style.css';
import { BadgeVariants } from '../../badge/style.css';
import clsx from 'clsx';
import { spacingSprinkles } from '../../style/spacing/sprinkles.css';

interface InfoButtonProps extends CommonProps, NonNullable<InfoButtonVariants> {
  badgeColor?: NonNullable<BadgeVariants>['color'];
  badgeText?: string;
  subText?: string;
}

/**
 * InfoButton 컴포넌트
 *
 * @param {React.ReactNode} [props.children='children'] - 버튼 내부 텍스트 (선택, 기본값: 'children')
 * @param {InfoButtonVariants['size']} props.size - 버튼 크기 ('s', 'm')
 * @param {InfoButtonVariants['variant']} [props.variant='default'] - 버튼 변형 (선택, 기본값: 'default')
 * @param {InfoButtonProps['badgeColor']} [props.badgeColor] - 배지 색상 (선택)
 * @param {string} [props.badgeText] - 배지 텍스트 (선택)
 * @param {string} [props.subText] - 부가 텍스트 (선택)
 * @param {string} [props.className] - 추가 CSS 클래스 (선택)
 * @param {...any} props - 버튼 요소로 전달될 기타 props
 * @param {React.Ref<HTMLButtonElement>} ref - 전달받은 ref
 */
export const InfoButton = forwardRef<HTMLButtonElement, InfoButtonProps>(
  (
    {
      children = 'children',
      size,
      variant = 'default',
      badgeColor,
      badgeText,
      subText,
      className,
      ...props
    },
    ref,
  ) => {
    const infoButtonClass = infoButtonRecipe({ size, variant });
    const textType = size === 's' ? 'heading2' : 'title1';

    if (!badgeColor) {
      badgeColor = variant === 'default' || variant === 'ghost' ? 'ghost' : 'white';
    }

    const textColor = variant === 'default' ? 'textNormal' : 'white';
    return (
      <button
        ref={ref}
        className={clsx(infoButtonClass, className)}
        style={{ ...props.style }}
        {...props}
      >
        {badgeText && <Badge color={badgeColor}>{badgeText}</Badge>}
        <Text
          as="span"
          textType={textType}
          textMode="bold"
          color={textColor}
          style={{
            position: 'absolute',
            top: size === 's' ? '50%' : '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {children}
        </Text>
        {subText && (variant === 'danger' || variant === 'warning') && (
          <Text
            as="span"
            textType="caption"
            color="opacityWhite700"
            className={spacingSprinkles({ paddingBottom: 2 })}
          >
            {subText}
          </Text>
        )}
      </button>
    );
  },
);
