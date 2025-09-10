import { forwardRef } from 'react';
import { vars } from '@minuk-hwang-design-system/style-tokens';
import { Badge } from '../../badge/Badge';
import { InfoBox, Infos } from '../../box/info/info-box/InfoBox';
import { Button } from '../../button/Button';
import { Container } from '../../common/container/Container';
import { Text } from '../../common/text/Text';
import { CommonProps } from '../../common/types';
import { BadgeVariants } from '../../badge/style.css';

interface MapBottomSheetProps extends CommonProps {
  title?: string;
  badgeText?: string;
  subText?: string;
  infos?: Infos;
  subButtonIcon?: string;
  buttonText?: string;
  badgeColor?: NonNullable<BadgeVariants>['color'];
}

/**
 * MapBottomSheet 컴포넌트
 *
 * @param {React.ReactNode} [props.children] - 자식 요소 (선택)
 * @param {string} props.title - 상단 제목 텍스트 (선택)
 * @param {string} props.badgeText - 뱃지에 표시될 텍스트 (선택)
 * @param {string} props.subText - 부제목 텍스트 (선택)
 * @param {Infos} [props.infos] - InfoBox 컴포넌트에 전달될 정보 (선택)
 * @param {string} [props.subButtonIcon] - 우측 상단 버튼 아이콘 이름 (선택)
 * @param {string} [props.buttonText] - 하단 버튼 텍스트 (선택)
 * @param {NonNullable<BadgeVariants>['color']} [props.badgeColor] - 뱃지 색상 (선택)
 * @param {string} [props.className] - 추가 CSS 클래스 (선택)
 * @param {...CommonProps} props - Container 컴포넌트에 전달될 기타 속성
 * @param {React.Ref<HTMLElement>} ref - 전달받은 ref
 */
export const MapBottomSheet = forwardRef<HTMLElement, MapBottomSheetProps>(
  (
    {
      children,
      title,
      badgeText,
      subText,
      infos,
      subButtonIcon,
      buttonText,
      badgeColor,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Container
        ref={ref}
        className={className}
        display="flex"
        flexDirection="column"
        width="100%"
        padding={20}
        paddingBottom={32}
        gap={20}
        backgroundColor="backgroundNormalPrimary"
        borderRadius="base"
        boxShadow="s"
        {...props}
      >
        <Container display="flex" flexDirection="column" width="100%" gap={16}>
          {/* title */}
          <Container display="flex" justifyContent="space-between" width="100%">
            <Container
              display="flex"
              flexDirection="column"
              gap={6}
              style={{ width: subButtonIcon ? `calc(100% - 48px)` : '100%' }}
            >
              {title && (
                <Text as="span" textType="heading2" textMode="bold" ellipsis={true}>
                  {title}
                </Text>
              )}
              <Container display="flex" alignItems="center" width="100%" gap={6}>
                {badgeText && <Badge color={badgeColor}>{badgeText}</Badge>}
                <Text as="span" textType="footnote" color="textAssistive" ellipsis={true}>
                  {subText}
                </Text>
              </Container>
            </Container>
            <Container display="flex">
              {subButtonIcon && (
                <Button
                  variant="secondary"
                  size="m"
                  icon={subButtonIcon}
                  style={{
                    borderRadius: vars.radius.borderRadius.round,
                    backgroundColor: vars.color.$palette.background.elevatedSecondary,
                  }}
                ></Button>
              )}
            </Container>
          </Container>
          {/* info-box */}
          {infos && (
            <InfoBox infos={infos} size="s" backgroundColor="backgroundElevatedSecondary" />
          )}
        </Container>
        {/* button */}
        {buttonText && <Button size="m">{buttonText}</Button>}
        {children}
      </Container>
    );
  }
);
