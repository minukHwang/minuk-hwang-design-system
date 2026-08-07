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
  return <Icon name={name ?? css.toneIcon[tone]} size={20} className={clsx(css.icon, className)} />;
};

/** Everything to the right of the icon. Keeps the text aligned when it wraps. */
const Body = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function AlertBody({ className, ...props }, ref) {
    return <div {...props} ref={ref} className={clsx(css.body, className)} />;
  }
);

const Title = React.forwardRef<HTMLElement, TextProps>(function AlertTitle(
  { as = 'p', textType = 'body2', textMode = 'bold', ...props },
  ref
) {
  return <Text {...props} ref={ref} as={as} textType={textType} textMode={textMode} />;
});

const Description = React.forwardRef<HTMLElement, TextProps>(function AlertDescription(
  { textType = 'body3', ...props },
  ref
) {
  return <Text {...props} ref={ref} textType={textType} />;
});

/*
 * ============================================
 * Export
 * ============================================
 */

export const Alert = { Root, Icon: AlertIcon, Body, Title, Description };
