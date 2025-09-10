import React, { forwardRef } from 'react';
import { Container } from '../../common/container/Container';
import { Text } from '../../common/text/Text';
import { Icon } from '../../common/icon/Icon';

interface TabListProps extends React.HTMLAttributes<HTMLElement> {
  icon: string;
}

export const TabList = forwardRef<HTMLElement, TabListProps>(({ icon, children }, ref) => {
  return (
    <Container display="flex" alignItems="center" paddingX={24} paddingY={16} gap={16} ref={ref}>
      <Icon>{icon}</Icon>
      <Text textMode="bold">{children}</Text>
    </Container>
  );
});
