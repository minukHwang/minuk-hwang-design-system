import * as React from 'react';

import css from './preview.module.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type PreviewProps = {
  /** Short statement of what the example shows. Not a caption of the obvious. */
  title?: string;
  /** The source, shown under the example. Written by hand so it stays copy-pasteable. */
  code?: string;
  /** Lays the examples out in a column rather than a wrapping row. */
  stack?: boolean;
  children: React.ReactNode;
};

/*
 * ============================================
 * Components
 * ============================================
 */

/**
 * A live example with its source underneath.
 *
 * The example is the real component, imported from the built package and
 * rendered by this page — so a dialog here traps focus, a tab strip answers
 * arrow keys, and a broken build shows up as a broken docs site rather than as
 * a screenshot that stayed correct.
 */
export const Preview = ({ title, code, stack, children }: PreviewProps) => (
  <figure className={css.figure}>
    {title && <figcaption className={css.title}>{title}</figcaption>}
    <div className={stack ? `${css.stage} ${css.stageStack}` : css.stage}>{children}</div>
    {code && (
      <pre className={css.code}>
        <code>{code.trim()}</code>
      </pre>
    )}
  </figure>
);

/** Prose block between examples. Keeps the reading column narrower than the stage. */
export const Prose = ({ children }: { children: React.ReactNode }) => (
  <div className={css.prose}>{children}</div>
);

export type PropRow = {
  name: string;
  type: string;
  /** Omit when the prop is required — the table shows a dash. */
  default?: string;
  description: string;
};

/** Props reference. Hand-written rather than generated, so the descriptions say why. */
export const PropsTable = ({ rows }: { rows: PropRow[] }) => (
  <div className={css.tableScroll}>
    <table className={css.table}>
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.name}>
            <td>
              <code>{row.name}</code>
            </td>
            <td className={css.type}>{row.type}</td>
            <td className={css.type}>{row.default ?? '—'}</td>
            <td>{row.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/**
 * The parts of a compound component, and what each is responsible for.
 *
 * Separate from the props table because the question a reader has about a
 * compound component is which pieces exist and how they nest, not which
 * attributes each accepts.
 */
export const PartsList = ({ parts }: { parts: { name: string; description: string }[] }) => (
  <ul className={css.parts}>
    {parts.map(part => (
      <li key={part.name}>
        <code>{part.name}</code>
        <span>{part.description}</span>
      </li>
    ))}
  </ul>
);

/** A point worth stopping on. Used sparingly, or it stops meaning anything. */
export const Callout = ({
  tone = 'info',
  children,
}: {
  tone?: 'info' | 'warning';
  children: React.ReactNode;
}) => (
  <div className={`${css.callout} ${tone === 'warning' ? css.calloutWarning : ''}`}>{children}</div>
);
