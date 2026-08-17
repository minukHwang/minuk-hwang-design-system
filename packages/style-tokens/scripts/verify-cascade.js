/**
 * The dials have to be able to beat the theme they sit in.
 *
 * Every theme block restates the whole derived layer, including the default
 * accent and neutral ramps, because a custom property is substituted where it is
 * declared. That is what makes a theme work on an element instead of only on the
 * document. It also means a theme block and a dial block set the same properties
 * on the same element, and the cascade decides which one the component reads.
 *
 * A dial has to win. `<Theme accentColor="purple">` is a request, and a theme
 * block is the ground it is made against.
 *
 * This shipped wrong in 1.0.0. The rule that follows the operating system reads
 * `[data-theme-scope]:not([data-theme])`, which is two attribute selectors where
 * `[data-accent='purple']` is one, so under OS dark the accent was silently
 * reset to the default. Explicit `[data-theme="dark"]` ties with the dial and
 * loses on order, which is why turning the appearance dial hid the bug.
 *
 * Run with `node scripts/verify-cascade.js` against a built stylesheet.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Counts an id/class/type triple the way the cascade does. */
const specificity = selector => {
  let rest = selector;

  /*
   * `:where()` contributes nothing at all, whatever is inside it, which is the
   * whole reason the generator wraps the operating-system guard in one. Strip it
   * and its argument before anything else, or the argument gets counted and the
   * check reports the bug it was written to prove is gone.
   */
  rest = rest.replace(/:where\([^)]*\)/g, '');

  // `:not(...)` contributes its argument's specificity, not its own.
  const notArgs = [];
  rest = rest.replace(/:not\(([^)]*)\)/g, (_, inner) => {
    notArgs.push(inner);
    return '';
  });

  const count = s => ({
    id: (s.match(/#[\w-]+/g) || []).length,
    class: (s.match(/\.[\w-]+/g) || []).length + (s.match(/\[[^\]]+\]/g) || []).length,
    type: (s.match(/(^|[\s>+~])[a-z][\w-]*/gi) || []).length,
  });

  const total = count(rest);
  for (const arg of notArgs) {
    const inner = count(arg);
    total.id += inner.id;
    total.class += inner.class;
    total.type += inner.type;
  }
  return total;
};

const compare = (a, b) => a.id - b.id || a.class - b.class || a.type - b.type;

const format = s => `${s.id},${s.class},${s.type}`;

/**
 * Every top-level rule, with the order it appears in and what it declares.
 *
 * The properties matter. Two rules only compete when they set the same one, and
 * without that the check flags `:root:has([data-theme-root])`, which exists to
 * set `color-scheme` and touches no variable a dial writes.
 */
const readRules = css => {
  const rules = [];
  // Selectors sit at the start of a line and end at the opening brace. Media
  // queries indent what they hold, which is why the leading tabs are optional.
  const re = /^[\t ]*([^\n{}@][^\n{}]*)\{([^{}]*)\}/gm;
  let m;
  while ((m = re.exec(css))) {
    const selector = m[1].trim();
    if (!selector || selector.startsWith('/*')) continue;
    const declares = new Set(
      (m[2].match(/(^|[\s;])(--[\w-]+|[a-z-]+)\s*:/g) || []).map(d => d.replace(/[\s;:]/g, ''))
    );
    for (const part of selector.split(',')) {
      const one = part.trim();
      if (one) rules.push({ selector: one, index: m.index, declares });
    }
  }
  return rules;
};

/** Whether two rules set any of the same properties. */
const overlaps = (a, b) => {
  for (const prop of a.declares) if (b.declares.has(prop)) return true;
  return false;
};

const DIAL = /^\[data-(accent|neutral|radius|page-background)=/;
const THEME = /data-theme|\.dark|\.light|^html$/;

const run = () => {
  const cssPath = path.join(__dirname, '..', 'dist', 'style-tokens.css');
  if (!fs.existsSync(cssPath)) {
    console.error(`Build the package first: ${cssPath} does not exist.`);
    process.exit(1);
  }

  const css = fs.readFileSync(cssPath, 'utf8');
  const rules = readRules(css);

  const dials = rules.filter(r => DIAL.test(r.selector));
  const themes = rules.filter(r => THEME.test(r.selector) && !DIAL.test(r.selector));

  if (!dials.length || !themes.length) {
    console.error(
      `Found ${dials.length} dial rules and ${themes.length} theme rules. Expected both.`
    );
    process.exit(1);
  }

  const failures = [];
  for (const theme of themes) {
    const themeSpec = specificity(theme.selector);
    for (const dial of dials) {
      if (!overlaps(dial, theme)) continue;
      const dialSpec = specificity(dial.selector);
      const bySpecificity = compare(dialSpec, themeSpec);
      // A tie is fine as long as the dial is written later.
      const wins = bySpecificity > 0 || (bySpecificity === 0 && dial.index > theme.index);
      if (!wins) {
        failures.push(
          `  ${dial.selector} (${format(dialSpec)}) cannot override ` +
            `${theme.selector} (${format(themeSpec)})`
        );
      }
    }
  }

  const unique = [...new Set(failures)];
  if (unique.length) {
    console.error(`A theme block beats a dial in ${unique.length} pairings:\n`);
    console.error(unique.slice(0, 12).join('\n'));
    if (unique.length > 12) console.error(`  ... and ${unique.length - 12} more`);
    process.exit(1);
  }

  console.log(`Cascade holds: ${dials.length} dial rules all beat ${themes.length} theme rules.`);
};

run();
