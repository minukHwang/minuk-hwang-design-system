import { vars, textMetrics } from '@minuk-hwang-design-system/style-tokens';
import { style } from '@vanilla-extract/css';

const { border, textColor } = vars.color.$semantic;
const { opacity } = vars;

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  /*
   * A tab set takes the width it is given rather than the width it wants.
   *
   * `min-width: 0` says it *may* be narrow; this is what makes it so. Sized by
   * its content it came out as wide as the whole strip laid end to end, and in a
   * wrapping flex parent it kept that width and hung out of the container — so
   * the strip's own `overflow-x` had nothing to scroll and whatever clipped
   * overflow cut the last tabs off instead.
   */
  width: '100%',
  minWidth: 0,
});

/**
 * The rail under the whole strip is what the active indicator sits on, so a tab
 * bar with one tab still reads as a tab bar rather than as a heading.
 */
export const list = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing[4],
  /*
   * The rail as an inset shadow rather than a border.
   *
   * A border sits outside the padding box, which is what the indicator below is
   * positioned against — so covering it meant hanging the bar a pixel past the
   * bottom, and that one pixel made the strip scrollable on the vertical axis as
   * well as the horizontal one. A shadow paints inside the box, so the indicator
   * can sit at zero and still cover the line.
   */
  boxShadow: `inset 0 -1px 0 ${border.subtle}`,
  /*
   * Without this the strip could not scroll, however many tabs it held.
   *
   * `overflow-x: auto` only does something once the box is narrower than its
   * contents, and this box is a flex item of the root — so `min-width: auto`
   * kept it as wide as all its tabs put together. On a phone a five-tab strip
   * simply ran off the side of the page, and the scroll it was supposed to have
   * had nothing to scroll.
   */
  minWidth: 0,
  overflowX: 'auto',
  /*
   * Only the horizontal axis scrolls. Left to resolve on its own the other one
   * becomes `auto` too — the spec turns a visible axis into auto when its
   * partner is not — and the strip picked up a pixel or two of vertical travel
   * that a trackpad could find.
   */
  overflowY: 'hidden',
  // Hides the horizontal scrollbar on a strip that overflows, which otherwise
  // adds a gray line right where the rail is.
  scrollbarWidth: 'none',
  selectors: { '&::-webkit-scrollbar': { display: 'none' } },
});

/**
 * One bar that travels, rather than one per tab that scales in.
 *
 * It is positioned from measurements — see `useIndicator` for what has to be
 * watched to keep those true — and everything about how it moves is here.
 *
 * `left` and `width` rather than a transform, because a transform would scale
 * the bar's own corners along with it and a 2px rule would arrive at the next
 * tab with the wrong ones. The two properties animate on the same curve, so the
 * near edge and the far edge arrive together.
 */
export const indicator = style({
  position: 'absolute',
  bottom: 0,
  height: '2px',
  borderTopLeftRadius: vars.borderRadius[4],
  borderTopRightRadius: vars.borderRadius[4],
  backgroundColor: textColor.normal,
  // Nothing to point at until the first tab has been measured.
  opacity: 0,
  pointerEvents: 'none',
  selectors: {
    '&[data-placed]': { opacity: 1 },
    /*
     * The transition is switched on a frame after the first placement, so the
     * bar does not slide in from the strip's left edge on load — a move nobody
     * made.
     */
    '&[data-ready]': {
      transitionProperty: 'left, width',
      transitionDuration: vars.motion.duration[200],
      transitionTimingFunction: vars.motion.easing.standard,
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transitionProperty: 'none',
    },
  },
});

/**
 * Two sizes, set once on the list rather than on every trigger.
 *
 * A strip where one tab is larger than its neighbours is a bug, not a layout, so
 * the size is not a per-trigger prop. The list carries `data-size` and the
 * triggers read it from above — which also means adding a tab cannot get it
 * wrong.
 *
 * 15 and 17, which are `Button`'s `m` and `l`. A tab strip labels a section or
 * it labels a page, and those are the two sizes that sit beside the controls
 * doing each of those jobs.
 */
export const trigger = style({
  position: 'relative',
  flex: 'none',
  padding: `${vars.spacing[14]} ${vars.spacing[16]}`,
  border: 'none',
  color: textColor.assistive,
  backgroundColor: 'transparent',
  ...textMetrics(15),
  fontFamily: 'inherit',
  fontWeight: vars.typography.fontWeight[600],
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  transitionProperty: 'color',
  transitionDuration: vars.motion.duration[100],
  transitionTimingFunction: vars.motion.easing.standard,

  selectors: {
    /*
     * An equal share of the strip, rather than the width of the label.
     *
     * `flex: 1` on its own is not enough: a flex item will not shrink below the
     * width of its content, and these labels are `nowrap`, so a strip of long
     * ones would push past its container instead of dividing it. `min-width: 0`
     * lets them shrink, and the two properties below say what happens when they
     * do — the label is clipped with an ellipsis rather than spilling over the
     * tab beside it.
     */
    '[data-fill] &': {
      flex: 1,
      minWidth: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    // The larger strip, read from the list above rather than set here.
    '[data-size="l"] &': {
      ...textMetrics(17),
      padding: `${vars.spacing[16]} ${vars.spacing[18]}`,
    },
    '&:hover:not([data-disabled])': { color: textColor.normal },
    '&[data-state="active"]': { color: textColor.normal },
    '&:focus-visible': {
      outline: `2px solid ${border.focus}`,
      outlineOffset: '-2px',
      borderRadius: vars.borderRadius[4],
    },
    '&[data-disabled]': { cursor: 'not-allowed', opacity: opacity.disabled },
  },
});

export const panel = style({
  minWidth: 0,
  paddingTop: vars.spacing[16],
  outline: 'none',
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${border.focus}`,
      outlineOffset: '2px',
      borderRadius: vars.borderRadius[8],
    },
  },
});
