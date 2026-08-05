'use client';

import * as RadixAccordion from '@radix-ui/react-accordion';

/**
 * Collapsible sections.
 *
 * `type="single"` allows one open section at a time, `"multiple"` allows any
 * number; the choice changes the ARIA pattern, so it is required rather than
 * defaulted.
 *
 * Radix animates height through the `--radix-accordion-content-height` custom
 * property, which is the only reliable way to transition to `auto`.
 */
export const Accordion = {
  Root: RadixAccordion.Root,
  Item: RadixAccordion.Item,
  /** Must wrap Trigger — it supplies the heading level for screen readers. */
  Header: RadixAccordion.Header,
  Trigger: RadixAccordion.Trigger,
  Content: RadixAccordion.Content,
};
