import type { Metadata } from 'next';
import { CheckoutSuccess } from '@/mresalat/mbazar/MBazarPurchase';

export const metadata: Metadata = { title: 'نتیجه خرید ام‌بازار' };
export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ mode?: string; ref?: string }> }) {
  const params = await searchParams;
  const mode = params.mode === 'installment' ? 'installment' : 'cash';
  return <CheckoutSuccess mode={mode} reference={params.ref ?? (mode === 'installment' ? 'MBI-1405-1908' : 'MBO-1405-2841')} />;
}
