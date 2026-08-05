'use client';

import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import * as React from 'react';

/**
 * Dialog for a decision that cannot be undone.
 *
 * Differs from `dialog` in ways that matter: it does not close on Escape or on
 * an outside click, focus lands on the cancel action rather than the first
 * focusable element, and it announces as `alertdialog`. Those are the reasons to
 * reach for it — a delete confirmation that vanishes on a stray click is worse
 * than one that does not.
 *
 * Both actions are required. A confirmation with no way out is a trap.
 */

export type AlertDialogContentProps = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialog.Content
> & {
  /** Class applied to the backdrop behind the dialog. */
  overlayClassName?: string;
};

const Content = React.forwardRef<
  React.ElementRef<typeof RadixAlertDialog.Content>,
  AlertDialogContentProps
>(function AlertDialogContent({ overlayClassName, children, ...props }, ref) {
  return (
    <RadixAlertDialog.Portal>
      <RadixAlertDialog.Overlay className={overlayClassName} />
      <RadixAlertDialog.Content {...props} ref={ref}>
        {children}
      </RadixAlertDialog.Content>
    </RadixAlertDialog.Portal>
  );
});

export const AlertDialog = {
  Root: RadixAlertDialog.Root,
  Trigger: RadixAlertDialog.Trigger,
  Content,
  Title: RadixAlertDialog.Title,
  Description: RadixAlertDialog.Description,
  /** The destructive choice. */
  Action: RadixAlertDialog.Action,
  /** The way out. Receives focus when the dialog opens. */
  Cancel: RadixAlertDialog.Cancel,
};
