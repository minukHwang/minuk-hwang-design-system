/**
 * What white and black measure against each solid fill, per theme.
 *
 * GENERATED FILE. Run `node scripts/write-scales.js` to rebuild.
 *
 * `onSolid` is one line — white if it clears 4.5, otherwise black — and on
 * several hues the two answers are close enough that the line is a judgement
 * rather than a calculation. Red carries white at 4.52 and black at 4.64: both
 * legible, and the rule takes white because a red button set in black reads as a
 * hazard sign rather than as a button.
 *
 * A judgement that cannot be inspected is indistinguishable from an accident, so
 * the numbers ship. It is also the only way to notice that retuning a hue left
 * its margin at 0.02.
 *
 * The three greys are measured too, at the far end of their ramp rather than the
 * middle, which is where a solid neutral fill sits. They are the only rows whose
 * answer differs between the themes.
 */

export type ContrastMeasurement = {
  /** Which step the solid fill is drawn from: 500 for a hue, 950 for a grey. */
  step: number;
  fill: string;
  /** Ratio against white text. AA wants 4.5 for body copy, 3 for large. */
  white: number;
  black: number;
  chosen: 'white' | 'black';
};

export const contrast: Record<'light' | 'dark', Record<string, ContrastMeasurement>> = {
  light: {
    red: { step: 500, fill: '#eb1414', white: 4.52, black: 4.64, chosen: 'white' },
    crimson: { step: 500, fill: '#e8113c', white: 4.59, black: 4.58, chosen: 'white' },
    pink: { step: 500, fill: '#e40775', white: 4.58, black: 4.59, chosen: 'white' },
    magenta: { step: 500, fill: '#d110ca', white: 4.53, black: 4.64, chosen: 'white' },
    purple: { step: 500, fill: '#870df2', white: 6.23, black: 3.37, chosen: 'white' },
    indigo: { step: 500, fill: '#3422f1', white: 7.94, black: 2.64, chosen: 'white' },
    blue: { step: 500, fill: '#0868f7', white: 4.85, black: 4.33, chosen: 'white' },
    cyan: { step: 500, fill: '#07ace4', white: 2.62, black: 8.03, chosen: 'black' },
    teal: { step: 500, fill: '#08c9b9', white: 2.09, black: 10.07, chosen: 'black' },
    green: { step: 500, fill: '#20c557', white: 2.29, black: 9.19, chosen: 'black' },
    lime: { step: 500, fill: '#6cb10b', white: 2.65, black: 7.93, chosen: 'black' },
    yellow: { step: 500, fill: '#f2d40d', white: 1.48, black: 14.2, chosen: 'black' },
    amber: { step: 500, fill: '#f59f0a', white: 2.13, black: 9.85, chosen: 'black' },
    orange: { step: 500, fill: '#f2610d', white: 3.24, black: 6.49, chosen: 'black' },
    mono: { step: 950, fill: '#1a1a1a', white: 17.4, black: 1.21, chosen: 'white' },
    gray: { step: 950, fill: '#17191c', white: 17.61, black: 1.19, chosen: 'white' },
    slate: { step: 950, fill: '#15181e', white: 17.78, black: 1.18, chosen: 'white' },
  },
  dark: {
    red: { step: 500, fill: '#eb1414', white: 4.52, black: 4.64, chosen: 'white' },
    crimson: { step: 500, fill: '#e8113c', white: 4.59, black: 4.58, chosen: 'white' },
    pink: { step: 500, fill: '#e40775', white: 4.58, black: 4.59, chosen: 'white' },
    magenta: { step: 500, fill: '#d110ca', white: 4.53, black: 4.64, chosen: 'white' },
    purple: { step: 500, fill: '#870df2', white: 6.23, black: 3.37, chosen: 'white' },
    indigo: { step: 500, fill: '#3422f1', white: 7.94, black: 2.64, chosen: 'white' },
    blue: { step: 500, fill: '#0868f7', white: 4.85, black: 4.33, chosen: 'white' },
    cyan: { step: 500, fill: '#07ace4', white: 2.62, black: 8.03, chosen: 'black' },
    teal: { step: 500, fill: '#08c9b9', white: 2.09, black: 10.07, chosen: 'black' },
    green: { step: 500, fill: '#20c557', white: 2.29, black: 9.19, chosen: 'black' },
    lime: { step: 500, fill: '#6cb10b', white: 2.65, black: 7.93, chosen: 'black' },
    yellow: { step: 500, fill: '#f2d40d', white: 1.48, black: 14.2, chosen: 'black' },
    amber: { step: 500, fill: '#f59f0a', white: 2.13, black: 9.85, chosen: 'black' },
    orange: { step: 500, fill: '#f2610d', white: 3.24, black: 6.49, chosen: 'black' },
    mono: { step: 950, fill: '#e3e3e3', white: 1.28, black: 16.36, chosen: 'black' },
    gray: { step: 950, fill: '#e0e3e6', white: 1.29, black: 16.3, chosen: 'black' },
    slate: { step: 950, fill: '#dee2e8', white: 1.3, black: 16.15, chosen: 'black' },
  },
};
