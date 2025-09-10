import { forwardRef } from 'react';
import { CommonProps } from '../common/types';
import * as styles from './style.css';

export const LoadingSpinner = forwardRef<HTMLElement, CommonProps>(() => {
  return <div className={styles.loader}></div>;
});
