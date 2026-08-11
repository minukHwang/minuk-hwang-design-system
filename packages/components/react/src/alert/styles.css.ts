import { vars } from '@minuk-hwang-design-system/style-tokens';
import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

const { accent, surface, textColor, status } = vars.color.$semantic;

export const root = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: vars.spacing[12],
  padding: vars.spacing[16],
  borderRadius: vars.borderRadius[8],
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
 * An action inside an alert takes the alert's tone.
 *
 * A `secondary` button carries neutral text and a neutral border, which on a red
 * panel reads as a grey box someone dropped there — the control answering the
 * message looked like it belonged to a different page.
 *
 * Everything comes off `currentColor`, which the tone has already set on the
 * root, so this is one rule rather than six and a new tone would need none. The
 * border is a fraction of it: at full strength the outline of a small button
 * competes with the message it sits beside.
 *
 * Only the two variants that are not filled. A `primary` or `danger` button has
 * a text colour measured against its own fill, and inheriting the panel's would
 * put the tone's text on the accent's background — a pairing nothing has
 * checked.
 */
globalStyle(`${root} [data-variant='secondary'], ${root} [data-variant='ghost']`, {
  color: 'inherit',
  backgroundColor: 'transparent',
  borderColor: `color-mix(in srgb, currentColor 32%, transparent)`,
});

/*
 * Hover strengthens the outline and leaves the fill alone.
 *
 * A wash of the text colour behind the label was the obvious hover, and it costs
 * contrast the tone cannot spare: the light success alert measures 4.77 at rest,
 * so even a 12% tint takes it to 4.08 and under the floor. The border is not
 * text and can darken for free.
 */
globalStyle(
  `${root} [data-variant='secondary']:hover:not(:disabled), ${root} [data-variant='ghost']:hover:not(:disabled)`,
  { borderColor: `color-mix(in srgb, currentColor 64%, transparent)` }
);

/**
 * Tinted rather than filled.
 *
 * An alert is usually one of several things on a page, and a saturated block is
 * a poor neighbour — it pulls attention permanently rather than while it matters.
 * `surface` gives the tint and text sits at `strong`, which clears AA against it
 * by construction. No border: the tint is a band across the page and is visible
 * on its own, and the line only made the panel look like a box that had been
 * drawn around the message rather than the message itself.
 */
export const tone = styleVariants({
  neutral: {
    color: textColor.normal,
    backgroundColor: surface.default,
  },
  accent: {
    color: accent.strong,
    backgroundColor: accent.surface,
  },
  info: {
    color: status.info.strong,
    backgroundColor: status.info.surface,
  },
  success: {
    color: status.success.strong,
    backgroundColor: status.success.surface,
  },
  warning: {
    color: status.warning.strong,
    backgroundColor: status.warning.surface,
  },
  error: {
    color: status.error.strong,
    backgroundColor: status.error.surface,
  },
});

export type AlertTone = keyof typeof tone;

/**
 * A filled action inside an alert is filled in the alert's tone.
 *
 * The tinted variants above can take `currentColor`, which the root has already
 * set to the tone's text. A filled button cannot: its background is the tone's
 * `normal` and the label on it is `onSolid`, the colour measured per hue per
 * theme as the one that clears AA there. Neither is derivable from the text
 * colour, so these are written out — six rules, and the pairs are the same ones
 * `Button` uses for its own primary, only in this alert's tone rather than the
 * document's accent.
 *
 * Without it an error alert answered itself with a blue button.
 */
const solidAction: Record<AlertTone, { fill: string; label: string; hover: string }> = {
  neutral: { fill: textColor.normal, label: textColor.inverse, hover: textColor.strong },
  accent: { fill: accent.normal, label: accent.onNormal, hover: accent.strong },
  info: { fill: status.info.normal, label: status.info.onNormal, hover: status.info.strong },
  success: {
    fill: status.success.normal,
    label: status.success.onNormal,
    hover: status.success.strong,
  },
  warning: {
    fill: status.warning.normal,
    label: status.warning.onNormal,
    hover: status.warning.strong,
  },
  error: { fill: status.error.normal, label: status.error.onNormal, hover: status.error.strong },
};

Object.entries(solidAction).forEach(([name, { fill, label, hover }]) => {
  const scope = tone[name as AlertTone];
  globalStyle(`${scope} [data-variant='primary']`, {
    backgroundColor: fill,
    color: label,
    borderColor: 'transparent',
  });
  globalStyle(`${scope} [data-variant='primary']:hover:not(:disabled)`, {
    backgroundColor: hover,
  });
});

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
