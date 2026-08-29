'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { documentationPages } from './registry';

const normalize = (value: string) => value.trim().toLocaleLowerCase('fa');

export function DocsSearch({ onNavigate }: { onNavigate?: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => {
    const needle = normalize(query);
    if (!needle) return [];
    return documentationPages.filter((page) => normalize([
      page.titleFa,
      page.titleEn,
      page.description,
      page.componentName,
      ...page.keywords,
      ...(page.sourcePaths ?? []),
    ].filter(Boolean).join(' ')).includes(needle)).slice(0, 8);
  }, [query]);

  return (
    <div className="docs-search">
      <label htmlFor="docs-search-input"><MResalatIcon name="search" size={16} /><span className="sr-only">جستجوی مستندات</span></label>
      <input
        ref={inputRef}
        id="docs-search-input"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="جستجو: SegmentAIEntry…"
        autoComplete="off"
      />
      <kbd>Ctrl K</kbd>
      {query && (
        <div className="docs-search-results" role="listbox" aria-label="نتایج جستجوی مستندات">
          {results.length ? results.map((page) => (
            <a key={page.slug} href={`/showcase/${page.slug}`} onClick={onNavigate}>
              <strong>{page.titleFa}</strong>
              <span dir="ltr">{page.titleEn}</span>
              <small>{page.description}</small>
            </a>
          )) : <p>نتیجه‌ای پیدا نشد.</p>}
        </div>
      )}
    </div>
  );
}
