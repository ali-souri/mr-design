import type { Metadata } from 'next';
import { Assistant3DDemo } from '@/mresalat/ai/Assistant3DDemo';
import { AssistantShell } from '@/mresalat/ai/AssistantShell';
import { HumanHandoff, SourceCitation, TrustLegend, UncertainAnswer } from '@/mresalat/ai/StructuredAnswer';
import { AppShell } from '@/mresalat/core/AppShell';
import { BrandLogo } from '@/mresalat/core/BrandLogo';
import { componentInventory } from '@/mresalat/core/component-inventory';
import { iconGalleryNames, MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { Alert, Badge, Button } from '@/mresalat/core/primitives';
import { ecosystemServices } from '@/mresalat/domains/ecosystem';
import { loanJourney, loanSources } from '@/mresalat/domains/mock-data';
import { segments } from '@/mresalat/domains/segments';
import { ProcessReviewWizard } from '@/mresalat/journeys/ProcessReviewWizard';
import { ParallaxLayer } from '@/mresalat/motion/ParallaxLayer';
import { CodeExample } from '@/mresalat/showcase/CodeExample';
import { GridLayoutDemo } from '@/mresalat/showcase/GridLayoutDemo';
import { showcaseSnippets } from '@/mresalat/showcase/snippets';

export const metadata: Metadata = { title: 'مرجع کدنویسی سیستم' };

const sections = [
  ['brand', 'برند'], ['typography', 'تایپوگرافی'], ['color', 'رنگ'], ['foundations', 'پایه‌ها'], ['grid', 'شبکه و چیدمان'],
  ['icons', 'آیکون‌ها'], ['core', 'اجزای پایه'], ['navigation', 'ناوبری'], ['ai', 'دستیار و سه‌بعدی'], ['rag', 'اعتماد و RAG'],
  ['journeys', 'مسیرها'], ['secure', 'اقدام امن'], ['motion', 'حرکت'], ['templates', 'قالب‌ها'], ['inventory', 'موجودی'], ['segments', 'سگمنت‌ها'],
] as const;

const palette = [
  { group: 'Brand', items: [['brand.50', '#EEF6FD', '#10283D', 'پس‌زمینه برند'], ['brand.500', '#1976C9', '#4FA3EA', 'تأکید اصلی'], ['brand.700', '#075AA7', '#72B7EF', 'اقدام اصلی'], ['accent.500', '#16A8B7', '#42C7C8', 'دستیار و پیشرفت']] },
  { group: 'Neutral', items: [['surface.canvas', '#F6F9FC', '#091827', 'بوم صفحه'], ['surface.default', '#FFFFFF', '#102235', 'کارت و سطح'], ['border.subtle', '#DCE6EF', '#294056', 'مرز آرام'], ['text.primary', '#10233F', '#EDF6FF', 'متن اصلی']] },
  { group: 'Semantic', items: [['status.success', '#14805E', '#4FC49A', 'موفق'], ['status.warning', '#A96808', '#E6B259', 'نیازمند توجه'], ['status.danger', '#BD3F4F', '#EF7C8D', 'خطر'], ['status.info', '#176CB5', '#63ACE8', 'اطلاعات']] },
  { group: 'AI Trust', items: [['trust.official', '#14805E', '#5ED0A7', 'دانش رسمی'], ['trust.live', '#176CB5', '#69B5F2', 'داده زنده'], ['trust.ai', '#6552A1', '#B6A4EC', 'توضیح AI'], ['trust.recommendation', '#A96808', '#EFC36F', 'پیشنهاد شخصی']] },
] as const;

function ShowcaseSection({ id, eyebrow, title, description, children }: { id: string; eyebrow: string; title: string; description?: string; children: React.ReactNode }) {
  return <section className="ds-section" id={id}><header><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</header>{children}</section>;
}

export default function ShowcasePage() {
  return (
    <AppShell active="system">
      <div className="showcase-layout">
        <aside className="showcase-toc"><BrandLogo /><strong>فهرست مرجع</strong>{sections.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}<a href="/examples">نمونه‌های اکوسیستم</a><a href="/qa">بازبینی مسیرها</a></aside>
        <div className="showcase-content">
          <header className="showcase-v2-hero"><div><Badge tone="success">v0.4 · coded reference</Badge><h1>MResalat System</h1><p>مرجع اجرایی برای ساخت تجربه‌های خوانا، قابل اعتماد و سازگار در اکوسیستم ام‌رسالت.</p><div><a className="button button-primary" href="/examples">دیدن نمونه‌ها<MResalatIcon name="next" size={16} /></a><a className="button button-ghost" href="#grid">قواعد چیدمان</a></div></div><ParallaxLayer className="showcase-orbit" strength={10}><span><MResalatIcon name="assistant" size={32} /></span><i /><i /><i /></ParallaxLayer></header>

          <ShowcaseSection id="brand" eyebrow="هویت رسمی" title="Brand" description="دارایی رسمی، بدون بازسازی متنی یا نشانه جایگزین."><div className="brand-showcase"><div><BrandLogo /><small>Full lockup</small></div><div className="brand-dark-demo"><BrandLogo light /><small>Dark canvas</small></div><div><BrandLogo compact /><small>Compact</small></div></div><CodeExample title="BrandLogo" code={showcaseSnippets.brand} /></ShowcaseSection>

          <ShowcaseSection id="typography" eyebrow="خوانایی فارسی" title="Typography" description="IRANSansX FaNum با کف خوانایی ۱۳px برای متن محصول و ارتفاع خط مناسب فارسی."><div className="type-scale-table"><article><span>Display · 48/1.35 · 700</span><h3>مسیر روشن برای هر نیاز</h3></article><article><span>Page · 36/1.45 · 700</span><h4>خدمات متناسب با زندگی شما</h4></article><article><span>Section · 26/1.55 · 600</span><h5>اقدام بعدی شما</h5></article><article><span>Card · 19/1.65 · 600</span><strong>درخواست وام قرض‌الحسنه</strong></article><article><span>Body · 16/1.9 · 400</span><p>اعتبار باقی‌مانده شما ۳٬۸۰۰٬۰۰۰ تومان است و تا پایان ماه قابل استفاده خواهد بود.</p></article><article><span>Meta · 13/1.75 · 500</span><small>به‌روز شده در ۱۸ تیر ۱۴۰۵ · Ref MR-850822</small></article></div></ShowcaseSection>

          <ShowcaseSection id="color" eyebrow="توکن‌های معنایی" title="Color System" description="مقادیر روشن و تیره کنار هم نمایش داده شده‌اند؛ رنگ نقش معنایی دارد، نه تزئین صرف."><div className="palette-grid">{palette.map((group) => <section className="palette-group" key={group.group}><h3>{group.group}</h3><div className="palette-header"><span>Light</span><span>Dark</span></div>{group.items.map(([name, light, dark, usage]) => <div className="token-swatch" key={name}><div><i style={{ background: light }} /><code>{light}</code></div><div><i style={{ background: dark }} /><code>{dark}</code></div><strong>{name}</strong><small>{usage}</small></div>)}</section>)}</div></ShowcaseSection>

          <ShowcaseSection id="foundations" eyebrow="هندسه و عمق" title="Foundations" description="شبکه پایه ۴px، گوشه‌های آرام و عمق محدود برای رابط مالی."><div className="foundation-grid"><article><h3>Spacing</h3><div className="spacing-demo">{[4,8,12,16,24,32,40].map((space) => <span key={space}><i style={{ width: space, height: space }} />{space}</span>)}</div></article><article><h3>Radius</h3><div className="radius-demo"><span>10</span><span>16</span><span>24</span><span>pill</span></div></article><article><h3>Elevation</h3><div className="elevation-demo"><span>surface</span><span>raised</span><span>overlay</span></div></article></div></ShowcaseSection>

          <ShowcaseSection id="grid" eyebrow="ترکیب صفحه" title="Grid & Layout" description="مقادیر واقعی CSS: موبایل تا ۶۴۰px، تبلت تا ۹۰۰px، و کانتینر عریض ۱۱۸۰px."><div className="layout-spec-grid"><article><span>Mobile</span><strong>۱–۴ ستون</strong><p>حاشیه صفحه ۱۴px، کارت‌ها عموماً تک‌ستونه.</p></article><article><span>Tablet</span><strong>۸ ستون منطقی</strong><p>حاشیه ۲۴px، ماژول‌های اصلی یک یا دو ستون.</p></article><article><span>Desktop</span><strong>۱۲ ستون منطقی</strong><p>حداکثر عرض ۱۱۸۰px و فاصله معمول ۱۶px.</p></article><article><span>Reading</span><strong>حدود ۶۸۰px</strong><p>متن‌های طولانی و پاسخ‌های مستند از عرض کامل استفاده نمی‌کنند.</p></article></div><GridLayoutDemo /><CodeExample title="Page container" code={showcaseSnippets.grid} /></ShowcaseSection>

          <ShowcaseSection id="icons" eyebrow="زبان بصری واحد" title="Iconography" description="Lucide با ضخامت ۱٫۸، اندازه‌های ۱۶، ۲۰، ۲۴ و ۳۲ و جهت صحیح پیکان‌ها در RTL."><div className="icon-size-demo">{([16,20,24,32] as const).map((size) => <span key={size}><MResalatIcon name="assistant" size={size} />{size}px</span>)}</div><div className="icon-gallery">{iconGalleryNames.map((name) => <article key={name}><span className="domain-icon"><MResalatIcon name={name} size={20} /></span><code>{name}</code></article>)}</div><CodeExample title="MResalatIcon" code={showcaseSnippets.icon} /></ShowcaseSection>

          <ShowcaseSection id="core" eyebrow="کنترل‌های پایه" title="Core Components"><div className="primitive-row"><Button>اقدام اصلی</Button><Button tone="secondary">اقدام دوم</Button><Button tone="danger">اقدام حساس</Button><Button disabled>غیرفعال</Button><Badge tone="success">تکمیل شده</Badge><Badge tone="warning">نیازمند توجه</Badge></div><CodeExample title="Button & Badge" code={showcaseSnippets.controls} /><div className="alerts-demo"><Alert tone="success" title="درخواست ثبت شد">شماره پیگیری در سوابق ذخیره شد.</Alert><Alert tone="info" title="داده زنده دریافت شد">این اطلاعات همین حالا به‌روز شده است.</Alert><Alert tone="warning" title="اطلاعات بیشتری لازم است">فقط یک سؤال روشن‌کننده پاسخ دهید.</Alert><Alert tone="danger" title="عملیات انجام نشد">هیچ تغییری در حساب ثبت نشده است.</Alert></div><CodeExample title="Alert" code={showcaseSnippets.alerts} /></ShowcaseSection>

          <ShowcaseSection id="navigation" eyebrow="ناوبری تطبیقی" title="Navigation"><div className="navigation-demo"><div className="desktop-nav-demo"><BrandLogo compact /><span className="active"><MResalatIcon name="home" size={16} />خانه</span><span><MResalatIcon name="examples" size={16} />نمونه‌ها</span><span><MResalatIcon name="assistant" size={16} />دستیار</span></div><div className="mobile-nav-demo"><span className="active"><MResalatIcon name="home" size={20} />خانه</span><span><MResalatIcon name="membership" size={20} />تجربه‌ها</span><span><MResalatIcon name="examples" size={20} />نمونه‌ها</span><span><MResalatIcon name="assistant" size={20} />دستیار</span></div></div><CodeExample title="AppShell" code={showcaseSnippets.navigation} /></ShowcaseSection>

          <ShowcaseSection id="ai" eyebrow="تعامل هوشمند" title="AI & 3D Assistant" description="اندروید انسان‌نمای ام‌رسالت در دو قاب کامل و پرتره، هشت حالت احساسی و ردیابی محلی نگاه عرضه می‌شود؛ اطلاعات و کنترل‌های اصلی مستقل از WebGL باقی می‌مانند."><Assistant3DDemo /><CodeExample title="SmartAssistant3D" code={showcaseSnippets.assistant3d} /><div className="variant-stack"><div><Badge tone="info">Hero</Badge><AssistantShell variant="hero" /></div><div><Badge tone="success">Context</Badge><AssistantShell variant="context" /></div><div><Badge tone="neutral">Compact</Badge><AssistantShell variant="compact" /></div></div><CodeExample title="AssistantShell" code={showcaseSnippets.assistant} /></ShowcaseSection>

          <ShowcaseSection id="rag" eyebrow="منشأ و اطمینان" title="RAG / Trust"><TrustLegend /><SourceCitation source={loanSources[0]} /><UncertainAnswer /><HumanHandoff /><CodeExample title="Trust components" code={showcaseSnippets.trust} /></ShowcaseSection>

          <ShowcaseSection id="journeys" eyebrow="مرور فرایند" title="Journeys"><div className="wizard-demo-stack"><ProcessReviewWizard title="درخواست وام" steps={loanJourney.steps} progress={48} variant="featured" currentAction={{ label: 'تکمیل مدرک', href: '/loan' }} /><ProcessReviewWizard title="نسخه فشرده" steps={loanJourney.steps} progress={48} variant="compact" /></div><CodeExample title="ProcessReviewWizard" code={showcaseSnippets.journey} /></ShowcaseSection>

          <ShowcaseSection id="secure" eyebrow="ریسک L3" title="Secure Actions"><div className="secure-demo-card"><span className="domain-icon"><MResalatIcon name="security" size={24} /></span><div><Badge tone="danger">تأیید صریح و احراز قوی</Badge><h3>مسدودسازی موقت کارت</h3><p>اثر اقدام، تأیید، احراز دومرحله‌ای و رسید قطعی از هم جدا می‌شوند.</p></div><a className="button button-secondary" href="/secure">اجرای نمونه</a></div><CodeExample title="SecureActionFlow" code={showcaseSnippets.secure} /></ShowcaseSection>

          <ShowcaseSection id="motion" eyebrow="عمق محدود" title="Motion"><ParallaxLayer className="motion-demo" strength={14}><div><span className="domain-icon"><MResalatIcon name="goal" size={24} /></span><h3>هدف پس‌انداز</h3><p>حرکت با transform، بدون جابه‌جایی چیدمان و غیرفعال در reduced-motion.</p></div><i /><i /></ParallaxLayer><CodeExample title="ParallaxLayer" code={showcaseSnippets.motion} /></ShowcaseSection>

          <ShowcaseSection id="templates" eyebrow="ترکیب پیکربندی‌محور" title="Templates"><div className="template-flow"><span>Segment config</span><MResalatIcon name="next" size={20} /><span>SegmentExperience</span><MResalatIcon name="next" size={20} /><span>Home / Services / Journey</span></div><CodeExample title="SegmentExperience" code={showcaseSnippets.segment} /></ShowcaseSection>

          <ShowcaseSection id="inventory" eyebrow="منبع قطعی" title="Component Inventory"><div className="inventory-groups">{Array.from(new Set(componentInventory.map((item) => item.category))).map((category) => <section key={category}><h3>{category}</h3><div>{componentInventory.filter((item) => item.category === category).map((item) => <article key={item.name}><code>{item.name}</code><small>{item.variants.join(' · ')}</small><p>{item.purpose}</p><span>{item.states.join(' / ')}</span></article>)}</div></section>)}</div></ShowcaseSection>

          <ShowcaseSection id="segments" eyebrow="پوشش سیستم" title="Segments & Ecosystem"><div className="showcase-segments">{segments.map((segment) => <article key={segment.id}><span className="domain-icon"><MResalatIcon name={segment.icon} size={20} /></span><div><strong>{segment.name}</strong><small>{segment.shortName}</small></div><nav><a href={`/segments/${segment.slug}/home`}>خانه</a><a href={`/segments/${segment.slug}/services`}>خدمات</a><a href={`/segments/${segment.slug}/journey`}>مسیر</a></nav></article>)}</div><div className="ecosystem-link-strip"><div><strong>{ecosystemServices.length} نمونه خدمت اکوسیستم</strong><span>از ام‌مشاور و ام‌بازار تا سایا و ام‌سلامت</span></div><a className="button button-primary" href="/examples">باز کردن نمونه‌ها<MResalatIcon name="next" size={16} /></a></div></ShowcaseSection>
        </div>
      </div>
    </AppShell>
  );
}
