/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from 'next';
import { AssistantShell } from '@/mresalat/ai/AssistantShell';
import { TrustLegend, UncertainAnswer } from '@/mresalat/ai/StructuredAnswer';
import { AppShell } from '@/mresalat/core/AppShell';
import { BrandLogo } from '@/mresalat/core/BrandLogo';
import { componentInventory } from '@/mresalat/core/component-inventory';
import { iconGalleryNames, MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { Alert, Badge, Button } from '@/mresalat/core/primitives';
import { segments } from '@/mresalat/domains/segments';
import { loanJourney } from '@/mresalat/domains/mock-data';
import { ProcessReviewWizard } from '@/mresalat/journeys/ProcessReviewWizard';
import { ParallaxLayer } from '@/mresalat/motion/ParallaxLayer';

export const metadata: Metadata = { title: 'مرجع کدنویسی سیستم' };

const palette = {
  brand: [{ name: 'brand.50', light: '#EEF6FD', dark: '#10283D' }, { name: 'brand.100', light: '#D9EBFA', dark: '#173751' }, { name: 'brand.300', light: '#74B5E8', dark: '#428BC7' }, { name: 'brand.500', light: '#1976C9', dark: '#4FA3EA' }, { name: 'brand.700', light: '#075AA7', dark: '#72B7EF' }, { name: 'accent.500', light: '#16A8B7', dark: '#42C7C8' }],
  neutral: [{ name: 'surface.canvas', light: '#F6F9FC', dark: '#091827' }, { name: 'surface.default', light: '#FFFFFF', dark: '#102235' }, { name: 'surface.elevated', light: '#FFFFFF', dark: '#182E43' }, { name: 'border.subtle', light: '#DCE6EF', dark: '#294056' }, { name: 'text.primary', light: '#10233F', dark: '#EDF6FF' }, { name: 'text.muted', light: '#7D8DA0', dark: '#8299AD' }],
  semantic: [{ name: 'status.success', light: '#14805E', dark: '#4FC49A' }, { name: 'status.warning', light: '#A96808', dark: '#E6B259' }, { name: 'status.danger', light: '#BD3F4F', dark: '#EF7C8D' }, { name: 'status.info', light: '#176CB5', dark: '#63ACE8' }],
  trust: [{ name: 'trust.official', light: '#14805E', dark: '#5ED0A7' }, { name: 'trust.live', light: '#176CB5', dark: '#69B5F2' }, { name: 'trust.ai', light: '#6552A1', dark: '#B6A4EC' }, { name: 'trust.recommendation', light: '#A96808', dark: '#EFC36F' }],
};

const categories = ['Foundations', 'Core', 'Navigation', 'AI', 'RAG / Trust', 'Journeys', 'Secure', 'Templates', 'Motion'] as const;

function PaletteGroup({ title, items }: { title: string; items: { name: string; light: string; dark: string }[] }) {
  return <section className="palette-group"><h3>{title}</h3><div className="palette-themes"><div><span>Light Theme</span>{items.map((item) => <div className="swatch-row" key={`${item.name}-light`}><i style={{ background: item.light }} /><b>{item.name}</b><code>{item.light}</code></div>)}</div><div className="palette-dark"><span>Dark Theme</span>{items.map((item) => <div className="swatch-row" key={`${item.name}-dark`}><i style={{ background: item.dark }} /><b>{item.name}</b><code>{item.dark}</code></div>)}</div></div></section>;
}

function ShowcaseSection({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return <section className="ds-section" id={id}><header><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></header>{children}</section>;
}

export default function ShowcasePage() {
  return (
    <AppShell active="system">
      <div className="showcase-layout">
        <aside className="showcase-toc"><BrandLogo /><strong>مرجع سیستم</strong>{['brand','typography','color','foundations','icons','core','ai','journeys','navigation','motion','inventory','segments'].map((id) => <a href={`#${id}`} key={id}>{id}</a>)}<a href="/qa">Route QA</a></aside>
        <div className="showcase-content">
          <header className="showcase-v2-hero"><div><Badge tone="success">v0.2 · coded reference</Badge><h1>MResalat System</h1><p>مرجع کدنویسی‌شده تجربه‌های هوشمند، سفرهای خدمت، نقش‌ها و عملیات امن ام‌رسالت.</p><div><a className="button button-primary" href="/segments">مرور ۱۰ سگمنت<MResalatIcon name="next" size={16} /></a><a className="button button-ghost" href="/qa">بازبینی ۳۶ مسیر</a></div></div><ParallaxLayer className="showcase-orbit" strength={10}><span><MResalatIcon name="assistant" size={32} /></span><i /><i /><i /></ParallaxLayer></header>

          <ShowcaseSection id="brand" eyebrow="دارایی رسمی" title="Brand & Logo"><div className="brand-showcase"><div><BrandLogo /><small>Full lockup · light surface</small></div><div className="brand-dark-demo"><BrandLogo light /><small>Official asset · dark canvas</small></div><div><BrandLogo compact /><small>Compact sizing</small></div></div><p className="ds-note">دارایی رسمی از نسخه عمومی وب‌سایت ام‌رسالت استفاده شده و بازطراحی یا بازسازی نشده است.</p></ShowcaseSection>

          <ShowcaseSection id="typography" eyebrow="تایپوگرافی فارسی" title="IRANSansX FaNum"><div className="type-specimens"><article><span>۷۰۰ · Bold</span><h3>مسیر روشن برای هر نیاز</h3></article><article><span>۶۰۰ · DemiBold</span><h4>وام قرض‌الحسنه، مرحله‌به‌مرحله</h4></article><article><span>۵۰۰ · Medium</span><p>اعتبار باقی‌مانده شما ۳٬۸۰۰٬۰۰۰ تومان است.</p></article><article><span>۴۰۰ · Regular</span><p>Mixed direction: MResalat System · MR-850822-19462</p></article></div></ShowcaseSection>

          <ShowcaseSection id="color" eyebrow="توکن‌های معنایی" title="Color System"><div className="palette-grid"><PaletteGroup title="Brand" items={palette.brand} /><PaletteGroup title="Neutral" items={palette.neutral} /><PaletteGroup title="Semantic" items={palette.semantic} /><PaletteGroup title="AI Trust" items={palette.trust} /></div></ShowcaseSection>

          <ShowcaseSection id="foundations" eyebrow="هندسه و عمق" title="Spacing, Radius & Elevation"><div className="foundation-grid"><article><h3>4px grid</h3><div className="spacing-demo">{[4,8,12,16,24,32].map((space) => <span key={space}><i style={{ width: space, height: space }} />{space}</span>)}</div></article><article><h3>Radius</h3><div className="radius-demo"><span>10</span><span>16</span><span>24</span><span>pill</span></div></article><article><h3>Elevation</h3><div className="elevation-demo"><span>surface</span><span>raised</span><span>overlay</span></div></article></div></ShowcaseSection>

          <ShowcaseSection id="icons" eyebrow="زبان بصری واحد" title="Iconography"><div className="icon-size-demo"><span><MResalatIcon name="assistant" size={16} />16</span><span><MResalatIcon name="assistant" size={20} />20</span><span><MResalatIcon name="assistant" size={24} />24</span><span><MResalatIcon name="assistant" size={32} />32</span></div><div className="icon-gallery">{iconGalleryNames.map((name) => <article key={name}><span className="domain-icon"><MResalatIcon name={name} size={20} /></span><code>{name}</code></article>)}</div></ShowcaseSection>

          <ShowcaseSection id="core" eyebrow="کنترل‌های پایه" title="Core Components"><div className="primitive-row"><Button>اقدام اصلی</Button><Button tone="secondary">اقدام دوم</Button><Button tone="danger">اقدام حساس</Button><Button disabled>غیرفعال</Button><Badge tone="success">موفق</Badge><Badge tone="warning">نیازمند توجه</Badge><Badge tone="danger">حساس</Badge><Badge tone="neutral">خنثی</Badge></div><div className="alerts-demo"><Alert tone="success" title="درخواست ثبت شد">شماره پیگیری در سوابق ذخیره شد.</Alert><Alert tone="info" title="داده زنده دریافت شد">این اطلاعات همین حالا به‌روز شده است.</Alert><Alert tone="warning" title="اطلاعات بیشتری لازم است">فقط یک سؤال روشن‌کننده پاسخ دهید.</Alert><Alert tone="danger" title="عملیات انجام نشد">هیچ تغییری در حساب ثبت نشده است.</Alert></div></ShowcaseSection>

          <ShowcaseSection id="ai" eyebrow="دستیار و اعتماد" title="AI, RAG & Trust"><TrustLegend /><div className="variant-stack"><div><Badge tone="info">Hero</Badge><AssistantShell variant="hero" /></div><div><Badge tone="success">Context</Badge><AssistantShell variant="context" /></div><div><Badge tone="neutral">Compact</Badge><AssistantShell variant="compact" /></div></div><UncertainAnswer /></ShowcaseSection>

          <ShowcaseSection id="journeys" eyebrow="مرور فرایند" title="Process Review Wizard"><div className="wizard-demo-stack"><ProcessReviewWizard title="درخواست وام" steps={loanJourney.steps} progress={48} variant="standard" currentAction={{ label: 'تکمیل مدرک', href: '/loan' }} /><ProcessReviewWizard title="نسخه فشرده در صفحه اطلاعات" steps={loanJourney.steps} progress={48} variant="compact" /></div><div className="secure-demo-card"><span className="domain-icon"><MResalatIcon name="security" size={24} /></span><div><Badge tone="danger">L3 · SecureActionFlow</Badge><h3>مسدودسازی موقت کارت</h3><p>مرور اثر، تأیید صریح، احراز دومرحله‌ای و رسید قطعی.</p></div><a className="button button-secondary" href="/secure">اجرای دمو</a></div></ShowcaseSection>

          <ShowcaseSection id="navigation" eyebrow="ناوبری تطبیقی" title="Desktop & Mobile Navigation"><div className="navigation-demo"><div className="desktop-nav-demo"><BrandLogo compact /><span className="active"><MResalatIcon name="home" size={16} />خانه</span><span><MResalatIcon name="membership" size={16} />تجربه‌ها</span><span><MResalatIcon name="assistant" size={16} />دستیار</span></div><div className="mobile-nav-demo"><span className="active"><MResalatIcon name="home" size={20} />خانه</span><span><MResalatIcon name="membership" size={20} />تجربه‌ها</span><span><MResalatIcon name="assistant" size={20} />دستیار</span><span><MResalatIcon name="evidence" size={20} />سیستم</span></div></div></ShowcaseSection>

          <ShowcaseSection id="motion" eyebrow="عمق محدود" title="Motion & Parallax"><ParallaxLayer className="motion-demo" strength={14}><div><span className="domain-icon"><MResalatIcon name="goal" size={24} /></span><h3>هدف پس‌انداز</h3><p>حرکت با transform، بدون جابه‌جایی چیدمان و غیرفعال در reduced-motion.</p></div><i /><i /></ParallaxLayer></ShowcaseSection>

          <ShowcaseSection id="inventory" eyebrow="از روی کد واقعی" title={`Component Inventory · ${componentInventory.length}`}><div className="inventory-groups">{categories.map((category) => <section key={category}><h3>{category}</h3><div>{componentInventory.filter((item) => item.category === category).map((item) => <article key={item.name}><code>{item.name}</code><p>{item.purpose}</p><span>{item.variants.join(' · ')}</span><small>States: {item.states.join(' · ')}</small></article>)}</div></section>)}</div></ShowcaseSection>

          <ShowcaseSection id="segments" eyebrow="معماری تنظیم‌محور" title="10 Segments · 30 Experiences"><div className="showcase-segments">{segments.map((segment) => <article key={segment.id}><span className="domain-icon"><MResalatIcon name={segment.icon} size={20} /></span><div><strong>{segment.name}</strong><small>{segment.description}</small></div><nav><a href={`/segments/${segment.slug}/home`}>خانه</a><a href={`/segments/${segment.slug}/services`}>خدمات</a><a href={`/segments/${segment.slug}/journey`}>مسیر</a></nav></article>)}</div></ShowcaseSection>
        </div>
      </div>
    </AppShell>
  );
}
