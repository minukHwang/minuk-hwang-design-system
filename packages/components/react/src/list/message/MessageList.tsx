import { forwardRef } from 'react';
import { CommonProps } from '../../common/types';
import { Container } from '../../common/container/Container';
import { Text } from '../../common/text/Text';
import { Badge } from '../../badge/Badge';
import { Icon } from '../../common/icon/Icon';
import { messageListRecipe } from './style.css';
import clsx from 'clsx';

interface MessageListProps extends Omit<CommonProps, 'color'> {
  title?: string;
  date: string;
  content: string;
  isRead: boolean;
  isChecked: boolean;
  following: string;
  variant: 'default' | 'danger' | 'warning';
  mode: 'default' | 'round';
}

const colorMap: { [key in MessageListProps['variant']]: 'blue' | 'pink' | 'orange' } = {
  default: 'blue',
  danger: 'pink',
  warning: 'orange',
};

/**
 * MessageList 컴포넌트
 *
 * @param {string} props.title - 메시지 제목 (선택)
 * @param {Date} props.date - 메시지 날짜 (필수)
 * @param {string} props.content - 메시지 내용 (필수)
 * @param {boolean} props.isRead - 읽음 여부 (필수)
 * @param {boolean} props.isChecked - 체크 여부 (필수)
 * @param {string} props.following - 팔로잉 상태 (필수)
 * @param {'default' | 'danger' | 'warning'} props.variant - 메시지 타입 (필수)
 * @param {'default' | 'round'} props.mode - 메시지 모드 (필수)
 * @param {string} [props.className] - 추가 CSS 클래스 (선택)
 * @param {...any} props - 기타 HTML 속성
 * @param {React.Ref<HTMLElement>} ref - 전달받은 ref
 */
export const MessageList = forwardRef<HTMLElement, MessageListProps>(
  (
    {
      title,
      date = '2024/07/18 09:15:40',
      content = 'content',
      isRead = false,
      isChecked = false,
      following = 'following',
      variant,
      mode = 'default',
      className,
      ...props
    },
    ref,
  ) => {
    const color = colorMap[variant] || 'blue';
    const messageListClass = messageListRecipe({ variant, mode });

    return (
      <Container
        ref={ref}
        as="li"
        className={clsx(messageListClass, className)}
        display="flex"
        alignItems="center"
        paddingX={16}
        paddingY={12}
        style={{ cursor: 'pointer' }}
        {...props}
      >
        {!isRead && (
          <Container height="100%" display="flex" paddingRight={12}>
            <Icon size={8} color={`${color}500`}>
              circle
            </Icon>
          </Container>
        )}
        <Container display="flex" flexDirection="column" width="100%" gap={8}>
          <Container display="flex" flexDirection="column" gap={2}>
            <Container display="flex" alignItems="center" height={24} gap={8}>
              {title && (
                <Text as="h5" textType="body2" textMode="bold">
                  {title}
                </Text>
              )}
              <Badge color={color}>{following}</Badge>
              {isChecked && (
                <Icon size={20} color={`${color}500`}>
                  verified
                </Icon>
              )}
            </Container>
            <Text textType="label" color="textAssistive">
              {date}
            </Text>
          </Container>
          <Text textType="body3" textMode="reading">
            {content}
          </Text>
        </Container>
      </Container>
    );
  },
);
