'use client';

import { BaseButton, BaseButtonProps } from '@minuk-hwang-design-system/base-react/button';
import clsx from 'clsx';
import * as React from 'react';

import { Spinner } from '../spinner';

import { buttonRecipe, ButtonVariants, content, loader } from './styles.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

/**
 * `fullWidth` and `iconOnly` are the two props that decide the button's shape,
 * and they decide it differently: one says "as wide as whatever holds you", the
 * other "as wide as you are tall". Together they ask for a square the width of
 * the container, which is a bug every time and looks like a layout collapse
 * rather than a mistyped prop.
 *
 * `never` on the opposite member of each branch is what makes passing both a
 * type error at the call site instead of a shape to discover in the browser.
 */
type Shape = { fullWidth?: boolean; iconOnly?: never } | { fullWidth?: never; iconOnly?: boolean };

export type ButtonProps = BaseButtonProps &
  Omit<NonNullable<ButtonVariants>, 'fullWidth' | 'iconOnly'> &
  Shape;

/*
 * ============================================
 * Component
 * ============================================
 */

/**
 * Button.
 *
 * Behavior comes from `base-react/button`, which owns press handling and keeps
 * the keyboard contract identical whether this renders a `button`, an `a` or a
 * `div`. Everything here is appearance.
 *
 * Icons are children rather than props:
 *
 * ```tsx
 * <Button>
 *   <Icon name="add" />
 *   Create
 * </Button>
 * ```
 *
 * The legacy version took `icon`, `leftSubText` and `rightSubText`, which meant
 * a fifth slot needed a sixth prop, and the order of the slots was fixed by the
 * component rather than by the caller.
 *
 * `loading` swaps the content for a spinner and blocks interaction, but keeps the
 * button's measured width — a button that shrinks mid-submit moves everything
 * beside it.
 */
export const Button = React.forwardRef<HTMLElement, ButtonProps>(function Button(
  { size, variant, fullWidth, iconOnly, loading, className, children, ...props },
  ref
) {
  /*
   * Which end an icon sits at, for the stylesheet to inset that side.
   *
   * CSS cannot work this out. In `<Icon />Create` and `Export<Icon />` the icon
   * is the only element child either way, so it matches `:first-child` and
   * `:last-child` in both — the label is a text node, and text nodes do not
   * count as children for those selectors.
   *
   * Read from `children` rather than from what is rendered, so a button keeps
   * its padding while `loading` swaps the content for a spinner. A button that
   * changes width mid-submit moves everything beside it.
   */
  const slots = React.Children.toArray(children);
  const hasLeading = !iconOnly && slots.length > 1 && React.isValidElement(slots[0]);
  const hasTrailing =
    !iconOnly && slots.length > 1 && React.isValidElement(slots[slots.length - 1]);

  return (
    <BaseButton
      {...props}
      ref={ref}
      loading={loading}
      /*
       * The variant on the element, not only in the class name.
       *
       * A container that tints its own contents needs to know which buttons it
       * may recolor: an `Alert` can safely take over a secondary or ghost
       * button, and must not touch a filled one, whose text color was measured
       * against its own fill. The recipe's class is hashed, so the attribute is
       * the only thing another stylesheet can select on.
       */
      data-variant={variant ?? 'primary'}
      data-leading-icon={hasLeading || undefined}
      data-trailing-icon={hasTrailing || undefined}
      className={clsx(
        // `iconOnly` wins if both arrive anyway. The types rule this out, and
        // JavaScript callers are not bound by the types.
        buttonRecipe({ size, variant, fullWidth: iconOnly ? false : fullWidth, iconOnly }),
        className
      )}
    >
      {/*
       * The label stays in the box and the spinner sits on top of it, so the
       * button is the same width busy as idle. No size on the spinner: the
       * recipe has already told this subtree how large a glyph is.
       */}
      {loading && (
        <span className={loader}>
          <Spinner />
        </span>
      )}
      <span className={content}>{children}</span>
    </BaseButton>
  );
});
