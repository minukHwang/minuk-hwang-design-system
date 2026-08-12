/**
 * The site's map, in one place.
 *
 * The sidebar, the component index and the previous/next links all read from
 * here, so a new component is one entry rather than three edits.
 *
 * A page can exist without being listed — /decisions is written but not linked
 * yet. Anything left out of this file is unreachable from the sidebar, the
 * component index and the previous/next links all at once, which is the only
 * safe way to hold something back.
 */

export type NavItem = {
  href: string;
  label: string;
  /** Shown in the component index; omitted for section landing pages. */
  summary?: string;
  /** Marks the ones that carry the compound pattern, so the index can group them. */
  compound?: boolean;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const nav: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { href: '/', label: 'Introduction' },
      { href: '/playground', label: 'Playground', summary: 'Everything at once' },
      // Decisions is written but not linked yet — reachable at /decisions.
    ],
  },
  {
    // Not all of these are tokens — `Theme` is the dials — so the section is
    // named for what they have in common instead.
    title: 'Foundation',
    items: [
      { href: '/theme', label: 'Theme' },
      { href: '/tokens/colour', label: 'Colour' },
      { href: '/tokens/elevation', label: 'Elevation' },
      { href: '/tokens/scales', label: 'Spacing, radius, type' },
      { href: '/tokens/shadow', label: 'Shadow' },
      { href: '/tokens/motion', label: 'Motion' },
    ],
  },
  {
    title: 'Primitives',
    items: [
      { href: '/components/text', label: 'Text', summary: 'Body copy at one of ten steps' },
      {
        href: '/components/heading',
        label: 'Heading',
        summary: 'Level and size, decided separately',
      },
      { href: '/components/icon', label: 'Icon', summary: 'Material Symbols glyph' },
      { href: '/components/spinner', label: 'Spinner', summary: 'Indeterminate progress' },
      { href: '/components/separator', label: 'Separator', summary: 'Divider between sections' },
    ],
  },
  {
    title: 'Actions',
    items: [
      { href: '/components/button', label: 'Button', summary: 'Four variants, three sizes' },
      { href: '/components/chip', label: 'Chip', summary: 'Filter, tag, toggle' },
    ],
  },
  {
    title: 'Display',
    items: [
      { href: '/components/badge', label: 'Badge', summary: 'Reports state, not interactive' },
      { href: '/components/card', label: 'Card', summary: 'Sectioned container', compound: true },
      { href: '/components/alert', label: 'Alert', summary: 'Inline message', compound: true },
      {
        href: '/components/avatar',
        label: 'Avatar',
        summary: 'Image with fallback',
        compound: true,
      },
    ],
  },
  {
    title: 'Forms',
    items: [
      {
        href: '/components/field',
        label: 'Field',
        summary: 'Wires label, control, description and error',
        compound: true,
      },
      { href: '/components/input', label: 'Input', summary: 'Text and multi-line' },
      { href: '/components/checkbox', label: 'Checkbox', summary: 'Including indeterminate' },
      {
        href: '/components/radio-group',
        label: 'Radio group',
        summary: 'One of a few',
        compound: true,
      },
      { href: '/components/switch', label: 'Switch', summary: 'Takes effect immediately' },
      { href: '/components/select', label: 'Select', summary: 'One of many', compound: true },
    ],
  },
  {
    title: 'Overlays',
    items: [
      {
        href: '/components/dialog',
        label: 'Dialog',
        summary: 'Modal, focus trapped',
        compound: true,
      },
      // Popover is written and shipping, but held back from the site until it
      // has been through the same pass as the rest — reachable at
      // /components/popover, and one line away from being listed again.
      {
        href: '/components/tooltip',
        label: 'Tooltip',
        summary: 'Label on hover or focus',
        compound: true,
      },
      {
        href: '/components/dropdown-menu',
        label: 'Dropdown menu',
        summary: 'Actions from a trigger',
        compound: true,
      },
    ],
  },
  {
    title: 'Navigation',
    items: [
      {
        href: '/components/tabs',
        label: 'Tabs',
        summary: 'Roving focus, arrow keys',
        compound: true,
      },
      {
        href: '/components/accordion',
        label: 'Accordion',
        summary: 'Collapsible sections',
        compound: true,
      },
    ],
  },
];

/** Flat list, for previous/next links and for finding the current page's title. */
export const allItems: NavItem[] = nav.flatMap(section => section.items);

export const componentItems: NavItem[] = nav
  .filter(section =>
    ['Primitives', 'Actions', 'Display', 'Forms', 'Overlays', 'Navigation'].includes(section.title)
  )
  .flatMap(section => section.items);
