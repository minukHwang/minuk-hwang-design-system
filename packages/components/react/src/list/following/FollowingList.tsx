import { forwardRef } from 'react';
import { Container } from '../../common/container/Container';
import { Text } from '../../common/text/Text';
import { Icon } from '../../common/icon/Icon';
import { CommonProps } from '../../common/types';

interface FollowingListProps extends CommonProps {
  loginId: string;
  nickName?: string;
  name?: string;
  onDelete: () => void;
}

export const FollowingList = forwardRef<HTMLElement, FollowingListProps>(
  ({ name, nickName, loginId, children, className, onDelete }, ref) => {
    const handleDelete = () => {
      if (window.confirm(`${name ? name : nickName}님을 삭제하시겠습니까?`)) {
        onDelete();
      }
    };

    return (
      <Container
        display="flex"
        justifyContent="space-between"
        padding={16}
        borderRadius="base"
        backgroundColor="backgroundNormalPrimary"
        className={className}
        ref={ref}
      >
        <Container display="flex" flexDirection="column" paddingX={16} paddingY={12} gap={14}>
          <Text textType="heading2" textMode="bold">
            {nickName}
          </Text>
          <Text textType="body3">{loginId}</Text>
        </Container>
        <Container display="flex" alignItems="flex-end" paddingTop={16} gap={4}>
          <button onClick={handleDelete}>
            <Icon>delete_outline</Icon>
          </button>
          <a href={`/mypage/following/${nickName}`}>
            <Icon>edit</Icon>
          </a>
        </Container>
      </Container>
    );
  },
);
