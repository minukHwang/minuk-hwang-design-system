import clsx from 'clsx';
import { forwardRef } from 'react';
import { Container } from '../../common/container/Container';
import { Text } from '../../common/text/Text';
import { commonStyle, stateStyle } from './style.css';

type TabProps = {
  content: string;
  state: 'default' | 'active';
  className?: string;
};

export const Tab = forwardRef<HTMLDivElement, TabProps>(
  ({ content, state, className = '' }, ref) => {
    const stateClass = state === 'active' ? stateStyle.active : stateStyle.default;

    return (
      <Container display="inline-block" paddingY={16} className={clsx(commonStyle, className)}>
        <Text textType="body1" textMode="bold" className={stateClass}>
          {content}
        </Text>
      </Container>
    );
  },
);
