'use client';

import * as RadixSelect from '@radix-ui/react-select';
import * as React from 'react';

/**
 * Single-choice picker.
 *
 * A styled listbox is where hand-rolled components usually fail: typeahead,
 * scrolling the highlighted option into view, and keeping the trigger's
 * announced value in sync are all easy to miss.
 *
 * `Content` is portalled with `position="popper"` so it escapes overflow
 * containers and flips near the viewport edge.
 */

export type SelectContentProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Content> & {
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

const Content = React.forwardRef<React.ElementRef<typeof RadixSelect.Content>, SelectContentProps>(
  function SelectContent({ position = 'popper', sideOffset = 4, container, ...props }, ref) {
    return (
      <RadixSelect.Portal container={container}>
        <RadixSelect.Content {...props} ref={ref} position={position} sideOffset={sideOffset} />
      </RadixSelect.Portal>
    );
  }
);

export const Select = {
  Root: RadixSelect.Root,
  Trigger: RadixSelect.Trigger,
  /** Renders the chosen option's label, or the placeholder when empty. */
  Value: RadixSelect.Value,
  Icon: RadixSelect.Icon,
  Content,
  Viewport: RadixSelect.Viewport,
  Item: RadixSelect.Item,
  ItemText: RadixSelect.ItemText,
  ItemIndicator: RadixSelect.ItemIndicator,
  Group: RadixSelect.Group,
  Label: RadixSelect.Label,
  Separator: RadixSelect.Separator,
  ScrollUpButton: RadixSelect.ScrollUpButton,
  ScrollDownButton: RadixSelect.ScrollDownButton,
};
