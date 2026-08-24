import type { MResalatIconName } from '@/mresalat/core/MResalatIcon';

export type SegmentSlug = 'individual' | 'under-18' | 'organization';
export type SegmentVisualTone = 'formal' | 'youth' | 'organizational';
export type SegmentViewSlug =
  | 'membership' | 'identity' | 'otp' | 'status'
  | 'request' | 'child-info' | 'account-request'
  | 'owners' | 'add-owner';

export type SegmentLink = {
  title: string;
  description: string;
  href: string;
  icon: MResalatIconName;
  badge?: string;
};

export type SegmentExperienceConfig = {
  slug: SegmentSlug;
  titleFa: string;
  shortDescriptionFa: string;
  visualTone: SegmentVisualTone;
  accentMode: 'brand' | 'youth' | 'professional';
  assistantMode: 'compact' | 'friendly';
  hero: { eyebrow: string; title: string; description: string; primaryLabel: string; primaryHref: string };
  primaryServices: SegmentLink[];
  primaryProcesses: SegmentLink[];
  pending: { label: string; title: string; detail: string; href: string; progress: number };
  navigation: { label: string; href: string }[];
};

export const segmentExperiences: Record<SegmentSlug, SegmentExperienceConfig> = {
  individual: {
    slug: 'individual', titleFa: 'اشخاص حقیقی', shortDescriptionFa: 'عضویت، احراز هویت و خدمات روزمره با مسیر روشن و قابل پیگیری.', visualTone: 'formal', accentMode: 'brand', assistantMode: 'compact',
    hero: { eyebrow: 'تجربه شخصی شما', title: 'خدمات بانکی، از یک شروع روشن', description: 'درخواست عضویت را آغاز کنید، احراز هویت را ادامه دهید یا وضعیت پرونده خود را ببینید.', primaryLabel: 'شروع عضویت', primaryHref: '/segments/individual/membership' },
    primaryServices: [
      { title: 'افتتاح حساب', description: 'آشنایی با پیش‌نیازها و مسیر افتتاح', href: '/segments/individual/membership', icon: 'bank', badge: 'پرکاربرد' },
      { title: 'احراز هویت', description: 'ثبت امن اطلاعات اولیه', href: '/segments/individual/identity', icon: 'security' },
      { title: 'پیگیری درخواست', description: 'مشاهده مرحله فعلی و اقدام بعد', href: '/segments/individual/status', icon: 'assessment' },
    ],
    primaryProcesses: [
      { title: 'درخواست عضویت', description: 'شرایط، اطلاعات هویتی و تأیید همراه', href: '/segments/individual/membership', icon: 'membership' },
      { title: 'ورود امن با کد تأیید', description: 'نمونه ورود دومرحله‌ای و قابل دسترس', href: '/segments/individual/otp', icon: 'lock' },
      { title: 'مشاوره عضویت', description: 'راهنمای مرحله‌به‌مرحله پیش از اقدام', href: '/rag', icon: 'assistant' },
    ],
    pending: { label: 'درخواست فعال', title: 'تکمیل احراز هویت', detail: 'اطلاعات اولیه ثبت شده و تأیید شماره همراه باقی مانده است.', href: '/segments/individual/otp', progress: 42 },
    navigation: [{ label: 'خانه شخصی', href: '/segments/individual' }, { label: 'شروع عضویت', href: '/segments/individual/membership' }, { label: 'احراز هویت', href: '/segments/individual/identity' }, { label: 'پیگیری', href: '/segments/individual/status' }],
  },
  'under-18': {
    slug: 'under-18', titleFa: 'زیر ۱۸ سال', shortDescriptionFa: 'یک مسیر راهنمایی‌شده برای نوجوان و ولی یا سرپرست او.', visualTone: 'youth', accentMode: 'youth', assistantMode: 'friendly',
    hero: { eyebrow: 'شروع همراه با راهنما', title: 'برای آینده‌ات، قدم اول را باهم برمی‌داریم', description: 'ولی یا سرپرست می‌تواند اطلاعات نوجوان را اضافه کند و ادامه مسیر افتتاح حساب را شفاف ببیند.', primaryLabel: 'افزودن کاربر زیر ۱۸ سال', primaryHref: '/segments/under-18/child-info' },
    primaryServices: [
      { title: 'افزودن نوجوان', description: 'بررسی اطلاعات پایه با همراهی سرپرست', href: '/segments/under-18/child-info', icon: 'child', badge: 'قدم اول' },
      { title: 'افتتاح حساب نوجوان', description: 'انتخاب درخواست پس از تأیید اطلاعات', href: '/segments/under-18/account-request', icon: 'bank' },
      { title: 'راهنمای ولی یا سرپرست', description: 'بدانید در هر مرحله چه چیزی لازم است', href: '/segments/under-18/request', icon: 'parent' },
    ],
    primaryProcesses: [
      { title: 'شناخت مسیر', description: 'چه کسی باید درخواست را تکمیل کند؟', href: '/segments/under-18/request', icon: 'help' },
      { title: 'درخواست حساب', description: 'انتخاب نوع درخواست نمایشی نوجوان', href: '/segments/under-18/account-request', icon: 'card' },
      { title: 'پیگیری باهم', description: 'کار انجام‌شده و قدم بعد را ساده ببینید', href: '/segments/under-18/status', icon: 'goal' },
    ],
    pending: { label: 'ادامه مسیر', title: 'اطلاعات نوجوان آماده بررسی است', detail: 'پس از بررسی نمایشی، نوع درخواست حساب را انتخاب کنید.', href: '/segments/under-18/account-request', progress: 55 },
    navigation: [{ label: 'خانه نوجوان', href: '/segments/under-18' }, { label: 'راهنمای شروع', href: '/segments/under-18/request' }, { label: 'اطلاعات نوجوان', href: '/segments/under-18/child-info' }, { label: 'پیگیری', href: '/segments/under-18/status' }],
  },
  organization: {
    slug: 'organization', titleFa: 'عضویت سازمانی', shortDescriptionFa: 'ثبت ساختاریافته سازمان، صاحبان امضاء و اطلاعات تکمیلی.', visualTone: 'organizational', accentMode: 'professional', assistantMode: 'compact',
    hero: { eyebrow: 'فضای عضویت سازمان', title: 'راه‌اندازی سازمان، مرحله‌به‌مرحله و دقیق', description: 'مسئول مجاز سازمان می‌تواند اطلاعات پایه، صاحبان امضاء و وضعیت تکمیل پرونده را یک‌جا مدیریت کند.', primaryLabel: 'شروع ثبت سازمان', primaryHref: '/segments/organization/request' },
    primaryServices: [
      { title: 'ثبت صاحبان امضاء', description: 'افزودن و بررسی اعضای مجاز سازمان', href: '/segments/organization/owners', icon: 'profile', badge: 'اقدام لازم' },
      { title: 'تکمیل اطلاعات سازمان', description: 'ادامه اطلاعات ثبتی و ارتباطی', href: '/segments/organization/status', icon: 'organization' },
      { title: 'پیگیری درخواست', description: 'وضعیت مراحل و موارد باقی‌مانده', href: '/segments/organization/status', icon: 'reports' },
    ],
    primaryProcesses: [
      { title: 'آغاز عضویت سازمانی', description: 'دامنه درخواست و مدارک اولیه', href: '/segments/organization/request', icon: 'membership' },
      { title: 'مدیریت صاحبان امضاء', description: 'فهرست افراد، وضعیت و اقدام بعد', href: '/segments/organization/owners', icon: 'employee' },
      { title: 'راهنمای فرایند', description: 'پاسخ کوتاه درباره مراحل ثبت', href: '/rag', icon: 'assistant' },
    ],
    pending: { label: 'پرونده سازمان', title: 'ثبت یک صاحب امضاء باقی مانده', detail: 'دو نفر تأیید شده‌اند؛ پیش از ادامه، فرد سوم را اضافه کنید.', href: '/segments/organization/add-owner', progress: 68 },
    navigation: [{ label: 'خانه سازمان', href: '/segments/organization' }, { label: 'شروع ثبت', href: '/segments/organization/request' }, { label: 'صاحبان امضاء', href: '/segments/organization/owners' }, { label: 'پیگیری', href: '/segments/organization/status' }],
  },
};

export const phaseOneSegments = Object.values(segmentExperiences);

export const phaseOneViews: Record<SegmentSlug, SegmentViewSlug[]> = {
  individual: ['membership', 'identity', 'otp', 'status'],
  'under-18': ['request', 'child-info', 'account-request', 'status'],
  organization: ['request', 'owners', 'add-owner', 'status'],
};

export function isSegmentSlug(value: string): value is SegmentSlug {
  return value in segmentExperiences;
}

export function isPhaseOneView(segment: SegmentSlug, value: string): value is SegmentViewSlug {
  return phaseOneViews[segment].includes(value as SegmentViewSlug);
}
