import { vars } from '@minuk-hwang-design-system/style-tokens';
import { style, styleVariants } from '@vanilla-extract/css';

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

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[4],
  minWidth: 0,
});
