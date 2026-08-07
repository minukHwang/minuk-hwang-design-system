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
  { level = 3, size = 3, ...props },
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
