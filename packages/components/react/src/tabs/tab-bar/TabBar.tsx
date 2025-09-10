import { forwardRef } from 'react';
import { Container } from '../../common/container/Container';
import { Tab } from '../tab/Tab';
import { activeTab } from './style.css';

type TabBarProps = {
  tabs: Array<{ content: string; state: 'default' | 'active' }>;
  className?: string;
};

export const TabBar = forwardRef<HTMLElement, TabBarProps>(({ tabs, className, ...props }, ref) => {
  const activeTabIndex = tabs.findIndex((tab) => tab.state === 'active');

  const updatedTabs = tabs.map((tab, index) => {
    const newState: 'default' | 'active' =
      index === (activeTabIndex !== -1 ? activeTabIndex : 0) ? 'active' : 'default';

    return {
      ...tab,
      state: newState,
    };
  });

  return (
    <Container
      ref={ref}
      display="flex"
      justifyContent="center"
      gap={32}
      className={className}
      {...props}
    >
      {updatedTabs.map((tab, index) => (
        <Tab
          key={index}
          content={tab.content}
          state={tab.state}
          className={tab.state === 'active' ? activeTab : ''}
        />
      ))}
    </Container>
  );
});
