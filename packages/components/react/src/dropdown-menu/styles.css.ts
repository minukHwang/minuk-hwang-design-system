import { vars } from '@minuk-hwang-design-system/style-tokens';
import { style } from '@vanilla-extract/css';

import { ROW_BLEED } from '../shared/overlay.css';
import { hoverLayer } from '../shared/state';

const { status, textColor } = vars.color.$semantic;

/**
 * A row that deletes something.
 *
 * Colour alone does not carry this — the label has to say "Delete". The tint is
 * a second signal for people who can see it, not the only one.
 *
 * Highlighted, it takes the shape `Button`'s `primary` has at rest: the tone's
 * solid fill with the label measured against it. It was the tone's `surface`
 * with `strong` on top, which is a badge — a quiet tint that says what the row
 * is rather than that it is about to run. The row a pointer is resting on before
 * something gets deleted should be the loudest thing in the menu.
 *
 * `backgroundImage: none` because the row underneath paints the hover ink on
 * `data-highlighted`, and ink over the fill would darken a colour that was
 * chosen and measured. `primary` is a flat fill until it is hovered, and for a
 * menu row highlighted *is* hovered.
 */
export const destructiveItem = style({
  color: status.error.normal,
  selectors: {
    '&[data-highlighted]': {
      color: status.error.onNormal,
      backgroundColor: status.error.normal,
      backgroundImage: 'none',
    },
  },
});

export const subTrigger = style({
  /*
   * The arrow's box goes flush with the row's edge rather than taking the row's
   * text padding, which put it ten pixels in.
   *
   * Flush is not flush to look at: a chevron is drawn inside its 16px box with
   * air on either side, so the mark still reads a few pixels short of the edge —
   * about where the check mark on the other side sits. Padding it as if it were
   * text counts that air twice.
   *
   * The label keeps its distance through the row's `gap`, so pulling the padding
   * off does not crowd it.
   *
   * `ROW_BLEED` because this replaces one of the row's own paddings, and the row
   * reaches past the panel's gutter at `radius="none"`.
   */
  paddingRight: ROW_BLEED,
  selectors: {
    // Radix marks the trigger open while its submenu is showing, so the row
    // stays highlighted while the pointer is inside the child menu.
    '&[data-state="open"]': { backgroundImage: hoverLayer },
  },
});

/**
 * Pushed right by `auto` rather than by `space-between` on the row, which only
 * lands the arrow correctly while the label is a single node.
 *
 * Quiet through its colour, not through `opacity`. The literal 0.6 here was the
 * last one left after the opacity tokens were cut down to a single `disabled`,
 * and it is the accordion's chevron in a different component — same mark, same
 * job, so the same `assistive` it uses.
 */
export const subTriggerIcon = style({
  marginLeft: 'auto',
  color: textColor.assistive,
});
