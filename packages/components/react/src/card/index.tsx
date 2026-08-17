import clsx from 'clsx';
import * as React from 'react';

import { Heading, HeadingProps } from '../heading';
import { Text, TextProps } from '../text';

import * as css from './styles.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type CardRootProps = React.HTMLAttributes<HTMLDivElement> & {
  elevation?: css.CardElevation;
  /**
   * Adds hover and focus affordances. It does not make the card clickable — put
   * the handler on a real button or link inside, or on this element yourself.
   */
  interactive?: boolean;
};

export type CardMediaProps = React.ImgHTMLAttributes<HTMLImageElement>;

/*
 * ============================================
 * Parts
 * ============================================
 */

/**
 * Card container.
 *
 * The sections below are separate components rather than props because their
 * order, count and contents are the caller's to decide. A `title` prop fixes one
 * arrangement; `Card.Header` lets a card have two actions, or none, or an image
 * between the header and the body, without the component learning about it.
 */
const Root = React.forwardRef<HTMLDivElement, CardRootProps>(function CardRoot(
  { elevation = 'outlined', interactive, className, ...props },
  ref
) {
  return (
    <div
      {...props}
      ref={ref}
      className={clsx(
        css.root,
        css.elevation[elevation],
        interactive && css.interactive,
        className
      )}
    />
  );
});

const Header = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...props }, ref) {
    return <div {...props} ref={ref} className={clsx(css.header, className)} />;
  }
);

/**
 * Defaults to level 3: a card is almost never the top of a document's outline,
 * and its title is almost never the largest thing on the page. Both are
 * overridable, and `level` is the one that matters — it decides the outline
 * whatever the size says.
 */
const Title = React.forwardRef<HTMLHeadingElement, Partial<HeadingProps>>(function CardTitle(
  { level = 3, size = 4, ...props },
  ref
) {
  return <Heading {...props} ref={ref} level={level} size={size} />;
});

const Description = React.forwardRef<HTMLElement, TextProps>(function CardDescription(
  { size = 4, color = 'assistive', ...props },
  ref
) {
  return <Text {...props} ref={ref} size={size} color={color} />;
});

const Body = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardBody({ className, ...props }, ref) {
    return <div {...props} ref={ref} className={clsx(css.body, className)} />;
  }
);

const Footer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { align?: 'start' | 'end' }
>(function CardFooter({ align = 'start', className, ...props }, ref) {
  return (
    <div
      {...props}
      ref={ref}
      className={clsx(css.footer, align === 'end' && css.footerEnd, className)}
    />
  );
});

/** Full-bleed image. Sits outside the padded sections, so it meets the corners. */
const Media = React.forwardRef<HTMLImageElement, CardMediaProps>(function CardMedia(
  { className, alt = '', ...props },
  ref
) {
  return <img {...props} ref={ref} alt={alt} className={clsx(css.media, className)} />;
});

/*
 * ============================================
 * Export
 * ============================================
 */

export const Card = { Root, Header, Title, Description, Body, Footer, Media };

/**
 * The parts again, as named exports.
 *
 * `Card` is one object held by one binding, and a `'use client'` module's
 * exports do not cross into a server component as values — each becomes a
 * reference to a client component. A reference has no properties, so
 * `Card.Root` reads as `undefined` and React reports an invalid element
 * type. The namespace only works from another client component.
 *
 * Naming each part gives the boundary something it can carry. `<CardRoot>`
 * renders from a server component; `Card.Root` still works everywhere it
 * did before. Radix ships both for the same reason.
 */
export const CardRoot = Root;
export const CardHeader = Header;
export const CardTitle = Title;
export const CardDescription = Description;
export const CardBody = Body;
export const CardFooter = Footer;
export const CardMedia = Media;

/**
 * The parts under their short names, so `import * as Card` gives a namespace
 * that works on either side of the server boundary.
 *
 * A module namespace is assembled at the import site out of the module's own
 * exports, and each export of a `'use client'` module crosses the boundary as
 * its own reference. The object above is a single export holding several
 * values, so it crosses as one reference with nothing readable on it and
 * `Card.Root` is `undefined` in a server component.
 *
 * Same components either way. The only difference is whether the grouping
 * happens here or at the import, and only one of those survives the crossing.
 * This is the shape Radix ships, for the same reason.
 */
export { Root, Header, Title, Description, Body, Footer, Media };
