import { vars } from '@minuk-hwang-design-system/style-tokens';
import { style } from '@vanilla-extract/css';

const { status, surface } = vars.color.$semantic;

/**
 * A row that deletes something.
 *
 * Colour alone does not carry this — the label has to say "Delete". The tint is
 * a second signal for people who can see it, not the only one.
 */
export const destructiveItem = style({
  color: status.error.normal,
  selectors: {
    '&[data-highlighted]': {
      color: status.error.strong,
      backgroundColor: status.error.surface,
    },
  },
});

export const subTrigger = style({
  justifyContent: 'space-between',
  selectors: {
    // Radix marks the trigger open while its submenu is showing, so the row
    // stays highlighted while the pointer is inside the child menu.
    '&[data-state="open"]': { backgroundColor: surface.hover },
  },
});

export const subTriggerIcon = style({
  marginLeft: 'auto',
  opacity: 0.6,
});
