import type { Metadata } from 'next';
import { MBazarInstallmentDetail } from '@/mresalat/mbazar/MBazarPurchase';
import { installmentRequestById } from '@/mresalat/mbazar/data';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const request = installmentRequestById((await params).id);
  return { title: `درخواست ${request.reference}`, description: request.nextAction };
}
export default async function InstallmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <MBazarInstallmentDetail id={(await params).id} />;
}
