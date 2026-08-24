import type { Metadata } from 'next';
import { MBazarCategoryPage } from '@/mresalat/mbazar/MBazarComponents';
import { categoryBySlug } from '@/mresalat/mbazar/data';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  return { title: category.title, description: category.description };
}

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ installment?: string; available?: string; max?: string }> }) {
  const { slug } = await params;
  const filters = await searchParams;
  return <MBazarCategoryPage slug={slug} initialInstallment={filters.installment === '1'} initialAvailable={filters.available === '1'} initialMaxPrice={filters.max ? Number(filters.max) : undefined} />;
}
