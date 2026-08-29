import Image from 'next/image';
import type { ReactNode } from 'react';

export type CatalogPageTone = 'paper' | 'soft' | 'ink' | 'cyan';

export function CatalogPage({
  children,
  pageNumber,
  section,
  tone = 'paper',
  className = '',
  hideChrome = false,
}: {
  children: ReactNode;
  pageNumber: number;
  section: string;
  tone?: CatalogPageTone;
  className?: string;
  hideChrome?: boolean;
}) {
  return (
    <article className={`catalog-book-page catalog-book-page-${tone} ${className}`} data-page={pageNumber}>
      {!hideChrome && (
        <header className="catalog-book-running-header">
          <span>{section}</span>
          <bdi dir="ltr">MResalat System · v0.4.0</bdi>
        </header>
      )}
      <div className="catalog-book-page-body">{children}</div>
      {!hideChrome && (
        <footer className="catalog-book-running-footer">
          <span>ام‌رسالت سیستم · کاتالوگ سیستم طراحی</span>
          <strong>{pageNumber.toLocaleString('fa-IR')}</strong>
        </footer>
      )}
    </article>
  );
}

export function PageTitle({ kicker, title, lead, english }: { kicker: string; title: string; lead?: string; english?: string }) {
  return (
    <header className="catalog-book-page-title">
      <span>{kicker}</span>
      <h1>{title}</h1>
      {english && <bdi dir="ltr">{english}</bdi>}
      {lead && <p>{lead}</p>}
    </header>
  );
}

export function SectionCover({ number, title, english, statement, children }: { number: number; title: string; english: string; statement: string; children?: ReactNode }) {
  return (
    <div className="catalog-book-section-cover">
      <div className="catalog-book-section-orbit" aria-hidden="true"><span>{String(number).padStart(2, '0')}</span></div>
      <div>
        <span className="catalog-book-section-label">فصل {number.toLocaleString('fa-IR')}</span>
        <h1>{title}</h1>
        <bdi dir="ltr">{english}</bdi>
        <p>{statement}</p>
        {children}
      </div>
    </div>
  );
}

export function BrandLockup({ compact = false, inverted = false }: { compact?: boolean; inverted?: boolean }) {
  return (
    <div className={`catalog-book-brand-lockup ${compact ? 'is-compact' : ''} ${inverted ? 'is-inverted' : ''}`}>
      <Image src="/brand/mresalat-logo.svg" alt="ام‌رسالت" width={compact ? 128 : 188} height={compact ? 56 : 82} priority unoptimized />
      {!compact && <div><strong>MResalat System</strong><span>Persian-first experience system</span></div>}
    </div>
  );
}

export function Stat({ value, label, note }: { value: string | number; label: string; note?: string }) {
  return <div className="catalog-book-stat"><strong>{typeof value === 'number' ? value.toLocaleString('fa-IR') : value}</strong><span>{label}</span>{note && <small>{note}</small>}</div>;
}

export function Figure({ number, title, children, className = '' }: { number: string; title: string; children: ReactNode; className?: string }) {
  return (
    <figure className={`catalog-book-figure ${className}`}>
      <div className="catalog-book-figure-canvas">{children}</div>
      <figcaption><span>شکل {number}</span><strong>{title}</strong></figcaption>
    </figure>
  );
}

export function ScreenshotFigure({ src, alt, number, title, fit = 'cover' }: { src: string; alt: string; number: string; title: string; fit?: 'cover' | 'contain' }) {
  return (
    <Figure number={number} title={title} className="catalog-book-screenshot-figure">
      <Image src={src} alt={alt} width={1440} height={1000} unoptimized loading="eager" style={{ objectFit: fit }} />
    </Figure>
  );
}

export function Callout({ title, children, tone = 'info' }: { title: string; children: ReactNode; tone?: 'info' | 'success' | 'warning' | 'danger' | 'ai' }) {
  return <aside className={`catalog-book-callout catalog-book-callout-${tone}`}><strong>{title}</strong><div>{children}</div></aside>;
}

export function TokenSwatch({ name, value, darkValue, usage }: { name: string; value: string; darkValue?: string; usage: string }) {
  return (
    <article className="catalog-book-token-swatch">
      <div className="catalog-book-token-color" style={{ '--token-light': value, '--token-dark': darkValue ?? value } as React.CSSProperties}><i /><i /></div>
      <code dir="ltr">{name}</code>
      <div><bdi dir="ltr">{value}</bdi>{darkValue && <bdi dir="ltr">{darkValue}</bdi>}</div>
      <p>{usage}</p>
    </article>
  );
}

export function ComponentSpec({ name, purpose, variants, states, children }: { name: string; purpose: string; variants: string[]; states: string[]; children: ReactNode }) {
  return (
    <section className="catalog-book-component-spec">
      <header><div><span>Component specification</span><h2 dir="ltr">{name}</h2><p>{purpose}</p></div><code dir="ltr">mresalat/core</code></header>
      <div className="catalog-book-component-demo">{children}</div>
      <div className="catalog-book-component-meta">
        <div><strong>گونه‌ها</strong>{variants.map((item) => <span key={item} dir="ltr">{item}</span>)}</div>
        <div><strong>حالت‌ها</strong>{states.map((item) => <span key={item} dir="ltr">{item}</span>)}</div>
      </div>
    </section>
  );
}

export function RiskBadge({ level }: { level: 'L0' | 'L1' | 'L2' | 'L3' }) {
  return <span className={`catalog-book-risk risk-${level.toLowerCase()}`} dir="ltr">{level}</span>;
}

export function Ltr({ children }: { children: ReactNode }) {
  return <bdi className="catalog-book-ltr" dir="ltr">{children}</bdi>;
}
