'use client';

import { Dialog as BaseDialog } from '@minuk-hwang-design-system/base-react/dialog';
import clsx from 'clsx';
import * as React from 'react';

import { Button } from '../button';
import { Heading, HeadingProps } from '../heading';
import { Icon } from '../icon';
import { scrim } from '../shared/overlay.css';
import { Text, TextProps } from '../text';
import { useThemeContainer } from '../theme';

import * as css from './styles.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type DialogContentProps = React.ComponentPropsWithoutRef<typeof BaseDialog.Content> & {
  size?: css.DialogSize;
  /** Hides the corner close button. Only do this if a footer action closes the dialog. */
  hideClose?: boolean;
};

/*
 * ============================================
 * Parts
 * ============================================
 */

/**
 * Modal dialog.
 *
 * Focus trapping, scroll locking, Escape and the backdrop click all come from
 * the base layer. What is added here is the shape — a scrim, a panel, and three
 * regions whose padding is designed to work with a body that scrolls while the
 * header and footer stay put.
 *
 * `Title` is not optional in practice: Radix warns without it because the dialog
 * has nothing to announce itself as. Use `VisuallyHidden` around it rather than
 * dropping it if the design has no visible heading.
 */
const Content = React.forwardRef<React.ElementRef<typeof BaseDialog.Content>, DialogContentProps>(
  function DialogContent({ size = 'm', hideClose, className, children, ...props }, ref) {
    return (
      <BaseDialog.Content
        {...props}
        ref={ref}
        container={useThemeContainer()}
        overlayClassName={scrim}
        className={clsx(css.content, css.size[size], className)}
      >
        {children}
        {!hideClose && (
          <BaseDialog.Close asChild>
            <Button variant="ghost" size="s" iconOnly aria-label="Close" className={css.close}>
              <Icon name="close" size={20} />
            </Button>
          </BaseDialog.Close>
        )}
      </BaseDialog.Content>
    );
  }
);

const Header = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function DialogHeader({ className, ...props }, ref) {
    return <div {...props} ref={ref} className={clsx(css.header, className)} />;
  }
);

/**
 * Wraps the base `Title`, so the accessible name and the visible heading stay
 * the same node.
 *
 * Level 2 by default: a dialog opens over a page that already has its `h1`, and
 * its title starts a new region rather than replacing the document's.
 */
const Title = React.forwardRef<HTMLHeadingElement, Partial<HeadingProps>>(function DialogTitle(
  { level = 2, size = 4, ...props },
  ref
) {
  return (
    <BaseDialog.Title asChild>
      <Heading {...props} ref={ref} level={level} size={size} />
    </BaseDialog.Title>
  );
});

const Description = React.forwardRef<HTMLParagraphElement, TextProps>(function DialogDescription(
  { size = 4, color = 'assistive', ...props },
  ref
) {
  return (
    <BaseDialog.Description asChild>
      <Text {...props} ref={ref} size={size} color={color} />
    </BaseDialog.Description>
  );
});

/** The scrolling region. Everything that is not the heading or the actions goes here. */
const Body = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function DialogBody({ className, ...props }, ref) {
    return <div {...props} ref={ref} className={clsx(css.body, className)} />;
  }
);

const Footer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function DialogFooter({ className, ...props }, ref) {
    return <div {...props} ref={ref} className={clsx(css.footer, className)} />;
  }
);

/*
 * ============================================
 * Export
 * ============================================
 */

export const Dialog = {
  Root: BaseDialog.Root,
  Trigger: BaseDialog.Trigger,
  Close: BaseDialog.Close,
  Content,
  Header,
  Title,
  Description,
  Body,
  Footer,
};

/**
 * The parts again, as named exports.
 *
 * `Dialog` is one object held by one binding, and a `'use client'` module's
 * exports do not cross into a server component as values — each becomes a
 * reference to a client component. A reference has no properties, so
 * `Dialog.Root` reads as `undefined` and React reports an invalid element
 * type. The namespace only works from another client component.
 *
 * Naming each part gives the boundary something it can carry. `<DialogRoot>`
 * renders from a server component; `Dialog.Root` still works everywhere it
 * did before. Radix ships both for the same reason.
 */
export const DialogRoot = BaseDialog.Root;
export const DialogTrigger = BaseDialog.Trigger;
export const DialogClose = BaseDialog.Close;
export const DialogContent = Content;
export const DialogHeader = Header;
export const DialogTitle = Title;
export const DialogDescription = Description;
export const DialogBody = Body;
export const DialogFooter = Footer;

/**
 * The parts under their short names, so `import * as Dialog` gives a namespace
 * that works on either side of the server boundary.
 *
 * A module namespace is assembled at the import site out of the module's own
 * exports, and each export of a `'use client'` module crosses the boundary as
 * its own reference. The object above is a single export holding several
 * values, so it crosses as one reference with nothing readable on it and
 * `Dialog.Root` is `undefined` in a server component.
 *
 * Same components either way. The only difference is whether the grouping
 * happens here or at the import, and only one of those survives the crossing.
 * This is the shape Radix ships, for the same reason.
 */
export { Content, Header, Title, Description, Body, Footer };
export const { Root, Trigger, Close } = Dialog;
