/**
 * Palette scale generator
 *
 * Every chromatic scale in this system is a single hue walked along a fixed
 * lightness ladder at full saturation. Keeping the ladder in code rather than in
 * hand-picked hex values is what makes a new colour land consistently with the
 * ones that already exist.
 *
 * The ladders below were measured from the existing blue and orange scales,
 * which are the most regular ones in the system.
 *
 * Usage:
 *   node scripts/generate-palette.js red 0
 *   node scripts/generate-palette.js            # prints every configured hue
 */

const STEPS = [10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 990];

/** Lightness (%) per step for the light theme: near-white at 10, near-black at 990. */
const LIGHT_LADDER = [99, 95, 90, 80, 70, 60, 50, 41, 32, 23, 15, 10, 7];

/**
 * Lightness (%) per step for the dark theme.
 *
 * Not a straight mirror of the light ladder. Midtones read muddier against a
 * dark background, so they sit up to ~5 points brighter than a mirror would put
 * them.
 *
 * The top three steps stop at 93 rather than climbing to 99. Pure white on a
 * dark ground visually vibrates and gets harder to read, not easier — Material
 * caps `onSurface` at tone 90 and the brightest step Radix ships in a dark scale
 * is #c2e6ff, neither of which approaches white. Running to 99 also drained the
 * hue out of the step: every colour's dark-990 came out within 5/255 of #ffffff,
 * so `blue-990` was blue in name only.
 */
/*
 * Step 500 holds lightness 50 in both ladders, so the solid fill is literally
 * the same colour in either theme. It is the step that identifies the colour —
 * a brand blue button should be recognisably one blue — and it is also what
 * stops the AA answer from flipping: at 53 the dark fill sat just light enough
 * that white failed on red and blue while passing on both in the light theme.
 *
 * Every other step still runs its own way, because every other step is measured
 * against its own background rather than against a memory of the other theme.
 */
const DARK_LADDER = [8, 12, 17, 26, 35, 44, 50, 63, 72, 82, 85, 89, 93];

/**
 * Hues of the colours this system ships, in degrees.
 *
 * Spacing is deliberate: no two neighbours sit closer than 18°, which is roughly
 * where two ramps stop reading as separate families. The wheel is walked in
 * order so a new colour can be slotted in without renumbering anything.
 */
const HUES = {
  red: 0,
  orange: 22,
  amber: 38,
  yellow: 52,
  lime: 85,
  green: 140,
  teal: 175,
  cyan: 195,
  blue: 216,
  indigo: 245,
  purple: 272,
  magenta: 302,
  pink: 330,
  crimson: 348,
};

/**
 * Neutral families, ordered by how much blue they carry.
 *
 * The three sit where Tailwind's neutral / gray / slate sit, which is also where
 * the CSS keyword `slategray` lands. Saturation is what separates them; the hue
 * barely moves.
 */
const NEUTRALS = {
  neutral: { hue: 0, saturation: 0 },
  gray: { hue: 214, saturation: 10 },
  slate: { hue: 218, saturation: 19 },
};

/*
 * ============================================
 * Contrast
 * ============================================
 */

/** WCAG relative luminance. */
const channel = value => {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const luminance = hex =>
  0.2126 * channel(parseInt(hex.slice(1, 3), 16)) +
  0.7152 * channel(parseInt(hex.slice(3, 5), 16)) +
  0.0722 * channel(parseInt(hex.slice(5, 7), 16));

const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const WHITE = '#ffffff';
const BLACK = '#000000';

/**
 * Which text colour clears WCAG AA on top of a solid fill.
 *
 * Measured rather than listed. The hand-maintained table this replaced was
 * wrong in the dark theme and had no way of knowing: blue-500 carries white at
 * 4.83:1 on light and only 4.43:1 on dark, so a single answer for both themes
 * is a coin flip on which one it fails.
 *
 * Desaturating or retuning a hue moves the number, and a value derived from the
 * colour follows it. A value typed beside the colour does not.
 *
 * White wins ties, and anything that clears the floor counts as a tie. Picking
 * whichever number is larger put black on red — which passes at 4.64:1 and
 * still reads as a hazard sign rather than a button. Contrast decides what is
 * legible; convention decides between two legible answers.
 */
/**
 * Which text colour clears WCAG AA on top of a solid fill.
 *
 * Measured rather than listed. The hand-maintained table this replaced was
 * wrong in the dark theme and had no way of knowing.
 *
 * White wins ties, and anything that clears the floor counts as a tie. Picking
 * whichever number is larger put black on red — which passes at 4.64:1 and
 * still reads as a hazard sign rather than as a button. Contrast decides what
 * is legible; convention decides between two legible answers.
 *
 * There are no exceptions to this. There was one, briefly: orange carries
 * white at 3.24:1, which misses the floor, and the argument for allowing it
 * was that WCAG 2 is known to disagree with the eye on saturated mid-tones.
 * The argument held and the exception still went — seven hues carrying white
 * and seven carrying black is a straight split with nothing to explain, and a
 * rule with one exception is a rule nobody trusts.
 */
const onSolid = fill => (contrast(fill, WHITE) >= 4.5 ? WHITE : BLACK);

/** Reports any fill where neither text colour clears the 4.5:1 floor. */
const contrastReport = fill => ({
  white: contrast(fill, WHITE),
  black: contrast(fill, BLACK),
  passes: Math.max(contrast(fill, WHITE), contrast(fill, BLACK)) >= 4.5,
});

/**
 * Per-hue corrections.
 *
 * Equal HSL lightness does not mean equal perceived brightness. Cyan and green
 * read far lighter than blue at the same value, so their scales are pulled down
 * to sit alongside the rest. Without this, teal-500 comes out as #00ffea — a
 * highlighter colour no interface can use.
 *
 * `green` already carries this correction in the committed files; the entry here
 * documents the amount so a regenerated scale matches what is on disk.
 */
const TUNING = {
  /*
   * The hues below kept full saturation only because they were never measured
   * against anything. At L50 that puts red at a literal #ff0000 and amber at
   * #ffa200 — pure hues, which read as signage rather than as interface. These
   * are the smallest corrections that settle them without muddying the hue.
   */
  red: { saturation: 84 },
  orange: { saturation: 90 },
  amber: { saturation: 92 },
  yellow: { saturation: 90 },
  blue: { saturation: 94 },

  // Yellow through green is the brightest arc of the wheel; every scale in it
  // needs pulling down or it reads as a highlighter.
  lime: { saturation: 88, lightnessShift: -13 },

  // Green carries the highest perceptual chroma on the wheel. At full
  // saturation its midtones glow rather than sit on the page, so it runs
  // noticeably softer than its neighbours.
  green: { saturation: 72, lightnessShift: -5 },
  teal: { saturation: 92, lightnessShift: -9 },
  cyan: { saturation: 94, lightnessShift: -4 },

  // Pure blue-violet clips to an electric #1500ff at full chroma, which fights
  // blue rather than sitting between blue and purple.
  indigo: { saturation: 88, lightnessShift: 4 },

  /*
   * Magenta and pink sit at full chroma on most displays and overpower
   * neighbouring swatches; a little desaturation settles them.
   *
   * The lightness shifts are a different correction, and they buy a text
   * colour rather than a look. All three missed carrying white by a margin —
   * crimson by 0.09, magenta by 0.47, pink by 0.54 — and a saturated fill set
   * in black reads as a hazard sign rather than as a button. Dropping the
   * saturation far enough to clear 4.5 would have cost magenta 16 points and
   * pink 20, which is a different colour; one to four points of lightness costs
   * nothing anyone can see. `#ed123e` and `#e8113c` are the same crimson.
   */
  magenta: { saturation: 86, lightnessShift: -6 },
  pink: { saturation: 94, lightnessShift: -4 },
  purple: { saturation: 90 },

  // Crimson keeps a lower saturation than red so the two stay distinguishable
  // even though only 12° separates them.
  crimson: { saturation: 86, lightnessShift: -1 },
};

/**
 * Converts HSL to a hex string.
 *
 * @param h - Hue in degrees
 * @param s - Saturation as a percentage
 * @param l - Lightness as a percentage
 * @returns Lowercase hex colour, e.g. "#0066ff"
 */
const hslToHex = (h, s, l) => {
  const sat = s / 100;
  const lig = l / 100;
  const c = (1 - Math.abs(2 * lig - 1)) * sat;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lig - c / 2;

  const [r, g, b] = (() => {
    if (h < 60) return [c, x, 0];
    if (h < 120) return [x, c, 0];
    if (h < 180) return [0, c, x];
    if (h < 240) return [0, x, c];
    if (h < 300) return [x, 0, c];
    return [c, 0, x];
  })();

  const channel = v =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, '0');

  return `#${channel(r)}${channel(g)}${channel(b)}`;
};

/**
 * Builds one scale.
 *
 * @param hue - Hue in degrees
 * @param theme - 'light' or 'dark'
 * @param saturation - Saturation as a percentage
 * @returns Map of step to hex colour
 */
const buildScale = (hue, theme, tuning = {}) => {
  const ladder = theme === 'dark' ? DARK_LADDER : LIGHT_LADDER;
  const { saturation = 100, lightnessShift = 0 } = tuning;

  return Object.fromEntries(
    STEPS.map((step, i) => {
      // The shift tapers off at both ends so the near-white and near-black
      // anchors stay aligned with every other scale.
      const taper = 1 - Math.abs(ladder[i] - 50) / 50;
      const lightness = Math.min(99, Math.max(4, ladder[i] + lightnessShift * taper));
      return [step, hslToHex(hue, saturation, lightness)];
    })
  );
};

/**
 * Renders a scale as a TypeScript const declaration.
 * Steps run darkest-first to match the existing files.
 */
const toTypeScript = (name, scale) => {
  const body = [...STEPS]
    .reverse()
    .map(step => `  ${step}: '${scale[step]}',`)
    .join('\n');
  return `export const ${name} = {\n${body}\n};`;
};

const [, , nameArg, hueArg] = process.argv;

if (nameArg) {
  const hue = hueArg !== undefined ? Number(hueArg) : HUES[nameArg];
  if (hue === undefined) {
    console.error(`Unknown colour "${nameArg}". Pass a hue in degrees as the second argument.`);
    process.exit(1);
  }
  const tuning = TUNING[nameArg] ?? {};
  console.log(`// light\n${toTypeScript(nameArg, buildScale(hue, 'light', tuning))}\n`);
  console.log(`// dark\n${toTypeScript(nameArg, buildScale(hue, 'dark', tuning))}`);
} else if (process.argv[1] && process.argv[1].endsWith('generate-palette.js')) {
  Object.entries(HUES).forEach(([name, hue]) => {
    const scale = buildScale(hue, 'light', TUNING[name] ?? {});
    console.log(`// ${name} — hue ${hue}\n${toTypeScript(name, scale)}\n`);
  });
}

export {
  STEPS,
  HUES,
  NEUTRALS,
  onSolid,
  contrast,
  contrastReport,
  TUNING,
  LIGHT_LADDER,
  DARK_LADDER,
  buildScale,
  toTypeScript,
  hslToHex,
};
