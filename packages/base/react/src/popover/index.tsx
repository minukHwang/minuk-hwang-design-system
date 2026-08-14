'use client';

import * as RadixPopover from '@radix-ui/react-popover';
import * as React from 'react';

/**
 * Overlay anchored to a trigger, holding interactive content.
 *
 * Use it over `tooltip` whenever the content can be focused or clicked —
 * tooltips are not reachable by keyboard and disappear on blur, so a link inside
 * one is unusable. If the content is a list of actions, `dropdown-menu` is the
 * closer fit; it adds menu semantics this does not.
 */

const DEFAULT_SIDE_OFFSET = 8;
const DEFAULT_COLLISION_PADDING = 8;

export type PopoverContentProps = React.ComponentPropsWithoutRef<typeof RadixPopover.Content> & {
  /**
   * Where the portal renders.
   *
   * A portal defaults to `body`, which is outside anything a component
   * rendered — including whatever element carries the theme attributes. The
   * styled layer passes the themed element here, so a surface opened after a
   * dial moved is not left on the appearance the page started with.
   */
  container?: HTMLElement;
};

const Content = React.forwardRef<
  React.ElementRef<typeof RadixPopover.Content>,
  PopoverContentProps
>(function PopoverContent(
  {
    sideOffset = DEFAULT_SIDE_OFFSET,
    collisionPadding = DEFAULT_COLLISION_PADDING,
    container,
    ...props
  },
  ref
) {
  return (
    <RadixPopover.Portal container={container}>
      <RadixPopover.Content
        {...props}
        ref={ref}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
      />
    </RadixPopover.Portal>
  );
});

export const Popover = {
  Root: RadixPopover.Root,
  Trigger: RadixPopover.Trigger,
  /** Anchors the popover to something other than the trigger. */
  Anchor: RadixPopover.Anchor,
  Content,
  Close: RadixPopover.Close,
  /** Optional pointer. Needs a fill color to be visible. */
  Arrow: RadixPopover.Arrow,
};
