import css from './chrome.module.css';

/*
 * ============================================
 * Component
 * ============================================
 */

/**
 * The wordmark, set the way the portfolio sets it.
 *
 * The two sites are one person's, and a visitor arriving here from there should
 * not have to work out whether they have left. Same face — Plus Jakarta Sans,
 * loaded in the layout — same 14 over 10, same weights, same tracking on the
 * lower line. Only the role changes, because the thing being introduced here is
 * the system rather than the person.
 *
 * No starburst. The portfolio's own navigation renders the wordmark alone; the
 * mark is for its hero. Carrying it here would make this bar the louder of the
 * two.
 */
export const Logo = () => (
  <span className={css.logo}>
    <span className={css.logoName}>Minuk Hwang</span>
    <span className={css.logoRole}>Design System</span>
  </span>
);
