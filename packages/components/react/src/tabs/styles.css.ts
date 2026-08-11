import { vars, textMetrics } from '@minuk-hwang-design-system/style-tokens';
import { style } from '@vanilla-extract/css';

const { border, textColor } = vars.color.$semantic;
const { opacity } = vars.color.$absolute;

export const root = style({
  display: 'flex',
  flexDirection: 'column',
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
  borderBottom: `1px solid ${border.subtle}`,
  overflowX: 'auto',
  // Hides the horizontal scrollbar on a strip that overflows, which otherwise
  // adds a grey line right where the rail is.
  scrollbarWidth: 'none',
  selectors: { '&::-webkit-scrollbar': { display: 'none' } },
});

/**
 * The active indicator is a pseudo-element on the tab rather than one bar that
 * slides. A sliding bar has to be measured in JavaScript and re-measured on every
 * resize and font load; this is CSS that cannot fall out of sync.
 *
 * `scaleX` from the left is the legacy motif, kept — but on `duration[200]` and
 * the standard curve rather than the hard-coded 0.5s it used to run at, which was
 * slow enough that fast tab switching left the bar trailing behind.
 */
export const trigger = style({
  position: 'relative',
  flex: 'none',
  padding: `${vars.spacing[10]} ${vars.spacing[12]}`,
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
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: '-1px',
      width: '100%',
      height: '2px',
      borderTopLeftRadius: vars.borderRadius[4],
      borderTopRightRadius: vars.borderRadius[4],
      backgroundColor: textColor.normal,
      transform: 'scaleX(0)',
      transformOrigin: 'left',
      transitionProperty: 'transform',
      transitionDuration: vars.motion.duration[200],
      transitionTimingFunction: vars.motion.easing.standard,
    },
    '&:hover:not([data-disabled])': { color: textColor.normal },
    '&[data-state="active"]': { color: textColor.normal },
    '&[data-state="active"]::after': { transform: 'scaleX(1)' },
    '&:focus-visible': {
      outline: `2px solid ${border.focus}`,
      outlineOffset: '-2px',
      borderRadius: vars.borderRadius[4],
    },
    '&[data-disabled]': { cursor: 'not-allowed', opacity: opacity.disabledContent },
  },
});

export const panel = style({
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
