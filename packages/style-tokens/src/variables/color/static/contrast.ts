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
 */

export type ContrastMeasurement = {
  /** The 500 step, which is what a solid fill uses. */
  fill: string;
  /** Ratio against white text. AA wants 4.5 for body copy, 3 for large. */
  white: number;
  black: number;
  chosen: 'white' | 'black';
};

export const contrast: Record<'light' | 'dark', Record<string, ContrastMeasurement>> = {
  light: {
    red: { fill: '#eb1414', white: 4.52, black: 4.64, chosen: 'white' },
    crimson: { fill: '#ed123e', white: 4.41, black: 4.76, chosen: 'black' },
    pink: { fill: '#f70880', white: 3.96, black: 5.3, chosen: 'black' },
    magenta: { fill: '#df11d8', white: 4.03, black: 5.21, chosen: 'black' },
    purple: { fill: '#870df2', white: 6.23, black: 3.37, chosen: 'white' },
    indigo: { fill: '#3422f1', white: 7.94, black: 2.64, chosen: 'white' },
    blue: { fill: '#0868f7', white: 4.85, black: 4.33, chosen: 'white' },
    cyan: { fill: '#07ace4', white: 2.62, black: 8.03, chosen: 'black' },
    teal: { fill: '#08c9b9', white: 2.09, black: 10.07, chosen: 'black' },
    green: { fill: '#20c557', white: 2.29, black: 9.19, chosen: 'black' },
    lime: { fill: '#6cb10b', white: 2.65, black: 7.93, chosen: 'black' },
    yellow: { fill: '#f2d40d', white: 1.48, black: 14.2, chosen: 'black' },
    amber: { fill: '#f59f0a', white: 2.13, black: 9.85, chosen: 'black' },
    orange: { fill: '#f2610d', white: 3.24, black: 6.49, chosen: 'black' },
  },
  dark: {
    red: { fill: '#eb1414', white: 4.52, black: 4.64, chosen: 'white' },
    crimson: { fill: '#ed123e', white: 4.41, black: 4.76, chosen: 'black' },
    pink: { fill: '#f70880', white: 3.96, black: 5.3, chosen: 'black' },
    magenta: { fill: '#df11d8', white: 4.03, black: 5.21, chosen: 'black' },
    purple: { fill: '#870df2', white: 6.23, black: 3.37, chosen: 'white' },
    indigo: { fill: '#3422f1', white: 7.94, black: 2.64, chosen: 'white' },
    blue: { fill: '#0868f7', white: 4.85, black: 4.33, chosen: 'white' },
    cyan: { fill: '#07ace4', white: 2.62, black: 8.03, chosen: 'black' },
    teal: { fill: '#08c9b9', white: 2.09, black: 10.07, chosen: 'black' },
    green: { fill: '#20c557', white: 2.29, black: 9.19, chosen: 'black' },
    lime: { fill: '#6cb10b', white: 2.65, black: 7.93, chosen: 'black' },
    yellow: { fill: '#f2d40d', white: 1.48, black: 14.2, chosen: 'black' },
    amber: { fill: '#f59f0a', white: 2.13, black: 9.85, chosen: 'black' },
    orange: { fill: '#f2610d', white: 3.24, black: 6.49, chosen: 'black' },
  },
};
