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
