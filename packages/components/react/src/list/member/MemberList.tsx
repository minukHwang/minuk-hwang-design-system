import { forwardRef } from 'react';

import { Button } from '../../button/Button';
import { Container } from '../../common/container/Container';
import { Text } from '../../common/text/Text';
import { CommonProps } from '../../common/types';

interface FollowingListProps extends CommonProps {
  name: string;
  loginId: string;
  nickName?: string;
  onClick: () => void;
}

export const MemberList = forwardRef<HTMLElement, FollowingListProps>(
  ({ loginId, nickName, name, className, onClick }, ref) => {
    const handleDelete = () => {
      if (window.confirm(`${name}님을 추가 하시겠습니까?`)) {
        onClick();
      }
    };

    return (
      <Container
        display="flex"
        justifyContent="space-between"
        padding={16}
        backgroundColor="backgroundNormalPrimary"
        borderType="borderBottom"
        borderBottomColor="gray200"
        className={className}
        ref={ref}
      >
        <Container display="flex" flexDirection="column" gap={14}>
          {nickName ? (
            <Text textType="heading2" textMode="bold">
              {nickName}
            </Text>
          ) : (
            <Text textType="heading2" textMode="bold">
              {name}
            </Text>
          )}
          <Text textType="body3">{loginId}</Text>
        </Container>
        <Container display="flex" alignItems="center">
          <Button onClick={handleDelete}>추가하기</Button>
        </Container>
      </Container>
    );
  }
);
