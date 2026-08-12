'use client';

import { Label } from '@minuk-hwang-design-system/base-react/label';
import clsx from 'clsx';
import * as React from 'react';

import { Text, TextProps } from '../text';

import * as css from './styles.css';

/*
 * ============================================
 * Context
 * ============================================
 */

type FieldContextValue = {
  controlId: string;
  descriptionId: string;
  errorId: string;
  hasDescription: boolean;
  hasError: boolean;
  invalid: boolean;
  disabled: boolean;
  required: boolean;
  register: (part: 'description' | 'error') => void;
};

const FieldContext = React.createContext<FieldContextValue | null>(null);

/**
 * Every part below needs this, and a part rendered outside a `Field.Root` would
 * silently produce a label pointing at nothing. Throwing says so at the moment
 * it happens rather than at an accessibility audit months later.
 */
const useField = (part: string) => {
  const context = React.useContext(FieldContext);
  if (!context) {
    throw new Error(`Field.${part} must be rendered inside a Field.Root.`);
  }
  return context;
};

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type FieldRootProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Overrides the generated id. Only needed when something outside has to point at the control. */
  id?: string;
  /** Marks the control invalid and switches the description out for the error. */
  invalid?: boolean;
  disabled?: boolean;
  required?: boolean;
};

export type FieldControlProps = {
  children: (props: {
    id: string;
    'aria-describedby': string | undefined;
    'aria-invalid': true | undefined;
    disabled: boolean;
    required: boolean;
  }) => React.ReactNode;
};

/*
 * ============================================
 * Parts
 * ============================================
 */

/**
 * Groups a label, a control, and whatever explains it.
 *
 * This is the part of the system that most repays being compound. A label has to
 * point at its control's id; a control has to point back at its description and
 * its error; an invalid control has to say so in a way a screen reader hears.
 * That is four ids and three attributes, and every one of them is silently
 * skippable — the field looks correct, and only a screen reader knows it is not.
 *
 * Holding them in context means the wiring happens once, here, instead of at
 * every call site.
 */
const Root = React.forwardRef<HTMLDivElement, FieldRootProps>(function FieldRoot(
  { id, invalid = false, disabled = false, required = false, className, ...props },
  ref
) {
  const generatedId = React.useId();
  const controlId = id ?? generatedId;

  // Description and error announce themselves on mount, so aria-describedby
  // lists only the ones that actually rendered. Pointing at an absent element is
  // the failure mode that reads as silence rather than as an error.
  const [parts, setParts] = React.useState({ description: false, error: false });
  const register = React.useCallback((part: 'description' | 'error') => {
    setParts(current => (current[part] ? current : { ...current, [part]: true }));
  }, []);

  const value = React.useMemo<FieldContextValue>(
    () => ({
      controlId,
      descriptionId: `${controlId}-description`,
      errorId: `${controlId}-error`,
      hasDescription: parts.description,
      hasError: parts.error,
      invalid,
      disabled,
      required,
      register,
    }),
    [controlId, parts, invalid, disabled, required, register]
  );

  return (
    <FieldContext.Provider value={value}>
      <div {...props} ref={ref} className={clsx(css.root, className)} />
    </FieldContext.Provider>
  );
});

/**
 * Label for the control. Clicking it focuses the control, because `htmlFor`
 * is filled in from context rather than left to the caller.
 */
export const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(function FieldLabel({ className, children, ...props }, ref) {
  const { controlId, required, disabled } = useField('Label');

  return (
    <Label
      {...props}
      ref={ref}
      htmlFor={controlId}
      className={clsx(css.label, disabled && css.disabled, className)}
    >
      {children}
      {/* aria-hidden because `required` on the control already says this. */}
      {required && (
        <span className={css.required} aria-hidden>
          *
        </span>
      )}
    </Label>
  );
});

/**
 * Render prop rather than a wrapper, because the control might be an `input`, a
 * `textarea`, a `Select` or something the system has never seen. Cloning an
 * unknown child to inject props guesses at its API; handing the props over lets
 * the caller spread them wherever they belong.
 */
const Control = ({ children }: FieldControlProps) => {
  const {
    controlId,
    descriptionId,
    errorId,
    hasDescription,
    hasError,
    invalid,
    disabled,
    required,
  } = useField('Control');

  const describedBy =
    [hasError && invalid ? errorId : null, hasDescription ? descriptionId : null]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <>
      {children({
        id: controlId,
        'aria-describedby': describedBy,
        'aria-invalid': invalid || undefined,
        disabled,
        required,
      })}
    </>
  );
};

/** Helper text. Stays visible when the field is invalid — the error adds, it does not replace. */
const Description = React.forwardRef<HTMLElement, TextProps>(function FieldDescription(
  { size = 2, color = 'assistive', ...props },
  ref
) {
  const { descriptionId, register } = useField('Description');
  React.useEffect(() => register('description'), [register]);

  return (
    <Text
      {...props}
      ref={ref}
      id={descriptionId}
      size={size}
      color={color}
      className={clsx(css.description, props.className)}
    />
  );
});

/**
 * Validation message.
 *
 * Renders nothing unless the root is `invalid`, so a form can hold its messages
 * in the tree and let the root decide when they are true. `role="alert"` makes a
 * screen reader announce it the moment it appears.
 */
export const FieldError = React.forwardRef<HTMLElement, TextProps>(function FieldError(
  { size = 2, color = 'error', ...props },
  ref
) {
  const { errorId, invalid, register } = useField('Error');
  React.useEffect(() => register('error'), [register]);

  if (!invalid) return null;

  return (
    <Text
      {...props}
      ref={ref}
      id={errorId}
      role="alert"
      size={size}
      color={color}
      className={clsx(css.error, props.className)}
    />
  );
});

/*
 * ============================================
 * Export
 * ============================================
 */

export const Field = { Root, Label: FieldLabel, Control, Description, Error: FieldError };

/**
 * The parts again, as named exports.
 *
 * `Field` is one object held by one binding, and a `'use client'` module's
 * exports do not cross into a server component as values — each becomes a
 * reference to a client component. A reference has no properties, so
 * `Field.Root` reads as `undefined` and React reports an invalid element
 * type. The namespace only works from another client component.
 *
 * Naming each part gives the boundary something it can carry. `<FieldRoot>`
 * renders from a server component; `Field.Root` still works everywhere it
 * did before. Radix ships both for the same reason.
 */
export const FieldRoot = Root;
export const FieldControl = Control;
export const FieldDescription = Description;
