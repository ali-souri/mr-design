import type { DocumentationPage, DocumentationSection } from './types';

const section = (id: string, title: string, value: Omit<DocumentationSection, 'id' | 'title'>): DocumentationSection => ({ id, title, ...value });

const sourceSection = (page: DocumentationPage): DocumentationSection => section('source-files', 'فایل‌های مرجع', {
  paragraphs: ['این صفحه به قراردادهای واقعی مخزن متکی است. مسیرها repository-relative هستند و روی دستگاه توسعه‌دهنده خاصی قفل نشده‌اند.'],
  bullets: page.sourcePaths?.length ? page.sourcePaths : ['README.md'],
});

const sharedByGroup: Record<DocumentationPage['group'], DocumentationSection[]> = {
  'getting-started': [section('workflow', 'چرخه توسعه', {
    bullets: ['تغییر را کوچک و تایپ‌شده نگه دارید.', 'از رجیستری موجود استفاده کنید و فهرست موازی نسازید.', 'lint، typecheck، تست‌های مرتبط و build را پیش از تحویل اجرا کنید.'],
  })],
  foundations: [section('foundation-rule', 'قاعده پایه', {
    paragraphs: ['پایه‌های بصری در app/globals.css معنایی‌اند. مصرف‌کننده باید نقش را انتخاب کند، نه یک hex یا اندازه تصادفی.'],
    callout: { tone: 'warning', title: 'از override موضعی پرهیز کنید', body: 'رنگ، فاصله یا جهت موضعی که معنای سیستم را دور می‌زند، در light/dark و RTL به‌سرعت واگرا می‌شود.' },
  })],
  customization: [section('customization-rule', 'قاعده شخصی‌سازی', {
    paragraphs: ['تنظیم از نزدیک‌ترین منبع قطعی انجام می‌شود: CSS token برای foundation، رجیستری برای domain، و prop تایپ‌شده برای component instance.'],
    bullets: ['semantic token را تغییر دهید، نه رنگ هر کارت را.', 'مقادیر union را گسترش دهید و همه حالت‌ها را تست کنید.', 'برای هر تغییر معنایی، light/dark و RTL را همزمان مرور کنید.'],
  })],
  'core-concepts': [section('concept-boundary', 'مرز مفهوم', {
    paragraphs: ['هر مفهوم یک مسئولیت دارد. identity، segment، context، relationship، permission، trust و risk قابل جایگزینی با یکدیگر نیستند.'],
  })],
  components: [section('component-contract', 'قرارداد جزء', {
    bullets: ['از import path واقعی استفاده کنید.', 'props را از TypeScript implementation بخوانید.', 'variant، state، دسترس‌پذیری، RTL و dark theme را مستقل بررسی کنید.', 'جزء Internal یا Demo-only را به API عمومی تبدیل‌شده فرض نکنید.'],
  })],
  domains: [section('domain-boundary', 'مرز دامنه', {
    paragraphs: ['صفحه دامنه از اجزای مشترک ترکیب می‌شود، اما وضعیت eligibility، status و اثر عملیات باید از backend قطعی آینده بیاید. fixtures فعلی فقط داده نمایشی‌اند.'],
    callout: { tone: 'security', title: 'مرز توقف واقعی است', body: 'L2 و L3 پیش از ذخیره، ارسال، پرداخت یا تعهد تولید متوقف می‌شوند.' },
  })],
  guides: [section('definition-of-done', 'تعریف پایان کار', {
    bullets: ['رجیستری و route به‌روز است.', 'حالت خالی، خطا، RTL، mobile و dark پوشش دارد.', 'risk و safe stop روشن است.', 'نمونه Showcase و مستندات هر دو باقی می‌مانند.', 'تست‌های docs و build عبور می‌کنند.'],
  })],
  architecture: [section('architecture-principle', 'اصل معماری', {
    paragraphs: ['ترکیب‌ها می‌توانند domain-specific باشند؛ قراردادهای مشترک باید typed، کوچک و قابل ردیابی بمانند. لایه AI منبع حقیقت عملیاتی نیست.'],
  })],
  reference: [section('reference-origin', 'منبع داده', {
    paragraphs: ['جدول‌های این بخش از رجیستری‌ها و typeهای موجود پروژه تغذیه می‌شوند. برای تغییر داده، ابتدا منبع قطعی را اصلاح کنید.'],
  })],
};

const specific: Record<string, DocumentationSection[]> = {
  'getting-started': [
    section('current-state', 'وضعیت فعلی', { paragraphs: ['MResalat System یک برنامه و پیاده‌سازی design system خصوصی با React، TypeScript، Next.js و Vinext است؛ بسته npm منتشرشده نیست. رابط‌ها Persian-first و RTL-first هستند و همه داده‌های عملیاتی فعلی demo/fixture باقی مانده‌اند.'] }),
    section('start-here', 'از کجا شروع کنم؟', { bullets: ['برای اجرا: نصب و اجرا را بخوانید.', 'برای نخستین جزء: شروع سریع.', 'برای مسیر پوشه‌ها: ساختار پروژه.', 'برای قواعد طراحی: RTL، Theme، Trust و Risk.', 'برای توسعه domain: راهنمای افزودن دامنه.'] }),
  ],
  'getting-started/installation': [
    section('prerequisites', 'پیش‌نیازها', { table: { columns: ['نیازمندی', 'نسخه / وضعیت'], rows: [['Node.js', '>= 22.13.0'], ['npm', 'همراه Node.js'], ['دسترسی مخزن', 'SSH به مخزن خصوصی']] } }),
    section('clone-install', 'دریافت و نصب', { code: 'git clone git@github.com:ali-souri/mr-design.git\ncd mr-design\nnpm install', language: 'bash' }),
    section('development', 'اجرای توسعه', { code: 'npm run dev', language: 'bash', callout: { tone: 'info', title: 'وضعیت بسته', body: 'دستور npm install @mresalat/system معتبر نیست؛ چنین بسته منتشرشده‌ای در این مخزن تعریف نشده است.' } }),
    section('validation', 'اعتبارسنجی کامل', { code: 'npm run lint\nnpx tsc --noEmit\nnpm run test:mascot\nnpm run test:catalog\nnpm run test:examples\nnpm run test:docs\nnpm run build', language: 'bash' }),
  ],
  'getting-started/quick-start': [
    section('first-component', 'اولین component', { code: "import { Button } from '@/mresalat/core/primitives'\n\nexport function Example() {\n  return <Button>ادامه</Button>\n}", language: 'tsx', filename: 'Example.tsx' }),
    section('foundation-imports', 'اجزای پایه بعدی', { code: "import { BrandLogo } from '@/mresalat/core/BrandLogo'\nimport { MResalatIcon } from '@/mresalat/core/MResalatIcon'\nimport { Alert, Badge } from '@/mresalat/core/primitives'", language: 'tsx' }),
    section('usage-notes', 'نکات استفاده', { bullets: ['Button همه props استاندارد button را می‌پذیرد.', 'نام آیکون باید MResalatIconName واقعی باشد.', 'Alert با tone=danger نقش alert و در بقیه حالت‌ها role=status دارد.', 'برای فهرست کامل props از صفحه component استفاده کنید.'] }),
  ],
  'getting-started/project-structure': [
    section('tree', 'نقشه curated مخزن', { code: 'app/                 # routeها، layout و CSS سراسری\nmresalat/\n  ai/                # mascot، assistant و trust UI\n  catalog/           # سطح و explorer کاتالوگ\n  contexts/          # context، relationship و permission\n  core/              # shell، brand، icon، primitive و inventory\n  domains/           # قراردادها و رجیستری‌های دامنه\n  examples/          # compositionهای محصول\n  journeys/          # template و process review\n  mbazar/            # دامنه کامل marketplace\n  motion/            # motion کم‌هزینه\n  secure/            # جریان اقدام حساس\n  segments/          # registration و home سگمنت‌ها\n  showcase/          # نمونه کد و grid demo\n  docs/              # registry و renderer مستندات\npublic/              # font، brand و service identities\ntests/               # تست‌های Node\ndocs/                # مستندات repository-level', language: 'text' }),
    section('placement', 'کد جدید کجا قرار می‌گیرد؟', { table: { columns: ['نوع', 'مکان'], rows: [['component مشترک', 'mresalat/core یا خانواده تخصصی'], ['domain fixture', 'mresalat/<domain>/data.ts یا mresalat/contexts/fixtures.ts'], ['service identity', 'public/service-identities + mresalat/domains/ecosystem.ts'], ['route', 'app/.../page.tsx'], ['docs metadata', 'mresalat/docs/registry.ts'], ['تست', 'tests/*.test.mjs']] } }),
  ],
  'getting-started/commands': [
    section('commands', 'دستورها', { table: { columns: ['دستور', 'هدف'], rows: [['npm run dev', 'اجرای Vinext توسعه'], ['npm run lint', 'قواعد ESLint'], ['npx tsc --noEmit', 'بررسی TypeScript'], ['npm run build', 'build تولید'], ['npm run test:mascot', 'قراردادهای mascot/WebGL'], ['npm run test:catalog', 'پوشش catalog'], ['npm run test:examples', 'پوشش route نمونه‌ها'], ['npm run test:docs', 'اعتبار registry و backward compatibility']] } }),
    section('ci-status', 'CI', { paragraphs: ['مخزن در این مستندات workflow CI ادعاشده‌ای ندارد. این دستورها قرارداد محلی تحویل هستند.'] }),
  ],
  'getting-started/first-page': [
    section('route-example', 'Route کوچک', { code: "import { AppShell } from '@/mresalat/core/AppShell'\nimport { Button } from '@/mresalat/core/primitives'\n\nexport default function ExamplePage() {\n  return (\n    <AppShell active=\"examples\">\n      <section className=\"ds-section\">\n        <h1>عنوان صفحه</h1>\n        <p>شرح روشن و فارسی صفحه.</p>\n        <Button>ادامه</Button>\n      </section>\n    </AppShell>\n  )\n}", language: 'tsx', filename: 'app/examples/example/page.tsx' }),
    section('page-checklist', 'چک‌لیست صفحه', { bullets: ['route و active navigation درست است.', 'H1 یکتا و hierarchy عنوان‌ها منطقی است.', 'داده فنی و code island با dir=ltr نمایش داده می‌شود.', 'در 390px overflow صفحه ایجاد نمی‌شود.', 'اقدام L2/L3 safe stop دارد.'] }),
  ],
  'getting-started/typescript': [
    section('contract-example', 'قرارداد دامنه', { code: "import type { RiskLevel, ServiceJourney } from '@/mresalat/domains/contracts'\n\ntype PageConfig = {\n  journey: ServiceJourney\n  riskLevel: RiskLevel\n}", language: 'tsx' }),
    section('rules', 'قواعد', { bullets: ['strict=true فعال است.', 'رشته جدید برای risk، icon، segment یا status نسازید؛ union موجود را گسترش دهید.', 'رجیستری را با satisfies یا type صریح کنترل کنید.', 'fixture را از قرارداد component جدا نگه دارید.'] }),
  ],
  'foundations/rtl': [
    section('document-direction', 'جهت سند و ترتیب معنایی', { paragraphs: ['RootLayout روی html مقدار lang=fa و dir=rtl دارد. ترتیب DOM باید مطابق ترتیب خواندن فارسی باشد؛ برای اصلاح ظاهری از row-reverse بی‌دلیل استفاده نکنید.'] }),
    section('technical-islands', 'جزیره‌های فنی LTR', { code: '<code dir="ltr">surface.selected</code>\n<bdi>MR-850822</bdi>\n<span dir="ltr">/showcase/reference/tokens</span>', language: 'html' }),
    section('rtl-checklist', 'موارد حساس', { bullets: ['next/previous را از MResalatIcon بگیرید.', 'price و تاریخ فارسی می‌توانند RTL بمانند؛ شناسه، route و code باید LTR باشند.', 'carousel و horizontal scroll را با رفتار فیزیکی مرور کنید.', 'drawer از سمت مناسب باز شود اما focus order از DOM بیاید.', 'جدول فنی باید سلول code را LTR کند.'] }),
    section('do-dont', 'Do / Don’t', { callout: { tone: 'warning', title: 'آیکون جهت‌دار خام وارد نکنید', body: 'ArrowLeft/ArrowRight را مستقیماً از Lucide برای navigation وارد نکنید؛ نگاشت next/previous در MResalatIcon قرارداد RTL سیستم است.' } }),
  ],
  'foundations/accessibility': [
    section('keyboard', 'صفحه‌کلید و Focus', { bullets: ['همه controlهای تعاملی با Tab قابل دسترسی‌اند.', 'focus-visible سراسری outline سه‌پیکسلی دارد.', 'groupهای sidebar از button واقعی و aria-expanded استفاده می‌کنند.', 'drawer مستندات focus trap، Escape و بازگرداندن focus دارد.'] }),
    section('status', 'وضعیت و اعلام', { bullets: ['رنگ هرگز تنها حامل status نیست.', 'پیام کپی با aria-live اعلام می‌شود.', 'مرحله جاری aria-current مناسب دارد.', 'خطا کنار label/field و با aria-invalid نمایش داده می‌شود.'] }),
    section('motion', 'حرکت و لمس', { bullets: ['prefers-reduced-motion را در mascot و Parallax رعایت کنید.', 'هدف لمسی اصلی حداقل نزدیک 44–48px است.', 'محتوای عملکردی به WebGL وابسته نیست.'] }),
  ],
  'foundations/responsive': [
    section('semantic-reflow', 'بازچینی معنایی', { paragraphs: ['Responsive فقط کوچک‌کردن desktop نیست. اقدام اصلی، وضعیت جاری و متن ضروری باید در mobile پیش از جزئیات ثانویه قرار گیرند.'] }),
    section('patterns', 'الگوهای صفحه', { table: { columns: ['سطح', 'رفتار باریک'], rows: [['Home hero', 'متن و اقدام پیش از illustration/assistant'], ['Service page', 'CTA و requirements در ستون واحد'], ['Dashboard', 'summary پیش از table/filters'], ['M-Bazar grid', 'کارت تک/دوستونه با filter drawer'], ['Checkout', 'خلاصه سفارش پس از انتخاب‌های اصلی و sticky فقط در فضای کافی'], ['Documentation', 'sidebar در drawer و code با scroll داخلی'], ['Segment home', 'اولویت‌های segment حفظ و ماژول‌ها بازچینی می‌شوند']] } }),
  ],
  'foundations/grid': [
    section('grid-values', 'مقادیر فعلی', { table: { columns: ['بازه', 'ترکیب'], rows: [['تا 640px', '۱ تا ۴ ستون منطقی، gutter حدود ۱۴px'], ['تا 900px', 'تا ۸ ستون منطقی، gutter حدود ۲۴px'], ['بزرگ‌تر', '۱۲ ستون منطقی، gap معمول ۱۶px، max 1180px']] } }),
    section('reading-width', 'عرض خواندن', { paragraphs: ['متن بلند حدود 680px در Showcase و 760–860px در docs نگه داشته می‌شود. preview و table می‌توانند عمداً عریض‌تر باشند.'] }),
  ],
  'foundations/spacing-radius': [
    section('spacing', 'Spacing', { table: { columns: ['Token', 'Value'], rows: [['space.1', '4px'], ['space.2', '8px'], ['space.3', '12px'], ['space.4', '16px'], ['space.5', '20px'], ['space.6', '24px'], ['space.8', '32px'], ['space.10', '40px']] } }),
    section('radius', 'Radius', { table: { columns: ['Token', 'Value', 'کاربرد'], rows: [['radius.sm', '10px', 'کنترل'], ['radius.md', '16px', 'کارت'], ['radius.lg', '24px', 'سطح اصلی'], ['radius.pill', '999px', 'badge/chip']] } }),
    section('elevation', 'Elevation', { paragraphs: ['shadow-sm برای سطح قابل تعامل و shadow-md برای overlay یا assistant برجسته است. عمق برای hierarchy است، نه تزئین؛ در dark mode روی هر سطح border اضافه نکنید.'] }),
  ],
  'foundations/typography': [
    section('font-files', 'فونت و وزن‌ها', { paragraphs: ['IRANSansX FaNum به‌صورت local از public/fonts بارگذاری می‌شود. وزن‌های واقعی 400، 500، 600 و 700 هستند و font-display=swap است.'] }),
    section('persian-type', 'متن فارسی', { bullets: ['Body سراسری line-height=1.85 دارد.', 'نمایش اعداد فارسی در متن محصول با FaNum انجام می‌شود.', 'عنوان‌ها کوتاه و hierarchy آن‌ها ثابت می‌ماند.', 'code از monospace سیستم و جهت LTR استفاده می‌کند.'] }),
    section('mixed-content', 'محتوای ترکیبی', { code: '<p>شناسه: <bdi>MR-850822</bdi></p>\n<p>مسیر: <code dir="ltr">/showcase/foundations/rtl</code></p>\n<p>توکن: <code dir="ltr">surface.selected</code></p>\n<p>مبلغ: ۳٬۸۰۰٬۰۰۰ تومان</p>\n<p>تاریخ: ۲۲ مرداد ۱۴۰۵</p>', language: 'html' }),
  ],
  'foundations/icons': [
    section('icon-usage', 'مصرف', { code: "import { MResalatIcon } from '@/mresalat/core/MResalatIcon'\n\n<MResalatIcon name=\"assistant\" size={20} />\n<MResalatIcon name=\"next\" size={16} label=\"مرحله بعد\" />", language: 'tsx' }),
    section('why-wrapper', 'چرا wrapper؟', { paragraphs: ['MResalatIcon نام معنایی، strokeWidth=1.8، جهت next/previous و رفتار aria را یکپارچه می‌کند. import مستقیم Lucide این قراردادها را دور می‌زند.'] }),
  ],
  'foundations/service-identities': [
    section('identity-model', 'مدل هویت', { table: { columns: ['Source', 'رفتار'], rows: [['official-asset', 'asset ذخیره‌شده با provenance و نمایش تصویری'], ['mresalat-system-designed', 'fallback کدنویسی‌شده با glyph؛ هرگز نشان رسمی نامیده نمی‌شود']] } }),
    section('usage', 'استفاده', { code: "import { MResalatServiceIcon } from '@/mresalat/core/MResalatServiceIcon'\nimport { ecosystemServices } from '@/mresalat/domains/ecosystem'\n\nconst service = ecosystemServices.find((item) => item.slug === 'mbazar')!\n<MResalatServiceIcon service={service} size={48} />", language: 'tsx' }),
  ],
  'customization/theme': [
    section('modes', 'Light / Dark / System', { paragraphs: ['ThemeToggle ترتیب light → dark → system را می‌چرخاند و preference را در localStorage با کلید mresalat-theme نگه می‌دارد. در system تغییر prefers-color-scheme همگام می‌شود.'] }),
    section('flash', 'پیش از render', { paragraphs: ['RootLayout یک script کوچک در head اجرا می‌کند تا data-theme و color-scheme پیش از hydrate تنظیم شوند. query پارامتر catalog-theme در صفحات catalog اولویت دارد.'] }),
    section('theme-css', 'تغییر معنایی', { code: ":root {\n  --surface-canvas: #f2f5fa;\n  --surface-default: #ffffff;\n  --action-primary: #075aa7;\n}\n\nhtml[data-theme='dark'] {\n  --surface-canvas: #091827;\n  --surface-default: #102235;\n  --action-primary: #4fa3ea;\n}", language: 'css', filename: 'app/globals.css' }),
    section('dark-layering', 'لایه‌بندی dark', { paragraphs: ['canvas میزبان default است؛ secondary گروه داخلی و selected وضعیت انتخاب را نشان می‌دهد. تفاوت سطح با رنگ/روشنایی ساخته می‌شود و لازم نیست هر سطح dark border داشته باشد.'] }),
  ],
  'customization/colors': [
    section('change-colors', 'چه چیزی را تغییر دهیم؟', { bullets: ['brand.* برای طیف برند.', 'surface.* برای لایه‌بندی روشن/تیره.', 'status.* برای نتیجه‌های قطعی.', 'trust.* فقط با تصمیم معنایی سراسری.'] }),
    section('trust-warning', 'معنای Trust', { callout: { tone: 'warning', title: 'trust.official تزئینی نیست', body: 'تغییر آن معنای دانش رسمی را در همه SourceCitation و TrustLegendها تغییر می‌دهد. رنگ per-component برای این نقش تعریف نکنید.' } }),
  ],
  'customization/typography': [
    section('font-loading', 'Font loading', { code: "@font-face {\n  font-family: 'IRANSansX';\n  src: url('/fonts/IRANSansXFaNum-Regular.woff2') format('woff2');\n  font-weight: 400;\n  font-display: swap;\n}", language: 'css', filename: 'app/globals.css' }),
    section('change-checklist', 'پس از تغییر فونت', { bullets: ['وزن‌های 400/500/600/700 واقعاً موجود باشند.', 'line-height فارسی روی body، card و table بازبینی شود.', 'FaNum یا جایگزین عدد فارسی حفظ شود.', 'code و route همچنان monospace/LTR بمانند.'] }),
  ],
  'customization/layout': [
    section('layout-options', 'الگوهای عرض', { table: { columns: ['نوع', 'انتخاب'], rows: [['صفحه عمومی', 'page-container تا 1180px'], ['ستون خواندن', '760–860px در docs؛ حدود 680px در Showcase'], ['داشبورد', 'grid چندستونه با summary اول'], ['فرم', 'ستون محدود و label نزدیک field'], ['Marketplace', 'قاب عریض با grid و drawer فیلتر']] } }),
  ],
  'customization/icons': [
    section('add-icon', 'افزودن نام معنایی', { code: "import { Download } from 'lucide-react'\n\nexport const iconMap = {\n  // ...\n  download: Download,\n} satisfies Record<string, LucideIcon>", language: 'tsx', filename: 'mresalat/core/MResalatIcon.tsx' }),
    section('icon-review', 'پیش از افزودن', { bullets: ['آیا نام نقش محصول را بیان می‌کند؟', 'آیا جهت‌دار است و mapping RTL لازم دارد؟', 'آیا اندازه 16/20/24/32 کافی است؟', 'آیا label لازم است یا تزئینی است؟'] }),
  ],
  'customization/service-identities': [
    section('add-record', 'ثبت هویت', { code: "identity: {\n  source: 'official-asset',\n  asset: '/service-identities/example.svg',\n  assetSourceUrl: 'https://source.example/asset.svg',\n  accent: '#0a72b8',\n}", language: 'tsx', filename: 'mresalat/domains/ecosystem.ts' }),
    section('fallback', 'Fallback', { paragraphs: ["اگر asset رسمی قابل اتکا نیست، source را 'mresalat-system-designed' و glyph را صریح ثبت کنید. این fallback نباید در متن یا badge به‌عنوان official معرفی شود."] }),
  ],
  'customization/motion': [
    section('parallax', 'Parallax', { code: "import { ParallaxLayer } from '@/mresalat/motion/ParallaxLayer'\n\n<ParallaxLayer strength={8}>\n  <YourCard />\n</ParallaxLayer>", language: 'tsx' }),
    section('motion-rules', 'قواعد', { bullets: ['تنها transform را حرکت دهید؛ layout shift نسازید.', 'strength پیش‌فرض 8 است.', 'reduced-motion باید نتیجه ثابت و کامل داشته باشد.', 'حرکت برای hierarchy/feedback است، نه جلوگیری از خواندن.'] }),
  ],
  'customization/assistant': [
    section('assistant-example', 'پیکربندی', { code: "import { SmartAssistant3D } from '@/mresalat/ai/SmartAssistant3D'\n\n<SmartAssistant3D\n  mode=\"portrait\"\n  emotion=\"explaining\"\n  motionIntensity=\"restrained\"\n  gaze=\"local\"\n  transparent\n/>", language: 'tsx' }),
    section('performance', 'Performance و fallback', { bullets: ['در Showcase فقط یک WebGL canvas زنده نگه دارید.', 'component به‌صورت lazy canvas را می‌آورد.', 'WebGL ناموجود، reduced motion یا staticOnly به fallback CSS می‌روند.', 'هیچ متن یا action ضروری داخل canvas نباشد.'] }),
  ],
  'core-concepts/segments': [
    section('segment-definition', 'Segment چیست؟', { paragraphs: ['Segment دسته‌بندی صرفاً بصری نیست. config آن اولویت، copy، اقدام، journey، prompt دستیار و moduleهای خانه را تغییر می‌دهد.'] }),
    section('audiences', 'تجربه‌های فعلی', { bullets: ['general', 'new-member', 'loan-applicant', 'prospective-seller', 'active-seller', 'organization-manager', 'organization-employee', 'parent', 'young-user', 'care-seeker'] }),
    section('registration-segments', 'قرارداد registration', { paragraphs: ['برای فازهای عضویت و خانه پس از ثبت‌نام، SegmentSlug فعلی individual | under-18 | organization است. این type را با مدل ۱۰ تجربه مخاطب یکی فرض نکنید.'] }),
  ],
  'core-concepts/context': [
    section('context-model', 'هویت در برابر Context', { paragraphs: ['یک کاربر می‌تواند بدون تغییر identity میان personal، parent و employee context جابه‌جا شود. context انتخاب‌شده تعیین می‌کند کدام relationship و permission فعال است.'] }),
    section('context-flow', 'جریان', { code: 'Identity\n  → active context\n    → relationship\n      → permissions\n        → selected entity/child\n          → home priorities + actions', language: 'text' }),
  ],
  'core-concepts/permissions': [
    section('permission-states', 'وضعیت‌ها', { bullets: ['allowed: اقدام قابل انجام در مرز demo.', 'view-only: نمایش بدون تغییر.', 'parent/manager approval: نیازمند تصمیم رابطه مرتبط.', 'step-up: احراز قوی پیش از اثر.', 'unavailable/blocked: کنترل غیرفعال همراه دلیل.'] }),
    section('permission-rule', 'قاعده', { callout: { tone: 'security', title: 'پنهان‌کردن کافی نیست', body: 'Backend آینده باید permission را قطعی اعمال کند؛ UI فقط وضعیت را توضیح و کنترل را پیشگیرانه غیرفعال می‌کند.' } }),
  ],
  'core-concepts/rag': [
    section('roles', 'چهار نقش اطلاعات', { table: { columns: ['نقش', 'نمونه', 'قابلیت'], rows: [['Official knowledge', 'سیاست/راهنمای نسخه‌دار', 'citation و excerpt'], ['Live data', 'وضعیت یا موجودی لحظه‌ای', 'timestamp/source system'], ['AI explanation', 'توضیح قابل فهم', 'هرگز state عملیاتی نمی‌سازد'], ['Recommendation', 'پیشنهاد شخصی', 'صریحاً غیرقطعی']] } }),
    section('uncertainty', 'عدم قطعیت', { paragraphs: ['اگر evidence کافی نیست، UncertainAnswer سؤال روشن‌کننده می‌پرسد یا HumanHandoff خلاصه زمینه می‌سازد. حدس زدن پاسخ عملیاتی ممنوع است.'] }),
  ],
  'core-concepts/secure-actions': [
    section('sequence', 'توالی', { code: 'Explain\n  → Review impact\n    → Explicit confirmation\n      → Step-up authentication\n        → Receipt OR safe stop', language: 'text' }),
    section('secure-rules', 'قواعد', { bullets: ['confirmation از CTA اولیه جداست.', 'resource حساس mask می‌شود.', 'failure صریحاً اعلام می‌کند هیچ تغییری انجام نشده.', 'demo پیش از اثر تولید واقعی متوقف می‌شود.'] }),
  ],
  'components/core': [
    section('import', 'Import', { code: "import { Alert, Badge, Button } from '@/mresalat/core/primitives'", language: 'tsx' }),
    section('example', 'مثال', { code: '<Button tone="primary">ادامه</Button>\n<Badge tone="warning">نیازمند توجه</Badge>\n<Alert tone="success" title="ثبت شد">شماره پیگیری آماده است.</Alert>', language: 'tsx' }),
  ],
  'components/ai': [
    section('layers', 'لایه‌ها', { table: { columns: ['جزء', 'نقش', 'وضعیت API'], rows: [['AssistantShell', 'قاب ورودی گفتگو', 'Public reusable'], ['SmartAssistant3D', 'enhancement بصری', 'Public reusable / experimental'], ['SmartAssistantAvatar', 'پرتره سبک', 'Public reusable'], ['SmartAssistantCanvas', 'پیاده‌سازی WebGL', 'Internal'], ['Assistant3DDemo', 'کنترل QA/Showcase', 'Showcase/debug only'], ['SegmentAIEntry', 'ورودی سگمنت‌محور', 'Public reusable / experimental']] } }),
  ],
  'components/rag': [
    section('trust-example', 'ترکیب', { code: "import { HumanHandoff, SourceCitation, TrustLegend, UncertainAnswer } from '@/mresalat/ai/StructuredAnswer'\n\n<TrustLegend />\n<SourceCitation source={source} />\n<UncertainAnswer />\n<HumanHandoff />", language: 'tsx' }),
  ],
  'components/marketplace': [
    section('families', 'خانواده‌ها', { table: { columns: ['خانواده', 'اجزای شاخص'], rows: [['Discovery', 'MBazarSearch · CategoryCard · FilterBar'], ['Product', 'ProductCard · PriceDisplay · QuickView'], ['Cart', 'QuantityControl · CartSummary'], ['Checkout', 'DeliveryAddressCard · PaymentModeSelector · CheckoutConfirmation'], ['Installments', 'EligibilityPanel · PlanCard · RequestCard'], ['Orders', 'OrderCard · OrderStatus · OrderProgress · FulfillmentGroup'], ['Account', 'FavoriteCard · AddressCard · ReviewCard · SupportCaseCard'], ['Seller', 'SellerHeader · SellerPage']] } }),
    section('marketplace-boundary', 'مرز داده', { paragraphs: ['قیمت، موجودی، eligibility، سفارش و پرداخت در حال حاضر fixture هستند. در production، backend قطعی آن‌ها را می‌دهد و AI فقط توضیح می‌دهد.'] }),
  ],
  'domains/mbazar': [
    section('domain-map', 'نقشه دامنه', { code: 'Discovery → Product → Cart → Checkout\n                         ↘ Installments\nOrders → Support\nAccount → Addresses / Favorites / Reviews\nSeller storefront → Product discovery', language: 'text' }),
    section('reuse', 'Reuse', { paragraphs: ['routeهای نمونه ام‌بازار اجزای موجود را reuse می‌کنند؛ برای مستندات یا domain جدید خانواده موازی نسازید. cart-state، data و types مرزهای اصلی‌اند.'] }),
  ],
  'guides/create-service-page': [
    section('service-page-code', 'ترکیب واقعی', { code: "import { ServicePageTemplate } from '@/mresalat/journeys/ServicePageTemplate'\nimport { loanJourney } from '@/mresalat/domains/mock-data'\n\nexport default function ServicePage() {\n  return <ServicePageTemplate journey={loanJourney} />\n}", language: 'tsx', filename: 'app/example-service/page.tsx' }),
    section('required-data', 'اطلاعات لازم', { bullets: ['هویت خدمت و provenance', 'hero/summary', 'benefits و requirements', 'documents و steps', 'FAQ', 'AssistantSource', 'risk level و safe stop', 'CTA و next action'] }),
  ],
  'guides/create-domain': [
    section('domain-steps', 'مراحل', { table: { columns: ['مرحله', 'کار'], rows: [['1', 'ثبت service identity/catalog entry'], ['2', 'تعریف route/domain model'], ['3', 'ساخت fixture کاملاً synthetic'], ['4', 'ترکیب shared components'], ['5', 'افزودن assistant context'], ['6', 'تخصیص risk و safe stop'], ['7', 'افزودن Showcase example بدون حذف قبلی'], ['8', 'به‌روزرسانی component inventory در صورت component جدید'], ['9', 'افزودن canonical route و QA'], ['10', 'افزودن/اجرای تست‌ها']] } }),
  ],
  'guides/rag-answer': [
    section('rag-flow', 'جریان پاسخ', { code: 'User intent\n  → retrieve official knowledge\n  → fetch live data through authoritative API (future)\n  → separate sources\n  → explain with AI\n  → clarify or hand off when uncertain', language: 'text' }),
    section('rag-warning', 'ممنوع', { callout: { tone: 'security', title: 'LLM به دیتابیس وصل نمی‌شود', body: 'Gateway/API و backend قطعی منبع eligibility، status و effect هستند. مدل نباید state عملیاتی بسازد یا تغییر دهد.' } }),
  ],
  'guides/secure-action': [
    section('secure-action-code', 'تعریف اقدام', { code: "import type { SecureAction } from '@/mresalat/domains/contracts'\n\nconst action: SecureAction = {\n  id: 'temporary-card-block',\n  riskLevel: 3,\n  title: 'مسدودسازی موقت کارت',\n  summary: 'اثر اقدام پیش از تأیید توضیح داده می‌شود.',\n  requiresConfirmation: true,\n  requiresStepUpAuth: true,\n  maskedResource: '**** 3412',\n}", language: 'tsx' }),
    section('safe-stop', 'Safe stop', { paragraphs: ['در دمو، حتی پس از نمایش موفقیت هیچ API بانکی فراخوانی نمی‌شود. production باید receipt واقعی را تنها پس از نتیجه قطعی backend بسازد.'] }),
  ],
  'guides/update-documentation': [
    section('docs-steps', 'مراحل', { bullets: ['صفحه را در mresalat/docs/registry.ts ثبت کنید.', 'content یا reference renderer مناسب را اضافه کنید.', 'اگر component جدید است componentInventory را اصلاح کنید.', 'snippet فقط با import و API واقعی اضافه شود.', 'deep link، sidebar، search و previous/next را بررسی کنید.', 'npm run test:docs و npm run build را اجرا کنید.'] }),
    section('legacy-rule', 'Backward compatibility', { callout: { tone: 'warning', title: 'Showcase حذف نمی‌شود', body: 'افزودن مستندات عمیق مجوز حذف section، anchor، demo، snippet، catalog، inventory یا QA قبلی نیست.' } }),
  ],
  'architecture': [
    section('layer-diagram', 'نقشه لایه‌ها', { code: 'AppShell\n  ↓\nSegment / active context\n  ↓\nDomain composition\n  ↓\nShared components + semantic tokens\n  ↓\nDeterministic demo/domain state\n  ↓\nAI / RAG representation\n  ↓\nFuture API · Gateway · Tool boundary', language: 'text' }),
    section('dependency-rule', 'جهت وابستگی', { paragraphs: ['صفحه route باید thin بماند و composition دامنه را فراخوانی کند. core نباید به domain fixture خاص وابسته شود. AI و WebGL enhancement هستند و routeهای Getting Started آن‌ها را بارگذاری نمی‌کنند.'] }),
  ],
  'architecture/registries': [
    section('registry-table', 'رجیستری‌های قطعی', { table: { columns: ['Registry', 'نقش'], rows: [['componentInventory', 'نام، purpose، variant و state اجزا'], ['serviceCatalog', '۶۹ مسیر، risk، status و safe stop'], ['ecosystemServices', 'هویت، action و provenance خدمت'], ['segments', '۱۰ تجربه مخاطب و routeها'], ['exampleRouteRegistry', 'canonical demo route'], ['AnalyticsEventName', 'رویدادهای مجاز'], ['documentationGroups', 'sidebar، search، breadcrumbs و previous/next']] } }),
  ],
  'architecture/client-server': [
    section('boundary', 'مرز فعلی', { table: { columns: ['Server-friendly', 'Client-only'], rows: [['registry و metadata', 'clipboard و search state'], ['صفحه و محتوای مستندات', 'drawer/focus trap'], ['جداول static', 'ThemeToggle و localStorage'], ['composition بدون browser API', 'WebGL، pointer و interactive demo']] } }),
  ],
  'architecture/integration': [
    section('current-future', 'فعلی در برابر production', { table: { columns: ['Current implementation', 'Future production'], rows: [['typed demo/UI architecture', 'API/Gateway/Tool integration'], ['synthetic fixtures', 'authoritative service responses'], ['deterministic local answers', 'retrieval + governed model explanation'], ['local CustomEvent analytics', 'approved analytics adapter'], ['safe stop before effect', 'backend confirmation + receipt']] } }),
    section('integration-rules', 'اصول غیرقابل مذاکره', { bullets: ['LLM دسترسی مستقیم به database ندارد.', 'live data از RAG knowledge جدا می‌ماند.', 'backend eligibility و status را تعیین می‌کند.', 'AI توضیح می‌دهد و state عملیاتی جعل نمی‌کند.', 'اقدام حساس confirmation و کنترل صریح دارد.'] }),
  ],
  'architecture/testing': [
    section('test-commands', 'دستورهای واقعی', { code: 'npm run lint\nnpx tsc --noEmit\nnpm run test:mascot\nnpm run test:catalog\nnpm run test:examples\nnpm run test:docs\nnpm run build', language: 'bash' }),
    section('browser-qa', 'Browser QA', { bullets: ['390 / 768 / 1440', 'light / dark', 'sidebar و mobile drawer', 'search و deep links', 'copy toolbar و long first line', 'props/token table overflow داخلی', 'RTL و جهت next/previous', 'console بدون خطای runtime'] }),
  ],
  'architecture/webgl': [
    section('webgl-rules', 'قواعد bundle و runtime', { bullets: ['SmartAssistantCanvas با React.lazy بارگذاری می‌شود.', 'Getting Started نباید component AI وارد کند.', 'قابلیت WebGL cache می‌شود.', 'document hidden و reduced motion حرکت را محدود می‌کنند.', 'static fallback از نظر محتوا کامل است.'] }),
  ],
  'reference/configuration': [
    section('configuration-use', 'روش استفاده', { paragraphs: ['Setting را در منبع ثبت‌شده تغییر دهید و type/default را همزمان به‌روزرسانی کنید. اگر تنظیم runtime نیست، prop یا کنترل نمایشی جعلی اضافه نکنید.'] }),
  ],
  'reference/tokens': [
    section('token-use', 'استفاده در CSS', { code: '.example-card {\n  color: var(--text-primary);\n  background: var(--surface-default);\n  border-radius: var(--radius-md);\n  box-shadow: var(--shadow-sm);\n}', language: 'css' }),
  ],
  'reference/risk-matrix': [
    section('risk-source', 'منبع و اعمال', { paragraphs: ['RiskLevel عمومی در contracts.ts عدد 0 تا 3 است؛ serviceCatalog برای خوانایی ممیزی L0 تا L3 نگه می‌دارد. هر route باید risk و safe stop سازگار داشته باشد.'] }),
  ],
  'reference/file-conventions': [
    section('file-map', 'محل فایل', { table: { columns: ['نیاز', 'مسیر'], rows: [['Component پایه', 'mresalat/core'], ['AI/Trust', 'mresalat/ai'], ['Domain composition', 'mresalat/examples/<domain> یا mresalat/mbazar'], ['Context/permission', 'mresalat/contexts'], ['Journey', 'mresalat/journeys'], ['Service identity asset', 'public/service-identities'], ['Registry', 'mresalat/domains یا mresalat/core'], ['Documentation', 'mresalat/docs + app/showcase/[...slug]'], ['Test', 'tests/*.test.mjs']] } }),
  ],
};

function componentSections(page: DocumentationPage): DocumentationSection[] {
  if (!page.componentName) return [];
  return [
    section('usage', 'Usage', { paragraphs: [`${page.componentName} را فقط از import path مستندشده مصرف کنید. جدول API پایین صفحه مستقیماً با implementation فعلی تطبیق داده شده است.`] }),
    section('variants-states', 'Variants و States', { paragraphs: ['variant ظاهر/تراکم را تعیین می‌کند؛ state نتیجه تعامل یا داده است. state جدید را با prop یا قرارداد دامنه روشن اضافه کنید و تنها با CSS class پنهان نسازید.'] }),
    section('accessibility', 'Accessibility، RTL و Dark', { paragraphs: ['نمونه را با keyboard، focus-visible، light/dark و متن فارسی مرور کنید. برای جزیره فنی dir=ltr و برای status متن/آیکون در کنار رنگ استفاده کنید.'] }),
  ];
}

export function getDocumentationSections(page: DocumentationPage): DocumentationSection[] {
  const pageSpecific = specific[page.slug] ?? [];
  const componentSpecific = page.kind === 'component-detail' ? componentSections(page) : [];
  const overview = section('overview', 'نمای کلی', { paragraphs: [page.description] });
  const implementation = section('implementation', 'راهنمای پیاده‌سازی', {
    paragraphs: [`این موضوع در گروه «${page.group}» بخشی از قرارداد توسعه MResalat System است. تغییر باید با sourceهای واقعی، typeهای موجود و رفتار demo فعلی سازگار بماند.`],
    bullets: page.keywords.slice(0, 6).map((keyword) => `پوشش کلیدی: ${keyword}`),
  });

  return [overview, ...pageSpecific, ...componentSpecific, ...(pageSpecific.length ? [] : [implementation]), ...sharedByGroup[page.group], sourceSection(page)];
}
