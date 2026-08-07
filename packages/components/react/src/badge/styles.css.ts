import { vars } from '@minuk-hwang-design-system/style-tokens';
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
    borderRadius: vars.borderRadius[4],
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    whiteSpace: 'nowrap',
    fontSize: vars.typography.fontSize[13],
    lineHeight: vars.typography.lineHeight[18],
    fontWeight: vars.typography.fontWeight[600],
  },

  variants: {
    size: {
      s: { padding: `${vars.spacing[2]} ${vars.spacing[4]}` },
      m: { padding: `${vars.spacing[4]} ${vars.spacing[6]}` },
    },

    /**
     * `surface` and `subtle` on each status scale are what these are for — a
     * pale fill with text dark enough to sit on it. `strong` clears AA against
     * `surface` by construction, so no combination here needs checking by hand.
     */
    tone: {
      neutral: {
        color: textColor.normal,
        backgroundColor: surface.default,
        borderColor: border.normal,
      },
      accent: { color: accent.strong, backgroundColor: accent.surface },
      success: { color: status.success.strong, backgroundColor: status.success.surface },
      warning: { color: status.warning.strong, backgroundColor: status.warning.surface },
      error: { color: status.error.strong, backgroundColor: status.error.surface },
      info: { color: status.info.strong, backgroundColor: status.info.surface },
    },

    /** Filled rather than tinted, for the one badge on a screen that has to be seen. */
    solid: {
      true: {},
      false: {},
    },
  },

  compoundVariants: [
    {
      variants: { tone: 'accent', solid: true },
      style: { color: accent.onNormal, backgroundColor: accent.normal },
    },
    {
      variants: { tone: 'success', solid: true },
      style: { color: status.success.onNormal, backgroundColor: status.success.normal },
    },
    {
      variants: { tone: 'warning', solid: true },
      style: { color: status.warning.onNormal, backgroundColor: status.warning.normal },
    },
    {
      variants: { tone: 'error', solid: true },
      style: { color: status.error.onNormal, backgroundColor: status.error.normal },
    },
    {
      variants: { tone: 'info', solid: true },
      style: { color: status.info.onNormal, backgroundColor: status.info.normal },
    },
    {
      variants: { tone: 'neutral', solid: true },
      style: {
        color: textColor.inverse,
        backgroundColor: textColor.normal,
        borderColor: 'transparent',
      },
    },
  ],

  defaultVariants: {
    size: 'm',
    tone: 'neutral',
    solid: false,
  },
});

export type BadgeVariants = RecipeVariants<typeof badgeRecipe>;
