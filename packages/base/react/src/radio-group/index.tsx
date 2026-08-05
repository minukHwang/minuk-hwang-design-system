'use client';

import * as RadixRadioGroup from '@radix-ui/react-radio-group';

/**
 * Mutually exclusive choices.
 *
 * The group is one tab stop, not one per option, and arrow keys move the
 * selection inside it. That is the part hand-rolled versions get wrong, and it
 * is why this cannot be a set of styled inputs.
 */
export const RadioGroup = {
  Root: RadixRadioGroup.Root,
  Item: RadixRadioGroup.Item,
  Indicator: RadixRadioGroup.Indicator,
};
