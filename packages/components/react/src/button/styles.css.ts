import { vars, pillWhenFull, textMetrics } from '@minuk-hwang-design-system/style-tokens';
import { createVar, style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { iconSize } from '../shared/icon-size.css';
import { pressable } from '../shared/press.css';
import { hoverLayer, restLayer } from '../shared/state';

const { accent, background, border, neutral, status, textColor } = vars.color.$semantic;
const { opacity } = vars;

/**
 * The size's own horizontal padding, held in a property so the base can do
 * arithmetic on it.
 *
 * The icon insets below need to subtract from whatever the current size sets,
 * and a recipe variant cannot see the value another variant chose. Passing it
 * through a custom property is what lets one rule serve all three sizes instead
 * of three near-identical rules that have to be kept in step by hand.
 */
const paddingX = createVar();

/**
 * How much the icon's side gives back, which grows with the button.
 *
 * The correction is optical, not rhythmic: it exists because a glyph reads
 * lighter than a word at the same measured inset, and the gap between the two
 * widens as the type gets larger. So it is a per-size number rather than one
 * constant, and the numbers are written out rather than taken from `spacing` —
 * that ladder is even (0, 1, 2, 4, 6, 8), and the middle size wants 3.
 */
const iconInset = createVar();

/** The space between an icon and the label, set by the size and read by the content row. */
const gap = createVar();

/**
 * Every interactive surface in the system transitions the same way, and it is
 * short enough to read as feedback rather than animation.
 */
const transition = {
  transitionProperty:
    'background-image, background-color, border-color, color, box-shadow, transform',
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
  base: [
    pressable,
    {
      // The loading spinner is centered against this box, so the box has to be the
      // one it measures against. Without it the spinner positions itself on
      // whatever ancestor happens to be positioned, which is usually the page.
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: paddingX,
      paddingRight: paddingX,
      /*
       * A rounded rectangle at every setting but `full`, where it is a pill at all
       * three heights. Left to the factor alone it would be a pill at 32px and not
       * at 48px, because what turns a large radius into a pill is the browser
       * clamping it to half the box — and half of a box is a different number per
       * size.
       */
      borderRadius: pillWhenFull(vars.borderRadius[8]),
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      backgroundImage: restLayer,
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
        /*
         * An icon is optically lighter than a word, so the same measured inset
         * reads as more space on the side it sits. Giving a few pixels back evens
         * it out, by an amount small enough that a row of buttons where only some
         * carry icons still lines up.
         *
         * The side is an attribute rather than `:has()`, because CSS cannot tell
         * these two apart: in `<Icon />Create` and `Export<Icon />` the icon is a
         * `span` that is both `:first-child` and `:last-child`, since the label is
         * a text node and text nodes are not children for the purpose of those
         * selectors. The component knows the order and says so.
         */
        '&[data-leading-icon]': { paddingLeft: `calc(${paddingX} - ${iconInset})` },
        '&[data-trailing-icon]': { paddingRight: `calc(${paddingX} - ${iconInset})` },
        // `loading` is a real state, not just a disabled one — the base layer sets
        // aria-busy, and the cursor should say "wait" rather than "not allowed".
        '&[aria-busy="true"]': { cursor: 'progress' },
        '&:disabled, &[aria-disabled="true"]': {
          cursor: 'not-allowed',
          opacity: opacity.disabled,
        },
      },
    },
  ],

  variants: {
    /**
     * Heights are fixed so a row of buttons lines up regardless of whether each
     * one holds an icon, a label, or both.
     */
    size: {
      s: {
        vars: {
          [paddingX]: vars.spacing[10],
          [iconInset]: '2px',
          [iconSize]: '16px',
          [gap]: '4px',
        },
        height: '32px',
        ...textMetrics(14),
      },
      m: {
        vars: {
          [paddingX]: vars.spacing[14],
          [iconInset]: '3px',
          [iconSize]: '18px',
          [gap]: '5px',
        },
        height: '40px',
        ...textMetrics(15),
      },
      l: {
        vars: {
          [paddingX]: vars.spacing[20],
          [iconInset]: '4px',
          [iconSize]: '20px',
          [gap]: '6px',
        },
        height: '48px',
        ...textMetrics(17),
      },
    },

    variant: {
      /** The one action a screen is about. At most one per view. */
      primary: {
        color: accent.onNormal,
        backgroundColor: accent.normal,
        selectors: {
          '&:hover:not(:disabled)': { backgroundImage: hoverLayer },
        },
      },
      /**
       * Everything else that is still a real action.
       *
       * A filled button in the neutral tone: the tint a thing paints itself when
       * it has no hue to take one from. It carries weight beside a primary
       * without competing for the same color, and unlike the outline it does
       * not need a border to be a shape.
       *
       * The tone's own tint, the same one its badge is filled with.
       *
       * It is quiet against a dialog in the dark theme — `surface` and the
       * overlay level are the same color to within a part in 255 — which is the
       * price of the button matching the badge. A dialog wanting a neutral
       * button there should reach for `outline`.
       */
      secondary: {
        color: textColor.normal,
        backgroundColor: neutral.surface,
        selectors: {
          '&:hover:not(:disabled)': { backgroundImage: hoverLayer },
        },
      },
      /**
       * The same weight drawn as an edge instead of a fill.
       *
       * For a button on a surface that is already busy, or beside a filled one
       * where two fills would read as two primaries. `raised` rather than
       * transparent, so it stays a button on a page that has been tinted rather
       * than a hole in it.
       */
      outline: {
        color: textColor.normal,
        backgroundColor: background.raised,
        borderColor: border.normal,
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundImage: hoverLayer,
            borderColor: border.strong,
          },
        },
      },
      /** No box until you touch it. Toolbars, icon-only controls, card actions. */
      ghost: {
        color: textColor.normal,
        backgroundColor: 'transparent',
        selectors: {
          '&:hover:not(:disabled)': { backgroundImage: hoverLayer },
        },
      },
      /**
       * Deleting, and nothing else. `onNormal` records which text color clears
       * AA on the error fill, so this stays legible if the hue is ever retuned.
       */
      danger: {
        color: status.error.onNormal,
        backgroundColor: status.error.normal,
        selectors: {
          '&:hover:not(:disabled)': { backgroundImage: hoverLayer },
        },
      },
    },

    /** Fills the container. Off by default — a button is as wide as its label. */
    fullWidth: {
      true: { width: '100%' },
      false: {},
    },

    /**
     * Square, for a button whose whole content is one icon.
     *
     * Zero through the property rather than a `padding` of its own: the icon
     * insets in the base are attribute selectors and would outrank a `padding`
     * set on a variant class. The component leaves those attributes off an
     * icon-only button anyway, since there is no label for the icon to be inset
     * from — this only makes the two ways of arriving at zero agree.
     */
    iconOnly: {
      true: { vars: { [paddingX]: '0px' }, aspectRatio: '1' },
      false: {},
    },
  },

  defaultVariants: {
    size: 'm',
    variant: 'primary',
    fullWidth: false,
    iconOnly: false,
  },
});

export type ButtonVariants = RecipeVariants<typeof buttonRecipe>;

/**
 * The label and its icons, as one row inside the button.
 *
 * It exists so that `loading` can hide the content without removing it. The
 * component used to swap the children for a spinner, which made the button as
 * wide as the spinner — a submit button collapsing from "Publishing" to a dot
 * moves everything beside it, at the one moment the person is watching to see
 * whether their click registered.
 *
 * `visibility: hidden` rather than `opacity: 0`: the row keeps its size, so the
 * button keeps its width, and the text is taken out of the accessibility tree
 * rather than left readable to a screen reader that has just been told the
 * control is busy.
 */
export const content = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap,
  selectors: {
    // The button carries `aria-busy`; the row it wraps is what disappears.
    '[aria-busy="true"] &': { visibility: 'hidden' },
  },
});

/** Centered on the button rather than in the flow, so it needs no room of its own. */
export const loader = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'inline-flex',
});
