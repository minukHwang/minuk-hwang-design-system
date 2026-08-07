import { vars } from '@minuk-hwang-design-system/style-tokens';
import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

const { accent, surface, border, textColor, status } = vars.color.$semantic;

export const root = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: vars.spacing[12],
  padding: vars.spacing[16],
  borderRadius: vars.borderRadius[8],
  borderWidth: '1px',
  borderStyle: 'solid',
});

/**
 * Trailing content that is neither the icon nor the body — usually a button.
 *
 * Reaching for children means `globalStyle`; vanilla-extract only lets a rule
 * target the element it belongs to. The parts mark themselves with
 * `data-alert-part`, so this catches whatever the caller put after them without
 * needing them to know about a wrapper.
 */
globalStyle(`${root} > *:not([data-alert-part])`, {
  flex: 'none',
  alignSelf: 'center',
});

/**
 * Tinted rather than filled.
 *
 * An alert is usually one of several things on a page, and a saturated block is
 * a poor neighbour — it pulls attention permanently rather than while it matters.
 * `surface` gives the tint and `subtle` the edge; text sits at `strong`, which
 * clears AA against `surface` by construction.
 */
export const tone = styleVariants({
  neutral: {
    color: textColor.normal,
    backgroundColor: surface.default,
    borderColor: border.normal,
  },
  accent: {
    color: accent.strong,
    backgroundColor: accent.surface,
    borderColor: accent.subtle,
  },
  info: {
    color: status.info.strong,
    backgroundColor: status.info.surface,
    borderColor: status.info.subtle,
  },
  success: {
    color: status.success.strong,
    backgroundColor: status.success.surface,
    borderColor: status.success.subtle,
  },
  warning: {
    color: status.warning.strong,
    backgroundColor: status.warning.surface,
    borderColor: status.warning.subtle,
  },
  error: {
    color: status.error.strong,
    backgroundColor: status.error.surface,
    borderColor: status.error.subtle,
  },
});

export type AlertTone = keyof typeof tone;

/** Default glyph per tone, so the icon does not have to be chosen at every call site. */
export const toneIcon: Record<AlertTone, string> = {
  neutral: 'info',
  accent: 'info',
  info: 'info',
  success: 'check_circle',
  warning: 'warning',
  error: 'error',
};

/**
 * Nudged down to sit on the first line's baseline rather than its box top. The
 * icon's own box is its drawn height, so without this it floats above text of
 * the same nominal size.
 */
export const icon = style({
  marginTop: '1px',
});

/**
 * Takes the remaining width, which is what pushes a trailing action to the far
 * edge instead of leaving it jammed against the last word. `min-width: 0` lets
 * long text wrap rather than forcing the row wider than its container.
 */
export const body = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[4],
  minWidth: 0,
});

/**
 * Anything after the body — usually a button.
 *
 * Centred against the block rather than top-aligned like the icon: the icon
 * belongs to the first line of text, and an action belongs to the message as a
 * whole. It never shrinks, so a long message wraps instead of squeezing the
 * control that answers it.
 */
export const action = style({
  flex: 'none',
  alignSelf: 'center',
});
