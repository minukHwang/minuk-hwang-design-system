import { vars } from '@minuk-hwang-design-system/style-tokens';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

const { accent, surface, border, textColor, status } = vars.color.$semantic;
const { opacity } = vars.color.$absolute;

/**
 * Every interactive surface in the system transitions the same way, and it is
 * short enough to read as feedback rather than animation.
 */
const transition = {
  transitionProperty: 'background-color, border-color, color, box-shadow, transform',
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
    /*
     * A `button` inherits neither family nor size from the page — left alone it
     * renders at the UA's 13.33px in the system UI face, which is why the label
     * looked unstyled beside everything around it.
     */
    fontFamily: 'inherit',
    fontWeight: vars.typography.fontWeight[600],
    // Labels are short; the extra tracking of default type at this weight makes
    // two-word buttons look loose.
    letterSpacing: '-0.005em',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    // A double-click on a button should not select its label.
    userSelect: 'none',
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
      s: {
        height: '40px',
        padding: `0 ${vars.spacing[12]}`,
        fontSize: vars.typography.fontSize[14],
        lineHeight: vars.typography.lineHeight[20],
      },
      m: {
        height: '48px',
        padding: `0 ${vars.spacing[16]}`,
        fontSize: vars.typography.fontSize[15],
        lineHeight: vars.typography.lineHeight[22],
      },
      l: {
        height: '56px',
        padding: `0 ${vars.spacing[20]}`,
        fontSize: vars.typography.fontSize[16],
        lineHeight: vars.typography.lineHeight[24],
      },
    },

    variant: {
      /** The one action a screen is about. At most one per view. */
      primary: {
        color: accent.onNormal,
        backgroundColor: accent.normal,
        selectors: {
          '&:hover:not(:disabled)': { backgroundColor: accent.strong },
          // Pressing moves it down a pixel rather than only changing colour.
          // On a filled button the colour shift is small; the movement is not.
          '&:active:not(:disabled)': {
            backgroundColor: accent.strong,
            transform: 'translateY(1px)',
          },
        },
      },
      /** Everything else that is still a real action. */
      secondary: {
        color: textColor.normal,
        // The canvas rather than the component surface, so a secondary button
        // stays legible on a card that is already painted `surface.default`.
        backgroundColor: surface.canvas,
        borderColor: border.normal,
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: surface.hover,
            borderColor: border.strong,
          },
          '&:active:not(:disabled)': {
            backgroundColor: surface.pressed,
            transform: 'translateY(1px)',
          },
        },
      },
      /** No box until you touch it. Toolbars, icon-only controls, card actions. */
      ghost: {
        color: textColor.normal,
        backgroundColor: 'transparent',
        selectors: {
          '&:hover:not(:disabled)': { backgroundColor: surface.hover },
          '&:active:not(:disabled)': {
            backgroundColor: surface.pressed,
            transform: 'translateY(1px)',
          },
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
          '&:active:not(:disabled)': {
            backgroundColor: status.error.strong,
            transform: 'translateY(1px)',
          },
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
