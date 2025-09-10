import { forwardRef } from 'react';
import { CommonProps } from '../../../common/types';
import { Container } from '../../../common/container/Container';
import { Text } from '../../../common/text/Text';
import { Icon } from '../../../common/icon/Icon';

export interface InfoItemProps extends CommonProps {
  title: string;
  content: string;
  icon?: string;
  size?: 's' | 'm';
  link?: string;
}

const sizeVariants = {
  s: {
    paddingTop: 12 as const,
    paddingBottom: 16 as const,
    titleTextType: 'footnote' as const,
    contentTextType: 'body2' as const,
    iconSize: 16,
  },
  m: {
    paddingTop: 16 as const,
    paddingBottom: 20 as const,
    titleTextType: 'label' as const,
    contentTextType: 'headline' as const,
    iconSize: 18,
  },
};

/**
 * InfoItem 컴포넌트
 */
export const InfoItem = forwardRef<HTMLElement, InfoItemProps>(
  ({ title = 'title', content = 'content', icon, size = 'm', link, className, ...props }, ref) => {
    const { paddingTop, paddingBottom, titleTextType, contentTextType, iconSize } =
      sizeVariants[size];

    const handleClick = () => {
      if (link) {
        window.location.href = link;
      }
    };

    return (
      <Container
        ref={ref}
        className={className}
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        height="100%"
        paddingX={10}
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
        gap={8}
        onClick={handleClick}
        style={{ cursor: link ? 'pointer' : 'default' }}
        {...props}
      >
        <Text textType={titleTextType} textAlign="center" color="textAssistive">
          {title}
        </Text>
        <Container display="flex" alignItems="center" gap={6}>
          {icon && (
            <Icon size={iconSize} color="textAlternative">
              {icon}
            </Icon>
          )}
          <Text textType={contentTextType} textMode="bold" textAlign="center">
            {content}
          </Text>
        </Container>
      </Container>
    );
  },
);
