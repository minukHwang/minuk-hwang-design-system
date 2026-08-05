'use client';

import { Root as RadixLabel } from '@radix-ui/react-label';

/**
 * Label bound to a control.
 *
 * Worth using over a bare `<label>` for one behaviour: it suppresses text
 * selection on double-click, which otherwise highlights the label instead of
 * toggling the control.
 */
export const Label = RadixLabel;
