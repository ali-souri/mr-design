import type { Metadata } from 'next';
import { MBazarNewInstallmentPage } from '@/mresalat/mbazar/MBazarPurchase';

export const metadata: Metadata = { title: 'درخواست اقساط جدید ام‌بازار' };
export default async function NewInstallmentPage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const params = await searchParams;
  return <MBazarNewInstallmentPage productId={params.product} />;
}
