import type { Metadata } from 'next';

/**
 * Where this site lives, said once.
 *
 * It was written out in three files — the layout's `metadataBase`, the sitemap's
 * every entry, and the pointer in `robots.txt` — which is three chances for a
 * move to be half done. A canonical URL and a sitemap that disagree are worse
 * than neither: the sitemap sends a crawler to a page whose own canonical tag
 * points somewhere else, and the crawler believes the tag.
 */
export const SITE = 'https://ds.minukhwang.com';

/*
 * ============================================
 * Descriptions
 * ============================================
 */

/**
 * What each page is, in the page's own words.
 *
 * Every route shipped with no `description` of its own, so all thirty inherited
 * the site's one sentence — thirty results describing the same thing, which is
 * the shape a search engine treats as a site with one page and twenty-nine
 * duplicates of it.
 *
 * The text is each page's `lede`, not a second copy written for crawlers. The
 * lede already answers "what is this and when would I reach for it" in one
 * breath, which is the same question a search result has to answer; a
 * description written separately would be a second answer to drift from the
 * first.
 *
 * Keyed by route rather than held in `nav.ts`, because one of these pages is
 * deliberately unlisted and would otherwise have to be added to the site's map
 * to get a description.
 */
const DESCRIPTIONS: Record<string, string> = {
  '/': 'Built in three layers, so a decision lives in one of them rather than in all of them. Color is settled in the tokens, behavior in the base, appearance in the components.',
  '/playground':
    'One screen built out of the whole library. Turn a dial and judge the result where things sit next to each other, rather than on a page that shows one component at a time.',

  '/theme':
    'Three dials, an accent, a gray and a radius, set on an ancestor. Twenty-three components change appearance and not one of them is rebuilt.',
  '/tokens/color':
    'Fourteen chromatic scales and three neutrals, thirteen steps each, generated rather than picked. Every text-on-fill pairing is measured against WCAG.',
  '/tokens/elevation':
    'Two axes, not one ladder. A level says how far a surface is from the page; an interaction says what a pointer is doing to it.',
  '/tokens/scales':
    'Everything measurable is keyed by pixels. A design says 16 and the code says 16, with nothing to translate.',
  '/tokens/shadow':
    'Geometry and color are separate tokens, and only the color follows the theme, which is what keeps a shadow visible in the dark one.',
  '/tokens/motion':
    'The base layer animates by setting data-state and leaving the transition to CSS. Without these tokens every component picks its own number.',

  '/components/text':
    'Body copy at one of ten steps. Anything that is a heading belongs in Heading, which takes a level rather than an element.',
  '/components/heading':
    'A heading at one of ten steps. The level prop sets both the element and the default size, so the outline is never left to whoever remembered.',
  '/components/icon':
    'A Material Symbols glyph. The font arrives with the token stylesheet, so there is nothing to install and no sprite sheet to keep in sync.',
  '/components/spinner':
    'Indeterminate progress. Takes its color from whatever it sits in, so it needs no variant per surface.',
  '/components/separator':
    'A divider between sections. Decorative by default, which is what stops a screen reader from reading the furniture.',

  '/components/button':
    'Runs an action such as submitting a form or opening a dialog. Press handling and the keyboard contract come from the headless layer, so this one is only appearance.',
  '/components/chip':
    'A pill-shaped control for filters, tags and toggles. Always focusable, which is the line between this and a Badge.',

  '/components/badge':
    'A small label reporting state the user cannot change. Not interactive and not focusable: if it can be clicked or dismissed, it is a Chip.',
  '/components/card':
    'A sectioned container. Compound because the order, count and contents of the sections belong to the caller.',
  '/components/alert':
    'An inline message about the state of something on the page. Compound because the parts are optional and their order is the caller’s.',
  '/components/avatar':
    'A user or entity image with a fallback. Compound because loading an image is a state machine, not a prop.',

  '/components/field':
    'Groups a label, a control, and whatever explains it, wiring the ids between them. Everything it does is invisible when it is done wrong.',
  '/components/input':
    'A text control and nothing else. The label, the description and the error belong to Field.',
  '/components/checkbox':
    'Any number of a set, including indeterminate. Square, because that shape is what tells a user the choices are not exclusive.',
  '/components/radio-group':
    'Exactly one choice from a small set. Round, because that shape is what says the options are exclusive.',
  '/components/switch':
    'On or off, taking effect immediately. If the change needs a Save button it is a Checkbox: the shape is a promise about when something happens.',
  '/components/select':
    'One choice from many. A styled listbox rather than a native select, which is a trade rather than a free win.',

  '/components/dialog':
    'A modal panel. Focus trapping, scroll locking, Escape and the backdrop click all come from the headless layer.',
  '/components/popover':
    'An anchored panel holding interactive content. The distinction from Tooltip is not size, it is whether anything inside can be focused.',
  '/components/tooltip':
    'A short label shown on hover or focus. Only ever supplementary: it is invisible on touch and gone the moment focus moves.',
  '/components/dropdown-menu':
    'Actions from a trigger. A menu is not a styled list: it has roving focus, typeahead, and a role a screen reader recognises.',

  '/components/tabs':
    'One view at a time from a small set, with the roving tabindex and aria-controls wiring that make a strip a tab strip rather than a row of buttons.',
  '/components/accordion':
    'Collapsible sections. Each trigger sits inside a heading element, which lets a screen reader user jump between sections rather than tab through every one.',
};

/*
 * ============================================
 * Helper
 * ============================================
 */

/**
 * The metadata every page needs, from the two things that differ between them.
 *
 * A helper rather than an object written out thirty times, so a page cannot ship
 * with a title and no description again — the argument list is the reminder.
 *
 * `alternates.canonical` matters more here than it looks: this site is served
 * from a preview domain on every branch as well as from its own, and without a
 * canonical the two are duplicates competing with each other.
 */
export const pageMetadata = (route: string, title: string): Metadata => {
  const description = DESCRIPTIONS[route];

  return {
    title,
    description,
    alternates: { canonical: route },
    openGraph: { title, description, url: route, type: 'article' },
    twitter: { title, description },
  };
};
