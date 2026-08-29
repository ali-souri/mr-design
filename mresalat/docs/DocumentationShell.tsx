'use client';

import { useCallback, useState, type ReactNode } from 'react';
import { AppShell } from '@/mresalat/core/AppShell';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { DocumentationSidebar } from './DocumentationSidebar';

export function DocumentationShell({ currentSlug, children }: { currentSlug: string; children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = useCallback(() => setMobileOpen(false), []);
  return (
    <AppShell active="system" hideMobileNav>
      <div className="docs-mobile-bar">
        <div><strong>مستندات توسعه‌دهنده</strong><small dir="ltr">MResalat System</small></div>
        <button type="button" onClick={() => setMobileOpen(true)} aria-expanded={mobileOpen} aria-controls="documentation-sidebar">
          <MResalatIcon name="menu" size={20} />فهرست مستندات
        </button>
      </div>
      <div className="docs-shell">
        <DocumentationSidebar currentSlug={currentSlug} mobileOpen={mobileOpen} onClose={close} />
        <main className="docs-main">{children}</main>
      </div>
    </AppShell>
  );
}
