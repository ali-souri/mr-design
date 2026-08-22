import type { ReactNode } from 'react';
import Link from 'next/link';

const navItems = [
  { key: 'home', label: 'خانه', href: '/' },
  { key: 'services', label: 'خدمات', href: '/loan' },
  { key: 'assistant', label: 'دستیار هوشمند', href: '/rag' },
  { key: 'seller', label: 'کسب‌وکار من', href: '/seller' },
];

export function AppShell({ children, active = 'home' }: { children: ReactNode; active?: string }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="MResalat System، خانه">
          <span className="brand-mark" aria-hidden="true">م</span>
          <span><strong>ام‌رسالت</strong><small>MResalat System</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="ناوبری اصلی">
          {navItems.map((item) => <a key={item.key} className={active === item.key ? 'active' : ''} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <button className="icon-button" type="button" aria-label="اعلان‌ها">♧<span className="notification-dot" /></button>
          <button className="profile-button" type="button" aria-label="حساب کاربری"><span>ح</span><b>حسین محمدی</b><i aria-hidden="true">⌄</i></button>
        </div>
      </header>
      <main className="page-container">{children}</main>
      <nav className="mobile-nav" aria-label="ناوبری موبایل">
        {navItems.map((item) => <a key={item.key} className={active === item.key ? 'active' : ''} href={item.href}><span aria-hidden="true">{item.key === 'home' ? '⌂' : item.key === 'services' ? '◇' : item.key === 'assistant' ? '✦' : '▣'}</span>{item.label}</a>)}
      </nav>
    </div>
  );
}
