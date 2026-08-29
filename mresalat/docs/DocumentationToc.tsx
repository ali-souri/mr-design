import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import type { DocumentationSection } from './types';

export function DocumentationToc({ sections }: { sections: DocumentationSection[] }) {
  return (
    <aside className="docs-page-toc" aria-label="در این صفحه">
      <details open>
        <summary>در این صفحه <MResalatIcon name="down" size={14} /></summary>
        <nav>{sections.map((item) => <a key={item.id} href={`#${item.id}`}>{item.title}</a>)}</nav>
      </details>
    </aside>
  );
}
