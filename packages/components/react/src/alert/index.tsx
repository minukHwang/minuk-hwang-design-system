'use client';

import clsx from 'clsx';
import * as React from 'react';

import { Icon } from '../icon';
import { Text, TextProps } from '../text';

import * as css from './styles.css';

/*
 * ============================================
 * Context
 * ============================================
 */

const AlertContext = React.createContext<css.AlertTone>('info');

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type AlertRootProps = React.HTMLAttributes<HTMLDivElement> & {
  tone?: css.AlertTone;
  /**
   * Announce this as it appears. Use it for something that arrived in response
   * to an action; leave it off for a banner that was on the page all along, or a
   * screen reader will read it out on every navigation.
   */
  live?: boolean;
};

/*
 * ============================================
 * Parts
 * ============================================
 */

/**
 * Inline message about the state of something on the page.
 *
 * Compound because the parts are optional and their order is the caller's — an
 * alert may be one line with no title, or a title and three paragraphs, or carry
 * a button in it. A `title`/`description` pair of props fixes one of those and
 * makes the others impossible.
 *
 * The tone travels by context so `Alert.Icon` can pick its own glyph and colour
 * without being told twice.
 */
const Root = React.forwardRef<HTMLDivElement, AlertRootProps>(function AlertRoot(
  { tone = 'info', live, className, ...props },
  ref
) {
  return (
    <AlertContext.Provider value={tone}>
      <div
        {...props}
        ref={ref}
        role={live ? 'alert' : undefined}
        className={clsx(css.root, css.tone[tone], className)}
      />
    </AlertContext.Provider>
  );
});

/**
 * Status glyph. Defaults to the one that matches the tone, which is the whole
 * point of putting the tone in context — it is one less thing to get wrong.
 *
 * Always decorative: the tone is already carried by the text, and reading
 * "error icon" before the message adds nothing.
 */
const AlertIcon = ({ name, className }: { name?: string; className?: string }) => {
  const tone = React.useContext(AlertContext);
  return (
    <Icon
      name={name ?? css.toneIcon[tone]}
      size={20}
      data-alert-part="icon"
      className={clsx(css.icon, className)}
    />
  );
};

/** Everything to the right of the icon. Keeps the text aligned when it wraps. */
const Body = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function AlertBody({ className, ...props }, ref) {
    return (
      <div {...props} ref={ref} data-alert-part="body" className={clsx(css.body, className)} />
    );
  }
);

/**
 * A paragraph, not a heading. An alert interrupts the page rather than
 * structuring it, and putting an `h*` in the outline for every toast is how a
 * document ends up with a table of contents made of notifications.
 */
const Title = React.forwardRef<HTMLElement, TextProps>(function AlertTitle(
  { as = 'p', size = 'body2', weight = 'bold', ...props },
  ref
) {
  return <Text {...props} ref={ref} as={as} size={size} weight={weight} />;
});

const Description = React.forwardRef<HTMLElement, TextProps>(function AlertDescription(
  { size = 'body3', ...props },
  ref
) {
  return <Text {...props} ref={ref} size={size} />;
});

/*
 * ============================================
 * Export
 * ============================================
 */

/**
 * Anything placed after `Alert.Body` is treated as the action — pushed to the
 * far edge, centred against the block, and never shrunk. `Alert.Action` exists
 * for the cases where that guess is not wanted verbatim.
 */
const Action = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function AlertAction({ className, ...props }, ref) {
    return <div {...props} ref={ref} className={clsx(css.action, className)} />;
  }
);

export const Alert = { Root, Icon: AlertIcon, Body, Title, Description, Action };
