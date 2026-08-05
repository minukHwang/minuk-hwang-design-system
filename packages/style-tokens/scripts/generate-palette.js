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
const DARK_LADDER = [8, 12, 17, 26, 35, 44, 53, 63, 72, 82, 85, 89, 93];

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

/**
 * Which text colour clears WCAG AA on top of each scale's step 500.
 *
 * Only blue, purple and indigo are dark enough at full chroma to carry white
 * text; everything from cyan through orange needs black. Leaving this to each
 * component is how a 2.29:1 green button happens, so it is recorded here.
 */
const ON_SOLID = {
  blue: 'white',
  purple: 'white',
  indigo: 'white',
  red: 'black',
  crimson: 'black',
  pink: 'black',
  magenta: 'black',
  cyan: 'black',
  teal: 'black',
  green: 'black',
  lime: 'black',
  yellow: 'black',
  amber: 'black',
  orange: 'black',
};

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

  // Magenta and pink sit at full chroma on most displays and overpower
  // neighbouring swatches; a little desaturation settles them.
  magenta: { saturation: 86, lightnessShift: -3 },
  pink: { saturation: 94 },
  purple: { saturation: 90 },

  // Crimson keeps a lower saturation than red so the two stay distinguishable
  // even though only 12° separates them.
  crimson: { saturation: 86 },
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
  ON_SOLID,
  TUNING,
  LIGHT_LADDER,
  DARK_LADDER,
  buildScale,
  toTypeScript,
  hslToHex,
};
