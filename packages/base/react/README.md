# @minuk-hwang-design-system/base-react

Headless components. Behaviour and accessibility, no styling.

This is the layer that makes the design system's opinions optional. `components-react`
is one styled implementation on top of it; anyone wanting a different look can take
these and bring their own CSS.

## What gets wrapped, what gets written

Not every primitive is worth building. The line runs through how much of a
component's correctness lives in a published specification.

**Wrap Radix when WAI-ARIA already specifies the behaviour.** Dialog, menu,
popover, select, tabs — these have documented keyboard contracts, focus
management rules and screen-reader expectations. Getting them subtly wrong is
easy, and the failure is invisible until someone tries to use a keyboard.

**Write it here when the behaviour is ours.** Press handling that has to work
identically on a `button`, an `a` and a `div`. Anything composing design system
concepts rather than implementing a standard.

The point is not that Radix is better code. It is that a bug in `usePress` shows
up in review, and a bug in focus-trapping a dialog shows up in an accessibility
audit six months later.

| Group      | Primitives                                                  | Source | What is hard to get right                                                           |
| ---------- | ----------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| Overlay    | `dialog` `alert-dialog` `popover` `tooltip` `dropdown-menu` | Radix  | Focus trap, portal, scroll lock, collision-aware positioning, Escape                |
| Navigation | `tabs` `accordion`                                          | Radix  | Roving tabindex, arrow keys, `aria-controls` wiring                                 |
| Form       | `select` `checkbox` `radio-group` `switch` `label`          | Radix  | Typeahead, group focus, label-control association                                   |
| Display    | `toast` `avatar` `separator`                                | Radix  | Live regions, image fallback timing                                                 |
| Utility    | `slot` `visually-hidden`                                    | Radix  | `asChild` composition, screen-reader-only text                                      |
| Behaviour  | `button` `usePress`                                         | ours   | A native button already carries the semantics; what varies is which element renders |

Deliberately absent: `AspectRatio` (pure CSS), `ScrollArea` (native scrolling is
fine), `Slider` and `Progress` (nothing needs them yet), `Menubar`,
`NavigationMenu` and `Toolbar` (desktop-app shapes), `Form` (fights react-hook-form
and friends).

## Server components

**Everything here is a client component.** Radix primitives all carry
`'use client'`, and press handling needs state.

That matters when composing. Pulling a base component into a presentational one
moves that component to the client too. Compose at the boundary instead — a
server component can render a client one as a child, and pass server-rendered
content through as `children`.

## Usage

Each primitive is its own subpath, so importing a dialog does not pull in a
select.

```tsx
import { Dialog } from '@minuk-hwang-design-system/base-react/dialog';
import { DropdownMenu } from '@minuk-hwang-design-system/base-react/dropdown-menu';

<DropdownMenu.Root>
  <DropdownMenu.Trigger className={trigger}>Options</DropdownMenu.Trigger>
  <DropdownMenu.Content className={menu} sideOffset={8}>
    <DropdownMenu.Item onSelect={onRename}>Rename</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>;
```

Every part forwards `className` and `ref`, so styling stays entirely the caller's.
The wrappers exist to fix the parts we always want — content portalled, sensible
collision padding — not to hide Radix. Its own props pass straight through, and
its docs remain the reference.
