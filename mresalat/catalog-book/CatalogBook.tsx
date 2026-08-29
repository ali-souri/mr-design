import { Badge, Button } from '@/mresalat/core/primitives';
import { MResalatServiceIcon } from '@/mresalat/core/MResalatServiceIcon';
import { ecosystemServiceById } from '@/mresalat/domains/ecosystem';
import {
  BrandLockup,
  Callout,
  CatalogPage,
  ComponentSpec,
  PageTitle,
  RiskBadge,
  ScreenshotFigure,
  Stat,
  TokenSwatch,
} from './components';
import { brandTokens, catalogBookMeta, lightDarkTokens, prototypeRoutes } from './data';
import { buildFullCatalogBookSpecs, FULL_CATALOG_PAGE_COUNT } from './FullCatalogBook';

function Cover({ pageNumber }: { pageNumber: number }) {
  return (
    <CatalogPage pageNumber={pageNumber} section="جلد" tone="ink" className="catalog-book-cover" hideChrome>
      <div className="catalog-book-cover-grid" aria-hidden="true" />
      <header><BrandLockup inverted /></header>
      <div className="catalog-book-cover-copy">
        <span>انتشار رسمی سیستم تجربه ام‌رسالت</span>
        <h1>{catalogBookMeta.title}</h1>
        <p>{catalogBookMeta.subtitle}</p>
        <bdi dir="ltr">MResalat Design System Catalog · FA</bdi>
      </div>
      <div className="catalog-book-cover-motif" aria-hidden="true"><i /><i /><i /><strong>م</strong></div>
      <footer>
        <div><span>نسخه</span><bdi dir="ltr">{catalogBookMeta.version}</bdi></div>
        <div><span>تاریخ انتشار</span><strong>{catalogBookMeta.generatedAt}</strong></div>
        <div><span>دامنه</span><strong>طراحی · محصول · مهندسی</strong></div>
      </footer>
    </CatalogPage>
  );
}

function TokenPrototype({ pageNumber }: { pageNumber: number }) {
  return (
    <CatalogPage pageNumber={pageNumber} section="رنگ و توکن‌های معنایی" tone="soft">
      <PageTitle kicker="۰۳ · مبانی بصری" title="رنگ، حامل معناست" english="Color & semantic tokens" lead="توکن‌های روشن و تیره از پیاده‌سازی جاری استخراج شده‌اند؛ نام فنی ثابت می‌ماند و مقدار برای حفظ خوانایی با زمینه تغییر می‌کند." />
      <div className="catalog-book-token-grid">
        {lightDarkTokens.slice(0, 8).map((token) => <TokenSwatch {...token} key={token.name} />)}
      </div>
      <div className="catalog-book-brand-ramp">
        <div><strong>طیف برند</strong><p>رنگ غالب محصول، آبی ام‌رسالت است؛ فیروزه‌ای نقش تأکید مکمل را دارد.</p></div>
        {brandTokens.map((token) => <span style={{ background: token.value }} key={token.name}><code>{token.name}</code><bdi dir="ltr">{token.value}</bdi></span>)}
      </div>
      <Callout title="قاعده کاربرد" tone="info">وضعیت هیچ‌گاه تنها با رنگ منتقل نمی‌شود. متن، نماد و جایگاه بصری، معنای موفقیت، هشدار یا خطر را تکمیل می‌کنند.</Callout>
    </CatalogPage>
  );
}

function ComponentPrototype({ pageNumber }: { pageNumber: number }) {
  return (
    <CatalogPage pageNumber={pageNumber} section="اجزای پایه">
      <PageTitle kicker="۰۷ · اجزای پایه" title="یک جزء، چند سطح تأکید" english="Button & Badge" lead="اجزای پایه با حالت‌های محدود و قابل پیش‌بینی، زمینه را برای ترکیب‌های پیچیده‌تر فراهم می‌کنند." />
      <ComponentSpec name="Button" purpose="اجرای اقدام روشن با سلسله‌مراتب قابل تشخیص" variants={['primary', 'secondary', 'ghost', 'danger']} states={['default', 'hover', 'focus', 'disabled']}>
        <div className="catalog-book-button-demo">
          <Button>ادامه فرایند</Button>
          <Button tone="secondary">مشاهده جزئیات</Button>
          <button className="button button-ghost" type="button">انصراف</button>
          <Button tone="danger">توقف اقدام</Button>
          <Button disabled>غیرفعال</Button>
        </div>
      </ComponentSpec>
      <ComponentSpec name="Badge" purpose="نمایش وضعیت کوتاه و غیرشکننده در سطرهای RTL" variants={['standard', 'multiline']} states={['info', 'success', 'warning', 'danger', 'neutral']}>
        <div className="catalog-book-badge-demo">
          <Badge>اطلاعات</Badge><Badge tone="success">تأییدشده</Badge><Badge tone="warning">نیازمند بررسی</Badge><Badge tone="danger">توقف امن</Badge><Badge tone="neutral">فقط خواندنی</Badge>
          <Badge tone="warning" wrap="multiline">در انتظار تأیید سرپرست سازمان</Badge>
        </div>
      </ComponentSpec>
      <div className="catalog-book-two-col">
        <Callout title="درس QA: نشان کوتاه" tone="success">`Badge` به‌اندازه محتوای خود باقی می‌ماند، کوچک نمی‌شود و کلمه فارسی را در میانه نمی‌شکند.</Callout>
        <Callout title="گونه چندخطی" tone="warning">فقط برای عبارت بلند از `multiline` استفاده کنید؛ شکست خط در فاصله میان واژه‌ها انجام می‌شود.</Callout>
      </div>
    </CatalogPage>
  );
}

function MascotPrototype({ pageNumber }: { pageNumber: number }) {
  return (
    <CatalogPage pageNumber={pageNumber} section="دستیار هوشمند ام‌رسالت" tone="cyan">
      <PageTitle kicker="۰۹ · راهنمای هوشمند" title="شخصیت، در خدمت وضوح" english="SmartAssistant3D" lead="دستیار ام‌رسالت یک راهنمای رفتاری است: حالت چهره، ژست و شدت حرکت باید با وضعیت فرایند هماهنگ باشد." />
      <div className="catalog-book-mascot-layout">
        <ScreenshotFigure src="/catalog-book-generated/mascot-happy.png" alt="دستیار سه‌بعدی ام‌رسالت در حالت خوشحال" number="۹-۱" title="رندر واقعی حالت خوشحال در نمای کامل و پرتره" fit="contain" />
        <div className="catalog-book-mascot-notes">
          <div><strong>۱۰</strong><span>حالت رفتاری</span><small dir="ltr">greeting → handoff</small></div>
          <div><strong>۲</strong><span>حالت قاب</span><small dir="ltr">complete / portrait</small></div>
          <div><strong>۱</strong><span>بوم زنده مرجع</span><small>سیاست محدودیت WebGL</small></div>
          <ul>
            <li>نگاه صفحه یا قاب محلی، بدون تغییر محتوای اصلی</li>
            <li>توقف حرکت پیوسته در `prefers-reduced-motion`</li>
            <li>fallback ایستای CSS هنگام نبود WebGL</li>
            <li>بوم از فناوری کمکی پنهان و پاسخ اصلی در HTML</li>
          </ul>
        </div>
      </div>
      <div className="catalog-book-emotion-strip">
        {['greeting', 'listening', 'thinking', 'explaining', 'happy', 'warning', 'uncertain', 'handoff'].map((state) => <span key={state} dir="ltr">{state}</span>)}
      </div>
    </CatalogPage>
  );
}

function DomainPrototype({ pageNumber }: { pageNumber: number }) {
  const identity = ecosystemServiceById.mbazar;
  return (
    <CatalogPage pageNumber={pageNumber} section="۱۲ دامنه خدمات ام‌رسالت" tone="ink" className="catalog-book-domain-prototype">
      <header className="catalog-book-domain-header"><span>دامنه ۰۳</span><MResalatServiceIcon service={identity} size={64} eager /><div><h1>ام‌بازار و SAT</h1><bdi dir="ltr">M-Bazar + SAT</bdi></div></header>
      <div className="catalog-book-domain-hero">
        <ScreenshotFigure src="/catalog-book-generated/mbazar-cart.png" alt="نمونه سبد خرید ام‌بازار" number="۱۵-۳" title="سبد خرید ساختگی تا پیش از مرز تسویه" />
        <div><p>عمیق‌ترین ترکیب دامنه‌ای سیستم، از کشف کالا تا مدیریت سفارش و درخواست اقساطی را با اجزای مشترک می‌سازد.</p><div className="catalog-book-domain-stats"><Stat value={11} label="مسیر ممیزی‌شده" /><Stat value={26} label="جزء بازار" /><Stat value="L1–L3" label="دامنه ریسک" /></div></div>
      </div>
      <div className="catalog-book-flow-line"><span>کشف کالا</span><i>←</i><span>محصول</span><i>←</i><span>سبد</span><i>←</i><span>تسویه</span><i>←</i><strong>مرز پرداخت</strong></div>
      <Callout title="مرز اجرایی" tone="danger">تمام قیمت‌ها، نشانی‌ها و سفارش‌ها ساختگی‌اند. مسیر L3 اثر و مرور را نشان می‌دهد، اما پرداخت یا تعهد مالی اجرا نمی‌کند.</Callout>
    </CatalogPage>
  );
}

function RouteMatrixPrototype({ pageNumber }: { pageNumber: number }) {
  return (
    <CatalogPage pageNumber={pageNumber} section="۶۹ مسیر ممیزی‌شده">
      <PageTitle kicker="۱۶ · ردیابی ممیزی" title="هر مسیر، یک ردپای قابل بررسی" english="69 audited service paths" lead="ماتریس انتشار مستقیماً از رجیستری تایپ‌شده ساخته می‌شود؛ نمونه زیر نخستین مسیرهای فصل عضویت و ام‌حامی را نشان می‌دهد." />
      <div className="catalog-book-route-matrix">
        <div className="catalog-book-route-row is-head"><span>شماره</span><span>مسیر و دامنه</span><span>وضعیت</span><span>ریسک</span><span>مرز توقف / الگو</span></div>
        {prototypeRoutes.map((route, index) => (
          <div className="catalog-book-route-row" key={route.id}>
            <strong>{(index + 1).toLocaleString('fa-IR')}</strong>
            <div><b>{route.titleFa}</b><bdi dir="ltr">{route.titleEn}</bdi><code dir="ltr">{route.demoHref}</code></div>
            <span>{route.verificationStatus}</span>
            <RiskBadge level={route.riskLevel} />
            <div><p>{route.safeStopFa}</p><small dir="ltr">{route.surfaceKind} · {route.componentKeys.slice(-2).join(' + ')}</small></div>
          </div>
        ))}
      </div>
      <footer className="catalog-book-matrix-summary"><Stat value={69} label="رکورد نهایی" /><Stat value={12} label="فصل محصول" /><Stat value="69 / 69" label="پوشش پیاده‌سازی" /></footer>
    </CatalogPage>
  );
}

export function CatalogBook({ prototype = false }: { prototype?: boolean }) {
  const pages = [Cover, TokenPrototype, ComponentPrototype, MascotPrototype, DomainPrototype, RouteMatrixPrototype];
  if (!prototype) {
    const fullPages = buildFullCatalogBookSpecs();
    return <main className="catalog-book-document" dir="rtl" data-page-count={FULL_CATALOG_PAGE_COUNT}><Cover pageNumber={0} />{fullPages.map((item, index) => <CatalogPage pageNumber={index + 1} section={item.sectionTitle} tone={item.tone} className={item.className} key={item.key}>{item.content}</CatalogPage>)}</main>;
  }
  return <main className="catalog-book-document" dir="rtl">{pages.map((Page, index) => <Page pageNumber={index} key={Page.name} />)}</main>;
}
