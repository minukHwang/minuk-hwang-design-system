'use client';

import { Dialog as BaseDialog } from '@minuk-hwang-design-system/base-react/dialog';
import clsx from 'clsx';
import * as React from 'react';

import { Button } from '../button';
import { Icon } from '../icon';
import { scrim } from '../shared/overlay.css';
import { Text, TextProps } from '../text';

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

/** Wraps the base `Title`, so the accessible name and the visible heading stay the same node. */
const Title = React.forwardRef<HTMLHeadingElement, TextProps>(function DialogTitle(
  { textType = 'title3', textMode = 'bold', ...props },
  ref
) {
  return (
    <BaseDialog.Title asChild>
      <Text {...props} ref={ref} as="h2" textType={textType} textMode={textMode} />
    </BaseDialog.Title>
  );
});

const Description = React.forwardRef<HTMLParagraphElement, TextProps>(function DialogDescription(
  { textType = 'body2', color = 'assistive', ...props },
  ref
) {
  return (
    <BaseDialog.Description asChild>
      <Text {...props} ref={ref} textType={textType} color={color} />
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
