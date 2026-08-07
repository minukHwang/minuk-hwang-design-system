import clsx from 'clsx';
import * as React from 'react';

import { spinner } from './styles.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type SpinnerProps = React.HTMLAttributes<HTMLSpanElement> & {
  size?: number;
  /**
   * Announced while work is in progress. Omit inside a control that already says
   * it is busy — a loading button sets `aria-busy`, and a second announcement
   * from within it is noise.
   */
  label?: string;
};

/*
 * ============================================
 * Component
 * ============================================
 */

/**
 * Indeterminate progress.
 *
 * Takes its colour from whatever it sits in, so it needs no variant per surface.
 * Stroke scales with size — a 16px ring with a 2px stroke reads as a smudge.
 */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = 16, label, className, ...props },
  ref
) {
  return (
    <span
      {...props}
      ref={ref}
      className={clsx(spinner, className)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: `${Math.max(1.5, size / 10)}px`,
        ...props.style,
      }}
      role={label ? 'status' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
});
