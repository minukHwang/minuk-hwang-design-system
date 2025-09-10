'use client';

import { forwardRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CommonProps } from '../../common/types';
import { Container } from '../../common/container/Container';
import { Text } from '../../common/text/Text';
import { Icon } from '../../common/icon/Icon';
import { DropDownBox } from '../../drop-down/drop-down-box/DropDownBox';

interface CommentListProps extends CommonProps {
  writer: string;
  date: string;
  isReply: boolean;
  isWriter: boolean;
}

export const CommentList = forwardRef<HTMLDivElement, CommentListProps>(
  (
    {
      writer = 'writer',
      children = 'content',
      date = '2024/07/18 09:15:40',
      isReply = false,
      isWriter = false,
      className,
    },
    ref,
  ) => {
    const options = ['수정하기', '삭제하기'];
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

    const effectivePadding = isReply ? 36 : 16;

    const handleIconClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (isWriter) {
        const rect = event.currentTarget.getBoundingClientRect();
        setDropdownPosition({ top: rect.bottom, left: rect.left });
        setDropdownVisible(!isDropdownVisible);
      } else {
        alert('해당 댓글을 신고하시겠습니까?');
      }
    };

    return (
      <>
        <Container
          display="flex"
          flexDirection="column"
          backgroundColor={isReply ? 'backgroundNormalSecondary' : 'backgroundNormalPrimary'}
          paddingLeft={effectivePadding}
          paddingRight={16}
          paddingY={16}
          gap={12}
          className={className}
          ref={ref}
        >
          <Container display="flex" justifyContent="space-between">
            <Container display="flex" gap={16}>
              <Text textType="body3" textMode="bold">
                {writer}
              </Text>
              <Text textType="body3">{children}</Text>
            </Container>
            <Container style={{ position: 'relative' }}>
              <Icon size={15} onClick={handleIconClick}>
                more_horiz
              </Icon>
            </Container>
          </Container>
          <Container display="flex" justifyContent="space-between" alignItems="flex-end">
            <Text textType="footnote" color="gray300">
              {date}
            </Text>
            {!isReply && (
              <Text textType="label" color="gray300">
                답글달기
              </Text>
            )}
          </Container>
        </Container>
        {isDropdownVisible &&
          createPortal(
            <DropDownBox
              options={options}
              style={{
                position: 'absolute',
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                zIndex: 1000,
              }}
            />,
            document.body,
          )}
      </>
    );
  },
);
