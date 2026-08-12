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

/*
 * ============================================
 * TODO: the ladders are not perceptually even
 * ============================================
 *
 * Measured, not suspected. Gaps below are OKLab lightness between neighbouring
 * steps, which is roughly how far apart two swatches look.
 *
 *   dark    teal   500→600  0.126    600→700  0.016     eight times apart
 *           lime   500→600  0.182    600→700  0.024      seven
 *           blue   500→600  0.096    600→700  0.078      even
 *
 * The cause is that both ladders are HSL lightness, and HSL lightness is not
 * perceptual: at L 60 a teal is far brighter to the eye than a blue, so every
 * hue walks the same numbers and covers a different distance. Blue comes out
 * even because these ladders were measured off blue in the first place, which is
 * exactly why nothing looked wrong from here.
 *
 * Yellow shows the same fault from both sides, because its 500 is already very
 * light (OKLab L 0.869) and therefore near one end of whichever ladder it is on:
 *
 *   dark    500→600  0.029   600→700  0.022    six steps share the 0.066 above it
 *   light    10→50   0.012    50→100  0.017    six steps share the 0.12 below it
 *
 * Two other things worth writing down before anyone starts:
 *
 * 1. Apple ships every system colour as a light/dark pair and the dark one is
 *    brighter in all twelve — +0.009 on red, +0.021 on blue, +0.11 on cyan,
 *    averaging +0.040 in OKLab lightness with the chroma left alone. The lift is
 *    largest on the low-chroma hues. Our 500 is pinned identical across themes,
 *    so the system has none of it at the one step that carries the brand.
 *
 * 2. Two attempts failed, both by draining the colour:
 *      - generating as now and rewriting each step's lightness afterwards, then
 *        clipping the old chroma into the new gamut. Cost the dark yellow 0.019
 *        of chroma at 500 and the dark lime 0.030 at 600.
 *      - keeping the dark 500 and lowering the light one to open the split.
 *        Lowering an HSL lightness below 50 lowers chroma with it, so the light
 *        theme went muddy at 0.03 of split.
 *    Both say the same thing: lightness and chroma cannot be moved separately
 *    while the generator is HSL. Doing this properly means generating in OKLCH,
 *    where the two are independent up to the sRGB gamut boundary.
 *
 * Whatever replaces this has to keep the contrast pass honest — `onSolid` is
 * measured per hue per theme, and five hues clear AA on white by less than a
 * tenth of a point, so any lift to a dark fill flips them onto black.
 */

/**
 * Hues of the colours this system ships, in degrees.
 *
 * Spacing is deliberate but not uniform, and the note that used to sit here
 * claimed a floor of 18° that the table below does not keep: crimson and red are
 * 12° apart, and amber and yellow 14°. Those two pairs are the closest, and both
 * are readably different because the tuning pulls them apart in saturation and
 * lightness as well — hue spacing alone was never what was doing the work.
 *
 * The wheel is walked in order so a new colour can be slotted in without
 * renumbering anything.
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
 *
 * The pure one is `mono` rather than `neutral` because `--neutral-*` is not a
 * family, it is the pointer — whichever of these three the document is currently
 * using, exactly as `--accent-*` is whichever hue the document is using. Naming
 * a family the same as the pointer would make the block that selects it read
 * `--neutral-10: var(--neutral-10)`, which is a cycle the browser discards.
 */
const NEUTRALS = {
  mono: { hue: 0, saturation: 0 },
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
  const { saturation = 100, lightnessShift = 0, lightnessByStep = {} } = tuning;

  return Object.fromEntries(
    STEPS.map((step, i) => {
      // A step named outright skips the ladder and its clamps, which is what
      // lets a surface step reach a lightness of 100 that the cap would have
      // held at 99.
      if (lightnessByStep[step] !== undefined) {
        return [step, hslToHex(hue, saturation, lightnessByStep[step])];
      }
      // The shift tapers off at both ends so the near-white and near-black
      // anchors stay aligned with every other scale.
      const taper = 1 - Math.abs(ladder[i] - 50) / 50;
      const lightness = Math.min(99, Math.max(4, ladder[i] + lightnessShift * taper));
      return [step, hslToHex(hue, saturation, lightness)];
    })
  );
};

/**
 * The two steps the light neutrals hold an elevation model in.
 *
 * Everywhere else the ladder runs one way from step 10, and in the light theme
 * that made the page the lightest thing on screen — so a card, which is a
 * surface *on* the page, had to be darker than it. Every light interface does
 * the opposite: a grey page with white cards on it. Dark already worked, since
 * its ladder runs from dark to light and a raised surface is simply a later
 * step.
 *
 * Written as a rule that holds in both themes: the page is the darker of the
 * two and a surface on it is the lighter. Light gets there by trading its top
 * two steps, so 10 is the grey page at 95 and 50 is white at 100.
 *
 * Neutrals only. The chromatic scales use the same ladder, and a step 50 at
 * lightness 100 would turn every hue's alert tint into white.
 */
const NEUTRAL_SURFACE_LIGHTNESS = { 10: 95, 50: 100 };

/** Tuning for a neutral family, which carries the surface steps in light only. */
const neutralTuning = (saturation, theme) =>
  theme === 'light' ? { saturation, lightnessByStep: NEUTRAL_SURFACE_LIGHTNESS } : { saturation };

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
  neutralTuning,
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
