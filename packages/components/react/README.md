# @minuk-hwang-design-system/components-react

Twenty-three styled components and `Theme`. The appearance layer, built on
`base-react` for behavior and drawn with `style-tokens`.

## Install

```bash
pnpm add @minuk-hwang-design-system/components-react
```

`base-react` and `style-tokens` arrive with it as dependencies.

## Usage

```tsx
// Once, at the root of the app. It imports the token stylesheet in turn.
import '@minuk-hwang-design-system/components-react/styles.css';

// Per component, and only the JavaScript is per component.
import { Button } from '@minuk-hwang-design-system/components-react/button';

export default function App() {
  return <Button>Publish</Button>;
}
```

> ⚠️ `styles.css` carries a reset, so it belongs before any stylesheet of your own. Import it from the top of one, where the order cannot be rearranged.

## Theme

`Theme` paints the page and is where the dials live: `appearance`, `accentColor`,
`neutralColor`, `radius`. Every one of them is optional, and left alone the
appearance follows the operating system.

```tsx
import { Theme } from '@minuk-hwang-design-system/components-react/theme';

<Theme appearance="dark" accentColor="purple" neutralColor="slate" radius="large">
  <App />
</Theme>;
```

Nothing is rebuilt and no component takes a new prop. It nests, so a section can
have its own accent or its own appearance.

## Components

| Group          | Components                                          |
| -------------- | --------------------------------------------------- |
| **Primitives** | Text, Heading, Icon, Spinner, Separator             |
| **Actions**    | Button, Chip                                        |
| **Display**    | Badge, Card, Alert, Avatar                          |
| **Forms**      | Field, Input, Checkbox, Radio group, Switch, Select |
| **Overlays**   | Dialog, Popover, Tooltip, Dropdown menu             |
| **Navigation** | Tabs, Accordion                                     |

Each is its own subpath, so importing one pulls in one. Seven declare no
`'use client'` and render on the server: Badge, Card, Heading, Icon, Input,
Spinner and Text.

A compound component that declares `'use client'` is reached through its named
exports from a server component, not through its namespace. Those exports arrive
across the boundary as references rather than values, and a reference has no
properties, so `Alert.Root` is `undefined` and React reports an invalid element
type. `Card` is the one compound component with no client boundary of its own,
so its namespace works anywhere.

```tsx
// In a server component
import {
  AlertRoot,
  AlertBody,
  AlertDescription,
} from '@minuk-hwang-design-system/components-react/alert';

// In a client component, either form works
import { Alert } from '@minuk-hwang-design-system/components-react/alert';
```

## Documentation

[ds.minukhwang.com](https://ds.minukhwang.com)
