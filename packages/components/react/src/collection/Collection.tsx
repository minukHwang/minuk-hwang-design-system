import { Badge } from '../badge/Badge';
import { CommonProps } from '../common/types';
import { sizeStyle, infoStyle } from './style.css';

interface CollectionProps extends CommonProps {
  size: 's' | 'm';
  content: string;
  badge?: boolean;
}

export const Collection: React.FC<CollectionProps> = ({
  size = 'm',
  content = '지진',
  badge = true,
}) => {
  const sizeClass = sizeStyle[size];
  return (
    <div className={sizeClass}>
      <div>
        <img src="./collection_img.png" alt="collection-img" />
      </div>
      <div className={infoStyle}>
        <p>{content}</p>
        {badge && size === 'm' && <Badge color="blue" size="s" />}
      </div>
    </div>
  );
};
