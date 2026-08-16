# @minuk-hwang-design-system/behavior-react

Interaction Radix does not cover. Behavior only, no markup and no styling.

`base-react` wraps Radix wherever WAI-ARIA specifies a component's keyboard and
focus contract. What is left over lives here.

## Install

```bash
pnpm add @minuk-hwang-design-system/behavior-react
```

## usePress

Press handling that works the same on a `button`, an `a` and a `div`. A native
`<button>` turns Enter and Space into a click on its own; an element relying on
`role="button"` gets nothing from the browser, so the hook returns a set of
handlers for each case.

```tsx
import { usePress } from '@minuk-hwang-design-system/behavior-react/usePress';

const { pressProps } = usePress({ onPress: publish });
<button {...pressProps}>Publish</button>;

const { virtualPressProps } = usePress({ onPress: publish });
<div role="button" tabIndex={0} {...virtualPressProps}>
  Publish
</div>;
```

`disabled` swallows the click rather than relying on the attribute, so a `div`
that cannot be disabled still stops responding.

## Documentation

[ds.minukhwang.com](https://ds.minukhwang.com)
