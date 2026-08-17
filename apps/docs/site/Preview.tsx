import { Alert } from '@minuk-hwang-design-system/components-react/alert';
import { Heading } from '@minuk-hwang-design-system/components-react/heading';
import { Text } from '@minuk-hwang-design-system/components-react/text';
import * as React from 'react';

import chrome from './chrome.module.css';
import { CodeBlock } from './CodeBlock';
import css from './preview.module.css';

/*
 * ============================================
 * Type Definitions
 * ============================================
 */

export type PreviewProps = {
  /** What the example shows, as a heading. Usually the prop being demonstrated. */
  title?: string;
  /**
   * One sentence saying what to do with it.
   *
   * One. Anything that needs a second sentence is either a trap, which belongs
   * in a `Callout`, or the reasoning behind a decision, which belongs in a
   * commit message.
   */
  description?: React.ReactNode;
  /** The source, shown under the example. Written by hand so it stays copy-pasteable. */
  code?: string;
  /** Lays the examples out in a column rather than a wrapping row. */
  stack?: boolean;
  /**
   * Lets the specimen reach the frame's edges.
   *
   * The stage insets what it holds, which is right for a component being shown
   * at its own size and wrong for one that is a surface: a palette panel inside
   * a padded stage inside a bordered frame is three boxes to say one thing.
   */
  flush?: boolean;
  /**
   * Grammar for the source underneath. Most examples are JSX; the few that show
   * a stylesheet or a shell command are not, and highlighting those as JSX
   * colors the punctuation of a language they are not written in.
   */
  language?: string;
  /**
   * Optional, because some things are only a snippet.
   *
   * Install commands and wiring have nothing to render — there is no specimen of
   * "import this file". Those used to take a sentence as their example just to
   * satisfy this prop, which put a paragraph in the frame where a component
   * should be and made the frame mean two different things.
   */
  children?: React.ReactNode;
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
 * The frame around it is the system too: `Text` for the description, `Heading`
 * for the title, `Alert` for callouts. What is left in the stylesheet is layout,
 * which is the part the system does not claim to own.
 *
 * The title used to be a small monospace caption inside the frame, with the
 * explanation somewhere else on the page as a paragraph. Nobody reads a
 * documentation page that way. Title, one sentence, example — in that order, and
 * the sentence is what the paragraphs collapsed into.
 */
export const Preview = ({
  title,
  description,
  code,
  stack,
  flush,
  language,
  children,
}: PreviewProps) => (
  <section className={css.example}>
    {title && (
      <Heading level={2} size={5}>
        {title}
      </Heading>
    )}
    {/*
      `leading="reading"`, because this is where the site's prose actually is.
      There are ninety-three of these against two uses of `Prose`, and they are
      not the one-line captions the prop name suggests — a description runs to
      two, three, four wrapped lines often enough that it is a paragraph. It was
      the only prose on the site set at the normal leading: 15/20 beside the
      lede's 17/28 and `Prose`'s 16/26.

      The size stays at 4. What separates an example's sentence from a page's
      body copy is the size, and opening the leading does not spend it.
    */}
    {description && (
      <Text size={4} leading="reading" color="assistive" className={css.description}>
        {description}
      </Text>
    )}
    <figure className={css.figure}>
      {children && (
        <div
          className={[css.stage, stack && css.stageStack, flush && css.stageFlush]
            .filter(Boolean)
            .join(' ')}
        >
          {children}
        </div>
      )}
      {code && <CodeBlock code={code} language={language} />}
    </figure>
  </section>
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
              <code className={css.propName}>{row.name}</code>
            </td>
            <td>
              <code className={css.type}>{row.type}</code>
            </td>
            <td className={css.default}>{row.default ?? '—'}</td>
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
 * Its own list rather than a row in the props table, because the question a
 * reader has about a compound component is which pieces exist and how they nest,
 * not which attributes each accepts. It takes the same frame as that table, so
 * two questions about one component do not look like two kinds of reference.
 *
 * A two-column grid before, with a fixed 200px first column — which stretched
 * each name's chip to that width, giving five boxes with a word at the left edge
 * of each and empty space after it. A chip should be the size of what it holds.
 *
 * `description` is a `ReactNode` rather than a string because eight of these
 * parts are a `Text` or a `Heading` underneath and take every prop of one. That
 * was true and undocumented, and saying it means setting `leading` and `Text` as
 * the code they are.
 */
export const PartsList = ({
  namespace,
  parts,
}: {
  /**
   * The compound's name, which turns the table into an import line above it.
   *
   * Every example on these pages writes `Alert.Root` without ever saying where
   * `Alert` came from, and the two ways of getting it are not interchangeable:
   * the exported object crosses into a server component as one reference with
   * nothing readable on it. The subpath is the name kebab-cased, so the two
   * cannot drift apart.
   */
  namespace?: string;
  parts: { name: string; description: React.ReactNode }[];
}) => (
  <>
    {namespace && (
      <>
        <Text size={4} leading="reading" color="assistive" className={css.description}>
          Import it as a namespace, and the parts work on either side of the server boundary.
        </Text>
        <CodeBlock
          code={`import * as ${namespace} from '@minuk-hwang-design-system/components-react/${namespace
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .toLowerCase()}';`}
        />
      </>
    )}
    <div className={css.tableScroll}>
      <Text as="table" size={3} color="assistive" className={`${css.table} ${css.partsTable}`}>
        <thead>
          <tr>
            <th>Part</th>
            <th>What it is</th>
          </tr>
        </thead>
        <tbody>
          {parts.map(part => (
            <tr key={part.name}>
              <td>
                <code className={css.propName}>{part.name}</code>
              </td>
              <td>{part.description}</td>
            </tr>
          ))}
        </tbody>
      </Text>
    </div>
  </>
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
  // The class is not decoration: the article uses it to pull a callout up
  // towards the example it annotates. See `.callout` in chrome.module.css.
  <Alert.Root tone={tone === 'warning' ? 'warning' : 'accent'} className={chrome.callout}>
    <Alert.Icon />
    <Alert.Body>
      <Alert.Description as="div" size={4} leading="reading">
        {children}
      </Alert.Description>
    </Alert.Body>
  </Alert.Root>
);
