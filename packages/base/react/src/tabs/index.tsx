'use client';

import * as RadixTabs from '@radix-ui/react-tabs';

/**
 * Tabbed panels.
 *
 * The keyboard contract is the reason this is not a row of buttons: only the
 * active tab is in the tab order, and arrow keys move between the rest. Radix
 * also wires `aria-controls` and `aria-labelledby` between each trigger and its
 * panel, which is what lets a screen reader announce "tab 2 of 4".
 *
 * `activationMode="manual"` is worth knowing about — by default focusing a tab
 * activates it, which is wrong when switching panels is expensive.
 */
export const Tabs = {
  Root: RadixTabs.Root,
  /** The `role="tablist"` container. */
  List: RadixTabs.List,
  Trigger: RadixTabs.Trigger,
  Content: RadixTabs.Content,
};
