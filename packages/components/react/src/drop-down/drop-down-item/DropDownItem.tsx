import React, { forwardRef } from 'react';
import { Container } from '../../common/container/Container';
import { Text } from '../../common/text/Text';

interface DropDownItemProps extends React.HTMLAttributes<HTMLElement> {
  state?: 'default' | 'active';
}

/**
 * DropDownItem
 *
 * @param {'default' | 'active'} props.state - 드롭다운 항목의 상태 (선택, 기본값: 'default')
 * @param {React.ReactNode} props.children - 드롭다운 항목의 내용
 * @param {string} [props.className] - 추가 CSS 클래스 (선택)
 * @param {...any} props - 기타 HTML 속성
 */
export const DropDownItem = forwardRef<HTMLElement, DropDownItemProps>(
  ({ state = 'default', children, className, onClick }, ref) => {
    return (
      <Container
        display="flex"
        paddingX={16}
        paddingY={10}
        borderRadius="s"
        backgroundColor={state === 'active' ? 'gray50' : 'backgroundNormalPrimary'}
        style={{ width: '153px', cursor: 'pointer' }}
        className={className}
        ref={ref}
        onClick={onClick}
      >
        <Text textType="label">{children}</Text>
      </Container>
    );
  },
);
