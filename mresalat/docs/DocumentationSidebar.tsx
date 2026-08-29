'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/mresalat/core/BrandLogo';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { documentationGroups } from './registry';
import { DocsSearch } from './DocsSearch';

const storageKey = 'mresalat-docs-open-groups';

export function DocumentationSidebar({ currentSlug, mobileOpen, onClose }: {
  currentSlug: string;
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const activeGroup = documentationGroups.find((group) => group.pages.some((page) => page.slug === currentSlug));
  const activeGroupId = activeGroup?.id;
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => new Set(activeGroup ? [activeGroup.id] : ['getting-started']));
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const stored = JSON.parse(sessionStorage.getItem(storageKey) ?? '[]') as string[];
        setOpenGroups(new Set([...stored, ...(activeGroupId ? [activeGroupId] : [])]));
      } catch {
        // Session storage is an enhancement only.
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeGroupId]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = 'hidden';
    const focusable = () => Array.from(asideRef.current?.querySelectorAll<HTMLElement>('a, button, input, [tabindex]:not([tabindex="-1"])') ?? []).filter((item) => !item.hasAttribute('disabled'));
    window.setTimeout(() => focusable()[0]?.focus(), 0);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      trigger?.focus();
    };
  }, [mobileOpen, onClose]);

  const currentLabel = useMemo(() => documentationGroups.flatMap((group) => group.pages).find((page) => page.slug === currentSlug)?.titleFa, [currentSlug]);

  const toggle = (id: string) => {
    setOpenGroups((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id); else next.add(id);
      try { sessionStorage.setItem(storageKey, JSON.stringify([...next])); } catch { /* enhancement */ }
      return next;
    });
  };

  return (
    <>
      <button className={`docs-sidebar-backdrop ${mobileOpen ? 'is-open' : ''}`} type="button" tabIndex={mobileOpen ? 0 : -1} aria-label="بستن فهرست مستندات" onClick={onClose} />
      <aside id="documentation-sidebar" ref={asideRef} className={`docs-sidebar ${mobileOpen ? 'is-open' : ''}`} aria-label="فهرست مستندات توسعه‌دهنده" aria-modal={mobileOpen || undefined} role={mobileOpen ? 'dialog' : undefined}>
        <header className="docs-sidebar-head">
          <Link href="/showcase" aria-label="خانه مستندات"><BrandLogo compact /></Link>
          <button type="button" className="docs-sidebar-close" onClick={onClose} aria-label="بستن فهرست"><MResalatIcon name="close" size={20} /></button>
        </header>
        <DocsSearch onNavigate={onClose} />
        <nav aria-label="صفحه‌های مستندات">
          {documentationGroups.map((group) => {
            const expanded = openGroups.has(group.id);
            const parentActive = group.id === activeGroup?.id;
            return (
              <section key={group.id} className={parentActive ? 'is-active' : ''}>
                <button type="button" onClick={() => toggle(group.id)} aria-expanded={expanded}>
                  <span><bdi dir="ltr">{group.titleEn}</bdi><small>{group.titleFa}</small></span>
                  <MResalatIcon name="down" size={15} />
                </button>
                {expanded && <div>{group.pages.map((page) => (
                  <Link key={page.slug} href={`/showcase/${page.slug}`} aria-current={page.slug === currentSlug ? 'page' : undefined} onClick={onClose}>
                    <span>{page.titleFa}</span>
                    {page.titleEn && <small dir="ltr">{page.titleEn}</small>}
                  </Link>
                ))}</div>}
              </section>
            );
          })}
        </nav>
        <footer><span>صفحه جاری</span><strong>{currentLabel}</strong><Link href="/showcase#brand">Showcase کلاسیک و همه دموها</Link></footer>
      </aside>
    </>
  );
}
