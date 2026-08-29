import type { DocumentationGroup, DocumentationGroupId, DocumentationPage, DocumentationPageKind } from './types';

type PageInput = Omit<DocumentationPage, 'group' | 'order' | 'keywords'> & { keywords?: string[] };

function group(
  id: DocumentationGroupId,
  titleFa: string,
  titleEn: string,
  order: number,
  entries: PageInput[],
): DocumentationGroup {
  return {
    id,
    titleFa,
    titleEn,
    order,
    pages: entries.map((entry, index) => ({
      ...entry,
      group: id,
      order: index,
      keywords: [...(entry.keywords ?? []), entry.titleFa, entry.titleEn ?? '', entry.slug].filter(Boolean),
    })),
  };
}

const article = (
  slug: string,
  titleFa: string,
  titleEn: string,
  description: string,
  keywords: string[] = [],
  sourcePaths: string[] = [],
  kind: DocumentationPageKind = 'article',
): PageInput => ({ slug, titleFa, titleEn, description, keywords, sourcePaths, kind });

const component = (
  slug: string,
  componentName: string,
  titleFa: string,
  description: string,
  keywords: string[],
  sourcePaths: string[],
): PageInput => ({
  slug,
  titleFa,
  titleEn: componentName,
  description,
  keywords: [componentName, ...keywords],
  sourcePaths,
  kind: 'component-detail',
  componentName,
});

export const documentationGroups: DocumentationGroup[] = [
  group('getting-started', 'شروع کار', 'GETTING STARTED', 0, [
    article('getting-started', 'معرفی MResalat System', 'Introduction', 'نقشه شروع برای شناخت وضعیت واقعی پروژه، قراردادهای فنی و مسیرهای توسعه.', ['React', 'TypeScript', 'RTL-first'], ['README.md', 'package.json']),
    article('getting-started/installation', 'نصب و اجرا', 'Installation', 'پیش‌نیازها، دریافت مخزن خصوصی، نصب وابستگی‌ها و اجرای محیط توسعه.', ['Node 22.13', 'npm install', 'npm run dev'], ['package.json', 'README.md']),
    article('getting-started/quick-start', 'شروع سریع', 'Quick start', 'ساخت نخستین نمونه با exportهای واقعی Button، Badge، Alert، BrandLogo و MResalatIcon.', ['Button', 'Badge', 'Alert', 'BrandLogo'], ['mresalat/core/primitives.tsx', 'mresalat/core/BrandLogo.tsx', 'mresalat/core/MResalatIcon.tsx']),
    article('getting-started/project-structure', 'ساختار پروژه', 'Project structure', 'نقشه پوشه‌های واقعی app، mresalat، public، tests و docs و مسئولیت هرکدام.', ['repository', 'folders', 'app router'], ['app', 'mresalat', 'public', 'tests', 'docs']),
    article('getting-started/commands', 'دستورات توسعه', 'Development commands', 'مرجع دستورهای lint، typecheck، build و تست‌های موجود بدون ادعای CI.', ['lint', 'build', 'test:mascot', 'test:catalog', 'test:examples'], ['package.json']),
    article('getting-started/first-page', 'اولین صفحه', 'First page', 'ساخت route جدید با App Router، AppShell، توکن‌های معنایی و مرزهای RTL/LTR.', ['page.tsx', 'AppShell', 'route'], ['app', 'mresalat/core/AppShell.tsx']),
    article('getting-started/typescript', 'TypeScript و قراردادها', 'TypeScript contracts', 'استفاده از typeهای دامنه و رجیستری‌ها به‌جای رشته‌ها و وضعیت‌های پراکنده.', ['strict', 'contracts', 'RiskLevel'], ['tsconfig.json', 'mresalat/domains/contracts.ts']),
  ]),
  group('foundations', 'پایه‌ها', 'FOUNDATIONS', 1, [
    article('foundations', 'نمای کلی پایه‌ها', 'Foundations', 'اصول مشترک برند، خوانایی فارسی، هندسه، رنگ معنایی و رفتار واکنش‌گرا.', ['design principles', 'semantic'], ['app/globals.css']),
    article('foundations/principles', 'اصول طراحی', 'Design principles', 'خوانایی، اعتماد، بازگشت‌پذیری و جداسازی منبع اطلاعات در تجربه‌های ام‌رسالت.', ['trust', 'reversible', 'clarity'], ['README.md']),
    article('foundations/rtl', 'RTL و فارسی', 'RTL and Persian', 'راهنمای درجه‌یک جهت، ترتیب معنایی، پیکان‌ها، جدول‌ها و جزیره‌های فنی LTR.', ['RTL', 'bdi', 'dir ltr', 'Persian'], ['app/layout.tsx', 'app/globals.css']),
    article('foundations/accessibility', 'دسترس‌پذیری', 'Accessibility', 'انتظارات صفحه‌کلید، focus-visible، aria، dialog، reduced motion و پیام‌های غیررنگی.', ['keyboard', 'aria-expanded', 'aria-current', 'aria-live', 'focus trap'], ['app/globals.css', 'mresalat/contexts/UserContextSwitcher.tsx']),
    article('foundations/responsive', 'Responsive', 'Responsive behavior', 'بازچینی معنایی صفحه‌های خانه، خدمت، داشبورد، ام‌بازار، Checkout و مستندات.', ['390', '768', '1440', 'responsive'], ['app/globals.css']),
    article('foundations/grid', 'سیستم Grid', 'Grid system', 'شبکه منطقی ۴/۸/۱۲ ستونه و الگوهای ترکیب صفحه در عرض‌های واقعی پروژه.', ['grid', 'columns', '1180px'], ['app/globals.css', 'mresalat/showcase/GridLayoutDemo.tsx']),
    article('foundations/spacing-radius', 'فاصله، Radius و Elevation', 'Spacing, radius and elevation', 'مقیاس واقعی ۴px، گوشه‌ها و سایه‌های محدود برای سلسله‌مراتب.', ['space-1', 'radius-md', 'shadow-md'], ['app/globals.css']),
    article('foundations/typography', 'Typography', 'Typography', 'IRANSansX FaNum، وزن‌های موجود، ارتفاع خط فارسی و نمایش شناسه، مسیر، مبلغ و تاریخ.', ['IRANSansX', 'FaNum', 'font weight'], ['app/globals.css', 'public/fonts']),
    article('foundations/icons', 'Iconography', 'Iconography', 'نام‌های معنایی آیکون، اندازه، برچسب دسترس‌پذیر و جهت صحیح در RTL.', ['MResalatIcon', 'Lucide', 'next', 'previous'], ['mresalat/core/MResalatIcon.tsx']),
    article('foundations/brand', 'Brand', 'Brand', 'قواعد مصرف دارایی رسمی BrandLogo و نسخه‌های compact و light.', ['BrandLogo', 'official asset'], ['mresalat/core/BrandLogo.tsx', 'public/brand/mresalat-logo.svg']),
    article('foundations/service-identities', 'Service Identity', 'Service identity', 'تفکیک نشان رسمی از fallback طراحی‌شده و قواعد provenance، اندازه و پوسته تیره.', ['MResalatServiceIcon', 'official-asset', 'fallback'], ['mresalat/core/MResalatServiceIcon.tsx', 'mresalat/domains/ecosystem.ts']),
    article('foundations/risk', 'مدل ریسک L0–L3', 'Risk model', 'سطوح دانش عمومی، مشاهده احرازشده، اقدام کنترل‌شده و اقدام حساس.', ['L0', 'L1', 'L2', 'L3', 'safe stop'], ['mresalat/domains/contracts.ts', 'mresalat/domains/service-catalog.ts'], 'risk-matrix'),
    article('foundations/trust', 'اعتماد و منشأ اطلاعات', 'Trust semantics', 'چهار نقش رسمی، زنده، توضیح AI و پیشنهاد؛ بدون مخلوط‌کردن معنای آن‌ها.', ['official', 'live', 'AI', 'recommendation'], ['mresalat/ai/StructuredAnswer.tsx', 'app/globals.css']),
  ]),
  group('customization', 'شخصی‌سازی', 'CUSTOMIZATION', 2, [
    article('customization', 'نمای کلی شخصی‌سازی', 'Customization', 'فهرست همه ابعاد قابل تنظیم و منبع واقعی هر تنظیم.', ['theme', 'tokens', 'mascot', 'segment'], ['app/globals.css', 'mresalat']),
    article('customization/theme', 'Theme', 'Theme', 'پوسته روشن، تیره و system، نگهداری localStorage، همگام‌سازی سیستم و جلوگیری از flash.', ['ThemeToggle', 'mresalat-theme', 'system'], ['mresalat/core/ThemeController.tsx', 'app/layout.tsx']),
    article('customization/colors', 'رنگ‌های معنایی', 'Semantic colors', 'تغییر brand، surface، status و trust با حفظ معنای سیستم.', ['surface.selected', 'trust.official', 'action.primary'], ['app/globals.css'], 'tokens'),
    article('customization/typography', 'تایپوگرافی و فونت', 'Typography and font', 'تغییر خانواده و وزن‌ها با حفظ line-height فارسی و FaNum.', ['font loading', 'IRANSansX'], ['app/globals.css']),
    article('customization/layout', 'Layout و Breakpoints', 'Layout and breakpoints', 'عرض محتوا، gutter، ستون خواندن، داشبورد و بازار عریض.', ['layout-wide', 'page-container', 'breakpoint'], ['app/globals.css'], 'breakpoints'),
    article('customization/icons', 'افزودن آیکون', 'Icons', 'افزودن نگاشت معنایی به iconMap به‌جای import پراکنده Lucide.', ['iconMap', 'MResalatIcon'], ['mresalat/core/MResalatIcon.tsx'], 'icons'),
    article('customization/service-identities', 'افزودن هویت خدمت', 'Service identities', 'ثبت provenance، asset رسمی یا fallback صادقانه در ecosystemServices.', ['identity source', 'service slug'], ['mresalat/domains/ecosystem.ts', 'public/service-identities']),
    article('customization/motion', 'Motion', 'Motion', 'شدت Parallax و رفتار prefers-reduced-motion بدون جابه‌جایی layout.', ['ParallaxLayer', 'reduced motion'], ['mresalat/motion/ParallaxLayer.tsx']),
    article('customization/assistant', 'Mascot و رفتار بصری AI', 'Assistant customization', 'تنظیم mode، emotion، motionIntensity، gaze، view، handPose و fallback.', ['SmartAssistant3D', 'emotion', 'gaze', 'handPose'], ['mresalat/ai/SmartAssistant3D.tsx', 'mresalat/ai/mascot.ts']),
  ]),
  group('core-concepts', 'مفاهیم هسته', 'CORE CONCEPTS', 3, [
    article('core-concepts/app-shell', 'AppShell', 'App shell', 'مرز مشترک هدر، ناوبری دسکتاپ/موبایل، زمینه کاربر و پوسته.', ['AppShell', 'navigation'], ['mresalat/core/AppShell.tsx']),
    article('core-concepts/segments', 'Segment', 'Segment', 'سگمنت به‌عنوان اولویت، متن، اقدام، journey، prompt و module؛ نه صرفاً رنگ.', ['general', 'new-member', 'loan-applicant', 'young-user'], ['mresalat/domains/segments.ts', 'mresalat/segments']),
    article('core-concepts/context', 'Context', 'Context', 'زمینه فعال یک هویت و تأثیر آن بر داده، اقدام و اولویت خانه.', ['activeContext', 'UserContextSwitcher'], ['mresalat/contexts/context-state.tsx']),
    article('core-concepts/relationships', 'Relationship', 'Relationship', 'مدل رابطه والد، نوجوان، مدیر و پرسنل جدا از هویت و سگمنت.', ['parent', 'child', 'organization'], ['mresalat/contexts/types.ts', 'mresalat/contexts/fixtures.ts']),
    article('core-concepts/permissions', 'Permissions', 'Permissions', 'وضعیت‌های مجاز، فقط مشاهده، تأیید دیگران، step-up و عدم دسترسی.', ['PermissionState', 'step-up'], ['mresalat/contexts/types.ts', 'mresalat/contexts/RelationshipComponents.tsx']),
    article('core-concepts/trust', 'Trust', 'Trust', 'قرارداد بصری و محتوایی منشأ اطلاعات در سطح سیستم.', ['TrustLegend', 'SourceCitation'], ['mresalat/ai/StructuredAnswer.tsx']),
    article('core-concepts/rag', 'RAG', 'RAG', 'پاسخ مستند با citation و عدم قطعیت، جدا از داده زنده و عملیات.', ['RAG', 'citation', 'UncertainAnswer'], ['mresalat/ai/StructuredAnswer.tsx']),
    article('core-concepts/risk', 'Risk L0–L3', 'Risk L0–L3', 'تأثیر سطح ریسک بر احراز، مرور، تأیید، رسید و safe stop.', ['risk matrix', 'confirmation'], ['mresalat/domains/contracts.ts'], 'risk-matrix'),
    article('core-concepts/journeys', 'Journey', 'Journey', 'مسیرهای تایپ‌شده، مرحله جاری، پیشرفت و اقدام بعدی.', ['ProcessReviewWizard', 'JourneyStep'], ['mresalat/domains/contracts.ts', 'mresalat/journeys/ProcessReviewWizard.tsx']),
    article('core-concepts/secure-actions', 'Secure action', 'Secure action', 'الگوی explain → review → confirm → step-up → receipt برای اقدام حساس.', ['SecureActionFlow', 'L3'], ['mresalat/secure/SecureActionFlow.tsx']),
    article('core-concepts/cross-service-context', 'Cross-service context', 'Cross-service context', 'حفظ زمینه و نشان‌دادن منبع آن هنگام عبور میان خدمات.', ['CrossServiceContextMarker'], ['mresalat/contexts/RelationshipComponents.tsx']),
    article('core-concepts/analytics', 'Analytics', 'Analytics', 'رویدادهای تایپ‌شده و payload محلی بدون ادعای اتصال vendor.', ['trackEvent', 'AnalyticsEventName'], ['mresalat/core/analytics.ts'], 'analytics'),
  ]),
  group('components', 'اجزا', 'COMPONENTS', 4, [
    article('components', 'نمای کلی اجزا', 'Components', 'مرجع فیلترپذیر همه اجزای ثبت‌شده، وضعیت API و پیوند به مستندات عمیق.', ['componentInventory', 'API', 'props'], ['mresalat/core/component-inventory.ts'], 'components'),
    article('components/core', 'اجزای Core', 'Core components', 'Button، Badge و Alert با نمونه زنده، import واقعی و props.', ['Button', 'Badge', 'Alert'], ['mresalat/core/primitives.tsx']),
    article('components/navigation', 'اجزای Navigation', 'Navigation components', 'AppShell، UserContextSwitcher و ChildSelector در دسکتاپ و موبایل.', ['AppShell', 'UserContextSwitcher', 'ChildSelector'], ['mresalat/core/AppShell.tsx', 'mresalat/contexts/UserContextSwitcher.tsx']),
    article('components/ai', 'اجزای AI', 'AI components', 'AssistantShell، SmartAssistant3D، Avatar و SegmentAIEntry با مرزبندی deterministic.', ['AssistantShell', 'SmartAssistant3D', 'SegmentAIEntry'], ['mresalat/ai', 'mresalat/segments/SegmentAIEntry.tsx']),
    article('components/rag', 'اجزای Trust / RAG', 'Trust and RAG components', 'SourceCitation، TrustLegend، UncertainAnswer و HumanHandoff.', ['SourceCitation', 'TrustLegend'], ['mresalat/ai/StructuredAnswer.tsx']),
    article('components/journeys', 'اجزای Journey', 'Journey components', 'ProcessReviewWizard، ServicePageTemplate و خانواده Segment.', ['ProcessReviewWizard', 'ServicePageTemplate'], ['mresalat/journeys', 'mresalat/segments']),
    article('components/secure', 'اجزای Secure', 'Secure components', 'SecureActionFlow، PermissionState و ApprovalRequestCard.', ['SecureActionFlow', 'PermissionState'], ['mresalat/secure', 'mresalat/contexts/RelationshipComponents.tsx']),
    article('components/context', 'اجزای Context', 'Context components', 'تعویض زمینه، انتخاب فرزند، اقدام بعدی و نشان زمینه بین‌خدمتی.', ['NextBestAction', 'CrossServiceContextMarker'], ['mresalat/contexts']),
    article('components/motion', 'اجزای Motion', 'Motion components', 'ParallaxLayer و قرارداد reduced-motion.', ['ParallaxLayer'], ['mresalat/motion/ParallaxLayer.tsx']),
    article('components/marketplace', 'اجزای Marketplace', 'Marketplace components', 'خانواده عمیق کشف، محصول، سبد، Checkout، اقساط، سفارش و حساب ام‌بازار.', ['MBazarProductCard', 'MBazarCartSummary', 'InstallmentPlanCard'], ['mresalat/mbazar'], 'components'),
    component('components/button', 'Button', 'Button', 'کنترل اقدام عمومی با toneهای واقعی و همه ویژگی‌های native button.', ['primary', 'secondary', 'danger', 'disabled'], ['mresalat/core/primitives.tsx']),
    component('components/brand-logo', 'BrandLogo', 'BrandLogo', 'نمایش دارایی رسمی برند در حالت کامل، compact و زمینه تیره.', ['compact', 'light'], ['mresalat/core/BrandLogo.tsx']),
    component('components/mresalat-icon', 'MResalatIcon', 'MResalatIcon', 'wrapper تایپ‌شده آیکون‌های معنایی با label دسترس‌پذیر.', ['size', 'strokeWidth', 'RTL'], ['mresalat/core/MResalatIcon.tsx']),
    component('components/service-icon', 'MResalatServiceIcon', 'MResalatServiceIcon', 'نمایش نشان رسمی یا fallback صادقانه برای یک MResalatService.', ['official asset', 'monochrome'], ['mresalat/core/MResalatServiceIcon.tsx']),
    component('components/app-shell', 'AppShell', 'AppShell', 'قاب محصول با ناوبری، ThemeToggle و UserContextSwitcher.', ['active', 'hideMobileNav'], ['mresalat/core/AppShell.tsx']),
    component('components/smart-assistant-3d', 'SmartAssistant3D', 'SmartAssistant3D', 'دستیار سه‌بعدی enhancement-only با fallback ایستا و کنترل کامل حالت.', ['mode', 'emotion', 'gaze', 'motionIntensity'], ['mresalat/ai/SmartAssistant3D.tsx', 'mresalat/ai/mascot.ts']),
    component('components/segment-ai-entry', 'SegmentAIEntry', 'SegmentAIEntry', 'ورودی هوشمند سگمنت‌محور با پاسخ نمایشی قطعی، عدم قطعیت و handoff.', ['segment', 'suggestions', 'contextAware'], ['mresalat/segments/SegmentAIEntry.tsx']),
    component('components/process-review-wizard', 'ProcessReviewWizard', 'ProcessReviewWizard', 'مرور افقی journey با variant، progress و currentAction.', ['compact', 'standard', 'featured'], ['mresalat/journeys/ProcessReviewWizard.tsx']),
    component('components/secure-action-flow', 'SecureActionFlow', 'SecureActionFlow', 'جریان L3 چندمرحله‌ای با مرور اثر، تأیید، step-up و رسید.', ['success', 'failure'], ['mresalat/secure/SecureActionFlow.tsx']),
    component('components/parallax-layer', 'ParallaxLayer', 'ParallaxLayer', 'عمق کم‌هزینه مبتنی بر transform با احترام به reduced motion.', ['strength', 'className'], ['mresalat/motion/ParallaxLayer.tsx']),
  ]),
  group('domains', 'دامنه‌ها', 'DOMAINS', 5, [
    article('domains/membership', 'Membership', 'Membership', 'عضویت فردی، زیر ۱۸ سال، سازمانی و پیگیری درخواست.', ['membership', 'under-18'], ['mresalat/examples/membership', 'mresalat/domains/service-catalog.ts']),
    article('domains/mhami', 'M-Hami', 'M-Hami', 'حامیان، انجمن، درخواست وام و مرزهای ریسک خدمات حمایتی.', ['supporters', 'loan'], ['mresalat/examples/mhami']),
    article('domains/mbazar', 'M-Bazar', 'M-Bazar', 'راهنمای دامنه‌ای Discovery، Product، Cart، Checkout، Installments، Orders، Account و Seller.', ['marketplace', 'checkout', 'seller'], ['mresalat/mbazar']),
    article('domains/learning', 'Learning', 'Learning', 'ترکیب ام‌آموزش و ام‌دُناپ بر پایه provider search.', ['mamouzesh', 'mdonap'], ['mresalat/examples/learning']),
    article('domains/mhesam', 'M-Hesam', 'M-Hesam', 'تراکنش، اعتبار، بن، MQR و خانواده اقساط با داده ساختگی.', ['credit', 'transactions', 'MQR'], ['mresalat/examples/mhesam']),
    article('domains/heavenly-resalat', 'رسالت آسمانی', 'Heavenly Resalat', 'همیاری‌ها و اقدام‌های مالی با توقف پیش از تعهد واقعی.', ['contribution', 'L3'], ['mresalat/examples/contributions']),
    article('domains/health', 'M-Salamat', 'M-Salamat', 'خدمات عمومی سلامت، وضعیت شخصی ساختگی و مرز پرونده پزشکی.', ['health', 'medical record'], ['mresalat/examples/health']),
    article('domains/insurance', 'M-Bime', 'M-Bime', 'پرتال و فرم‌های وسیله نقلیه/عمر بدون قیمت‌گذاری یا underwriting واقعی.', ['insurance'], ['mresalat/examples/insurance']),
    article('domains/saya', 'SAYA و Auxiliary', 'SAYA and auxiliary', 'سایا، ام‌اتکا، مرآت و آیکاپ با وضعیت دسترسی ممیزی‌شده.', ['SAYA', 'Merat', 'iCap'], ['mresalat/examples/auxiliary']),
    article('domains/rahyar', 'Rahyar', 'Rahyar', 'بازنمایی صادقانه مسیرهای دسترسی‌ناپذیر رهیار بدون ساخت workflow جایگزین.', ['Rahyar', 'unavailable'], ['mresalat/examples/rahyar']),
    article('domains/banking', 'Banking', 'Banking', 'پیشخوان، کارت، حساب، ساتنا و وام‌ها با مرزهای L0 تا L3.', ['banking', 'SATNA', 'L3'], ['mresalat/examples/banking']),
    article('domains/communication', 'Communication', 'Communication', 'پیام، مشاور، جستجو، نقشه، پشتیبانی و دانلود اپلیکیشن.', ['MPayam', 'support', 'map'], ['mresalat/examples/communication']),
  ]),
  group('guides', 'راهنماها', 'GUIDES', 6, [
    article('guides/create-service-page', 'ساخت صفحه خدمت', 'Create a service page', 'ترکیب ServicePageTemplate با هویت، journey، منبع، ریسک و CTA واقعی.', ['ServicePageTemplate'], ['mresalat/journeys/ServicePageTemplate.tsx']),
    article('guides/create-domain', 'افزودن دامنه جدید', 'Create a domain', 'workflow رجیستری‌محور از catalog و fixture تا route، Showcase و تست.', ['domain', 'catalog entry', 'fixtures'], ['mresalat/domains', 'mresalat/examples']),
    article('guides/add-service-identity', 'افزودن هویت خدمت', 'Add a service identity', 'قرار دادن asset، ثبت provenance و ممنوعیت معرفی fallback به‌عنوان نشان رسمی.', ['official asset', 'provenance'], ['mresalat/domains/ecosystem.ts', 'public/service-identities']),
    article('guides/create-segment-home', 'ساخت Segment Home', 'Create a segment home', 'تنظیم اولویت، copy، journey، prompt و module برای تجربه مخاطب.', ['SegmentHomeShell', 'segment config'], ['mresalat/segments']),
    article('guides/context-aware-experience', 'ساخت تجربه Context-aware', 'Context-aware experience', 'مدل‌کردن هویت، زمینه، رابطه و permission پیش از تغییر UI.', ['context', 'relationship', 'permissions'], ['mresalat/contexts']),
    article('guides/rag-answer', 'ساخت پاسخ مستند RAG', 'Create a grounded answer', 'Citation، تفکیک داده زنده، عدم قطعیت و handoff انسانی.', ['SourceCitation', 'UncertainAnswer'], ['mresalat/ai/StructuredAnswer.tsx']),
    article('guides/secure-action', 'ساخت اقدام امن', 'Build a secure action', 'الگوی کامل explain، review، confirm، step-up و receipt/safe stop.', ['SecureActionFlow', 'L3'], ['mresalat/secure/SecureActionFlow.tsx']),
    article('guides/cross-service-journey', 'ساخت Journey بین‌خدمتی', 'Cross-service journey', 'حفظ زمینه و اعلام منبع هنگام عبور بین دامنه‌ها.', ['CrossServiceContextMarker'], ['mresalat/contexts/fixtures.ts']),
    article('guides/mbazar-integration', 'یکپارچه‌سازی M-Bazar', 'M-Bazar integration', 'انتخاب اجزای reusable بازار و حفظ مرز eligibility، پرداخت و داده زنده.', ['MBazar', 'eligibility', 'cart'], ['mresalat/mbazar']),
    article('guides/update-documentation', 'به‌روزرسانی مستندات', 'Update documentation', 'افزودن route و metadata، به‌روزرسانی inventory/snippet و اجرای تست لینک‌ها.', ['docs registry', 'test:docs'], ['mresalat/docs', 'tests/showcase-docs.test.mjs']),
  ]),
  group('architecture', 'معماری', 'ARCHITECTURE', 7, [
    article('architecture', 'نمای کلی معماری', 'Architecture overview', 'AppShell → segment/context → domain composition → shared components → state → AI/RAG → integration boundary.', ['architecture diagram', 'layers'], ['app', 'mresalat']),
    article('architecture/project', 'معماری مخزن', 'Repository architecture', 'مرز مسئولیت پوشه‌ها و قرارداد وابستگی میان core، domain و composition.', ['repository', 'file conventions'], ['mresalat']),
    article('architecture/routes', 'معماری Route', 'Route architecture', 'App Router، routeهای thin و رجیستری canonical نمونه‌ها.', ['App Router', 'exampleRouteRegistry'], ['app', 'mresalat/examples/product/example-route-registry.ts']),
    article('architecture/registries', 'Registries', 'Registries', 'componentInventory، serviceCatalog، ecosystemServices، segments، analytics و routes.', ['single source of truth'], ['mresalat/core/component-inventory.ts', 'mresalat/domains']),
    article('architecture/fixtures', 'Fixtures', 'Fixtures', 'داده‌های ساختگی، حداقل‌سازی داده حساس و مرز fixtures با API آینده.', ['mock', 'synthetic', 'redacted'], ['mresalat/domains/mock-data.ts', 'mresalat/contexts/fixtures.ts', 'mresalat/mbazar/data.ts']),
    article('architecture/client-server', 'Client / Server boundaries', 'Client and server boundaries', 'قرار دادن state و browser API فقط در client و نگه‌داشتن صفحات اطلاعاتی سبک.', ['use client', 'RSC'], ['app', 'mresalat']),
    article('architecture/state', 'State', 'State', 'state محلی قطعی، providerهای context/cart و عدم ادعای persistence سمت سرور.', ['useState', 'provider'], ['mresalat/contexts/context-state.tsx', 'mresalat/mbazar/cart-state.tsx']),
    article('architecture/persistence', 'Persistence', 'Persistence', 'تنها preference پوسته و زمینه دموی محلی؛ داده عملیاتی هنوز persistence تولید ندارد.', ['localStorage', 'demo state'], ['mresalat/core/ThemeController.tsx', 'mresalat/contexts/context-state.tsx']),
    article('architecture/ai', 'معماری AI', 'AI architecture', 'تفکیک دستیار بصری، ورودی گفتگو، RAG/trust، context و orchestration اقدام.', ['AI', 'RAG', 'orchestration'], ['mresalat/ai', 'mresalat/segments/SegmentAIEntry.tsx']),
    article('architecture/webgl', 'معماری WebGL', 'WebGL architecture', 'lazy loading، یک canvas زنده، تشخیص قابلیت، pause و fallback CSS.', ['React Three Fiber', 'WebGL', 'lazy'], ['mresalat/ai/SmartAssistant3D.tsx', 'mresalat/ai/webgl-capability.ts']),
    article('architecture/integration', 'مرز API و Integration', 'API integration boundary', 'وضعیت فعلی UI تایپ‌شده و معماری آینده Gateway/Tool بدون اتصال مستقیم LLM به دیتابیس.', ['API gateway', 'LLM', 'live data'], ['README.md']),
    article('architecture/analytics', 'معماری Analytics', 'Analytics architecture', 'قرارداد رویدادهای تایپ‌شده و dispatch محلی تا زمان اتصال adapter واقعی.', ['CustomEvent', 'trackEvent'], ['mresalat/core/analytics.ts'], 'analytics'),
    article('architecture/testing', 'Testing', 'Testing', 'lint، TypeScript، build، تست mascot/catalog/examples/docs و مرورگر.', ['npm test', 'QA'], ['package.json', 'tests']),
    article('architecture/qa', 'QA', 'Quality assurance', 'پوشش مسیرها، viewport، light/dark، RTL، overflow، console و deep link.', ['390', '768', '1440'], ['app/qa', 'tests']),
  ]),
  group('reference', 'مرجع', 'REFERENCE', 8, [
    article('reference/components', 'موجودی اجزا', 'Component inventory', 'فهرست زنده و فیلترپذیر componentInventory با variant، state و پیوند جزئیات.', ['componentInventory', 'MBazarProductCard'], ['mresalat/core/component-inventory.ts'], 'components'),
    article('reference/configuration', 'Configuration reference', 'Configuration reference', 'همه تنظیم‌های واقعی توسعه‌دهنده با type، default، source و scope.', ['settings', 'defaults', 'source'], ['app/globals.css', 'mresalat'], 'configuration'),
    article('reference/tokens', 'توکن‌های معنایی', 'Semantic tokens', 'جدول قابل کپی رنگ، فاصله، radius، elevation و layout در روشن/تیره.', ['surface.canvas', 'surface.selected', 'trust.official'], ['app/globals.css'], 'tokens'),
    article('reference/icons', 'کاتالوگ آیکون‌ها', 'Icon catalog', 'گالری جستجوپذیر همه نام‌های واقعی iconMap.', ['MResalatIcon', 'iconGalleryNames'], ['mresalat/core/MResalatIcon.tsx'], 'icons'),
    article('reference/services', 'کاتالوگ خدمات', 'Service catalog', 'مرجع فیلترپذیر ۶۹ مسیر با دامنه، route، risk، status و safe stop.', ['serviceCatalog', '69 routes'], ['mresalat/domains/service-catalog.ts'], 'services'),
    article('reference/routes', 'کاتالوگ مسیرها', 'Route catalog', 'نگاشت هر رکورد ممیزی‌شده به canonical demo route واقعی.', ['demoHref', 'exampleRouteRegistry'], ['mresalat/examples/product/example-route-registry.ts'], 'routes'),
    article('reference/analytics', 'رویدادهای Analytics', 'Analytics events', 'فهرست eventهای واقعی و payload بدون ادعای vendor یا backend.', ['AnalyticsEventName'], ['mresalat/core/analytics.ts'], 'analytics'),
    article('reference/risk-matrix', 'ماتریس ریسک', 'Risk matrix', 'ماتریس L0–L3 برای احراز، مرور، confirmation، step-up، receipt و safe stop.', ['L0', 'L3'], ['mresalat/domains/contracts.ts'], 'risk-matrix'),
    article('reference/breakpoints', 'مرجع نقاط شکست', 'Breakpoint reference', 'نقاط شکست واقعی CSS و رفتار معمول navigation/grid.', ['640px', '900px', '1050px'], ['app/globals.css'], 'breakpoints'),
    article('reference/file-conventions', 'قراردادهای فایل', 'File conventions', 'محل component، fixture، service identity، analytics، docs metadata و test.', ['file placement', 'conventions'], ['mresalat', 'tests', 'public']),
  ]),
];

export const documentationPages = documentationGroups.flatMap((item) => item.pages);
export const documentationPageBySlug = new Map(documentationPages.map((page) => [page.slug, page]));

export function getDocumentationPage(slug: string) {
  return documentationPageBySlug.get(slug);
}

export function getDocumentationNeighbors(slug: string) {
  const index = documentationPages.findIndex((page) => page.slug === slug);
  return {
    previous: index > 0 ? documentationPages[index - 1] : undefined,
    next: index >= 0 && index < documentationPages.length - 1 ? documentationPages[index + 1] : undefined,
  };
}
