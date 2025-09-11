import { forwardRef } from 'react';

import { Container } from '../../../common/container/Container';
import { Divider } from '../../../common/divider/Divider';
import { CommonProps } from '../../../common/types';
import { InfoItem, InfoItemProps } from '../info-item/InfoItem';

export type Infos = Omit<InfoItemProps, 'size'>[];

interface InfoBoxProps extends CommonProps {
  infos: Infos;
  size?: 's' | 'm';
}

/**
 * InfoBox 컴포넌트
 *
 * @param {Infos} props.infos - InfoItem 컴포넌트에 전달될 정보 객체 배열 (필수, 객체 형식: {title: '제목', content: '내용', icon: '아이콘 이름', link: '링크 URL'})
 * @param {'s' | 'm'} [props.size='m'] - InfoItem 컴포넌트의 크기 (선택, 기본값: 'm')
 * @param {string} [props.backgroundColor] - 배경색 (선택)
 * @param {string} [props.className] - 추가 CSS 클래스 (선택)
 * @param {...CommonProps} props - Container 컴포넌트에 전달될 기타 속성
 * @param {React.Ref<HTMLElement>} ref - 전달받은 ref
 */
export const InfoBox = forwardRef<HTMLElement, InfoBoxProps>(
  ({ infos, backgroundColor, size = 'm', className, ...props }, ref) => {
    const infoItems = infos?.reduce((acc, item, index) => {
      if (index > 0) {
        acc.push(
          <Divider key={item.id || `divider-${index}`} orientation="vertical" margin={16} />
        );
      }
      acc.push(
        <InfoItem
          key={item.id || `info-${index}`}
          title={item.title}
          content={item.content}
          icon={item.icon}
          size={size}
          link={item.link}
        />
      );
      return acc;
    }, [] as React.ReactNode[]);

    return (
      <Container
        ref={ref}
        className={className}
        display="flex"
        width="100%"
        height="100%"
        backgroundColor={backgroundColor}
        borderRadius="ml"
        {...props}
      >
        {infoItems}
      </Container>
    );
  }
);
