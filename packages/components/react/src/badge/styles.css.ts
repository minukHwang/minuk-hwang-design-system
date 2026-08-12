import { vars, pillWhenFull, textMetrics } from '@minuk-hwang-design-system/style-tokens';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

const { accent, surface, border, textColor, status } = vars.color.$semantic;

/**
 * Badges and chips both read as small rounded labels, and the difference is what
 * they are for. A badge reports state the user cannot change — a count, a
 * status, a category. A chip is a control: it filters, it toggles, it can be
 * removed. So a badge is never focusable and a chip always is.
 */
export const badgeRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: vars.spacing[4],
    // Goes pill-shaped with the buttons at `full`, and stays a rectangle with
    // them everywhere else. The chip beside it is a pill at every setting but
    // `none`, which is the difference between the two components rather than a
    // disagreement about the dial.
    borderRadius: pillWhenFull(vars.borderRadius[4]),
    /*
     * A transparent border on every badge, so the three appearances are the same
     * size. Only `outline` paints it; without the reservation that one would be
     * two pixels wider and a pixel taller than the tinted badge beside it.
     */
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    whiteSpace: 'nowrap',
    fontWeight: vars.typography.fontWeight[600],
  },

  variants: {
    /**
     * The two sizes differ in type, and only in type.
     *
     * It was the other way round: both ran at 13px and the inset changed, which
     * made `s` a medium badge with less room around it. Now the padding is the
     * same 2 by 6 on both and the type steps from 12 to 13, so the difference is
     * the label rather than the box — which is what a badge is.
     *
     * 12 is the bottom of the type scale. Below it a label stops being readable
     * at a glance, and being readable at a glance is the whole job.
     */
    size: {
      s: {
        padding: `${vars.spacing[2]} ${vars.spacing[6]}`,
        ...textMetrics(12),
      },
      m: {
        padding: `${vars.spacing[2]} ${vars.spacing[6]}`,
        ...textMetrics(13),
      },
    },

    /**
     * A fill and nothing else. The five chromatic tones keep the tone's own
     * `surface`; only the grey one is stepped up.
     *
     * Every tone was outlined before, and the outline was the chip's — same
     * token, same width. A chip is a control and a badge is not, so at
     * `radius="none"` the two became the same object with nothing on screen to
     * say which one you could press.
     *
     * The five chromatic tints do not need it: measured against the page they
     * are 3.4 to 4.9 ΔE apart, which is a hue difference and reads as one. Grey
     * has no hue to be seen by, so its 50 came to 2.99 and needs the step up to
     * 100, where it reaches 6.61. That is the exception, and it is carried by
     * the background rather than by a line.
     */
    tone: {
      neutral: { color: textColor.normal, backgroundColor: surface.sunken },
      accent: { color: accent.strong, backgroundColor: accent.surface },
      success: { color: status.success.strong, backgroundColor: status.success.surface },
      warning: { color: status.warning.strong, backgroundColor: status.warning.surface },
      error: { color: status.error.strong, backgroundColor: status.error.surface },
      info: { color: status.info.strong, backgroundColor: status.info.surface },
    },

    /**
     * Three appearances of the same tone.
     *
     * `soft` is the tint, and the default: a badge reports state, and state is
     * usually not the loudest thing on a screen. `solid` is the one that has to
     * be seen. `outline` is the quietest — it puts no fill on the page at all,
     * which is what a dense table of them wants.
     *
     * A boolean would have carried two of these and not the third, so this is an
     * enum from the start rather than a `solid` that later needs an `outline`
     * beside it and has to answer what both at once means.
     */
    variant: {
      soft: {},
      solid: {},
      outline: {},
    },
  },

  compoundVariants: [
    {
      variants: { tone: 'accent', variant: 'solid' },
      style: { color: accent.onNormal, backgroundColor: accent.normal },
    },
    {
      variants: { tone: 'success', variant: 'solid' },
      style: { color: status.success.onNormal, backgroundColor: status.success.normal },
    },
    {
      variants: { tone: 'warning', variant: 'solid' },
      style: { color: status.warning.onNormal, backgroundColor: status.warning.normal },
    },
    {
      variants: { tone: 'error', variant: 'solid' },
      style: { color: status.error.onNormal, backgroundColor: status.error.normal },
    },
    {
      variants: { tone: 'info', variant: 'solid' },
      style: { color: status.info.onNormal, backgroundColor: status.info.normal },
    },
    {
      variants: { tone: 'neutral', variant: 'solid' },
      style: { color: textColor.inverse, backgroundColor: textColor.normal },
    },

    /*
     * The border is the tone's `subtle` — step 200, the weight every other
     * hairline in the system runs at, and what the grey ramp calls
     * `border.normal`.
     *
     * Green and amber take `normal` instead. One step is not one weight: at 200
     * those two measure 1.32 against the page where the other four sit between
     * 1.57 and 1.94, because a bright hue has less room to be pale in. Reading
     * them off 500 brings them to 2.23 and 2.08, which is the same line as the
     * rest rather than a fainter one. Warning's text is picked a step out of line
     * for the same reason.
     *
     * It was `strong`, the label's own colour, on the argument that a non-text
     * edge wants 3:1. That is the wrong rule for this element: WCAG asks it of
     * visual information needed to identify a component or its state, and this
     * badge says "error" in words inside the box. The line carries nothing the
     * text does not, so it is decoration and can be as quiet as it looks best.
     *
     * The rule does bite one component here, and it is the chip: its fill is the
     * page's own colour, so its border is the only thing saying a control is
     * there, and that border measures 1.57:1. Recorded in TODO.md.
     */
    {
      variants: { tone: 'neutral', variant: 'outline' },
      style: { backgroundColor: surface.raised, borderColor: border.normal },
    },
    {
      variants: { tone: 'accent', variant: 'outline' },
      style: { backgroundColor: surface.raised, borderColor: accent.subtle },
    },
    {
      variants: { tone: 'success', variant: 'outline' },
      style: { backgroundColor: surface.raised, borderColor: status.success.normal },
    },
    {
      variants: { tone: 'warning', variant: 'outline' },
      style: { backgroundColor: surface.raised, borderColor: status.warning.normal },
    },
    {
      variants: { tone: 'error', variant: 'outline' },
      style: { backgroundColor: surface.raised, borderColor: status.error.subtle },
    },
    {
      variants: { tone: 'info', variant: 'outline' },
      style: { backgroundColor: surface.raised, borderColor: status.info.subtle },
    },
  ],

  defaultVariants: {
    size: 'm',
    tone: 'neutral',
    variant: 'soft',
  },
});

export type BadgeVariants = RecipeVariants<typeof badgeRecipe>;
