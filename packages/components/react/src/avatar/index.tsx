'use client';

import { Avatar as BaseAvatar } from '@minuk-hwang-design-system/base-react/avatar';
import clsx from 'clsx';
import * as React from 'react';

import * as css from './styles.css';

/*
 * ============================================
 * Context
 * ============================================
 */

const SizeContext = React.createContext<css.AvatarSize>('m');

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type AvatarRootProps = React.ComponentPropsWithoutRef<typeof BaseAvatar.Root> & {
  size?: css.AvatarSize;
};

/*
 * ============================================
 * Parts
 * ============================================
 */

/**
 * User or entity image with a fallback.
 *
 * Compound because loading an image is a state machine, not a prop. Radix's
 * `Image` renders only once the file has actually decoded, and `Fallback` fills
 * the gap until then — which is why a `src` prop with a `?? initials` default
 * does not work: it would flash the initials over a perfectly good cached image,
 * or leave a broken-image glyph when the URL 404s.
 */
const Root = React.forwardRef<React.ElementRef<typeof BaseAvatar.Root>, AvatarRootProps>(
  function AvatarRoot({ size = 'm', className, ...props }, ref) {
    return (
      <SizeContext.Provider value={size}>
        <BaseAvatar.Root
          {...props}
          ref={ref}
          className={clsx(css.root, css.size[size], className)}
        />
      </SizeContext.Provider>
    );
  }
);

const Image = React.forwardRef<
  React.ElementRef<typeof BaseAvatar.Image>,
  React.ComponentPropsWithoutRef<typeof BaseAvatar.Image>
>(function AvatarImage({ className, ...props }, ref) {
  return <BaseAvatar.Image {...props} ref={ref} className={clsx(css.image, className)} />;
});

/**
 * Shown while the image loads and if it never does.
 *
 * `delayMs` on the base component keeps this from flashing for a cached image
 * that resolves in a few milliseconds.
 */
const Fallback = React.forwardRef<
  React.ElementRef<typeof BaseAvatar.Fallback>,
  React.ComponentPropsWithoutRef<typeof BaseAvatar.Fallback>
>(function AvatarFallback({ className, ...props }, ref) {
  const size = React.useContext(SizeContext);
  return (
    <BaseAvatar.Fallback
      {...props}
      ref={ref}
      className={clsx(css.fallback, css.fallbackText[size], className)}
    />
  );
});

/*
 * ============================================
 * Export
 * ============================================
 */

export const Avatar = { Root, Image, Fallback };

/**
 * The parts again, as named exports.
 *
 * `Avatar` is one object held by one binding, and a `'use client'` module's
 * exports do not cross into a server component as values — each becomes a
 * reference to a client component. A reference has no properties, so
 * `Avatar.Root` reads as `undefined` and React reports an invalid element
 * type. The namespace only works from another client component.
 *
 * Naming each part gives the boundary something it can carry. `<AvatarRoot>`
 * renders from a server component; `Avatar.Root` still works everywhere it
 * did before. Radix ships both for the same reason.
 */
export const AvatarRoot = Root;
export const AvatarImage = Image;
export const AvatarFallback = Fallback;

/**
 * The parts under their short names, so `import * as Avatar` gives a namespace
 * that works on either side of the server boundary.
 *
 * A module namespace is assembled at the import site out of the module's own
 * exports, and each export of a `'use client'` module crosses the boundary as
 * its own reference. The object above is a single export holding several
 * values, so it crosses as one reference with nothing readable on it and
 * `Avatar.Root` is `undefined` in a server component.
 *
 * Same components either way. The only difference is whether the grouping
 * happens here or at the import, and only one of those survives the crossing.
 * This is the shape Radix ships, for the same reason.
 */
export { Root, Image, Fallback };
