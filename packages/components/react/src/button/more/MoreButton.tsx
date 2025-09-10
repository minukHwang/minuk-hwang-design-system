import { forwardRef } from 'react';
import { Text } from '../../common/text/Text';
import { Icon } from '../../common/icon/Icon';
import { Container } from '../../common/container/Container';
import { CommonProps } from '../../common/types';

export const MoreButton = forwardRef<HTMLDivElement, CommonProps>(
  ({ children = '더보기', className, ...props }, ref) => {
    return (
      <Container
        display="flex"
        padding={12}
        gap={4}
        style={{ cursor: 'pointer' }}
        ref={ref}
        className={className}
        {...props}
      >
        <Container display="flex" alignItems="center">
          <Text textType="body3" color="textAssistive">
            {children}
          </Text>
        </Container>
        <Icon color="textAssistive">chevron_right</Icon>
      </Container>
    );
  },
);
