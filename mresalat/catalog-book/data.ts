import { componentInventory } from '@/mresalat/core/component-inventory';
import { ecosystemIdentityServices } from '@/mresalat/domains/ecosystem';
import { serviceCatalog, serviceCatalogChapters } from '@/mresalat/domains/service-catalog';
import { exampleDomains } from '@/mresalat/examples/product/example-route-registry';

export const catalogBookMeta = {
  title: 'کاتالوگ سیستم طراحی ام‌رسالت',
  subtitle: 'راهنمای جامع طراحی تجربه، اجزا و الگوهای محصول',
  version: 'v0.4.0',
  generatedAt: '۲۰۲۶-۰۸-۲۸',
  repository: 'ali-souri/mr-design',
  commitBase: '655f2f3 · PR #10',
} as const;

export const catalogBookFacts = {
  components: componentInventory.length,
  componentCategories: new Set(componentInventory.map((item) => item.category)).size,
  identities: ecosystemIdentityServices.length,
  officialIdentities: ecosystemIdentityServices.filter((item) => item.identity.source === 'official-asset').length,
  designedIdentities: ecosystemIdentityServices.filter((item) => item.identity.source === 'mresalat-system-designed').length,
  domains: exampleDomains.length,
  routes: serviceCatalog.length,
  chapters: serviceCatalogChapters.length,
} as const;

export const lightDarkTokens = [
  { name: 'surface.canvas', value: '#f2f5fa', darkValue: '#091827', usage: 'پس‌زمینه عمومی صفحه و محیط خواندن' },
  { name: 'surface.default', value: '#ffffff', darkValue: '#102235', usage: 'سطح پایه کارت‌ها و ترکیب‌های محتوایی' },
  { name: 'surface.secondary', value: '#eef3f8', darkValue: '#11283b', usage: 'سطح کمکی، نوارها و گروه‌بندی محتوا' },
  { name: 'surface.selected', value: '#dceefa', darkValue: '#194665', usage: 'انتخاب فعلی بدون اتکا به رنگ به‌تنهایی' },
  { name: 'text.primary', value: '#10233f', darkValue: '#edf6ff', usage: 'متن اصلی با اولویت خوانایی' },
  { name: 'text.secondary', value: '#4f637b', darkValue: '#b8cadb', usage: 'توضیح، راهنما و متن پشتیبان' },
  { name: 'action.primary', value: '#075aa7', darkValue: '#4fa3ea', usage: 'اقدام اصلی و ناوبری فعال' },
  { name: 'accent.cyan', value: '#16a8b7', darkValue: '#42c7c8', usage: 'تأکید هوشمند، فوکوس و نشانه‌های مکمل' },
  { name: 'status.success', value: '#14805e', darkValue: '#4fc49a', usage: 'نتیجه موفق همراه با متن یا نماد' },
  { name: 'status.warning', value: '#a96808', darkValue: '#e6b259', usage: 'هشدار قابل بازیابی و نیازمند توجه' },
  { name: 'status.danger', value: '#bd3f4f', darkValue: '#ef7c8d', usage: 'خطا، توقف و اقدام پرخطر' },
  { name: 'trust.ai', value: '#6552a1', darkValue: '#b6a4ec', usage: 'توضیح تولیدشده توسط هوش مصنوعی' },
] as const;

export const brandTokens = [
  { name: 'brand.50', value: '#eef6fd', usage: 'پس‌زمینه برند بسیار نرم' },
  { name: 'brand.100', value: '#d9ebfa', usage: 'سطح تعاملی برند' },
  { name: 'brand.300', value: '#74b5e8', usage: 'نمودار و تزئین کنترل‌شده' },
  { name: 'brand.500', value: '#1976c9', usage: 'رنگ میانی برند' },
  { name: 'brand.700', value: '#075aa7', usage: 'اقدام و تیتر برند' },
  { name: 'brand.900', value: '#103657', usage: 'سطح تیره و متن برند' },
] as const;

export const trustTokens = [
  { name: 'trust.official', value: '#14805e', usage: 'دانش رسمی و مستند' },
  { name: 'trust.live', value: '#176cb5', usage: 'داده زنده سامانه' },
  { name: 'trust.ai', value: '#6552a1', usage: 'توضیح هوش مصنوعی' },
  { name: 'trust.recommendation', value: '#a96808', usage: 'پیشنهاد و اقدام بعدی' },
] as const;

export const publicationSections = [
  ['01', 'فلسفه و اصول سیستم طراحی', 'Principles'],
  ['02', 'هویت برند', 'Brand identity'],
  ['03', 'رنگ و توکن‌های معنایی', 'Color & semantic tokens'],
  ['04', 'تایپوگرافی فارسی', 'Persian typography'],
  ['05', 'شبکه، فاصله، گوشه و عمق', 'Layout foundations'],
  ['06', 'آیکون‌نگاری و هویت خدمات', 'Icons & service identities'],
  ['07', 'اجزای پایه', 'Core components'],
  ['08', 'ناوبری و پوسته محصول', 'Navigation & shell'],
  ['09', 'دستیار هوشمند ام‌رسالت', 'MResalat assistant'],
  ['10', 'اعتماد، RAG و پاسخ مستند', 'Trust & RAG'],
  ['11', 'ریسک و اقدامات حساس', 'Risk & secure actions'],
  ['12', 'سگمنت، زمینه و رابطه', 'Segments & context'],
  ['13', 'الگوهای مسیر خدمت', 'Service journeys'],
  ['14', 'ام‌بازار', 'M-Bazar'],
  ['15', '۱۲ دامنه خدمات ام‌رسالت', 'Product domains'],
  ['16', '۶۹ مسیر ممیزی‌شده', 'Audited routes'],
  ['17', 'نمونه‌های محصول منتخب', 'Case studies'],
  ['18', 'روشن، تیره و پاسخ‌گو', 'Themes & responsive'],
  ['19', 'دسترس‌پذیری', 'Accessibility'],
  ['20', 'الگوهای وضعیت', 'State patterns'],
  ['21', 'موجودی اجزا', 'Component inventory'],
  ['22', 'معماری سیستم', 'Architecture'],
  ['23', 'راهنمای استفاده برای تیم‌ها', 'Team guidance'],
  ['24', 'بایدها و نبایدها', 'Do / Don’t'],
] as const;

export const prototypeRoutes = serviceCatalog.slice(0, 8);
