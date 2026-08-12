import clsx from 'clsx';
import * as React from 'react';

import { spinner } from './styles.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type SpinnerProps = React.HTMLAttributes<HTMLSpanElement> & {
  /**
   * Override the size the surrounding component asked for. Omit it inside a
   * `Button`, which sizes its spinner exactly as it sizes its icons; elsewhere
   * the default is 16px.
   */
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
 * Takes its color from whatever it sits in, so it needs no variant per surface.
 * Stroke scales with size — a 16px ring with a 2px stroke reads as a smudge.
 */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size, label, className, ...props },
  ref
) {
  return (
    <span
      {...props}
      ref={ref}
      className={clsx(spinner, className)}
      /*
       * The dimensions, not the property the stylesheet reads — an explicit size
       * is the size, and going through that property would hand it to the
       * stylesheet's own arithmetic and come back two pixels short.
       *
       * Omitting `size` leaves this undefined, which is what lets the container
       * decide. A default written here would overrule it.
       */
      style={
        size
          ? {
              width: `${size}px`,
              height: `${size}px`,
              borderWidth: `${Math.max(1.5, size / 10)}px`,
              ...props.style,
            }
          : props.style
      }
      role={label ? 'status' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
});
