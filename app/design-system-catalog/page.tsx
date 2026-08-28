import type { Metadata } from 'next';
import { CatalogBook } from '@/mresalat/catalog-book/CatalogBook';
import './catalog-book.css';

export const metadata: Metadata = {
  title: 'کاتالوگ سیستم طراحی ام‌رسالت',
  description: 'راهنمای جامع فارسی طراحی تجربه، اجزا و الگوهای محصول ام‌رسالت.',
  authors: [{ name: 'MResalat System' }],
};

export default async function DesignSystemCatalogPage({ searchParams }: { searchParams: Promise<{ prototype?: string }> }) {
  const params = await searchParams;
  return <CatalogBook prototype={params.prototype === '1'} />;
}
