'use client';

import * as RadixTooltip from '@radix-ui/react-tooltip';
import * as React from 'react';

/**
 * Short label shown on hover or focus.
 *
 * Only ever supplementary. A tooltip is invisible on touch, unreachable by
 * keyboard beyond its trigger, and gone the moment focus moves — so anything a
 * user must read to proceed does not belong in one. Interactive content belongs
 * in `popover`.
 *
 * `Provider` shares open/close timing across every tooltip beneath it, which is
 * what stops a row of icons from each running its own delay. Mount it once near
 * the root.
 */

const DEFAULT_SIDE_OFFSET = 6;
const DEFAULT_COLLISION_PADDING = 8;

export type TooltipContentProps = React.ComponentPropsWithoutRef<typeof RadixTooltip.Content>;

const Content = React.forwardRef<
  React.ElementRef<typeof RadixTooltip.Content>,
  TooltipContentProps
>(function TooltipContent(
  { sideOffset = DEFAULT_SIDE_OFFSET, collisionPadding = DEFAULT_COLLISION_PADDING, ...props },
  ref
) {
  return (
    <RadixTooltip.Portal>
      <RadixTooltip.Content
        {...props}
        ref={ref}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
      />
    </RadixTooltip.Portal>
  );
});

export const Tooltip = {
  /** Mount once near the app root so delays are shared. */
  Provider: RadixTooltip.Provider,
  Root: RadixTooltip.Root,
  Trigger: RadixTooltip.Trigger,
  Content,
  Arrow: RadixTooltip.Arrow,
};
