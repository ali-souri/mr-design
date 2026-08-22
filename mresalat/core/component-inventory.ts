export type ComponentInventoryItem = {
  category: 'Foundations' | 'Core' | 'Navigation' | 'AI' | 'RAG / Trust' | 'Journeys' | 'Secure' | 'Templates' | 'Motion' | 'Documentation';
  name: string;
  purpose: string;
  variants: string[];
  states: string[];
};

export const componentInventory: ComponentInventoryItem[] = [
  { category: 'Foundations', name: 'BrandLogo', purpose: 'نمایش دارایی رسمی ام‌رسالت', variants: ['full', 'compact', 'light surface'], states: ['light', 'dark'] },
  { category: 'Foundations', name: 'MResalatIcon', purpose: 'نگاشت معنایی آیکون‌های Lucide', variants: ['16', '20', '24', '32'], states: ['active', 'inactive', 'semantic'] },
  { category: 'Foundations', name: 'ThemeToggle', purpose: 'انتخاب و نگهداری پوسته', variants: ['light', 'dark', 'system'], states: ['persisted', 'system-synced'] },
  { category: 'Core', name: 'Button', purpose: 'اقدام‌های استاندارد سیستم', variants: ['primary', 'secondary', 'danger'], states: ['default', 'hover', 'focus', 'disabled'] },
  { category: 'Core', name: 'Badge', purpose: 'برچسب وضعیت و دسته‌بندی', variants: ['info', 'success', 'warning', 'danger', 'neutral'], states: ['static'] },
  { category: 'Core', name: 'Alert', purpose: 'بازخورد و پیام قابل بازیابی', variants: ['info', 'success', 'warning', 'danger'], states: ['status', 'alert'] },
  { category: 'Navigation', name: 'AppShell', purpose: 'هدر، ناوبری دسکتاپ و موبایل', variants: ['desktop', 'mobile floating'], states: ['active route', 'dark theme'] },
  { category: 'AI', name: 'AssistantShell', purpose: 'ورودی و زمینه‌سازی دستیار', variants: ['hero', 'context', 'compact'], states: ['idle', 'focused'] },
  { category: 'AI', name: 'SmartAssistant3D', purpose: 'بیان سه‌بعدی و غیراصلی حالت دستیار', variants: ['WebGL', 'static fallback'], states: ['idle', 'listening', 'thinking', 'explaining', 'happy', 'warning', 'uncertain', 'handoff'] },
  { category: 'AI', name: 'SmartAssistantCanvas', purpose: 'صحنه کم‌هزینه React Three Fiber و مدل کدنویسی‌شده', variants: ['lazy canvas'], states: ['animated', 'reduced', 'page hidden paused'] },
  { category: 'AI', name: 'Assistant3DDemo', purpose: 'مرور تعاملی حالت‌های دستیار سه‌بعدی', variants: ['showcase controls'], states: ['eight emotions'] },
  { category: 'RAG / Trust', name: 'SourceCitation', purpose: 'منبع و شواهد قابل گسترش', variants: ['official knowledge', 'live data'], states: ['collapsed', 'expanded'] },
  { category: 'RAG / Trust', name: 'TrustLegend', purpose: 'راهنمای منشأ و نقش اطلاعات', variants: ['official', 'live', 'AI', 'recommendation'], states: ['light', 'dark'] },
  { category: 'RAG / Trust', name: 'UncertainAnswer', purpose: 'عدم قطعیت و درخواست شفاف‌سازی', variants: ['insufficient evidence'], states: ['clarify', 'handoff'] },
  { category: 'RAG / Trust', name: 'HumanHandoff', purpose: 'انتقال زمینه‌دار به کارشناس', variants: ['with summary'], states: ['ready to handoff'] },
  { category: 'Journeys', name: 'ProcessReviewWizard', purpose: 'مرور افقی و سبک مسیر', variants: ['compact', 'standard', 'featured'], states: ['completed', 'current', 'upcoming'] },
  { category: 'Journeys', name: 'ServicePageTemplate', purpose: 'قالب کامل معرفی و مسیر خدمت', variants: ['service-config driven'], states: ['informational', 'next action'] },
  { category: 'Secure', name: 'SecureActionFlow', purpose: 'اقدام L3 با تأیید و احراز قوی', variants: ['success', 'failure'], states: ['explain', 'confirm', 'step-up', 'receipt'] },
  { category: 'Templates', name: 'SegmentExperience', purpose: 'ترکیب سه صفحه از تنظیم سگمنت', variants: ['home', 'services', 'journey'], states: ['discovery', 'guided', 'operational', 'family', 'young', 'care'] },
  { category: 'Motion', name: 'ParallaxLayer', purpose: 'عمق فضایی محدود و کم‌هزینه', variants: ['restrained', 'young enhanced'], states: ['pointer active', 'reduced motion disabled'] },
  { category: 'Documentation', name: 'CodeExample', purpose: 'نمونه کد بازشونده و قابل کپی', variants: ['details panel'], states: ['collapsed', 'expanded', 'copied'] },
  { category: 'Documentation', name: 'GridLayoutDemo', purpose: 'نمایش تعاملی شبکه واقعی صفحه', variants: ['12-column', '4-column mobile'], states: ['overlay shown', 'overlay hidden'] },
];
