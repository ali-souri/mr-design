import type { Metadata } from 'next';
import { MBazarSearchPage } from '@/mresalat/mbazar/MBazarComponents';

export const metadata: Metadata = { title: 'جستجو در ام‌بازار' };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; installment?: string; available?: string; max?: string }> }) {
  const params = await searchParams;
  return <MBazarSearchPage initialQuery={params.q ?? ''} initialInstallment={params.installment === '1'} initialAvailable={params.available === '1'} initialMaxPrice={params.max ? Number(params.max) : undefined} />;
}
