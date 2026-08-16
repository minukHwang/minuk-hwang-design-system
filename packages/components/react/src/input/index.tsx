import clsx from 'clsx';
import * as React from 'react';

import { input, InputSize, textarea } from './styles.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: InputSize;
};

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/*
 * ============================================
 * Components
 * ============================================
 */

/**
 * Single-line text control.
 *
 * Uncontrolled and unadorned on purpose. The legacy version bundled a label, a
 * clear button, a left icon and five visual states into one component, which
 * meant a field that needed four of those still paid for the fifth, and a field
 * that needed a sixth could not have it.
 *
 * The label, the description and the error belong to `Field`, which also wires
 * the ids. Anything that goes beside the control is composed around it:
 *
 * ```tsx
 * <Field.Root invalid={!!error} required>
 *   <Field.Label>Email</Field.Label>
 *   <Field.Control>{props => <Input {...props} type="email" />}</Field.Control>
 *   <Field.Error>{error}</Field.Error>
 * </Field.Root>
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = 'm', className, type = 'text', ...props },
  ref
) {
  return <input {...props} ref={ref} type={type} className={clsx(input[size], className)} />;
});

/** Multi-line text control. Resizes vertically only. */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, rows = 4, ...props },
  ref
) {
  return <textarea {...props} ref={ref} rows={rows} className={clsx(textarea, className)} />;
});
