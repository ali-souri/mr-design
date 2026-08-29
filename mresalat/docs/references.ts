export type TokenReference = {
  group: 'Surface' | 'Text' | 'Brand' | 'Action' | 'Accent' | 'Status' | 'Trust' | 'Spacing' | 'Radius' | 'Elevation' | 'Layout';
  name: string;
  cssVar: string;
  light: string;
  dark: string;
  purpose: string;
};

export const tokenReferences: TokenReference[] = [
  { group: 'Surface', name: 'surface.canvas', cssVar: '--surface-canvas', light: '#f2f5fa', dark: '#091827', purpose: 'بوم اصلی صفحه و فاصله بیرونی ماژول‌ها' },
  { group: 'Surface', name: 'surface.default', cssVar: '--surface-default', light: '#ffffff', dark: '#102235', purpose: 'سطح محتوای اصلی و کارت استاندارد' },
  { group: 'Surface', name: 'surface.secondary', cssVar: '--surface-secondary', light: '#eef3f8', dark: '#11283b', purpose: 'گروه‌بندی ثانویه درون سطح اصلی' },
  { group: 'Surface', name: 'surface.subtle', cssVar: '--surface-subtle', light: '#eaf2f8', dark: '#142b40', purpose: 'تأکید بسیار ملایم و icon well' },
  { group: 'Surface', name: 'surface.elevated', cssVar: '--surface-elevated', light: '#ffffff', dark: '#182e43', purpose: 'سطح بالاتر مانند header یا overlay' },
  { group: 'Surface', name: 'surface.input', cssVar: '--surface-input', light: '#f5f8fb', dark: '#0c1d2e', purpose: 'پس‌زمینه ورودی و composer' },
  { group: 'Surface', name: 'surface.interactive', cssVar: '--surface-interactive', light: '#eaf5fc', dark: '#153653', purpose: 'سطح قابل تعامل خنثی' },
  { group: 'Surface', name: 'surface.selected', cssVar: '--surface-selected', light: '#dceefa', dark: '#194665', purpose: 'انتخاب فعال بدون اتکا به border تنها' },
  { group: 'Text', name: 'text.primary', cssVar: '--text-primary', light: '#10233f', dark: '#edf6ff', purpose: 'متن و عنوان اصلی' },
  { group: 'Text', name: 'text.secondary', cssVar: '--text-secondary', light: '#4f637b', dark: '#b8cadb', purpose: 'شرح و متن پشتیبان' },
  { group: 'Text', name: 'text.muted', cssVar: '--text-muted', light: '#7d8da0', dark: '#8299ad', purpose: 'metadata و متن کم‌اهمیت' },
  { group: 'Action', name: 'action.primary', cssVar: '--action-primary', light: '#075aa7', dark: '#4fa3ea', purpose: 'اقدام اصلی و لینک فعال' },
  { group: 'Action', name: 'action.primaryHover', cssVar: '--action-primary-hover', light: '#064c8c', dark: '#72b7ef', purpose: 'hover اقدام اصلی' },
  { group: 'Action', name: 'action.secondary', cssVar: '--action-secondary', light: '#e8f2fb', dark: '#173c5d', purpose: 'اقدام ثانویه و سطح کنترلی' },
  { group: 'Brand', name: 'brand.50', cssVar: '--brand-50', light: '#eef6fd', dark: '#10283d', purpose: 'زمینه بسیار ملایم برند' },
  { group: 'Brand', name: 'brand.100', cssVar: '--brand-100', light: '#d9ebfa', dark: '#173751', purpose: 'زمینه و خط برند' },
  { group: 'Brand', name: 'brand.300', cssVar: '--brand-300', light: '#74b5e8', dark: '#428bc7', purpose: 'تأکید متوسط' },
  { group: 'Brand', name: 'brand.500', cssVar: '--brand-500', light: '#1976c9', dark: '#4fa3ea', purpose: 'رنگ برند اصلی' },
  { group: 'Brand', name: 'brand.700', cssVar: '--brand-700', light: '#075aa7', dark: '#72b7ef', purpose: 'رنگ برند پرکنتراست' },
  { group: 'Brand', name: 'brand.900', cssVar: '--brand-900', light: '#103657', dark: '#d7ecff', purpose: 'عنوان/زمینه عمیق برند' },
  { group: 'Accent', name: 'accent.cyan', cssVar: '--accent-cyan', light: '#16a8b7', dark: '#42c7c8', purpose: 'دستیار، پیشرفت و focus' },
  { group: 'Accent', name: 'accent.cyanSoft', cssVar: '--accent-cyan-soft', light: '#e4f8f9', dark: '#153b40', purpose: 'زمینه نرم accent' },
  { group: 'Status', name: 'status.success', cssVar: '--status-success', light: '#14805e', dark: '#4fc49a', purpose: 'موفقیت قطعی همراه متن/آیکون' },
  { group: 'Status', name: 'status.warning', cssVar: '--status-warning', light: '#a96808', dark: '#e6b259', purpose: 'نیازمند توجه یا شرط' },
  { group: 'Status', name: 'status.danger', cssVar: '--status-danger', light: '#bd3f4f', dark: '#ef7c8d', purpose: 'خطا یا اقدام حساس' },
  { group: 'Status', name: 'status.info', cssVar: '--status-info', light: '#176cb5', dark: '#63ace8', purpose: 'اطلاعات خنثی' },
  { group: 'Trust', name: 'trust.official', cssVar: '--trust-official', light: '#14805e', dark: '#5ed0a7', purpose: 'دانش رسمی با provenance' },
  { group: 'Trust', name: 'trust.live', cssVar: '--trust-live', light: '#176cb5', dark: '#69b5f2', purpose: 'داده زنده از سامانه مرجع' },
  { group: 'Trust', name: 'trust.ai', cssVar: '--trust-ai', light: '#6552a1', dark: '#b6a4ec', purpose: 'توضیح تولیدشده توسط AI' },
  { group: 'Trust', name: 'trust.recommendation', cssVar: '--trust-recommendation', light: '#a96808', dark: '#efc36f', purpose: 'پیشنهاد شخصی و غیرقطعی' },
  { group: 'Spacing', name: 'space.1', cssVar: '--space-1', light: '4px', dark: '4px', purpose: 'واحد پایه' },
  { group: 'Spacing', name: 'space.2', cssVar: '--space-2', light: '8px', dark: '8px', purpose: 'فاصله فشرده' },
  { group: 'Spacing', name: 'space.3', cssVar: '--space-3', light: '12px', dark: '12px', purpose: 'فاصله کنترل‌ها' },
  { group: 'Spacing', name: 'space.4', cssVar: '--space-4', light: '16px', dark: '16px', purpose: 'فاصله استاندارد' },
  { group: 'Spacing', name: 'space.5', cssVar: '--space-5', light: '20px', dark: '20px', purpose: 'padding کارت کوچک' },
  { group: 'Spacing', name: 'space.6', cssVar: '--space-6', light: '24px', dark: '24px', purpose: 'padding کارت و gutter تبلت' },
  { group: 'Spacing', name: 'space.8', cssVar: '--space-8', light: '32px', dark: '32px', purpose: 'فاصله بخش فشرده' },
  { group: 'Spacing', name: 'space.10', cssVar: '--space-10', light: '40px', dark: '40px', purpose: 'فاصله بخش عادی' },
  { group: 'Radius', name: 'radius.sm', cssVar: '--radius-sm', light: '10px', dark: '10px', purpose: 'کنترل کوچک' },
  { group: 'Radius', name: 'radius.md', cssVar: '--radius-md', light: '16px', dark: '16px', purpose: 'کارت و Alert' },
  { group: 'Radius', name: 'radius.lg', cssVar: '--radius-lg', light: '24px', dark: '24px', purpose: 'سطح اصلی' },
  { group: 'Radius', name: 'radius.pill', cssVar: '--radius-pill', light: '999px', dark: '999px', purpose: 'Badge و chip' },
  { group: 'Elevation', name: 'shadow.sm', cssVar: '--shadow-sm', light: '0 6px 20px rgb(12 55 91 / 6%)', dark: '0 8px 24px rgb(0 0 0 / 18%)', purpose: 'سطح قابل تعامل' },
  { group: 'Elevation', name: 'shadow.md', cssVar: '--shadow-md', light: '0 18px 48px rgb(12 55 91 / 10%)', dark: '0 22px 52px rgb(0 0 0 / 28%)', purpose: 'overlay یا دستیار برجسته' },
  { group: 'Layout', name: 'layout.wide', cssVar: '--layout-wide', light: '1180px', dark: '1180px', purpose: 'حداکثر عرض عمومی محصول' },
  { group: 'Layout', name: 'control.md', cssVar: '--control-md', light: '48px', dark: '48px', purpose: 'ارتفاع کنترل استاندارد' },
];

export type ConfigurationReference = {
  group: string;
  setting: string;
  type: string;
  values: string;
  defaultValue: string;
  source: string;
  scope: string;
};

export const configurationReferences: ConfigurationReference[] = [
  { group: 'APPLICATION', setting: 'theme preference', type: "'light' | 'dark' | 'system'", values: 'light · dark · system', defaultValue: 'system', source: 'mresalat/core/ThemeController.tsx', scope: 'کل سند / مرورگر' },
  { group: 'APPLICATION', setting: 'active navigation', type: 'string', values: 'home · segments · examples · catalog · assistant · system', defaultValue: 'home', source: 'mresalat/core/AppShell.tsx', scope: 'AppShell instance' },
  { group: 'APPLICATION', setting: 'hideMobileNav', type: 'boolean', values: 'true · false', defaultValue: 'false', source: 'mresalat/core/AppShell.tsx', scope: 'AppShell instance' },
  { group: 'FOUNDATIONS', setting: 'semantic colors', type: 'CSS custom properties', values: 'surface · text · action · accent · status · trust', defaultValue: ':root values', source: 'app/globals.css', scope: 'کل محصول' },
  { group: 'FOUNDATIONS', setting: 'font family', type: 'CSS custom property', values: 'IRANSansX + system fallback', defaultValue: 'IRANSansX', source: 'app/globals.css', scope: 'کل محصول' },
  { group: 'FOUNDATIONS', setting: 'font weights', type: 'font-face', values: '400 · 500 · 600 · 700', defaultValue: '400 body', source: 'app/globals.css', scope: 'typography' },
  { group: 'FOUNDATIONS', setting: 'spacing', type: 'CSS custom properties', values: '4 · 8 · 12 · 16 · 20 · 24 · 32 · 40px', defaultValue: '4px base', source: 'app/globals.css', scope: 'layout/components' },
  { group: 'FOUNDATIONS', setting: 'radius', type: 'CSS custom properties', values: '10 · 16 · 24 · 999px', defaultValue: '16px card', source: 'app/globals.css', scope: 'components' },
  { group: 'FOUNDATIONS', setting: 'layout-wide', type: 'CSS length', values: '1180px', defaultValue: '1180px', source: 'app/globals.css', scope: 'page-container' },
  { group: 'AI', setting: 'mode', type: 'AssistantCharacterMode', values: 'complete · portrait', defaultValue: 'complete', source: 'mresalat/ai/SmartAssistant3D.tsx', scope: 'mascot instance' },
  { group: 'AI', setting: 'emotion', type: 'AssistantEmotion', values: 'idle · greeting · listening · thinking · explaining · happy · warning · uncertain · handoff', defaultValue: 'idle', source: 'mresalat/ai/mascot.ts', scope: 'mascot instance' },
  { group: 'AI', setting: 'motionIntensity', type: 'AssistantMotionIntensity', values: 'restrained · normal · expressive', defaultValue: 'normal', source: 'mresalat/ai/SmartAssistant3D.tsx', scope: 'mascot instance' },
  { group: 'AI', setting: 'gaze', type: 'AssistantGazeMode', values: 'none · local · page', defaultValue: 'page', source: 'mresalat/ai/SmartAssistant3D.tsx', scope: 'mascot instance' },
  { group: 'AI', setting: 'transparent', type: 'boolean', values: 'true · false', defaultValue: 'false', source: 'mresalat/ai/SmartAssistant3D.tsx', scope: 'canvas' },
  { group: 'AI', setting: 'view', type: 'AssistantView', values: 'front · three-quarter · side · opposite-side · back', defaultValue: 'front', source: 'mresalat/ai/mascot.ts', scope: 'mascot instance' },
  { group: 'AI', setting: 'staticOnly', type: 'boolean', values: 'true · false', defaultValue: 'false', source: 'mresalat/ai/SmartAssistant3D.tsx', scope: 'fallback/performance' },
  { group: 'SEGMENTS', setting: 'segment', type: 'SegmentSlug', values: 'individual · under-18 · organization', defaultValue: 'required', source: 'mresalat/segments/experience-data.ts', scope: 'registration/home compositions' },
  { group: 'SEGMENTS', setting: 'audience segment', type: 'SegmentConfig', values: '۱۰ تجربه مخاطب در registry', defaultValue: 'general at root', source: 'mresalat/domains/segments.ts', scope: 'product route' },
  { group: 'SEGMENTS', setting: 'assistantMode', type: "'compact' | 'featured'", values: 'compact · featured', defaultValue: 'compact', source: 'mresalat/segments/SegmentAIEntry.tsx', scope: 'AI entry' },
  { group: 'SEGMENTS', setting: 'contextAware', type: 'boolean', values: 'true · false', defaultValue: 'true', source: 'mresalat/segments/SegmentAIEntry.tsx', scope: 'AI entry' },
  { group: 'CONTEXT', setting: 'activeContext', type: 'UserContext', values: 'personal · parent · organization-manager · organization-employee · young-user', defaultValue: 'fixture-defined', source: 'mresalat/contexts/types.ts', scope: 'context provider' },
  { group: 'CONTEXT', setting: 'permissions', type: 'Permission[]', values: 'view/update/approve/allocate/service-specific', defaultValue: 'derived from context', source: 'mresalat/contexts/fixtures.ts', scope: 'active context' },
  { group: 'RISK', setting: 'riskLevel', type: '0 | 1 | 2 | 3 / L0–L3', values: 'L0 · L1 · L2 · L3', defaultValue: 'required per audited route', source: 'mresalat/domains/contracts.ts', scope: 'service/action' },
  { group: 'TRUST', setting: 'source kind', type: "'official-knowledge' | 'live-data'", values: 'official knowledge · live data', defaultValue: 'required', source: 'mresalat/domains/contracts.ts', scope: 'AssistantSource' },
  { group: 'MARKETPLACE', setting: 'marketplace context', type: 'MarketplaceContextState', values: 'city + addressLabel', defaultValue: 'typed demo fixture', source: 'mresalat/mbazar/data.ts', scope: 'M-Bazar' },
  { group: 'MARKETPLACE', setting: 'purchase mode', type: 'MBazarPaymentMode', values: 'cash · installment', defaultValue: 'unset until selection', source: 'mresalat/mbazar/types.ts', scope: 'checkout draft' },
  { group: 'MARKETPLACE', setting: 'eligibility status', type: 'InstallmentEligibilityStatus', values: 'eligible · conditional · unknown · ineligible', defaultValue: 'demo result', source: 'mresalat/mbazar/types.ts', scope: 'installment flow' },
  { group: 'MOTION', setting: 'strength', type: 'number', values: 'consumer-selected number', defaultValue: '8', source: 'mresalat/motion/ParallaxLayer.tsx', scope: 'ParallaxLayer instance' },
];

export const breakpointReferences = [
  ['≤ 560px', 'فرم‌ها و کنترل‌های فشرده', 'ناوبری موبایل', 'اغلب تک‌ستونه'],
  ['≤ 640px', 'gutter حدود ۱۴px و کارت تک‌ستونه', 'drawer/ناوبری موبایل', '۱ تا ۴ ستون منطقی'],
  ['≤ 780px', 'صفحه‌های حساب و سفارش بازچینی می‌شوند', 'sidebar محصول پنهان', 'ستون اصلی واحد'],
  ['≤ 900px', 'مستندات به reading column تبدیل می‌شود', 'sidebar مستندات در drawer', 'تا ۸ ستون منطقی'],
  ['≤ 1050px', 'پنل‌های فرعی باریک‌تر می‌شوند', 'ناوبری اصلی هنوز دسکتاپ', '۲ ستون محدود'],
  ['> 1050px', 'عرض محصول تا 1180px؛ مستندات تا 1440px', 'sidebar پایدار', '۱۲ ستون منطقی'],
] as const;

export const riskMatrix = [
  ['L0', 'دانش عمومی', 'خیر', 'خیر', 'خیر', 'خیر', 'پیش از ورود/ارسال'],
  ['L1', 'مشاهده احرازشده', 'بله', 'خیر', 'خیر', 'خیر', 'داده ساختگی یا پوشانده'],
  ['L2', 'اقدام کنترل‌شده/قابل مرور', 'بسته به خدمت', 'بله', 'صریح پیش از اثر', 'در صورت نیاز', 'پیش از ارسال واقعی'],
  ['L3', 'اقدام حساس', 'بله', 'بله', 'الزامی', 'الزامی', 'رسید قطعی یا اعلام عدم تغییر'],
] as const;

export type ComponentPropReference = {
  name: string;
  type: string;
  defaultValue: string;
  required: boolean;
  description: string;
};

export type ComponentDocReference = {
  name: string;
  status: 'Public reusable' | 'Internal' | 'Showcase/debug only';
  stability: 'Stable' | 'Experimental' | 'Demo-only' | 'Internal';
  importPath: string;
  sourcePath: string;
  props: ComponentPropReference[];
  accessibility: string[];
  rtl: string[];
  related: string[];
};

export const componentDocReferences: Record<string, ComponentDocReference> = {
  Button: {
    name: 'Button', status: 'Public reusable', stability: 'Stable', importPath: "import { Button } from '@/mresalat/core/primitives'", sourcePath: 'mresalat/core/primitives.tsx',
    props: [
      { name: 'tone', type: "'primary' | 'secondary' | 'danger'", defaultValue: "'primary'", required: false, description: 'نقش بصری و معنایی اقدام.' },
      { name: 'children', type: 'ReactNode', defaultValue: '—', required: true, description: 'برچسب یا محتوای کنترل.' },
      { name: '...buttonProps', type: 'ButtonHTMLAttributes<HTMLButtonElement>', defaultValue: '—', required: false, description: 'همه ویژگی‌ها و callbackهای native button از جمله onClick و disabled.' },
    ], accessibility: ['برای icon-only aria-label بدهید.', 'در اقدام‌های async وضعیت disabled را به‌صورت قطعی مدیریت کنید.'], rtl: ['ترتیب متن/آیکون باید معنایی باشد؛ پیکان را با MResalatIcon بگیرید.'], related: ['Badge', 'Alert'],
  },
  BrandLogo: {
    name: 'BrandLogo', status: 'Public reusable', stability: 'Stable', importPath: "import { BrandLogo } from '@/mresalat/core/BrandLogo'", sourcePath: 'mresalat/core/BrandLogo.tsx',
    props: [
      { name: 'compact', type: 'boolean', defaultValue: 'false', required: false, description: 'قفل‌نویسه فشرده بدون زیرعنوان.' },
      { name: 'light', type: 'boolean', defaultValue: 'false', required: false, description: 'کلاس مناسب زمینه تیره.' },
    ], accessibility: ['تصویر داخلی alt فارسی «ام‌رسالت» دارد.'], rtl: ['دارایی رسمی را mirror یا بازطراحی نکنید.'], related: ['MResalatServiceIcon'],
  },
  MResalatIcon: {
    name: 'MResalatIcon', status: 'Public reusable', stability: 'Stable', importPath: "import { MResalatIcon } from '@/mresalat/core/MResalatIcon'", sourcePath: 'mresalat/core/MResalatIcon.tsx',
    props: [
      { name: 'name', type: 'MResalatIconName', defaultValue: '—', required: true, description: 'نام معنایی تایپ‌شده از iconMap.' },
      { name: 'size', type: 'number', defaultValue: '20', required: false, description: 'اندازه پیکسلی آیکون.' },
      { name: 'strokeWidth', type: 'number', defaultValue: '1.8', required: false, description: 'ضخامت خط Lucide.' },
      { name: 'className', type: 'string', defaultValue: '—', required: false, description: 'کلاس تکمیلی.' },
      { name: 'label', type: 'string', defaultValue: '—', required: false, description: 'برچسب برای آیکون معنادار؛ بدون آن aria-hidden می‌شود.' },
    ], accessibility: ['آیکون تزئینی بدون label از درخت دسترس‌پذیری حذف می‌شود.'], rtl: ['next به ArrowLeft و previous به ArrowRight نگاشت شده‌اند.'], related: ['Button', 'AppShell'],
  },
  MResalatServiceIcon: {
    name: 'MResalatServiceIcon', status: 'Public reusable', stability: 'Stable', importPath: "import { MResalatServiceIcon } from '@/mresalat/core/MResalatServiceIcon'", sourcePath: 'mresalat/core/MResalatServiceIcon.tsx',
    props: [
      { name: 'service', type: 'MResalatService', defaultValue: '—', required: true, description: 'رکورد هویت از ecosystemServices.' },
      { name: 'size', type: '32 | 40 | 48 | 64', defaultValue: '48', required: false, description: 'اندازه مجاز نشان.' },
      { name: 'variant', type: "'normal' | 'compact' | 'monochrome'", defaultValue: "'normal'", required: false, description: 'پرداخت بصری قاب.' },
      { name: 'eager', type: 'boolean', defaultValue: 'false', required: false, description: 'بارگذاری eager برای نمونه بالای fold.' },
    ], accessibility: ['نام خدمت باید در متن مجاور باشد؛ تصویر تزئینی alt خالی دارد.'], rtl: ['نشان‌ها mirror نمی‌شوند.'], related: ['BrandLogo'],
  },
  AppShell: {
    name: 'AppShell', status: 'Public reusable', stability: 'Stable', importPath: "import { AppShell } from '@/mresalat/core/AppShell'", sourcePath: 'mresalat/core/AppShell.tsx',
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '—', required: true, description: 'محتوای اصلی route.' },
      { name: 'active', type: 'string', defaultValue: "'home'", required: false, description: 'کلید route فعال در ناوبری.' },
      { name: 'hideMobileNav', type: 'boolean', defaultValue: 'false', required: false, description: 'پنهان‌کردن ناوبری شناور موبایل برای flow خاص.' },
    ], accessibility: ['ناوبری‌های desktop و mobile نام قابل دسترس دارند.'], rtl: ['ساختار کل shell از dir سند تبعیت می‌کند.'], related: ['ThemeToggle', 'UserContextSwitcher'],
  },
  SmartAssistant3D: {
    name: 'SmartAssistant3D', status: 'Public reusable', stability: 'Experimental', importPath: "import { SmartAssistant3D } from '@/mresalat/ai/SmartAssistant3D'", sourcePath: 'mresalat/ai/SmartAssistant3D.tsx',
    props: [
      { name: 'emotion', type: 'AssistantEmotion', defaultValue: "'idle'", required: false, description: 'حالت رفتاری و چهره.' },
      { name: 'mode', type: "'complete' | 'portrait'", defaultValue: "'complete'", required: false, description: 'قاب کامل یا پرتره.' },
      { name: 'motionIntensity', type: "'restrained' | 'normal' | 'expressive'", defaultValue: "'normal'", required: false, description: 'شدت حرکت مدل.' },
      { name: 'gaze', type: "'none' | 'local' | 'page'", defaultValue: "'page'", required: false, description: 'دامنه دنبال‌کردن اشاره‌گر.' },
      { name: 'transparent', type: 'boolean', defaultValue: 'false', required: false, description: 'شفافیت canvas.' },
      { name: 'handPose', type: 'AssistantHandPose', defaultValue: 'emotion-derived', required: false, description: 'override حالت دست.' },
      { name: 'view', type: 'AssistantView', defaultValue: "'front'", required: false, description: 'زاویه دید.' },
      { name: 'debugView', type: "'standard' | 'face'", defaultValue: "'standard'", required: false, description: 'قاب QA داخلی.' },
      { name: 'animationKey', type: 'number', defaultValue: '0', required: false, description: 'بازاجرای animation.' },
      { name: 'staticOnly', type: 'boolean', defaultValue: 'false', required: false, description: 'اجبار fallback CSS.' },
      { name: 'className', type: 'string', defaultValue: "''", required: false, description: 'کلاس قاب.' },
    ], accessibility: ['شخصیت enhancement است؛ اطلاعات و کنترل‌ها باید در HTML باقی بمانند.', 'reduced motion مدل را به fallback ایستا می‌برد.'], rtl: ['جهت نگاه از مختصات فیزیکی pointer می‌آید و متن مستقلی ندارد.'], related: ['SmartAssistantAvatar', 'SegmentAIEntry', 'AssistantShell'],
  },
  SegmentAIEntry: {
    name: 'SegmentAIEntry', status: 'Public reusable', stability: 'Experimental', importPath: "import { SegmentAIEntry } from '@/mresalat/segments/SegmentAIEntry'", sourcePath: 'mresalat/segments/SegmentAIEntry.tsx',
    props: [
      { name: 'segment', type: 'SegmentSlug', defaultValue: '—', required: true, description: 'سگمنت registration فعلی.' },
      { name: 'suggestions', type: 'SegmentPrompt[]', defaultValue: 'segmentPrompts[segment]', required: false, description: 'پیشنهادهای ورودی.' },
      { name: 'assistantMode', type: "'compact' | 'featured'", defaultValue: "'compact'", required: false, description: 'برجستگی قاب.' },
      { name: 'mascotMode', type: "AssistantCharacterMode | 'none'", defaultValue: "'portrait'", required: false, description: 'قاب mascot یا حذف آن.' },
      { name: 'title', type: 'string', defaultValue: 'segment-specific', required: false, description: 'عنوان ورودی.' },
      { name: 'placeholder', type: 'string', defaultValue: 'segment-specific', required: false, description: 'راهنمای input.' },
      { name: 'greeting', type: 'boolean', defaultValue: 'false', required: false, description: 'اجرای greeting اولیه.' },
      { name: 'contextAware', type: 'boolean', defaultValue: 'true', required: false, description: 'استفاده از context فعال در پاسخ نمایشی.' },
      { name: 'staticMascot', type: 'boolean', defaultValue: 'false', required: false, description: 'fallback ایستا.' },
    ], accessibility: ['input برچسب و focus واقعی دارد؛ وضعیت فکرکردن و پاسخ متنی است.'], rtl: ['متن ورودی فارسی RTL است؛ route و شناسه‌ها LTR می‌مانند.'], related: ['SmartAssistant3D', 'SourceCitation'],
  },
  ProcessReviewWizard: {
    name: 'ProcessReviewWizard', status: 'Public reusable', stability: 'Stable', importPath: "import { ProcessReviewWizard } from '@/mresalat/journeys/ProcessReviewWizard'", sourcePath: 'mresalat/journeys/ProcessReviewWizard.tsx',
    props: [
      { name: 'title', type: 'string', defaultValue: '—', required: true, description: 'عنوان journey و منبع aria-labelledby.' },
      { name: 'steps', type: 'JourneyStep[]', defaultValue: '—', required: true, description: 'مراحل تایپ‌شده.' },
      { name: 'progress', type: 'number', defaultValue: '—', required: true, description: 'درصد پیشرفت.' },
      { name: 'variant', type: "'compact' | 'standard' | 'featured'", defaultValue: "'standard'", required: false, description: 'تراکم و برجستگی.' },
      { name: 'currentAction', type: '{ label: string; href: string }', defaultValue: '—', required: false, description: 'اقدام مرحله جاری.' },
    ], accessibility: ['track با صفحه‌کلید focus می‌گیرد و مرحله جاری aria-current=step دارد.'], rtl: ['دکمه next به اسکرول فیزیکی چپ نگاشت شده است.'], related: ['ServicePageTemplate', 'ActiveJourneyCard'],
  },
  SecureActionFlow: {
    name: 'SecureActionFlow', status: 'Public reusable', stability: 'Demo-only', importPath: "import { SecureActionFlow } from '@/mresalat/secure/SecureActionFlow'", sourcePath: 'mresalat/secure/SecureActionFlow.tsx',
    props: [{ name: 'action', type: 'SecureAction', defaultValue: '—', required: true, description: 'تعریف تایپ‌شده اقدام و الزام confirmation/step-up.' }],
    accessibility: ['مرحله و نتیجه با aria-live اعلام می‌شود.', 'confirmation باید صریح و مستقل از CTA باشد.'], rtl: ['منابع ماسک‌شده مانند شماره کارت dir=ltr دارند.'], related: ['PermissionState', 'ApprovalRequestCard'],
  },
  ParallaxLayer: {
    name: 'ParallaxLayer', status: 'Public reusable', stability: 'Stable', importPath: "import { ParallaxLayer } from '@/mresalat/motion/ParallaxLayer'", sourcePath: 'mresalat/motion/ParallaxLayer.tsx',
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '—', required: true, description: 'محتوای لایه.' },
      { name: 'strength', type: 'number', defaultValue: '8', required: false, description: 'دامنه حرکت transform.' },
      { name: 'className', type: 'string', defaultValue: "''", required: false, description: 'کلاس قاب.' },
    ], accessibility: ['در prefers-reduced-motion حرکت غیرفعال است.'], rtl: ['حرکت فیزیکی است و ترتیب معنایی DOM را تغییر نمی‌دهد.'], related: ['SmartAssistant3D'],
  },
};
