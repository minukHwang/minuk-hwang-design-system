import { vars } from '@minuk-hwang-design-system/style-tokens';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

const { accent, surface, border, textColor, status } = vars.color.$semantic;
const { opacity } = vars.color.$absolute;

/**
 * Every interactive surface in the system transitions the same way, and it is
 * short enough to read as feedback rather than animation.
 */
const transition = {
  transitionProperty: 'background-color, border-color, color, box-shadow',
  transitionDuration: vars.motion.duration[70],
  transitionTimingFunction: vars.motion.easing.standard,
};

/**
 * Focus is drawn with an outline rather than a border, so the ring sits outside
 * the box and the button does not change size when it receives focus. Offsetting
 * it by 2px keeps it legible on a filled variant, where a flush ring would be
 * swallowed by the fill.
 */
const focusRing = {
  outline: `2px solid ${border.focus}`,
  outlineOffset: '2px',
};

export const buttonRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.spacing[6],
    borderRadius: vars.borderRadius[8],
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    ...transition,
    selectors: {
      '&:focus-visible': focusRing,
      // `loading` is a real state, not just a disabled one — the base layer sets
      // aria-busy, and the cursor should say "wait" rather than "not allowed".
      '&[aria-busy="true"]': { cursor: 'progress' },
      '&:disabled, &[aria-disabled="true"]': {
        cursor: 'not-allowed',
        opacity: opacity.disabledContainer,
      },
    },
  },

  variants: {
    /**
     * Heights are fixed so a row of buttons lines up regardless of whether each
     * one holds an icon, a label, or both.
     */
    size: {
      s: { height: '40px', padding: `${vars.spacing[2]} ${vars.spacing[8]}` },
      m: { height: '48px', padding: `${vars.spacing[6]} ${vars.spacing[12]}` },
      l: { height: '56px', padding: `${vars.spacing[10]} ${vars.spacing[16]}` },
    },

    variant: {
      /** The one action a screen is about. At most one per view. */
      primary: {
        color: accent.onNormal,
        backgroundColor: accent.normal,
        selectors: {
          '&:hover:not(:disabled)': { backgroundColor: accent.strong },
          '&:active:not(:disabled)': { backgroundColor: accent.strong },
        },
      },
      /** Everything else that is still a real action. */
      secondary: {
        color: textColor.normal,
        backgroundColor: surface.default,
        borderColor: border.normal,
        selectors: {
          '&:hover:not(:disabled)': { backgroundColor: surface.hover },
          '&:active:not(:disabled)': { backgroundColor: surface.pressed },
        },
      },
      /** No box until you touch it. Toolbars, icon-only controls, card actions. */
      ghost: {
        color: textColor.normal,
        backgroundColor: 'transparent',
        selectors: {
          '&:hover:not(:disabled)': { backgroundColor: surface.hover },
          '&:active:not(:disabled)': { backgroundColor: surface.pressed },
        },
      },
      /**
       * Deleting, and nothing else. `onNormal` records which text colour clears
       * AA on the error fill, so this stays legible if the hue is ever retuned.
       */
      danger: {
        color: status.error.onNormal,
        backgroundColor: status.error.normal,
        selectors: {
          '&:hover:not(:disabled)': { backgroundColor: status.error.strong },
          '&:active:not(:disabled)': { backgroundColor: status.error.strong },
        },
      },
    },

    /** Fills the container. Off by default — a button is as wide as its label. */
    block: {
      true: { width: '100%' },
      false: {},
    },

    /** Square, for a button whose whole content is one icon. */
    iconOnly: {
      true: { padding: 0, aspectRatio: '1' },
      false: {},
    },
  },

  defaultVariants: {
    size: 'm',
    variant: 'primary',
    block: false,
    iconOnly: false,
  },
});

export type ButtonVariants = RecipeVariants<typeof buttonRecipe>;
