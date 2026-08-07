/**
 * Barrel file.
 *
 * Kept for editor discovery. Consumers import subpaths so bundlers can drop what
 * they do not use, and so a project that only wants a Button does not pull in
 * every Radix primitive the overlays depend on.
 */

/* Primitives */
export { Text } from './text';
export { Heading } from './heading';
export { Icon } from './icon';
export { Spinner } from './spinner';
export { Separator } from './separator';

/* Actions */
export { Button } from './button';
export { Chip } from './chip';

/* Display */
export { Badge } from './badge';
export { Card } from './card';
export { Alert } from './alert';
export { Avatar } from './avatar';

/* Forms */
export { Field } from './field';
export { Input, Textarea } from './input';
export { Checkbox } from './checkbox';
export { RadioGroup } from './radio-group';
export { Switch } from './switch';
export { Select } from './select';

/* Overlays */
export { Dialog } from './dialog';
export { Popover } from './popover';
export { Tooltip } from './tooltip';
export { DropdownMenu } from './dropdown-menu';

/* Navigation */
export { Accordion } from './accordion';
export { Tabs } from './tabs';
