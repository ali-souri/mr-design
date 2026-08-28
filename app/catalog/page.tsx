import type { Metadata } from 'next';
import { AppShell } from '@/mresalat/core/AppShell';
import { Badge } from '@/mresalat/core/primitives';
import { MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { CatalogExplorer } from '@/mresalat/catalog/CatalogExplorer';
import { CatalogStateGallery } from '@/mresalat/catalog/ServiceCatalogPrimitives';
import { serviceCatalog, serviceCatalogChapters, serviceCatalogSource } from '@/mresalat/domains/service-catalog';

export const metadata: Metadata = { title: 'کاتالوگ ۶۹ مسیر خدمت', description: 'پوشش طراحی سیستم برای ۶۹ مسیر ممیزی‌شده ام‌رسالت در ۱۲ فصل.' };

export default function CatalogPage() {
  return <AppShell active="catalog"><header className="catalog-hero"><div><Badge tone="success">۶۹ / ۶۹ مسیر ثبت‌شده</Badge><span className="eyebrow">ممیزی دوزبانه · {serviceCatalogSource.auditedAt}</span><h1>ردپای ممیزی هر خدمت، روشن و قابل پیگیری</h1><p>کاتالوگ لایه شواهد و پوشش است: وضعیت ممیزی، ریسک، مرز توقف و نگاشت طراحی را نگه می‌دارد؛ تجربه تعاملی هر مسیر از لینک نمونه محصول باز می‌شود.</p><div><a className="button button-primary" href="#catalog-results">مرور همه مسیرها<MResalatIcon name="next" size={16} /></a><a className="button button-ghost" href="/qa#catalog-coverage">بازبینی پوشش</a></div></div><aside aria-label="خلاصه پوشش"><strong>{serviceCatalog.length}</strong><span>مسیر ممیزی‌شده</span><strong>{serviceCatalogChapters.length}</strong><span>فصل محصول</span><strong>۰</strong><span>اتصال تولید</span></aside></header><section className="catalog-principles"><article><MResalatIcon name="evidence" size={24} /><strong>شواهد، نه حدس</strong><p>وضعیت مشاهده‌شده از مجوز اجرا جداست.</p></article><article><MResalatIcon name="security" size={24} /><strong>مرز توقف صریح</strong><p>L2 و L3 پیش از اثر واقعی متوقف می‌شوند.</p></article><article><MResalatIcon name="grid" size={24} /><strong>ترکیب‌پذیر</strong><p>سطح‌ها از خانواده اجزای مشترک ساخته شده‌اند.</p></article></section><div id="catalog-results"><CatalogExplorer /></div><CatalogStateGallery /></AppShell>;
}
