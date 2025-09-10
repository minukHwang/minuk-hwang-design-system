import React, { useState, forwardRef } from 'react';
import { Container } from '../../common/container/Container';
import { DropDownItem } from '../drop-down-item/DropDownItem';

interface DropDownBoxProps extends React.HTMLAttributes<HTMLElement> {
  options: string[];
}

/**
 * DropDownBox
 * @param {string[]} props.options - 드롭다운 메뉴에 표시될 옵션 배열 (필수)
 * @param {string} [props.className] - 추가 CSS 클래스 (선택)
 * @param {...any} props - 기타 HTML 속성
 */
export const DropDownBox = forwardRef<HTMLElement, DropDownBoxProps>(({ options }, ref) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <Container display="flex" ref={ref}>
      <Container
        display="flex"
        flexDirection="column"
        padding={6}
        gap={4}
        borderRadius="s"
        boxShadow="s"
        backgroundColor="backgroundNormalPrimary"
      >
        {options.map((item, index) => (
          <DropDownItem
            key={index}
            state={activeIndex === index ? 'active' : 'default'}
            onClick={() => handleItemClick(index)}
          >
            {item}
          </DropDownItem>
        ))}
      </Container>
    </Container>
  );
});
