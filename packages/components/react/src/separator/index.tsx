'use client';

import { Separator as BaseSeparator } from '@minuk-hwang-design-system/base-react/separator';
import clsx from 'clsx';
import * as React from 'react';

import {
  orientation as orientationStyle,
  separator,
  SeparatorOrientation,
  size as sizeStyle,
} from './styles.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type SeparatorProps = React.ComponentPropsWithoutRef<typeof BaseSeparator> & {
  orientation?: SeparatorOrientation;
  /** Thickness in pixels. The length comes from whatever the rule sits in. */
  size?: 1 | 2 | 4 | 8 | 16;
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
  function Separator({ orientation = 'horizontal', size = 1, className, ...props }, ref) {
    return (
      <BaseSeparator
        {...props}
        ref={ref}
        orientation={orientation}
        className={clsx(separator, orientationStyle[orientation], sizeStyle[size], className)}
      />
    );
  }
);
