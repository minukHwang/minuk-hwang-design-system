import { forwardRef } from 'react';

import { Button } from '../../button/Button';
import { Container } from '../../common/container/Container';
import { Icon } from '../../common/icon/Icon';
import { Text } from '../../common/text/Text';
import { CommonProps } from '../../common/types';

interface SocialContentListProps extends CommonProps {
  title: string;
  writer: string;
  date: string;
  location: string;
  viewCounts: number;
  commentCounts: number;
  content: string;
  isTrueCounts: number;
  isFalseCounts: number;
  isDetail: boolean;
  routeToPath?: React.MouseEventHandler<HTMLElement>;
  firstBtnFunc?: React.MouseEventHandler<HTMLElement>;
  secondBtnFucnt?: React.MouseEventHandler<HTMLElement>;
  isFact?: boolean;
}

export const SocialContentList = forwardRef<HTMLElement, SocialContentListProps>(
  (
    {
      children,
      title = 'title',
      writer = 'writer',
      date = '2024/07/18 09:15:40',
      location = 'location',
      viewCounts = 0,
      commentCounts = 0,
      content = 'content',
      isTrueCounts = 0,
      isFalseCounts = 0,
      isDetail,
      routeToPath = () => {},
      firstBtnFunc = () => {},
      secondBtnFucnt = () => {},
      isFact,
    },
    ref
  ) => {
    return (
      <Container ref={ref} as="li">
        {/* Title-area */}
        <Container
          onClick={routeToPath}
          style={{
            cursor: isDetail ? 'default' : 'pointer',
          }}
        >
          <Container display="flex" flexDirection="column" paddingX={16} paddingTop={20} gap={6}>
            <Container display="flex" justifyContent="space-between">
              <Container display="flex" alignItems="center" gap={8}>
                <Text textType="heading2" textMode="bold">
                  {title}
                </Text>
                {isFact && (
                  <Icon size={20} color={`blue500`}>
                    verified
                  </Icon>
                )}
              </Container>
              <Icon>more_horiz</Icon>
            </Container>
            <Container display="flex" gap={6}>
              <Text textType="label" color="textAlternative">
                {writer}
              </Text>
              <Text textType="label" color="textAssistive">
                {date}
              </Text>
            </Container>
          </Container>
          {/* Content-info */}
          <Container
            display="flex"
            paddingX={16}
            paddingY={12}
            justifyContent="space-between"
            alignItems="center"
          >
            <Container display="flex" alignItems="center" gap={4}>
              <Icon size={15} color="blue500">
                location_on
              </Icon>
              <Text as="span" textType="body3" color="blue500">
                {location}
              </Text>
            </Container>
            <Container display="flex" alignItems="center" gap={8}>
              <Container display="flex" gap={6}>
                <Text textType="label" color="textAssistive">
                  조회
                </Text>
                <Text textType="label" textMode="bold" color="textAlternative">
                  {viewCounts}
                </Text>
              </Container>
              <Text>·</Text>
              <Container display="flex" gap={6}>
                <Text textType="label" color="textAssistive">
                  댓글
                </Text>
                <Text textType="label" textMode="bold" color="textAlternative">
                  {commentCounts}
                </Text>
              </Container>
            </Container>
          </Container>
          {/*  */}
          <Container display="flex" justifyContent="center" alignItems="center" width="100%">
            {children}
            {/* <img src="/earthquake3-01.jpg" width={'100%'} /> */}
          </Container>
          <Container padding={16}>
            <Text>{content}</Text>
          </Container>
        </Container>
        <Container
          display="flex"
          padding={16}
          justifyContent="center"
          gap={64}
          borderType="borderTop"
        >
          <Container display="flex" gap={16} width={'100%'}>
            <Container display="flex" gap={8} width={'100%'}>
              <Button
                variant="secondary"
                design="outline"
                rightSubText={isTrueCounts}
                rightSubTextColor="uiPrimaryNormal"
                size="s"
                onClick={firstBtnFunc}
                style={{ borderRadius: '999px' }}
              >
                사실이에요
              </Button>
              <Button
                variant="secondary"
                design="outline"
                rightSubText={isFalseCounts}
                rightSubTextColor="pink500"
                size="s"
                onClick={secondBtnFucnt}
                style={{ borderRadius: '999px' }}
              >
                허위사실이에요
              </Button>
            </Container>
            {!isDetail && (
              <Container display="flex">
                <Button
                  variant="tertiary"
                  icon="chat"
                  iconColor="blueGray500"
                  leftSubText={commentCounts}
                  size="s"
                  onClick={routeToPath}
                ></Button>
              </Container>
            )}
          </Container>
        </Container>
      </Container>
    );
  }
);
