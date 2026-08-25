/* eslint-disable @next/next/no-html-link-for-pages */
import type { ReactNode } from 'react';
import { BrandLogo } from './BrandLogo';
import { MResalatIcon, type MResalatIconName } from './MResalatIcon';
import { ThemeToggle } from './ThemeController';
import { UserContextSwitcher } from '@/mresalat/contexts/UserContextSwitcher';

const navItems = [
  { key: 'home', label: 'خانه', href: '/', icon: 'home' },
  { key: 'segments', label: 'تجربه‌ها', href: '/segments', icon: 'membership' },
  { key: 'examples', label: 'نمونه‌ها', href: '/examples', icon: 'examples' },
  { key: 'assistant', label: 'دستیار هوشمند', href: '/rag', icon: 'assistant' },
  { key: 'system', label: 'MResalat System', href: '/showcase', icon: 'evidence' },
] satisfies { key: string; label: string; href: string; icon: MResalatIconName }[];

export function AppShell({ children, active = 'home', hideMobileNav = false }: { children: ReactNode; active?: string; hideMobileNav?: boolean }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="MResalat System، خانه">
          <BrandLogo />
        </a>
        <nav className="desktop-nav" aria-label="ناوبری اصلی">
          {navItems.map((item) => <a key={item.key} className={active === item.key ? 'active' : ''} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <UserContextSwitcher />
          <ThemeToggle />
          <button className="icon-button" type="button" aria-label="اعلان‌ها"><MResalatIcon name="alerts" size={20} /><span className="notification-dot" /></button>
        </div>
      </header>
      <main className="page-container">{children}</main>
      {!hideMobileNav && <nav className="mobile-nav" aria-label="ناوبری موبایل">
        {navItems.map((item) => <a key={item.key} className={active === item.key ? 'active' : ''} href={item.href}><MResalatIcon name={item.icon} size={20} />{item.label}</a>)}
      </nav>}
    </div>
  );
}
