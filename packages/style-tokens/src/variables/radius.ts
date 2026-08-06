/**
 * Corner radius, keyed by pixels — the same rule the spacing and type scales
 * follow. A design says 12 and the code says `borderRadius[12]`, with no size
 * vocabulary in between.
 *
 * The t-shirt names this replaced had a step called `s` (4px) sitting beside one
 * called `sm` (6px), and `m` (10px) beside `ml` (12px). Nothing about those
 * names says which is bigger, and `base` (8px) hid in the middle of the ladder
 * rather than at one end.
 *
 * `full` is the one name left, because it is not a measurement. It asks for a
 * pill regardless of the element's height, which is what the value is for — 999px
 * is simply past anything real.
 */
export const borderRadius = {
  0: '0rem', // 0px
  2: '0.125rem',
  4: '0.25rem',
  6: '0.375rem',
  8: '0.5rem',
  10: '0.625rem',
  12: '0.75rem',
  16: '1rem',
  24: '1.5rem',
  36: '2.25rem',
  full: '62.4375rem', // 999px, past anything real
};
