'use client';

import * as RadixDialog from '@radix-ui/react-dialog';
import * as React from 'react';

/**
 * Modal dialog.
 *
 * Radix handles focus trapping, scroll locking, Escape and `aria-modal`. What is
 * fixed here is the part every caller wants and nobody should have to remember:
 * `Content` renders inside a portal with an overlay behind it, so a dialog never
 * inherits a stacking context or an `overflow: hidden` from wherever it was
 * written.
 *
 * Note the distinction from `alert-dialog`: this one closes on Escape and on an
 * outside click, because dismissing it is safe. Use the alert flavour when
 * dismissing would lose work.
 */

export type DialogContentProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Content> & {
  /** Class applied to the backdrop behind the dialog. */
  overlayClassName?: string;
  /** Renders without a portal, for cases where the dialog must stay in flow. */
  inline?: boolean;
};

const Content = React.forwardRef<React.ElementRef<typeof RadixDialog.Content>, DialogContentProps>(
  function DialogContent({ overlayClassName, inline = false, children, ...props }, ref) {
    const body = (
      <>
        <RadixDialog.Overlay className={overlayClassName} />
        <RadixDialog.Content {...props} ref={ref}>
          {children}
        </RadixDialog.Content>
      </>
    );

    return inline ? body : <RadixDialog.Portal>{body}</RadixDialog.Portal>;
  }
);

export const Dialog = {
  Root: RadixDialog.Root,
  Trigger: RadixDialog.Trigger,
  Content,
  /**
   * Required for screen readers. If the design has no visible title, wrap it in
   * VisuallyHidden rather than omitting it — Radix warns at runtime otherwise.
   */
  Title: RadixDialog.Title,
  Description: RadixDialog.Description,
  Close: RadixDialog.Close,
};
