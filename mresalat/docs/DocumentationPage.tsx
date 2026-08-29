import Link from 'next/link';
import { Badge } from '@/mresalat/core/primitives';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { CodeExample } from '@/mresalat/showcase/CodeExample';
import { CopyPageLink } from './CopyAction';
import { getDocumentationSections } from './content';
import { DocumentationShell } from './DocumentationShell';
import { DocumentationToc } from './DocumentationToc';
import { ReferenceView } from './ReferenceViews';
import { documentationGroups, getDocumentationNeighbors } from './registry';
import type { DocumentationPage, DocumentationSection } from './types';

const calloutIcons = {
  info: 'help',
  tip: 'success',
  warning: 'warning',
  security: 'security',
  accessibility: 'view',
} as const;

function SectionContent({ item }: { item: DocumentationSection }) {
  return (
    <section className="docs-section" aria-labelledby={item.id}>
      <h2 id={item.id}>{item.title}<a href={`#${item.id}`} aria-label={`پیوند به ${item.title}`}>#</a></h2>
      {item.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {item.bullets && <ul>{item.bullets.map((bullet) => <li key={bullet}>{item.id === 'source-files' ? <code dir="ltr">{bullet}</code> : bullet}</li>)}</ul>}
      {item.table && <div className="docs-table-wrap"><table><thead><tr>{item.table.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{item.table.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>}
      {item.callout && <div className={`docs-callout docs-callout-${item.callout.tone}`}><MResalatIcon name={calloutIcons[item.callout.tone]} size={20} /><div><strong>{item.callout.title}</strong><p>{item.callout.body}</p></div></div>}
      {item.code && <CodeExample title={item.title} code={item.code} language={item.language} filename={item.filename} defaultOpen />}
    </section>
  );
}

export function DocumentationPageView({ page }: { page: DocumentationPage }) {
  const sections = getDocumentationSections(page);
  const group = documentationGroups.find((item) => item.id === page.group)!;
  const { previous, next } = getDocumentationNeighbors(page.slug);
  const tocSections = page.kind && page.kind !== 'article' ? [...sections, { id: 'reference-data', title: 'مرجع تعاملی' }] : sections;

  return (
    <DocumentationShell currentSlug={page.slug}>
      <nav className="docs-breadcrumbs" aria-label="مسیر مستندات">
        <Link href="/showcase">MResalat System</Link><MResalatIcon name="next" size={14} /><span>{group.titleFa}</span><MResalatIcon name="next" size={14} /><strong>{page.titleFa}</strong>
      </nav>
      <div className="docs-reading-layout">
        <article className="docs-article">
          <header className="docs-page-header">
            <div><span className="eyebrow" dir="ltr">{group.titleEn}</span><div className="docs-title-line"><h1>{page.titleFa}</h1>{page.titleEn && <bdi dir="ltr">{page.titleEn}</bdi>}</div><p>{page.description}</p></div>
            <div className="docs-page-actions"><Badge tone="info">React · TypeScript</Badge><CopyPageLink /></div>
          </header>
          {sections.map((item) => <SectionContent key={item.id} item={item} />)}
          {page.kind && page.kind !== 'article' && <section className="docs-section docs-reference-root" aria-labelledby="reference-data"><h2 id="reference-data">مرجع تعاملی<a href="#reference-data" aria-label="پیوند به مرجع تعاملی">#</a></h2><ReferenceView kind={page.kind} page={page} /></section>}
          <footer className="docs-prev-next">
            {previous ? <Link href={`/showcase/${previous.slug}`}><span><MResalatIcon name="previous" size={16} />قبلی</span><strong>{previous.titleFa}</strong></Link> : <span />}
            {next ? <Link href={`/showcase/${next.slug}`}><span>بعدی<MResalatIcon name="next" size={16} /></span><strong>{next.titleFa}</strong></Link> : <span />}
          </footer>
        </article>
        <DocumentationToc sections={tocSections} />
      </div>
    </DocumentationShell>
  );
}
