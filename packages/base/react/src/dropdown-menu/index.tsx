'use client';

import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import * as React from 'react';

/**
 * Menu opened from a trigger.
 *
 * A menu is not a styled list. Radix supplies roving focus, typeahead, Escape,
 * outside-click dismissal and collision-aware positioning, plus `role="menu"`
 * and `aria-expanded` on the trigger.
 *
 * `Content` is portalled and carries default offsets so a menu opened near a
 * viewport edge flips rather than clipping. Both are overridable; the defaults
 * exist so the common case needs no thought.
 */

const DEFAULT_SIDE_OFFSET = 4;
const DEFAULT_COLLISION_PADDING = 8;

export type DropdownMenuContentProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.Content
> & {
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
  React.ElementRef<typeof RadixDropdownMenu.Content>,
  DropdownMenuContentProps
>(function DropdownMenuContent(
  {
    sideOffset = DEFAULT_SIDE_OFFSET,
    collisionPadding = DEFAULT_COLLISION_PADDING,
    container,
    ...props
  },
  ref
) {
  return (
    <RadixDropdownMenu.Portal container={container}>
      <RadixDropdownMenu.Content
        {...props}
        ref={ref}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
      />
    </RadixDropdownMenu.Portal>
  );
});

export const DropdownMenu = {
  Root: RadixDropdownMenu.Root,
  Trigger: RadixDropdownMenu.Trigger,
  Content,
  Item: RadixDropdownMenu.Item,
  /** Groups items under a label for screen readers. */
  Group: RadixDropdownMenu.Group,
  Label: RadixDropdownMenu.Label,
  Separator: RadixDropdownMenu.Separator,
  CheckboxItem: RadixDropdownMenu.CheckboxItem,
  RadioGroup: RadixDropdownMenu.RadioGroup,
  RadioItem: RadixDropdownMenu.RadioItem,
  /** Renders the check mark only when the item is selected. */
  ItemIndicator: RadixDropdownMenu.ItemIndicator,
  Sub: RadixDropdownMenu.Sub,
  SubTrigger: RadixDropdownMenu.SubTrigger,
  SubContent: RadixDropdownMenu.SubContent,
};
