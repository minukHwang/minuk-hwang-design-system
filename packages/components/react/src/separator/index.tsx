'use client';

import { Separator as BaseSeparator } from '@minuk-hwang-design-system/base-react/separator';
import clsx from 'clsx';
import * as React from 'react';

import { orientation as orientationStyle, separator, SeparatorOrientation } from './styles.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type SeparatorProps = React.ComponentPropsWithoutRef<typeof BaseSeparator> & {
  orientation?: SeparatorOrientation;
};

/*
 * ============================================
 * Component
 * ============================================
 */

/**
 * Divider between sections.
 *
 * Decorative by default, which is what the base layer sets: a line drawn between
 * two lists is a visual convenience, and announcing "separator" between every
 * pair of items makes a screen reader read the furniture. Pass `decorative={false}`
 * when the line is the only thing saying two regions are unrelated.
 */
export const Separator = React.forwardRef<React.ElementRef<typeof BaseSeparator>, SeparatorProps>(
  function Separator({ orientation = 'horizontal', className, ...props }, ref) {
    return (
      <BaseSeparator
        {...props}
        ref={ref}
        orientation={orientation}
        className={clsx(separator, orientationStyle[orientation], className)}
      />
    );
  }
);
