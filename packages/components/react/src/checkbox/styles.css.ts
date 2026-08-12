import { vars, textMetrics } from '@minuk-hwang-design-system/style-tokens';
import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

const { accent, surface, border, status } = vars.color.$semantic;
const { opacity } = vars.color.$absolute;

/**
 * Checkbox and radio share everything but the corner radius, which is the whole
 * convention: square means "any number of these", round means "exactly one".
 * Users read that shape before they read the label, so it is not decoration.
 */
/**
 * The box is 20px and the thing you can hit is 24.
 *
 * WCAG 2.2 SC 2.5.8 asks for 24×24, and a 20px box only cleared it through the
 * spacing exception — undersized targets pass if a 24px circle centred on each
 * misses its neighbours. `group` stacks rows 10px apart, so it did pass, and it
 * passed because of a number in a different rule that nothing connects to this
 * one. Anyone laying out their own column of checkboxes was one gap value away
 * from failing, with nothing to tell them.
 *
 * Drawing the extra 4px instead makes it the control's own property. The square
 * on screen does not change, because growing it to 24 would make a checkbox the
 * size of the text beside it.
 *
 * The overflow is 2px per side, so two controls need 4px between them before
 * their targets touch. `group` leaves 10, which is 6px of clearance — and rows
 * only ever get further apart, since a label that wraps makes its row taller
 * while the control stays at the top of it.
 */
const HIT_TARGET = '24px';

const control = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 'none',
  width: '20px',
  height: '20px',
  padding: 0,
  // No paint of its own, so this is a hit area and nothing else. Centred on the
  // box rather than anchored to a corner, so the 4px is shared evenly and the
  // target stays symmetrical about the thing it belongs to.
  '::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: HIT_TARGET,
    height: HIT_TARGET,
    transform: 'translate(-50%, -50%)',
  },
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: border.strong,
  color: accent.onNormal,
  backgroundColor: surface.raised,
  cursor: 'pointer',
  transitionProperty: 'background-color, border-color',
  transitionDuration: vars.motion.duration[70],
  transitionTimingFunction: vars.motion.easing.standard,

  selectors: {
    '&:hover:not([data-disabled])': { borderColor: accent.normal },
    '&:focus-visible': {
      outline: `2px solid ${border.focus}`,
      outlineOffset: '2px',
    },
    // Indeterminate is filled too — it means "some are checked", which is closer
    // to on than to off, and an empty box would read as none.
    '&[data-state="checked"], &[data-state="indeterminate"]': {
      borderColor: accent.normal,
      backgroundColor: accent.normal,
    },
    '&[aria-invalid]': { borderColor: status.error.normal },
    '&[data-disabled]': {
      cursor: 'not-allowed',
      opacity: opacity.disabledContainer,
    },
  },
});

/**
 * The one radius in the system the dial cannot reach.
 *
 * A checkbox is square and a radio is round, and that is not decoration — it is
 * how someone knows before clicking whether picking this one unpicks the other.
 * Wire the radio to the dial and `radius="none"` squares it into a checkbox,
 * leaving two controls that look identical and behave differently.
 *
 * So `50%` is written out. The checkbox beside it does follow the dial, because
 * a rounder square is still a square.
 */
export const shape = styleVariants({
  checkbox: [control, { borderRadius: vars.borderRadius[4] }],
  radio: [control, { borderRadius: '50%' }],
});

export const indicator = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

/**
 * A heavier stroke on the tick and the dash than on any other glyph.
 *
 * Material Symbols is a variable font and the token stylesheet sets its weight
 * axis to 400 — a reading weight, which is right for an icon sitting beside
 * text. This one is not beside text: it is a 16px mark inside a 20px box, and
 * at 400 the stroke came out thin enough to read as a faint pencil line rather
 * than as the state of a control.
 *
 * 600 rather than 700, which starts to fill the box at this size.
 *
 * Reached through a descendant selector rather than set on the class, because
 * `.material-symbols-outlined` and a vanilla-extract class are both one class
 * of specificity — which of them won would come down to the order two
 * stylesheets happened to land in. Two classes settles it.
 *
 * Every axis is restated. `font-variation-settings` is one property rather than
 * four, so naming only `wght` would drop `FILL`, `GRAD` and `opsz` back to the
 * font's own defaults.
 */
globalStyle(`${indicator} .material-symbols-outlined`, {
  fontVariationSettings: `'FILL' 0, 'wght' 600, 'GRAD' 0, 'opsz' 24`,
});

/**
 * The dot inside a selected radio. Drawn rather than an icon, so it stays
 * perfectly centred, and round for the same reason its container is.
 */
export const radioDot = style({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: 'currentColor',
});

/**
 * Control and label as one row.
 *
 * `align-items: flex-start` rather than centre, so a label that wraps to three
 * lines keeps its box beside the first line instead of floating to the middle.
 *
 * 12 rather than 8. The control's hit area overhangs its box by 2px, so 8 left
 * 6px of visible space and the label sat closer to the square than it looked
 * like it should. The gap itself is not clickable — the row is a `div`, and the
 * label is its own element — so this is space, not target.
 */
export const row = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: vars.spacing[12],
});

/**
 * The label beside a checkbox, radio or switch.
 *
 * It had no size at all, so it rendered at whatever the surrounding page set —
 * which made the one piece of text that says what the control does the only
 * thing in the system whose size the system did not decide. Two consumers with
 * different body copy got two different controls.
 *
 * 15, a step under the 16 that `Input` and `Select` set their own text at. The
 * label names a control rather than setting a paragraph, so it takes the tight
 * line the scale pairs with that size rather than the reading one.
 */
const labelDisabled = { cursor: 'not-allowed', opacity: opacity.disabledContent } as const;

export const rowLabel = style({
  ...textMetrics(15),
  cursor: 'pointer',
  selectors: {
    '&[data-disabled]': labelDisabled,
    /*
     * Also when the control alone knows it is disabled.
     *
     * A `RadioGroup.Root` can disable the whole group, and Radix resolves that
     * as `context.disabled || disabled` — so the item is genuinely disabled and
     * carries `data-disabled`, while the component that renders the label only
     * ever saw the item's own prop, which is undefined. The label kept a pointer
     * cursor and full opacity in front of a control that would not respond to
     * it: the one arrangement worse than no affordance is a false one.
     *
     * Reading it off the control rather than passing it down means the group
     * case and the item case cannot disagree. The sibling combinator works
     * because the control precedes the label in these rows — `Switch` puts its
     * label first and keeps using the attribute, which is correct there, since
     * a switch has no group to be disabled by.
     */
    '[data-disabled] + &': labelDisabled,
  },
});

export const group = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[10],
});
