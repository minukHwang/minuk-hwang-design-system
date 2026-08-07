import { Alert } from '@minuk-hwang-design-system/components-react/alert';
import { Heading } from '@minuk-hwang-design-system/components-react/heading';
import { Text } from '@minuk-hwang-design-system/components-react/text';
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
 *
 * The frame around it is the system too: `Text` for the caption, `Heading` for
 * section titles, `Alert` for callouts. What is left in the stylesheet is
 * layout, which is the part the system does not claim to own.
 */
export const Preview = ({ title, code, stack, children }: PreviewProps) => (
  <figure className={css.figure}>
    {title && (
      <Text as="figcaption" size={1} color="assistive" className={css.title}>
        {title}
      </Text>
    )}
    <div className={stack ? `${css.stage} ${css.stageStack}` : css.stage}>{children}</div>
    {code && (
      <pre className={css.code}>
        <code>{code.trim()}</code>
      </pre>
    )}
  </figure>
);

/**
 * A titled block of a page.
 *
 * The heading is `Heading level={2}`, so the outline is stated rather than
 * inherited from whatever an `h2` happened to look like. Every page used to
 * write the `section`/`h2` pair by hand, which is how one of them would
 * eventually have got an `h3`.
 */
export const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className={css.section}>
    <Heading level={2} size={5}>
      {title}
    </Heading>
    {children}
  </section>
);

/**
 * Prose block between examples. Keeps the reading column narrower than the
 * stage.
 *
 * The wrapper carries the type, and the paragraphs inside inherit it — which is
 * what lets a page keep writing plain `<p>` and still be set by the system.
 */
export const Prose = ({ children }: { children: React.ReactNode }) => (
  <Text as="div" size={5} leading="reading" color="assistive" className={css.prose}>
    {children}
  </Text>
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
    <Text as="table" size={3} color="assistive" className={css.table}>
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {/*
         * Keyed by position, not by name. A compound component can legitimately
         * take the same prop on two parts — `value` on Root and on Item — and a
         * reference table should not be the thing that crashes over it.
         */}
        {rows.map((row, index) => (
          <tr key={index}>
            <td>
              <code>{row.name}</code>
            </td>
            <td className={css.type}>{row.type}</td>
            <td className={css.type}>{row.default ?? '—'}</td>
            <td>{row.description}</td>
          </tr>
        ))}
      </tbody>
    </Text>
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
  <Text as="ul" size={3} color="assistive" className={css.parts}>
    {parts.map(part => (
      <li key={part.name}>
        <code>{part.name}</code>
        <span>{part.description}</span>
      </li>
    ))}
  </Text>
);

/**
 * A point worth stopping on. Used sparingly, or it stops meaning anything.
 *
 * This is `Alert` — the same component the Alert page documents, on the same
 * tones. A callout that was its own two rules of CSS would be a second answer
 * to a question the system has already answered.
 */
export const Callout = ({
  tone = 'info',
  children,
}: {
  tone?: 'info' | 'warning';
  children: React.ReactNode;
}) => (
  <Alert.Root tone={tone === 'warning' ? 'warning' : 'accent'}>
    <Alert.Icon />
    <Alert.Body>
      <Alert.Description as="div" size={4} leading="reading">
        {children}
      </Alert.Description>
    </Alert.Body>
  </Alert.Root>
);
