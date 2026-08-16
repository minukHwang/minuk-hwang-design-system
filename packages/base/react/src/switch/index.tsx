'use client';

import * as RadixSwitch from '@radix-ui/react-switch';

/**
 * On/off toggle that applies immediately.
 *
 * Distinct from a checkbox: a switch takes effect the moment it is flipped,
 * while a checkbox waits for a submit. It announces as `role="switch"`, so
 * choosing the wrong one misleads screen-reader users about whether anything
 * has happened yet.
 */
export const Switch = {
  Root: RadixSwitch.Root,
  /** The moving knob. */
  Thumb: RadixSwitch.Thumb,
};
