import clsx from 'clsx';
import { forwardRef } from 'react';
import { stateStyle } from './style.css';
import { Text } from '../common/text/Text';
import { Icon } from '../common/icon/Icon';
import { Container } from '../common/container/Container';
import { CommonProps } from '../common/types';

interface NotificationProps extends CommonProps {
  state: 'default' | 'warning' | 'danger';
  content: string;
  icon?: string;
}

/**
 * Notification 컴포넌트
 *
 * @param {'default' | 'warning' | 'danger'} props.state - 알림의 상태 (필수)
 * @param {string} props.content - 알림의 내용 (필수)
 * @param {string} [props.icon='warning'] - 아이콘 (선택, 기본값: 'warning')
 * @param {string} [props.className] - 추가 CSS 클래스 (선택)
 * @param {...any} props - 기타 HTML 속성
 */
export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  ({ state = 'default', content = 'warning', icon = 'warning', ...props }, ref) => {
    const textColor = state === 'danger' ? 'white' : state === 'warning' ? 'pink500' : 'textNormal';

    return (
      <Container
        ref={ref}
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={20}
        className={clsx(stateStyle({ state }))}
        {...props}
      >
        <Icon color={textColor}>{icon}</Icon>
        <Text color={textColor}>{content}</Text>
      </Container>
    );
  },
);
