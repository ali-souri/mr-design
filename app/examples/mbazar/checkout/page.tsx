import type { Metadata } from 'next';
import { MBazarCheckoutPage } from '@/mresalat/mbazar/MBazarPurchase';
import type { CheckoutStep, MBazarPaymentMode } from '@/mresalat/mbazar/types';

export const metadata: Metadata = { title: 'پرداخت ام‌بازار', description: 'ارسال، پرداخت و درخواست اقساط در یک مسیر یکپارچه ام‌بازار' };
export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ step?: string; mode?: string }> }) {
  const params = await searchParams;
  const steps: CheckoutStep[] = ['delivery', 'payment', 'eligibility', 'plan', 'review', 'confirm'];
  const step = steps.includes(params.step as CheckoutStep) ? params.step as CheckoutStep : 'delivery';
  const mode = params.mode === 'cash' || params.mode === 'installment' ? params.mode as MBazarPaymentMode : undefined;
  return <MBazarCheckoutPage initialStep={step} initialMode={mode} />;
}
