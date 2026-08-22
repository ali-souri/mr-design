import type { Metadata } from 'next';
import { AppShell } from '@/mresalat/core/AppShell';
import { Badge } from '@/mresalat/core/primitives';
import { ecosystemServices } from '@/mresalat/domains/ecosystem';
import { ServiceExamples } from '@/mresalat/examples/ServiceExamples';

export const metadata: Metadata = { title: 'نمونه‌های خدمات واقعی ام‌رسالت' };

export default function ExamplesPage() {
  return (
    <AppShell active="examples">
      <header className="examples-hero"><span className="eyebrow">نمونه‌های مبتنی بر محصول واقعی</span><h1>هر خدمت، هویت خودش؛ یک تجربه هماهنگ</h1><p>نام‌ها، گروه‌بندی و عملکردها از محصول عمومی ام‌رسالت آمده‌اند و در زبان تازه MResalat System بازطراحی شده‌اند.</p><div><Badge tone="info">{ecosystemServices.length} خدمت جاری</Badge><Badge tone="success">هویت رسمی و محلی</Badge><Badge tone="neutral">داده‌های نمایشی</Badge></div></header>
      <ServiceExamples />
    </AppShell>
  );
}
