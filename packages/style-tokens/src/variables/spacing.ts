/**
 * Spacing scale, keyed by pixels.
 *
 * Numbers rather than t-shirt sizes because there is nothing to translate: a
 * design says 16 and the code says `spacing[16]`. Values are in rem so the scale
 * still answers to the user's font size.
 *
 * `0` is a token for the same reason the rest are. Without it `padding: 0` has
 * to be written as a raw value, which is exactly the escape hatch the scale
 * exists to close — and it is the most common spacing value there is.
 */
export const spacing = {
  0: '0rem',
  1: '0.0625rem', // 5xs
  2: '0.125rem', // 4xs
  4: '0.25rem', // 3xs
  6: '0.375rem', // 2xs
  8: '0.5rem', // xs
  10: '0.625rem', // s
  12: '0.75rem', // sm
  14: '0.875rem', // m
  16: '1rem', // base
  18: '1.125rem', // ml
  20: '1.25rem', // l
  24: '1.5rem', // xl
  28: '1.75rem', // 2xl
  32: '2rem', // 3xl
  36: '2.25rem', // 4xl
  40: '2.5rem', // 5xl
  44: '2.75rem', // 6xl
  48: '3rem', // 7xl
  56: '3.5rem', // 8xl
  64: '4rem', // 9xl
};
