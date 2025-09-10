import { topAppBarStyle, leftContentStyle, textStyle, iconWrapperStyle } from './style.css';

type TopAppBarProps = {
  icon?: boolean;
};

export const TopAppBar: React.FC<TopAppBarProps> = ({ icon = false }) => {
  return (
    <div className={topAppBarStyle}>
      <div className={leftContentStyle}>
        <div className={iconWrapperStyle.outer}>
          <div className={iconWrapperStyle.inner}>
            <span className={'material-symbols-outlined'}>{'arrow_back'}</span>
          </div>
        </div>
        <span className={textStyle}>Title</span>
      </div>
      {icon && (
        <div className={iconWrapperStyle.outer}>
          <div className={iconWrapperStyle.inner}>
            <span className={'material-symbols-outlined'}>{'add'}</span>
          </div>
        </div>
      )}
    </div>
  );
};
